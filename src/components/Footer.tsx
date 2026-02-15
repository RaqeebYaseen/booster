import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <div className="footer-brand">
            <Image src="/icon_no_bg.png" alt="Boost" width={32} height={32} />
            <span className="chrome-text">BOOST</span>
          </div>

          <p className="footer-disclaimer">
            $BOOST is a memecoin with no intrinsic value or expectation of financial return. 
            This is purely for entertainment purposes. Do your own research and never invest more than you can afford to lose.
          </p>

          <div className="footer-copyright">
            © 2025 BOOST. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
