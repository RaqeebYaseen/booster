'use client';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export interface StatsData {
  marketCap: string;
  holders: string;
  price: string;
  volume24h: string;
  totalSupply: string;
  liquidity: string;
}

export default function StatsSection({ stats }: { stats?: Partial<StatsData> }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const defaultStats: StatsData = {
    marketCap: '$2.4M',
    holders: '8,420',
    price: '$0.0024',
    volume24h: '$580K',
    totalSupply: '1B',
    liquidity: '$420K',
  };

  const displayStats: StatsData = {
    ...defaultStats,
    ...(stats || {}),
  };

  const statItems = [
    { label: 'Market Cap', value: displayStats.marketCap },
    { label: 'Holders', value: displayStats.holders },
    { label: 'Price', value: displayStats.price },
    { label: '24h Volume', value: displayStats.volume24h },
    { label: 'Total Supply', value: displayStats.totalSupply },
    { label: 'Liquidity', value: displayStats.liquidity },
  ];

  return (
    <section id="stats" className="stats-section" ref={ref}>
      <div className="container" style={{ textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="section-badge">LIVE STATS</span>
          <h2 className="section-title chrome-text" style={{ margin: '0 auto' }}>
            The Numbers Speak
          </h2>
          <p className="section-subtitle" style={{ margin: '20px auto 0' }}>
            Real-time metrics from the Solana blockchain. Watch the surge happen live.
          </p>
        </motion.div>

        <div className="stats-grid">
          {statItems.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 * index, ease: [0.16, 1, 0.3, 1] }}
              className="stat-card glass-card"
            >
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
