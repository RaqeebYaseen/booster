'use client';

import { motion, useInView } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc, increment, updateDoc } from 'firebase/firestore';

export type PollOption = {
  id: string;
  label: string;
  votes: number;
};

export type PollData = {
  title: string;
  question: string;
  options: PollOption[];
  statusText: string;
  endsText: string;
};

type SiteSettingsDoc = {
  poll?: {
    options?: Array<{ id?: unknown; label?: unknown; votes?: unknown }>;
  };
};

const DEFAULT_POLL: PollData = {
  title: 'FINAL RESULTS',
  question: 'DEX Update payment should come in harmony with fees, or should it not?',
  options: [
    { id: 'opt1', label: 'Christmas DEX for free', votes: 2 },
    { id: 'opt2', label: 'DEX Update from fees converted', votes: 3 },
  ],
  statusText: '5 votes • Final results',
  endsText: '',
};

function safePercent(v: number, total: number) {
  if (!total) return 0;
  return Math.round((v / total) * 100);
}

export default function PollSection({ poll }: { poll?: Partial<PollData> }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const merged: PollData = useMemo(() => {
    const base: PollData = { ...DEFAULT_POLL, ...(poll || {}) } as PollData;
    const options = (poll?.options && poll.options.length ? poll.options : DEFAULT_POLL.options).map((o, idx) => ({
      id: o.id || `opt${idx + 1}`,
      label: o.label || DEFAULT_POLL.options[idx]?.label || `Option ${idx + 1}`,
      votes: typeof o.votes === 'number' ? o.votes : 0,
    }));

    return {
      ...base,
      options,
    };
  }, [poll]);

  const [selectedId, setSelectedId] = useState<string>('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [localVoted, setLocalVoted] = useState(false);

  const totalVotes = merged.options.reduce((sum, o) => sum + (o.votes || 0), 0);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const key = 'boost_poll_voted_v1';
    setLocalVoted(window.localStorage.getItem(key) === '1');
  }, []);

  const submitVote = async () => {
    setError('');
    if (!selectedId) {
      setError('Select an option first.');
      return;
    }

    if (localVoted) {
      setError('You already voted.');
      return;
    }

    setSubmitting(true);

    try {
      const settingsRef = doc(db, 'settings', 'site');
      const snap = await getDoc(settingsRef);
      if (!snap.exists()) throw new Error('Settings not found');

      const data = snap.data() as unknown as SiteSettingsDoc;
      const currentOptions = Array.isArray(data?.poll?.options) ? data.poll.options : [];
      const idx = currentOptions.findIndex((o) => o?.id === selectedId);
      if (idx < 0) throw new Error('Option not found');

      await updateDoc(settingsRef, {
        [`poll.options.${idx}.votes`]: increment(1),
      });

      if (typeof window !== 'undefined') {
        window.localStorage.setItem('boost_poll_voted_v1', '1');
      }

      setLocalVoted(true);
      setSelectedId('');
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to vote');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="poll" className="poll-section" ref={ref}>
      <div className="container" style={{ textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="section-badge">POLL</span>
          <h2 className="section-title chrome-text" style={{ margin: '0 auto' }}>
            Community Poll
          </h2>
          <p className="section-subtitle" style={{ margin: '16px auto 0' }}>
            {merged.question}
          </p>
        </motion.div>

        <motion.div
          className="poll-card glass-card"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="poll-header">
            <div className="poll-title">{merged.title}</div>
            <div className="poll-meta">{merged.statusText || `${totalVotes} votes`}</div>
          </div>

          <div className="poll-options">
            {merged.options.map((opt) => {
              const percent = safePercent(opt.votes || 0, totalVotes);
              const isSelected = selectedId === opt.id;
              return (
                <button
                  key={opt.id}
                  className={`poll-option ${isSelected ? 'selected' : ''}`}
                  onClick={() => setSelectedId(opt.id)}
                  type="button"
                  disabled={submitting || localVoted}
                >
                  <div className="poll-option-row">
                    <span className="poll-option-label">{opt.label}</span>
                    <span className="poll-option-percent">{percent}%</span>
                  </div>
                  <div className="poll-option-track">
                    <div className="poll-option-fill" style={{ width: `${percent}%` }} />
                  </div>
                </button>
              );
            })}
          </div>

          {error && <div className="poll-error">{error}</div>}

          <div className="poll-actions">
            <button className="btn-primary" onClick={submitVote} disabled={submitting || localVoted}>
              {localVoted ? 'Voted' : submitting ? 'Submitting...' : 'Vote'}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
