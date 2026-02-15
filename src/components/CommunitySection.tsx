'use client';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface SocialLinks {
  twitter?: string;
  telegram?: string;
  discord?: string;
}

export default function CommunitySection({ socials }: { socials?: SocialLinks }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const defaultSocials: SocialLinks = {
    twitter: 'https://twitter.com',
    telegram: 'https://t.me',
    discord: 'https://discord.com',
  };

  const links = socials || defaultSocials;

  return (
    <section id="community" className="community-section" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="section-badge">JOIN US</span>
          <h2 className="section-title chrome-text" style={{ margin: '0 auto' }}>
            Be Part of the Surge
          </h2>
          <p className="section-subtitle" style={{ margin: '20px auto 0' }}>
            Connect with fellow BOOST enthusiasts. Share strategies, memes, and watch the charts go vertical together.
          </p>

          <div className="community-links">
            {links.twitter && (
              <motion.a
                href={links.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="community-link"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <span>🐦</span>
                <span>Twitter</span>
              </motion.a>
            )}
            {links.telegram && (
              <motion.a
                href={links.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="community-link"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <span>✈️</span>
                <span>Telegram</span>
              </motion.a>
            )}
            {links.discord && (
              <motion.a
                href={links.discord}
                target="_blank"
                rel="noopener noreferrer"
                className="community-link"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <span>💬</span>
                <span>Discord</span>
              </motion.a>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{ marginTop: '60px' }}
          >
            <a href="https://pump.fun" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize: '1rem', padding: '22px 50px' }}>
              🚀 Buy $BOOST Now
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
