'use client';

import { motion, useInView } from 'framer-motion';
import { useMemo, useRef } from 'react';

export type PollOption = {
  id: string;
  label: string;
  votes: number;
};

export type PollData = {
  title: string;
  question: string;
  statusText: string;
  endsText: string;
  optionA: PollOption;
  optionB: PollOption;
};

const DEFAULT_POLL: PollData = {
  title: 'FINAL RESULTS',
  question: 'DEX Update payment should come in harmony with fees, or should it not?',
  statusText: '5 votes • Final results',
  endsText: '',
  optionA: { id: 'optionA', label: 'Christmas DEX for free', votes: 2 },
  optionB: { id: 'optionB', label: 'DEX Update from fees converted', votes: 3 },
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
    return {
      ...base,
      optionA: {
        id: base.optionA?.id || 'optionA',
        label: base.optionA?.label || DEFAULT_POLL.optionA.label,
        votes: typeof base.optionA?.votes === 'number' ? base.optionA.votes : 0,
      },
      optionB: {
        id: base.optionB?.id || 'optionB',
        label: base.optionB?.label || DEFAULT_POLL.optionB.label,
        votes: typeof base.optionB?.votes === 'number' ? base.optionB.votes : 0,
      },
    };
  }, [poll]);

  const options = [merged.optionA, merged.optionB];
  const totalVotes = options.reduce((sum, o) => sum + (o.votes || 0), 0);

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
            {options.map((opt) => {
              const percent = safePercent(opt.votes || 0, totalVotes);
              return (
                <div
                  key={opt.id}
                  className="poll-option"
                >
                  <div className="poll-option-row">
                    <span className="poll-option-label">{opt.label}</span>
                    <span className="poll-option-percent">{percent}%</span>
                  </div>
                  <div className="poll-option-track">
                    <div className="poll-option-fill" style={{ width: `${percent}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
