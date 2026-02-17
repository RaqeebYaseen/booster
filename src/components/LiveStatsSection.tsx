'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export type LiveStatsData = {
  totalFeesConvertedSol: number;
  feesDelta24hSol: number;
  boostsPurchased: number;
  nextBoostCurrentSol: number;
  nextBoostTargetSol: number;
};

export default function LiveStatsSection({ liveStats }: { liveStats?: Partial<LiveStatsData> }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const defaults: LiveStatsData = {
    totalFeesConvertedSol: 0.2,
    feesDelta24hSol: 0.2,
    boostsPurchased: 40,
    nextBoostCurrentSol: 0.2,
    nextBoostTargetSol: 1,
  };

  const data: LiveStatsData = {
    ...defaults,
    ...(liveStats || {}),
    totalFeesConvertedSol: typeof liveStats?.totalFeesConvertedSol === 'number' ? liveStats.totalFeesConvertedSol : defaults.totalFeesConvertedSol,
    feesDelta24hSol: typeof liveStats?.feesDelta24hSol === 'number' ? liveStats.feesDelta24hSol : defaults.feesDelta24hSol,
    boostsPurchased: typeof liveStats?.boostsPurchased === 'number' ? liveStats.boostsPurchased : defaults.boostsPurchased,
    nextBoostCurrentSol: typeof liveStats?.nextBoostCurrentSol === 'number' ? liveStats.nextBoostCurrentSol : defaults.nextBoostCurrentSol,
    nextBoostTargetSol: typeof liveStats?.nextBoostTargetSol === 'number' ? liveStats.nextBoostTargetSol : defaults.nextBoostTargetSol,
  };

  const target = data.nextBoostTargetSol > 0 ? data.nextBoostTargetSol : 1;
  const progressRaw = data.nextBoostCurrentSol / target;
  const progressClamped = Math.max(0, Math.min(1, progressRaw));

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
            <div className="live-stat-value live-stat-value--accent">{data.totalFeesConvertedSol.toFixed(1)} SOL</div>
            <div className="live-stat-sub">+{data.feesDelta24hSol.toFixed(1)} in last 24h</div>
          </motion.div>

          <motion.div
            className="live-stat-card glass-card"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.12 }}
          >
            <div className="live-stat-label">Boosts Purchased</div>
            <div className="live-stat-value live-stat-value--accent">{data.boostsPurchased}x boosts</div>
          </motion.div>

          <motion.div
            className="live-stat-card glass-card"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.19 }}
          >
            <div className="live-stat-label">Next Boost Progress</div>
            <div className="live-stat-value live-stat-value--accent">{Math.round(progressClamped * 100)}%</div>
            <div className="live-progress">
              <div className="live-progress-bar" style={{ width: `${progressClamped * 100}%` }} />
            </div>
            <div className="live-stat-sub">{data.nextBoostTargetSol.toFixed(1)} SOL target</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
