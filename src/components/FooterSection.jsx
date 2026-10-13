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
      {/* ── DESKTOP FOOTER (UNTOUCHED, PRESERVED EXACT ORIGINAL STRUCTURE) ── */}
      <div className="neo-footer-desktop neo-footer-stage">
        {/* Background Artwork Layer */}
        <div className="neo-footer-artwork-layer" aria-hidden="true">
          <img
            src="/images/footer_neo_minds_artwork.png"
            alt=""
            className="neo-footer-bg-img"
            loading="lazy"
            draggable="false"
          />
        </div>

        {/* HTML Interactive Overlay */}
        <div className="neo-footer-overlay-content">
          <div className="neo-footer-top-row">
            <div className="neo-footer-header-group">
              <div 
                className="neo-footer-bracket-nav" 
                ref={navContainerRef}
                onMouseLeave={handleMouseLeave}
              >
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

              <div className="neo-footer-pillars-stack">
                <span className="pillar-word">LEARN</span>
                <span className="pillar-word">BUILD</span>
                <span className="pillar-word">INTERN</span>
                <span className="pillar-word">GROW</span>
              </div>
            </div>
          </div>

          <div className="neo-footer-bottom-row">
            <div className="neo-footer-copyright">
              © 2026 Neo Minds Tech Hub. All rights reserved.
            </div>

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

            <div className="neo-footer-socials">
              {/* WhatsApp */}
              <a
                href="https://wa.me/919515654804"
                target="_blank"
                rel="noreferrer"
                className="neo-social-icon"
                aria-label="WhatsApp (+91 95156 54804)"
                title="Chat on WhatsApp (+91 95156 54804)"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/neomindstechhub"
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

              {/* Facebook */}
              <a
                href="https://www.facebook.com/people/Neominds-Tech-Hub/61584792628834/?mibextid=wwXIfr&rdid=StOw7BygvxqENqkW&share_url=https%253A%252F%252Fwww.facebook.com%252Fshare%252F1ZwEum2jis%252F%253Fmibextid%253DwwXIfr"
                target="_blank"
                rel="noreferrer"
                className="neo-social-icon"
                aria-label="Facebook"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/company/neomindstechhub/"
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
                href="https://x.com/neomindstechhub?s=21&t=HaLOiLRi2Pa_gMxFsf6nhQ"
                target="_blank"
                rel="noreferrer"
                className="neo-social-icon"
                aria-label="X (formerly Twitter)"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/neomindstechhub/"
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

      {/* ── MOBILE-ONLY FOOTER (EXACT MATCH TO NEO MINDS REFERENCE DESIGN) ── */}
      <div className="neo-footer-mobile">
        {/* 1. Navigation at the top: Two centered rows */}
        <div className="neo-mobile-nav-block">
          {/* Row 1: Home · Programs · Campus */}
          <nav className="neo-mobile-nav-row" aria-label="Mobile Navigation Row 1">
            {NAV_ITEMS.slice(0, 3).map((item) => (
              <a
                key={item.targetId}
                href={item.href}
                className="neo-mobile-nav-link"
                onClick={(e) => { e.preventDefault(); handleNav(item.targetId); }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Row 2: Projects · Internships · About */}
          <nav className="neo-mobile-nav-row" aria-label="Mobile Navigation Row 2">
            {NAV_ITEMS.slice(3, 6).map((item) => (
              <a
                key={item.targetId}
                href={item.href}
                className="neo-mobile-nav-link"
                onClick={(e) => { e.preventDefault(); handleNav(item.targetId); }}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        {/* 2. Blue tagline: LEARN BUILD INTERN GROW */}
        <div className="neo-mobile-tagline">
          <span className="neo-mobile-tagline-word">LEARN</span>
          <span className="neo-mobile-tagline-word">BUILD</span>
          <span className="neo-mobile-tagline-word">INTERN</span>
          <span className="neo-mobile-tagline-word">GROW</span>
        </div>

        {/* 3. Large empty space: Substantial black negative space */}
        <div className="neo-mobile-spacer" aria-hidden="true" />

        {/* 4. Large Neo Minds white wordmark */}
        <div className="neo-mobile-wordmark-wrap">
          <img
            src="/images/footer_neo_minds_artwork.png"
            alt="NEO MINDS"
            className="neo-mobile-wordmark-img"
            loading="lazy"
            draggable="false"
          />
        </div>

        {/* 5. Social icons below wordmark in exact order: WhatsApp, Instagram, Facebook, LinkedIn, X, GitHub */}
        <div className="neo-mobile-socials-row">
          {/* WhatsApp */}
          <a
            href="https://wa.me/919515654804"
            target="_blank"
            rel="noreferrer"
            className="neo-mobile-social-icon"
            aria-label="WhatsApp"
            title="WhatsApp"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/neomindstechhub"
            target="_blank"
            rel="noreferrer"
            className="neo-mobile-social-icon"
            aria-label="Instagram"
            title="Instagram"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
          </a>

          {/* Facebook */}
          <a
            href="https://www.facebook.com/people/Neominds-Tech-Hub/61584792628834/?mibextid=wwXIfr&rdid=StOw7BygvxqENqkW&share_url=https%253A%252F%252Fwww.facebook.com%252Fshare%252F1ZwEum2jis%252F%253Fmibextid%253DwwXIfr"
            target="_blank"
            rel="noreferrer"
            className="neo-mobile-social-icon"
            aria-label="Facebook"
            title="Facebook"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/company/neomindstechhub/"
            target="_blank"
            rel="noreferrer"
            className="neo-mobile-social-icon"
            aria-label="LinkedIn"
            title="LinkedIn"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect width="4" height="12" x="2" y="9" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>

          {/* X / Twitter */}
          <a
            href="https://x.com/neomindstechhub?s=21&t=HaLOiLRi2Pa_gMxFsf6nhQ"
            target="_blank"
            rel="noreferrer"
            className="neo-mobile-social-icon"
            aria-label="X (formerly Twitter)"
            title="X"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/neomindstechhub/"
            target="_blank"
            rel="noreferrer"
            className="neo-mobile-social-icon"
            aria-label="GitHub"
            title="GitHub"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
          </a>
        </div>

        {/* 6. Bottom utility row: Copyright (extreme left) & Legal links (extreme right) */}
        <div className="neo-mobile-bottom-row">
          <div className="neo-mobile-copyright">
            © 2026 Neo Minds Tech Hub. All rights reserved.
          </div>

          <div className="neo-mobile-legal-links">
            <a
              href="#/about"
              className="neo-mobile-legal-link"
              onClick={(e) => { e.preventDefault(); handleNav('about'); }}
            >
              Privacy
            </a>
            <a
              href="#/about"
              className="neo-mobile-legal-link"
              onClick={(e) => { e.preventDefault(); handleNav('about'); }}
            >
              Terms
            </a>
            <a
              href="#/internships"
              className="neo-mobile-legal-link"
              onClick={(e) => { e.preventDefault(); handleNav('internships'); }}
            >
              Careers
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
