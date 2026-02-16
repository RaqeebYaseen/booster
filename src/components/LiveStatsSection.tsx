'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export type LiveStatsData = {
  totalFeesConverted: string;
  feesDelta24h: string;
  boostsPurchased: string;
  nextBoostProgress: number;
  nextBoostNeededLabel: string;
};

export default function LiveStatsSection({ liveStats }: { liveStats?: Partial<LiveStatsData> }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const defaults: LiveStatsData = {
    totalFeesConverted: '0.2 SOL',
    feesDelta24h: '+0.2 in last 24h',
    boostsPurchased: '40x boosts',
    nextBoostProgress: 0.2,
    nextBoostNeededLabel: '1 SOL needed',
  };

  const data: LiveStatsData = {
    ...defaults,
    ...(liveStats || {}),
    nextBoostProgress: typeof liveStats?.nextBoostProgress === 'number' ? liveStats.nextBoostProgress : defaults.nextBoostProgress,
  };

  const progressClamped = Math.max(0, Math.min(1, data.nextBoostProgress));

  return (
    <section id="stats" className="live-stats-section" ref={ref}>
      <div className="container" style={{ textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="section-badge">LIVE STATS</span>
          <h2 className="section-title chrome-text" style={{ margin: '0 auto' }}>
            Live Stats
          </h2>
        </motion.div>

        <div className="live-stats-grid">
          <motion.div
            className="live-stat-card glass-card"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.05 }}
          >
            <div className="live-stat-label">Total Fees Converted</div>
            <div className="live-stat-value live-stat-value--accent">{data.totalFeesConverted}</div>
            <div className="live-stat-sub">{data.feesDelta24h}</div>
          </motion.div>

          <motion.div
            className="live-stat-card glass-card"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.12 }}
          >
            <div className="live-stat-label">Boosts Purchased</div>
            <div className="live-stat-value live-stat-value--accent">{data.boostsPurchased}</div>
          </motion.div>

          <motion.div
            className="live-stat-card glass-card"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.19 }}
          >
            <div className="live-stat-label">Next Boost Progress</div>
            <div className="live-stat-value live-stat-value--accent">{progressClamped.toFixed(1)}</div>
            <div className="live-progress">
              <div className="live-progress-bar" style={{ width: `${progressClamped * 100}%` }} />
            </div>
            <div className="live-stat-sub">{data.nextBoostNeededLabel}</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
