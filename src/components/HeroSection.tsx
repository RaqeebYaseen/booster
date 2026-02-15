'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

const cans = [
  { src: '/cans/black.png', alt: 'Black Boost Can' },
  { src: '/cans/blue.png', alt: 'Blue Boost Can' },
  { src: '/cans/lime.png', alt: 'Lime Boost Can' },
  { src: '/cans/red.png', alt: 'Red Boost Can' },
  { src: '/cans/white.png', alt: 'White Boost Can' },
  { src: '/cans/yellow.png', alt: 'Yellow Boost Can' },
];

export default function HeroSection() {
  const duplicatedCans = [...cans, ...cans, ...cans];

  return (
    <section className="hero">
      <div className="hero-bg-glow glow-1"></div>
      <div className="hero-bg-glow glow-2"></div>
      <div className="hero-bg-glow glow-3"></div>

      <div className="hero-content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="hero-eyebrow">POWERED BY SOLANA</div>
          <h1 className="hero-title chrome-text">
            FUEL THE<br />PUMP
          </h1>
          <p className="hero-desc">
            The most electrifying energy drink token on Solana. 
            Grab a can, boost your portfolio, and ride the surge to the moon.
          </p>
        </motion.div>
      </div>

      <motion.div
        className="can-carousel-wrapper"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="can-carousel-track">
          {duplicatedCans.map((can, index) => (
            <div key={index} className="can-item">
              <Image 
                src={can.src} 
                alt={can.alt} 
                width={180} 
                height={300}
                priority={index < 6}
              />
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="hero-buttons"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <a href="https://pump.fun" target="_blank" rel="noopener noreferrer" className="btn-primary">
          🚀 Buy Now
        </a>
        <a href="#howtobuy" className="btn-outline">
          Learn How
        </a>
      </motion.div>

      <div className="marquee-bar" style={{ marginTop: '60px' }}>
        <div className="marquee-track">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="marquee-item">
              <span>BOOST YOUR GAINS</span>
              <span className="dot"></span>
              <span>100% COMMUNITY DRIVEN</span>
              <span className="dot"></span>
              <span>LIQUIDITY LOCKED</span>
              <span className="dot"></span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
