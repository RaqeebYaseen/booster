'use client';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Icons } from '@/components/Icons';

export default function HowToBuySection({ contractAddress = 'TBA' }: { contractAddress?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(contractAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const steps = [
    {
      number: '01',
      title: 'Get Phantom',
      description: "Download the Phantom wallet for your browser or mobile device. It's your gateway to Solana.",
      link: 'https://phantom.app/',
      linkText: 'Download Phantom',
    },
    {
      number: '02',
      title: 'Load SOL',
      description: 'Purchase Solana (SOL) from any exchange and transfer it to your Phantom wallet.',
      link: null,
      linkText: null,
    },
    {
      number: '03',
      title: 'Swap for $BOOST',
      description: 'Visit pump.fun, paste our contract address, and swap your SOL for $BOOST tokens.',
      link: 'https://pump.fun',
      linkText: 'Go to pump.fun',
    },
  ];

  return (
    <section id="howtobuy" className="howtobuy-section" ref={ref}>
      <div className="container" style={{ textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="section-badge">GET STARTED</span>
          <h2 className="section-title chrome-text" style={{ margin: '0 auto' }}>
            How to Buy $BOOST
          </h2>
          <p className="section-subtitle" style={{ margin: '20px auto 0' }}>
            Three simple steps to join the most energized community on Solana.
          </p>
        </motion.div>

        <div className="howtobuy-grid">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 * index, ease: [0.16, 1, 0.3, 1] }}
              className="howtobuy-card glass-card"
            >
              <div className="howtobuy-step-number">{step.number}</div>
              <h3 className="howtobuy-card-title">{step.title}</h3>
              <p className="howtobuy-card-desc">{step.description}</p>
              {step.link && (
                <a 
                  href={step.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-outline"
                  style={{ marginTop: '20px' }}
                >
                  {step.linkText}
                </a>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="ca-box"
        >
          <div className="ca-label">Contract Address</div>
          <div className="ca-address" onClick={copyToClipboard}>
            <span>{contractAddress}</span>
            <span className="ca-copy-icon">{copied ? <Icons.Check /> : <Icons.Copy />}</span>
          </div>
          {copied && <p style={{ marginTop: '12px', color: 'var(--accent)', fontSize: '0.85rem' }}>Copied to clipboard!</p>}
        </motion.div>
      </div>
    </section>
  );
}
