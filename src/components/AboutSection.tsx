'use client';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="about-section" ref={ref}>
      <div className="container">
        <div className="about-grid">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="about-image-wrapper"
          >
            <div className="about-image-glow"></div>
            <Image 
              src="/icon_no_bg.png" 
              alt="Boost Mascot" 
              width={350} 
              height={350}
              style={{ objectFit: 'contain' }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="section-badge">ABOUT</span>
            <h2 className="section-title chrome-text">
              The Energy Revolution on Solana
            </h2>
            <p className="section-subtitle">
              $BOOST isn't just another memecoin — it's a movement. Born from the idea that crypto 
              should be as electrifying as cracking open an ice-cold energy drink. We're bringing 
              bold flavors, fierce community spirit, and unstoppable momentum to the Solana ecosystem.
            </p>
            <p className="section-subtitle" style={{ marginTop: '20px' }}>
              Each can represents a unique vibe in our collection. Collect them all, stake your claim, 
              and watch your portfolio surge as we build the most energized community in DeFi.
            </p>

            <div className="about-features">
              <div className="about-feature">
                <span className="about-feature-icon">⚡</span>
                <span>Lightning Fast</span>
              </div>
              <div className="about-feature">
                <span className="about-feature-icon">🔒</span>
                <span>LP Locked</span>
              </div>
              <div className="about-feature">
                <span className="about-feature-icon">🚫</span>
                <span>0% Tax</span>
              </div>
              <div className="about-feature">
                <span className="about-feature-icon">🌐</span>
                <span>Community Owned</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
