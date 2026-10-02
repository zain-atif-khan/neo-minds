import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Building, GraduationCap, Award } from 'lucide-react';

export default function HeroScrollVisual() {
  const [progress, setProgress] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const containerRef = useRef(null);

  // Monitor prefers-reduced-motion
  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    motionQuery.addEventListener('change', handler);
    return () => motionQuery.removeEventListener('change', handler);
  }, []);

  // Scroll listener tracking scroll progress through the Hero section
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!containerRef.current) return;
          const heroEl = containerRef.current.closest('.hero-section') || containerRef.current;
          const rect = heroEl.getBoundingClientRect();
          const windowHeight = window.innerHeight;

          // Hero height to scrub through (approx 550px of scroll)
          const scrollDistance = 550;
          const scrollY = window.scrollY;
          
          // Progress from 0 to 1 as user scrolls through the hero
          const p = Math.min(Math.max(scrollY / scrollDistance, 0), 1);
          setProgress(p);

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Helper for linear interpolation
  const lerp = (a, b, t) => a + (b - a) * t;

  // Active progress value
  const p = prefersReducedMotion ? 0.5 : progress;

  // Which circle is currently focal?
  // 0% - 35%: Circle 1
  // 35% - 70%: Circle 2
  // 70% - 100%: Circle 3
  const activeFocalIndex = p < 0.35 ? 1 : p < 0.7 ? 2 : 3;

  // Multi-phase scroll transformations:
  //
  // Circle 1: Architectural Building (Starts dominant center, rotates up-left, scales down)
  const c1Scale = lerp(1.0, 0.72, p);
  const c1X = lerp(0, -90, p);
  const c1Y = lerp(0, -75, p);
  const c1ZIndex = p < 0.4 ? 10 : 3;
  const c1Opacity = lerp(1, 0.75, p);
  const c1Rotate = lerp(0, -25, p);

  // Circle 2: Anwar Ul Uloom Campus Quad (Starts bottom-right tucked, swings to center focal prominence at 50%)
  // Keyframe behavior using piecewise interpolation
  let c2Scale, c2X, c2Y, c2ZIndex, c2Opacity, c2Rotate;
  if (p < 0.5) {
    const localP = p / 0.5; // 0 to 1
    c2Scale = lerp(0.72, 1.05, localP);
    c2X = lerp(110, 0, localP);
    c2Y = lerp(90, 0, localP);
    c2ZIndex = localP > 0.6 ? 12 : 5;
    c2Opacity = lerp(0.8, 1, localP);
    c2Rotate = lerp(15, 0, localP);
  } else {
    const localP = (p - 0.5) / 0.5; // 0 to 1
    c2Scale = lerp(1.05, 0.78, localP);
    c2X = lerp(0, 95, localP);
    c2Y = lerp(0, 65, localP);
    c2ZIndex = localP > 0.4 ? 4 : 12;
    c2Opacity = lerp(1, 0.8, localP);
    c2Rotate = lerp(0, 20, localP);
  }

  // Circle 3: Student Tech Innovator (Starts bottom-left orbital, swings around to take focal depth at 75-100%)
  let c3Scale, c3X, c3Y, c3ZIndex, c3Opacity, c3Rotate;
  if (p < 0.5) {
    const localP = p / 0.5;
    c3Scale = lerp(0.6, 0.8, localP);
    c3X = lerp(-110, -70, localP);
    c3Y = lerp(80, 85, localP);
    c3ZIndex = 2;
    c3Opacity = lerp(0.65, 0.85, localP);
    c3Rotate = lerp(-20, -10, localP);
  } else {
    const localP = (p - 0.5) / 0.5;
    c3Scale = lerp(0.8, 1.04, localP);
    c3X = lerp(-70, 10, localP);
    c3Y = lerp(85, -15, localP);
    c3ZIndex = 14;
    c3Opacity = lerp(0.85, 1, localP);
    c3Rotate = lerp(-10, 0, localP);
  }

  // Orbit rotation parallax
  const orbit1Rotate = lerp(0, 120, p);
  const orbit2Rotate = lerp(0, -90, p);

  return (
    <div 
      className="hero-scroll-visual-container" 
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '540px',
        height: '520px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none',
        perspective: '1000px'
      }}
      aria-label="Interactive scroll-driven circular visual"
    >
      {/* Background Atmosphere & Atmospheric Gradient */}
      <div 
        style={{
          position: 'absolute',
          inset: '10%',
          background: 'radial-gradient(circle, rgba(220, 235, 255, 0.75) 0%, rgba(220, 235, 255, 0) 70%)',
          borderRadius: '50%',
          filter: 'blur(30px)',
          pointerEvents: 'none',
          transform: `scale(${lerp(1, 1.15, p)})`
        }} 
      />

      {/* Outer Orbit 1: Thin architectural circle with tick marks */}
      <div 
        style={{
          position: 'absolute',
          width: '490px',
          height: '490px',
          borderRadius: '50%',
          border: '1.5px solid rgba(22, 119, 255, 0.16)',
          transform: `rotate(${orbit1Rotate}deg)`,
          pointerEvents: 'none',
          transition: prefersReducedMotion ? 'none' : 'transform 0.1s linear'
        }}
      >
        <div style={{ position: 'absolute', top: '-4px', left: '50%', width: '8px', height: '8px', borderRadius: '50%', background: '#1677FF', transform: 'translateX(-50%)' }} />
        <div style={{ position: 'absolute', bottom: '-4px', left: '50%', width: '6px', height: '6px', borderRadius: '50%', background: '#60A5FA', transform: 'translateX(-50%)' }} />
      </div>

      {/* Outer Orbit 2: Dashed concentric guideline with counter-rotation */}
      <div 
        style={{
          position: 'absolute',
          width: '560px',
          height: '560px',
          borderRadius: '50%',
          border: '1px dashed rgba(22, 119, 255, 0.22)',
          transform: `rotate(${orbit2Rotate}deg)`,
          pointerEvents: 'none',
          transition: prefersReducedMotion ? 'none' : 'transform 0.1s linear'
        }}
      >
        <div style={{ position: 'absolute', left: '-5px', top: '50%', width: '10px', height: '10px', borderRadius: '50%', border: '2px solid #1677FF', background: '#FFFFFF', transform: 'translateY(-50%)' }} />
      </div>

      {/* ========================================================
          CIRCLE 01 — Modern Architectural Tech Skyscraper
          Initial focal (0%) -> orbits to top-left
          ======================================================== */}
      <div
        className="scroll-circle-mask c1"
        style={{
          position: 'absolute',
          width: '340px',
          height: '340px',
          borderRadius: '50%',
          overflow: 'hidden',
          border: '5px solid #FFFFFF',
          boxShadow: activeFocalIndex === 1 ? '0 24px 60px rgba(11, 23, 54, 0.16)' : '0 12px 30px rgba(11, 23, 54, 0.08)',
          transform: `translate(${c1X}px, ${c1Y}px) scale(${c1Scale}) rotate(${c1Rotate}deg)`,
          zIndex: c1ZIndex,
          opacity: c1Opacity,
          transition: prefersReducedMotion ? 'none' : 'box-shadow 0.3s ease',
          willChange: 'transform, opacity'
        }}
      >
        <img 
          src="/images/hero_building.jpg" 
          alt="Architectural Skyscraper Perspective" 
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: `scale(1.1) translate(${lerp(0, 15, p)}px, ${lerp(0, -10, p)}px)`
          }}
        />

        {/* Numeric Badge 01 */}
        <div style={{
          position: 'absolute',
          top: '16px',
          left: '16px',
          background: 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(8px)',
          borderRadius: '9999px',
          padding: '0.25rem 0.65rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          fontWeight: 800,
          color: activeFocalIndex === 1 ? 'var(--accent-blue)' : 'var(--text-muted)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          01
        </div>
      </div>

      {/* ========================================================
          CIRCLE 02 — University Campus & Innovation Quad
          Starts bottom-right tucked -> moves to center focal at 50%
          ======================================================== */}
      <div
        className="scroll-circle-mask c2"
        style={{
          position: 'absolute',
          width: '320px',
          height: '320px',
          borderRadius: '50%',
          overflow: 'hidden',
          border: '5px solid #FFFFFF',
          boxShadow: activeFocalIndex === 2 ? '0 28px 70px rgba(22, 119, 255, 0.22)' : '0 12px 30px rgba(11, 23, 54, 0.08)',
          transform: `translate(${c2X}px, ${c2Y}px) scale(${c2Scale}) rotate(${c2Rotate}deg)`,
          zIndex: c2ZIndex,
          opacity: c2Opacity,
          transition: prefersReducedMotion ? 'none' : 'box-shadow 0.3s ease',
          willChange: 'transform, opacity'
        }}
      >
        <img 
          src="/images/campus_anwar.jpg" 
          alt="Collegiate Tech Campus Quad" 
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: `scale(1.1) translate(${lerp(-10, 10, p)}px, ${lerp(10, -5, p)}px)`
          }}
        />

        {/* Numeric Badge 02 */}
        <div style={{
          position: 'absolute',
          top: '16px',
          right: '16px',
          background: 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(8px)',
          borderRadius: '9999px',
          padding: '0.25rem 0.65rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          fontWeight: 800,
          color: activeFocalIndex === 2 ? 'var(--accent-blue)' : 'var(--text-muted)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          02
        </div>
      </div>

      {/* ========================================================
          CIRCLE 03 — Real Student Innovator & Production Builder
          Starts bottom-left tucked -> moves into focal view at 75-100%
          ======================================================== */}
      <div
        className="scroll-circle-mask c3"
        style={{
          position: 'absolute',
          width: '260px',
          height: '260px',
          borderRadius: '50%',
          overflow: 'hidden',
          border: '5px solid #FFFFFF',
          boxShadow: activeFocalIndex === 3 ? '0 28px 70px rgba(22, 119, 255, 0.25)' : '0 10px 24px rgba(11, 23, 54, 0.06)',
          transform: `translate(${c3X}px, ${c3Y}px) scale(${c3Scale}) rotate(${c3Rotate}deg)`,
          zIndex: c3ZIndex,
          opacity: c3Opacity,
          transition: prefersReducedMotion ? 'none' : 'box-shadow 0.3s ease',
          willChange: 'transform, opacity'
        }}
      >
        <img 
          src="/images/student_aryan.jpg" 
          alt="Student Builder in Action" 
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: `scale(1.1) translate(${lerp(10, -5, p)}px, ${lerp(-10, 5, p)}px)`
          }}
        />

        {/* Numeric Badge 03 */}
        <div style={{
          position: 'absolute',
          bottom: '16px',
          left: '16px',
          background: 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(8px)',
          borderRadius: '9999px',
          padding: '0.25rem 0.65rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          fontWeight: 800,
          color: activeFocalIndex === 3 ? 'var(--accent-blue)' : 'var(--text-muted)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          03
        </div>
      </div>

      {/* Floating Stepper Vertical Indicator (Top-Right of Hero visual) */}
      <div 
        style={{
          position: 'absolute',
          top: '20px',
          right: '-10px',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.4rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.8rem',
          fontWeight: 700,
          zIndex: 20
        }}
      >
        <span style={{ color: activeFocalIndex === 1 ? '#1677FF' : '#94A3B8', fontWeight: activeFocalIndex === 1 ? 800 : 500, transition: 'all 0.2s' }}>
          01
        </span>
        <span style={{ color: activeFocalIndex === 2 ? '#1677FF' : '#94A3B8', fontWeight: activeFocalIndex === 2 ? 800 : 500, transition: 'all 0.2s' }}>
          02
        </span>
        <span style={{ color: activeFocalIndex === 3 ? '#1677FF' : '#94A3B8', fontWeight: activeFocalIndex === 3 ? 800 : 500, transition: 'all 0.2s' }}>
          03
        </span>
      </div>

      {/* Dynamic Floating Pill describing current focal phase */}
      <div 
        style={{
          position: 'absolute',
          bottom: '15px',
          left: '0px',
          background: 'rgba(255, 255, 255, 0.94)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(11, 23, 54, 0.10)',
          borderRadius: '16px',
          padding: '0.85rem 1.35rem',
          boxShadow: '0 16px 40px rgba(11, 23, 54, 0.10)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.85rem',
          zIndex: 25,
          transition: 'transform 0.2s ease'
        }}
      >
        <div style={{
          width: '38px',
          height: '38px',
          borderRadius: '50%',
          background: 'var(--bg-tertiary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--accent-blue)',
          flexShrink: 0
        }}>
          {activeFocalIndex === 1 ? <Building size={18} /> :
           activeFocalIndex === 2 ? <GraduationCap size={18} /> :
           <Award size={18} />}
        </div>
        <div>
          <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            {activeFocalIndex === 1 ? 'Production Architecture' :
             activeFocalIndex === 2 ? '50+ Collegiate Chapters' :
             'Industry-Ready Engineers'}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            {activeFocalIndex === 1 ? 'Modern system designs & toolchains' :
             activeFocalIndex === 2 ? 'Active technical hubs across campuses' :
             'Verified projects & guaranteed internships'}
          </div>
        </div>
      </div>
    </div>
  );
}
