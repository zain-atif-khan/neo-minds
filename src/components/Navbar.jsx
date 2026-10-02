import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

export { BrandLogo };

const PRIMARY_NAV_ITEMS = [
  { id: 'home', label: 'HOME', targetId: 'home' },
  { id: 'campus', label: 'CAMPUS', targetId: 'campus' },
  { id: 'internships', label: 'INTERNSHIPS', targetId: 'internships' },
  { id: 'projects', label: 'PROJECTS', targetId: 'projects' },
  { id: 'about', label: 'ABOUT', targetId: 'about' },
];

export default function Navbar({ currentRoute, navigateTo, openJoinModal, isVisible = true }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [activeNavId, setActiveNavId] = useState('home');

  const navRef = useRef(null);
  const itemRefs = useRef({});
  const [pillStyle, setPillStyle] = useState({ left: 0, top: 0, width: 0, height: 0, opacity: 0 });

  // Smooth scroll to an in-page section with sticky header offset
  const scrollToSection = (targetId) => {
    setMobileMenuOpen(false);
    if (!targetId || targetId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveNavId('home');
      return;
    }

    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      const navOffset = 75;
      const targetPos = targetEl.getBoundingClientRect().top + window.pageYOffset - navOffset;
      window.scrollTo({ top: targetPos, behavior: 'smooth' });
      setActiveNavId(targetId);
    }
  };

  // Monitor screen width (<= 920px triggers mobile/tablet layout)
  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth <= 920);
    };
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  // Monitor prefers-reduced-motion
  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    motionQuery.addEventListener('change', handler);
    return () => motionQuery.removeEventListener('change', handler);
  }, []);

  // High-performance scroll-driven continuous scrub interpolation & active section detection
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          // Progress 0 -> 1 smoothly mapped across 0px to 90px
          const progress = Math.min(Math.max(scrollY / 90, 0), 1);
          setScrollProgress(progress);

          // Detect active section based on scroll offset
          const sectionIds = ['about', 'internships', 'projects', 'campus'];
          let currentFound = 'home';
          
          if (scrollY < 300) {
            currentFound = 'home';
          } else {
            for (const id of sectionIds) {
              const el = document.getElementById(id);
              if (el) {
                const rect = el.getBoundingClientRect();
                // If section top has passed upper viewport threshold
                if (rect.top <= 200) {
                  currentFound = id;
                  break;
                }
              }
            }
          }
          setActiveNavId(currentFound);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Evaluate top state immediately

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Position the sliding active pill highlight
  const updatePill = () => {
    const activeEl = itemRefs.current[activeNavId];
    if (activeEl) {
      setPillStyle({
        left: activeEl.offsetLeft,
        top: activeEl.offsetTop,
        width: activeEl.offsetWidth,
        height: activeEl.offsetHeight,
        opacity: 1,
      });
    }
  };

  useEffect(() => {
    updatePill();
    const timer = setTimeout(updatePill, 60);
    window.addEventListener('resize', updatePill);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updatePill);
    };
  }, [activeNavId, isMobile]);

  // Helper for linear interpolation
  const lerp = (start, end, t) => start + (end - start) * t;

  // Smoothstep function for the subtle golden border so it fades in continuously without pop-in
  const smoothStep = (t) => t * t * (3 - 2 * t);

  // Active progress value
  const p = prefersReducedMotion ? (scrollProgress > 0.5 ? 1 : 0) : scrollProgress;

  // ============================================================
  // 1. DIMENSIONS CONTINUOUS MORPH (0% -> 100%)
  // ============================================================
  // Top: height 90px, width 100%, top 0px, radius 0px
  // Scrolled: height 60px (58-64px), width 84% (approx 82-86vw, max 1320px), top 16px (14-18px), radius 31px (30-32px)
  const navHeight = isMobile ? lerp(72, 56, p) : lerp(90, 60, p);
  const navTop = isMobile ? lerp(0, 10, p) : lerp(0, 16, p);
  const navWidth = isMobile 
    ? (p === 0 ? '100%' : 'calc(100% - 20px)') 
    : (p === 0 ? '100%' : `${lerp(100, 84, p)}%`);
  const navMaxWidth = isMobile ? '100%' : (p === 0 ? '100%' : `${lerp(2200, 1320, p)}px`);
  const navRadius = isMobile ? lerp(0, 24, p) : lerp(0, 31, p);

  // ============================================================
  // 2. TRUE GLASSMORPHIC BACKGROUND
  // ============================================================
  // Top: #FFFFFF (solid white)
  // Scrolled: rgba(248, 251, 255, 0.65)
  const r = Math.round(lerp(255, 248, p));
  const g = Math.round(lerp(255, 251, p));
  const bgAlpha = lerp(1, 0.65, p).toFixed(3);
  const backgroundColor = p === 0 ? '#FFFFFF' : `rgba(${r}, ${g}, 255, ${bgAlpha})`;

  // Backdrop filter: blur(22px) saturate(145%)
  const blurVal = lerp(0, 22, p).toFixed(1);
  const satVal = Math.round(lerp(100, 145, p));
  const backdropFilter = blurVal > 0.2 ? `blur(${blurVal}px) saturate(${satVal}%)` : 'none';

  // ============================================================
  // 3 & 4. SUBTLE REFINED GOLD BORDER (FADES IN CONTINUOUSLY)
  // ============================================================
  // Gold: rgba(197, 160, 89, 0.70)
  // At top: border opacity = 0
  // During morph: opacity smoothly increases via smoothStep
  const goldAlpha = (0.70 * smoothStep(p)).toFixed(3);
  const border = `1px solid rgba(197, 160, 89, ${goldAlpha})`;

  // Box shadow: 0 12px 35px rgba(11, 23, 54, 0.08)
  const shadowAlpha = (lerp(0, 0.08, p)).toFixed(3);
  const boxShadow = p > 0.01 ? `0 12px 35px rgba(11, 23, 54, ${shadowAlpha})` : 'none';

  // Side padding: 0 6vw -> 0 28px
  const paddingVal = isMobile 
    ? (p === 0 ? '0 18px' : '0 16px') 
    : (p === 0 ? '0 6vw' : `0 ${lerp(48, 28, p)}px`);

  // ============================================================
  // 7. STABLE LOGO SCALING (GPU transform-based)
  // ============================================================
  // Initial: ~160px width, Scrolled: ~133px width (scale = 0.835)
  const logoScale = isMobile ? lerp(1, 0.88, p) : lerp(1, 0.835, p);

  // ============================================================
  // 8. JOIN NOW CTA BUTTON DIMENSIONS
  // ============================================================
  // Initial: height 46px, width 138px
  // Scrolled: height 42px, width 128px, radius 21px
  const btnHeight = lerp(46, 42, p);
  const btnWidth = lerp(138, 128, p);
  const btnRadius = lerp(23, 21, p);
  const btnFontSize = `${lerp(0.92, 0.88, p)}rem`;

  const containerStyle = {
    position: 'fixed',
    top: `${navTop}px`,
    left: '50%',
    transform: isVisible ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(-20px)',
    opacity: isVisible ? 1 : 0,
    pointerEvents: isVisible ? 'auto' : 'none',
    width: navWidth,
    maxWidth: navMaxWidth,
    height: `${navHeight}px`,
    borderRadius: `${navRadius}px`,
    backgroundColor: backgroundColor,
    backdropFilter: backdropFilter,
    WebkitBackdropFilter: backdropFilter,
    border: border,
    boxShadow: boxShadow,
    padding: paddingVal,
    zIndex: 1000,
    display: 'grid',
    // 3-Zone fixed internal grid: navigation is locked to exact center without drift
    gridTemplateColumns: isMobile ? 'auto 1fr auto' : 'minmax(150px, 1fr) auto minmax(120px, 1fr)',
    alignItems: 'center',
    transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
    willChange: 'width, height, top, border-radius, background-color, backdrop-filter, box-shadow, border-color, opacity, transform',
    boxSizing: 'border-box',
  };

  return (
    <>
      {/* 13. NO LAYOUT SHIFT: Top spacer reserves exact initial height on interior pages so content isn't covered by fixed navbar */}
      {currentRoute !== 'home' && (
        <div style={{ height: isMobile ? '72px' : '90px', width: '100%', pointerEvents: 'none' }} />
      )}

      <header style={containerStyle} className="neominds-transforming-navbar" aria-label="Main Navigation">
        {/* ============================================================
            ZONE 1 (LEFT): Stable Brand Logo
            Scales smoothly via GPU transform without layout shift
            ============================================================ */}
        <div 
          style={{ 
            justifySelf: 'start', 
            display: 'flex', 
            alignItems: 'center', 
            flexShrink: 0, 
            overflow: 'visible',
            transform: `scale(${logoScale})`,
            transformOrigin: 'left center',
            willChange: 'transform'
          }}
        >
          <BrandLogo 
            width={160} 
            onClick={() => scrollToSection('home')} 
          />
        </div>

        {/* ============================================================
            ZONE 2 (CENTER): Desktop Primary Navigation
            Centered within internal grid; constant 30px gap prevents collapse
            ============================================================ */}
        {!isMobile ? (
          <nav 
            ref={navRef}
            className="desktop-nav-menu"
            style={{ 
              justifySelf: 'center',
              display: 'flex',
              alignItems: 'center',
              gap: '30px',
              position: 'relative',
              padding: '2px 0',
            }}
          >
            {/* 9. ACTIVE PAGE PILL: Soft blue glass highlight moves between items */}
            <span 
              className="nav-active-glass-pill"
              style={{
                position: 'absolute',
                left: `${pillStyle.left}px`,
                top: `${pillStyle.top}px`,
                width: `${pillStyle.width}px`,
                height: `${pillStyle.height}px`,
                opacity: pillStyle.opacity,
                background: 'rgba(22, 119, 255, 0.09)',
                border: '1px solid rgba(22, 119, 255, 0.10)',
                borderRadius: '11px',
                pointerEvents: 'none',
                transition: prefersReducedMotion 
                  ? 'none' 
                  : 'left 250ms cubic-bezier(0.25, 1, 0.5, 1), width 250ms cubic-bezier(0.25, 1, 0.5, 1), height 250ms cubic-bezier(0.25, 1, 0.5, 1), top 250ms cubic-bezier(0.25, 1, 0.5, 1), opacity 150ms ease',
                zIndex: 1,
              }}
            />

            {PRIMARY_NAV_ITEMS.map((item) => {
              const isActive = activeNavId === item.id;
              return (
                <button
                  key={item.id}
                  ref={(el) => (itemRefs.current[item.id] = el)}
                  className={`navbar-link-item ${isActive ? 'active' : ''}`}
                  onClick={() => scrollToSection(item.targetId)}
                  style={{
                    position: 'relative',
                    zIndex: 2,
                    padding: '8px 14px',
                    border: 'none',
                    background: 'transparent',
                    borderRadius: '11px',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.85rem',
                    fontWeight: isActive ? 600 : 500,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    color: isActive ? '#1677FF' : '#0B1736',
                    cursor: 'pointer',
                    transition: 'color 180ms ease, background-color 180ms ease',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        ) : <div />}

        {/* ============================================================
            ZONE 3 (RIGHT): Join Now CTA Button & Mobile Trigger
            Anchored to right side; smooth sizing without jumping
            ============================================================ */}
        <div 
          style={{ 
            justifySelf: 'end', 
            display: 'flex', 
            alignItems: 'center', 
            gap: isMobile ? '0.6rem' : '0.85rem', 
            flexShrink: 0 
          }}
        >
          <button 
            className="navbar-join-btn"
            onClick={openJoinModal}
            style={{
              background: '#1677FF',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: `${btnRadius}px`,
              height: `${btnHeight}px`,
              width: `${btnWidth}px`,
              padding: '0',
              fontSize: btnFontSize,
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              boxShadow: '0 4px 14px rgba(22, 119, 255, 0.24)',
              transition: 'transform 0.18s ease, background 0.18s ease, box-shadow 0.18s ease',
              flexShrink: 0,
            }}
          >
            Join Now <ArrowRight size={14} />
          </button>

          {/* Responsive Mobile Menu Button */}
          {isMobile && (
            <button 
              className="btn-circle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              style={{ width: '38px', height: '38px', background: 'transparent', border: '1px solid var(--border-light)' }}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          )}
        </div>
      </header>

      {/* Mobile Glass Floating Drawer */}
      {mobileMenuOpen && (
        <div 
          className="mobile-nav-drawer"
          style={{
            position: 'fixed',
            top: `${navTop + navHeight + 8}px`,
            left: '14px',
            right: '14px',
            background: 'rgba(248, 251, 255, 0.94)',
            backdropFilter: 'blur(24px) saturate(150%)',
            WebkitBackdropFilter: 'blur(24px) saturate(150%)',
            border: '1px solid rgba(197, 160, 89, 0.40)',
            borderRadius: '24px',
            boxShadow: '0 20px 50px rgba(11, 23, 54, 0.15)',
            padding: '1.25rem',
            zIndex: 999,
            display: 'flex',
            flexDirection: 'column',
            gap: '0.6rem',
            animation: 'fadeIn 0.2s ease-out'
          }}
        >
          {PRIMARY_NAV_ITEMS.map((item) => {
            const isActive = activeNavId === item.id;
            return (
              <button 
                key={item.id}
                className="mobile-nav-link" 
                onClick={() => scrollToSection(item.targetId)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem 1rem',
                  borderRadius: '11px',
                  background: isActive ? 'rgba(22, 119, 255, 0.09)' : 'transparent',
                  border: isActive ? '1px solid rgba(22, 119, 255, 0.10)' : '1px solid transparent',
                  color: isActive ? '#1677FF' : '#0B1736',
                  fontWeight: isActive ? 600 : 500,
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  textTransform: 'uppercase',
                  letterSpacing: '0.03em',
                  transition: 'background 0.15s ease'
                }}
              >
                <span>{item.label}</span>
                {isActive && <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#1677FF' }} />}
              </button>
            );
          })}

          <div style={{ marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid rgba(22, 119, 255, 0.12)' }}>
            <button 
              className="btn btn-primary" 
              style={{ width: '100%', height: '44px', borderRadius: '22px', fontSize: '0.92rem' }} 
              onClick={() => { setMobileMenuOpen(false); openJoinModal(); }}
            >
              Join Now <ArrowRight size={14} style={{ marginLeft: '4px' }} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
