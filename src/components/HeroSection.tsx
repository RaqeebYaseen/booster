'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Icons } from '@/components/Icons';
import type { CSSProperties } from 'react';

const cans = [
  { src: '/cans/white.png', alt: 'White Boost Can', name: 'Frosted Diamond', glow: 'rgba(232,232,232,0.35)' },
  { src: '/cans/red.png', alt: 'Red Boost Can', name: 'Crimson Overdrive', glow: 'rgba(196,43,43,0.35)' },
  { src: '/cans/blue.png', alt: 'Blue Boost Can', name: 'Midnight Cobalt', glow: 'rgba(30,58,95,0.35)' },
  { src: '/cans/lime.png', alt: 'Lime Boost Can', name: 'Neon Catalyst', glow: 'rgba(122,182,72,0.35)' },
  { src: '/cans/yellow.png', alt: 'Yellow Boost Can', name: 'Solar Alloy', glow: 'rgba(212,160,23,0.35)' },
  { src: '/cans/black.png', alt: 'Black Boost Can', name: 'Obsidian Surge', glow: 'rgba(192,192,192,0.22)' },
];

export default function HeroSection() {
  const duplicatedCans = [...cans, ...cans];
  const beltItems = [
    'FUEL THE PUMP',
    'BUY A CAN • BOOST THE PRICE',
    'COMMUNITY DRIVEN',
    '0% TAX',
    'LP LOCKED',
    'SOLANA SPEED',
    'HOLDERS = POWER',
    'ENERGY ON-CHAIN',
  ];

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
        </motion.div>

        <motion.div
          className="can-carousel-wrapper can-carousel-wrapper--hero"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="can-carousel-track">
            {duplicatedCans.map((can, index) => (
              <div key={index} className="can-item" style={{ ['--canGlow' as string]: can.glow } as CSSProperties}>
                <span className="can-name">{can.name}</span>
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

        <div className="marquee-bar marquee-bar--hero">
          <div className="marquee-track">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="marquee-item">
                {beltItems.map((t) => (
                  <span key={t} style={{ display: 'inline-flex', alignItems: 'center', gap: 16 }}>
                    <span>{t}</span>
                    <span className="dot"></span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <motion.p
          className="hero-desc hero-desc--lower"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          The most electrifying energy drink token on Solana.
          <br />
          Buy a can. Boost the chart. Repeat.
        </motion.p>
      </div>

      <motion.div
        className="hero-buttons"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <a href="https://pump.fun" target="_blank" rel="noopener noreferrer" className="btn-primary">
          <Icons.Rocket /> Buy Now
        </a>
        <a href="#howtobuy" className="btn-outline">
          Learn How
        </a>
      </motion.div>

      {/* marquee moved directly under cans inside hero-content */}
    </section>
  );
}
