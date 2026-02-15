'use client';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function RoadmapSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const phases = [
    {
      phase: 'Phase 1',
      title: 'Launch',
      items: ['Token Launch on pump.fun', 'Initial Marketing Push', 'Community Building', 'First 1000 Holders'],
    },
    {
      phase: 'Phase 2',
      title: 'Growth',
      items: ['CEX Listings', 'Influencer Partnerships', '10K Holders Milestone', 'Merchandise Store'],
    },
    {
      phase: 'Phase 3',
      title: 'Expansion',
      items: ['Strategic Partnerships', 'Staking Platform', 'NFT Collection Drop', 'Global Marketing Campaign'],
    },
    {
      phase: 'Phase 4',
      title: 'Moon',
      items: ['Major Exchange Listings', 'DAO Governance', 'Metaverse Integration', 'To Infinity & Beyond'],
    },
  ];

  return (
    <section id="roadmap" className="roadmap-section" ref={ref}>
      <div className="container" style={{ textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="section-badge">ROADMAP</span>
          <h2 className="section-title chrome-text" style={{ margin: '0 auto' }}>
            The Journey Ahead
          </h2>
          <p className="section-subtitle" style={{ margin: '20px auto 0' }}>
            Our path to dominating the Solana ecosystem. Buckle up, it's going to be electric.
          </p>
        </motion.div>

        <div className="roadmap-timeline">
          {phases.map((phase, index) => (
            <motion.div
              key={phase.phase}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 * index, ease: [0.16, 1, 0.3, 1] }}
              className="roadmap-card glass-card"
            >
              <div className="roadmap-phase-badge">{phase.phase}</div>
              <div className="roadmap-phase-dot"></div>
              <h3 className="roadmap-card-title">{phase.title}</h3>
              <ul className="roadmap-items">
                {phase.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
