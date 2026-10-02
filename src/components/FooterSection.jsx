import React, { useState, useRef } from 'react';

const NAV_ITEMS = [
  { label: 'Home', targetId: 'home', href: '#home' },
  { label: 'Programs', targetId: 'programs', href: '#programs' },
  { label: 'Campus', targetId: 'campus', href: '#campus' },
  { label: 'Projects', targetId: 'projects', href: '#projects' },
  { label: 'Internships', targetId: 'internships', href: '#internships' },
  { label: 'About', targetId: 'about', href: '#about' },
];

export default function FooterSection({ navigateTo }) {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [bracketStyle, setBracketStyle] = useState({ top: 0, height: 0, opacity: 0 });
  const navContainerRef = useRef(null);

  const handleNav = (targetId) => {
    if (!targetId || targetId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(targetId);
    if (el) {
      const navOffset = 75;
      const targetPos = el.getBoundingClientRect().top + window.pageYOffset - navOffset;
      window.scrollTo({ top: targetPos, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleMouseEnter = (idx, e) => {
    setHoveredIdx(idx);
    const target = e.currentTarget;
    if (navContainerRef.current) {
      const containerRect = navContainerRef.current.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      setBracketStyle({
        left: targetRect.left - containerRect.left,
        width: targetRect.width,
        top: targetRect.top - containerRect.top + (targetRect.height / 2),
        opacity: 1,
      });
    }
  };

  const handleMouseLeave = () => {
    setHoveredIdx(null);
    setBracketStyle((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <footer className="curtain-footer neo-footer-section" id="footer">
      <div className="neo-footer-stage">
        {/* 
          EXACT VISUAL SOURCE OF TRUTH:
          Untouched, uncropped, preserved at exact aspect ratio.
          Background Artwork Layer (Does not intercept clicks)
        */}
        <div className="neo-footer-artwork-layer" aria-hidden="true">
          <img
            src="/images/footer_neo_minds_artwork.png"
            alt=""
            className="neo-footer-bg-img"
            loading="lazy"
            draggable="false"
          />
        </div>

        {/* 
          HTML INTERACTIVE OVERLAY:
          Real, responsive, semantic, accessible links positioned exactly over the artwork.
        */}
        <div className="neo-footer-overlay-content">
          {/* UPPER STAGE: NAVIGATION (CENTER) + PILLARS BELOW IT (ONE LINE) */}
          <div className="neo-footer-top-row">
            <div className="neo-footer-header-group">
              {/* Center: Editorial Tracking Hover Bracket Navigation */}
              <div 
                className="neo-footer-bracket-nav" 
                ref={navContainerRef}
                onMouseLeave={handleMouseLeave}
              >
                {/* Left animated bracket */}
                <span 
                  className="bracket-char bracket-follow bracket-left" 
                  style={{
                    transform: `translate(${bracketStyle.left - 10}px, -50%)`,
                    top: `${bracketStyle.top}px`,
                    opacity: bracketStyle.opacity,
                  }}
                  aria-hidden="true"
                >
                  [
                </span>

                {/* Horizontal Navigation links */}
                <nav className="neo-footer-nav-list" aria-label="Footer navigation">
                  {NAV_ITEMS.map((item, idx) => (
                    <a
                      key={item.targetId}
                      href={item.href}
                      className={`neo-footer-link ${hoveredIdx === idx ? 'is-hovered' : ''}`}
                      onMouseEnter={(e) => handleMouseEnter(idx, e)}
                      onClick={(e) => { e.preventDefault(); handleNav(item.targetId); }}
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>

                {/* Right animated bracket */}
                <span 
                  className="bracket-char bracket-follow bracket-right" 
                  style={{
                    transform: `translate(${bracketStyle.left + bracketStyle.width + 4}px, -50%)`,
                    top: `${bracketStyle.top}px`,
                    opacity: bracketStyle.opacity,
                  }}
                  aria-hidden="true"
                >
                  ]
                </span>
              </div>

              {/* Single-Line Brand Pillars Stack (Below Navigation, In One Line, Dark Blue Text) */}
              <div className="neo-footer-pillars-stack">
                <span className="pillar-word">LEARN</span>
                <span className="pillar-word">BUILD</span>
                <span className="pillar-word">INTERN</span>
                <span className="pillar-word">GROW</span>
              </div>
            </div>
          </div>

              {/* BOTTOM UTILITY & SOCIAL ROW */}
              <div className="neo-footer-bottom-row">
                {/* Left: Copyright */}
                <div className="neo-footer-copyright">
                  © 2026 Neo Minds Tech Hub. All rights reserved.
                </div>

                {/* Center: Utility / Legal Links */}
                <div className="neo-footer-legal-links">
                  <a
                    href="#/about"
                    className="neo-footer-legal-link"
                    onClick={(e) => { e.preventDefault(); handleNav('about'); }}
                  >
                    Privacy
                  </a>
                  <a
                    href="#/about"
                    className="neo-footer-legal-link"
                    onClick={(e) => { e.preventDefault(); handleNav('about'); }}
                  >
                    Terms
                  </a>
                  <a
                    href="#/internships"
                    className="neo-footer-legal-link"
                    onClick={(e) => { e.preventDefault(); handleNav('internships'); }}
                  >
                    Careers
                  </a>
                </div>

                {/* Right: Social Icons */}
                <div className="neo-footer-socials">
                  {/* Instagram */}
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="neo-social-icon"
                    aria-label="Instagram"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                  </a>

                  {/* LinkedIn */}
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className="neo-social-icon"
                    aria-label="LinkedIn"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect width="4" height="12" x="2" y="9" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </a>

                  {/* X / Twitter */}
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noreferrer"
                    className="neo-social-icon"
                    aria-label="X"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>

                  {/* GitHub */}
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noreferrer"
                    className="neo-social-icon"
                    aria-label="GitHub"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                      <path d="M9 18c-4.51 2-5-2-7-2" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
  );
}
