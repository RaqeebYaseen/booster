'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-inner">
          <a href="#" className="navbar-logo">
            <Image src="/icon_no_bg.png" alt="Boost" width={40} height={40} />
            <span className="chrome-text">BOOST</span>
          </a>
          
          <ul className="navbar-links">
            <li><a onClick={() => scrollToSection('about')}>About</a></li>
            <li><a onClick={() => scrollToSection('stats')}>Stats</a></li>
            <li><a onClick={() => scrollToSection('roadmap')}>Roadmap</a></li>
            <li><a onClick={() => scrollToSection('howtobuy')}>How to Buy</a></li>
            <li><a onClick={() => scrollToSection('community')}>Community</a></li>
            <li><a href="https://pump.fun" target="_blank" rel="noopener noreferrer" className="navbar-cta">Buy $BOOST</a></li>
          </ul>

          <button className="hamburger" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <button className="mobile-close" onClick={() => setMobileMenuOpen(false)}>×</button>
        <a onClick={() => scrollToSection('about')}>About</a>
        <a onClick={() => scrollToSection('stats')}>Stats</a>
        <a onClick={() => scrollToSection('roadmap')}>Roadmap</a>
        <a onClick={() => scrollToSection('howtobuy')}>How to Buy</a>
        <a onClick={() => scrollToSection('community')}>Community</a>
        <a href="https://pump.fun" target="_blank" rel="noopener noreferrer" className="btn-primary">Buy $BOOST</a>
      </div>
    </>
  );
}
