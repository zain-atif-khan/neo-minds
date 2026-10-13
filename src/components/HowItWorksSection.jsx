import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const JOURNEY_STAGES = [
  {
    number: '01',
    title: 'Discover',
    tagline: 'Explore opportunities',
    popupContent:
      'Explore technology tracks, campus opportunities, events and pathways based on your interests.',
    image: '/img1.jpeg',
    route: 'programs',
    fraction: 0.168,
    posX: '15.6%',
    posY: '61.8%'
  },
  {
    number: '02',
    title: 'Assess',
    tagline: 'Know your current skills',
    popupContent:
      'Understand your current skill level and identify the skills you need to improve.',
    image: '/img2.jpeg',
    route: 'skill-assessment',
    fraction: 0.340,
    posX: '33.3%',
    posY: '46.8%'
  },
  {
    number: '03',
    title: 'Learn',
    tagline: 'Fill your skill gaps',
    popupContent:
      'Follow practical learning paths designed around real industry skills.',
    image: '/img3.jpeg',
    route: 'programs',
    fraction: 0.515,
    posX: '50.7%',
    posY: '62.9%'
  },
  {
    number: '04',
    title: 'Build',
    tagline: 'Work on real projects',
    popupContent:
      'Work on real projects that demonstrate your practical ability.',
    image: '/img4.jpeg',
    route: 'projects',
    fraction: 0.694,
    posX: '69.5%',
    posY: '63.2%'
  },
  {
    number: '05',
    title: 'Intern',
    tagline: 'Gain industry experience',
    popupContent:
      'Move from learning into structured industry experience and internship opportunities.',
    image: '/img5.jpeg',
    route: 'internships',
    fraction: 0.868,
    posX: '87.4%',
    posY: '52.7%'
  }
];

// Desktop organic curved path reaching the extreme ends (-60 to 1500)
const pathD =
  'M -60 110 C 30 112 130 235 220 235 C 310 235 340 160 430 165 C 520 170 560 270 650 260 C 740 250 790 195 880 205 C 970 215 1020 265 1110 260 C 1200 255 1250 180 1330 185 C 1380 190 1430 250 1500 260';

export default function HowItWorksSection({ navigateTo }) {
  const [activeStage, setActiveStage] = useState(0);
  const [activePopupStage, setActivePopupStage] = useState(null);
  const [viewportWidth, setViewportWidth] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth : 390
  );

  useEffect(() => {
    let lastWidth = typeof window !== 'undefined' ? window.innerWidth : 390;
    const handleResize = () => {
      // Guard against mobile URL bar collapse vertical resizes
      if (Math.abs(window.innerWidth - lastWidth) > 10) {
        lastWidth = window.innerWidth;
        if (window.innerWidth <= 768) {
          setViewportWidth(window.innerWidth);
        }
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Desktop refs
  const pinnedJourneyRef = useRef(null);
  const canvasStageRef = useRef(null);
  const svgPathRef = useRef(null);
  const blueHeadCircleRef = useRef(null);
  const activePathRef = useRef(null);

  // Mobile refs
  const mobilePinnedRef = useRef(null);
  const mobileViewportRef = useRef(null);
  const mobileTrackRef = useRef(null);
  const mobileSvgPathRef = useRef(null);
  const mobileActivePathRef = useRef(null);
  const mobileIndicatorGroupRef = useRef(null);

  // Mobile dedicated 1:1 coordinate geometry (Zero distortion, perfectly proportional)
  const w = viewportWidth;
  const x1 = 0.5 * w;
  const x2 = 1.5 * w;
  const x3 = 2.5 * w;
  const x4 = 3.5 * w;
  const x5 = 4.5 * w;

  const yCrest = 145;
  const yTrough = 275;
  const yMid = 210;
  const k = 0.45 * w;

  const dynamicMobilePathD = `M ${-0.3 * w} ${yMid} C ${-0.3 * w + k} ${yMid} ${x1 - k} ${yCrest} ${x1} ${yCrest} C ${x1 + k} ${yCrest} ${x2 - k} ${yTrough} ${x2} ${yTrough} C ${x2 + k} ${yTrough} ${x3 - k} ${yCrest} ${x3} ${yCrest} C ${x3 + k} ${yCrest} ${x4 - k} ${yTrough} ${x4} ${yTrough} C ${x4 + k} ${yTrough} ${x5 - k} ${yCrest} ${x5} ${yCrest} C ${x5 + k} ${yCrest} ${5.3 * w - k} ${yMid} ${5.3 * w} ${yMid}`.replace(/\s+/g, ' ').trim();

  useEffect(() => {
    const mm = gsap.matchMedia();

    // ── DESKTOP (Width > 768px): Exact original desktop timeline and pinned stage ──
    mm.add("(min-width: 769px)", () => {
      const el = pinnedJourneyRef.current;
      const path = svgPathRef.current;
      if (!el || !path) return;

      if (canvasStageRef.current) {
        gsap.set(canvasStageRef.current, { x: 0 });
      }

      const desktopTotalLength = path.getTotalLength ? path.getTotalLength() : 1660;

      if (activePathRef.current) {
        activePathRef.current.style.strokeDasharray = `${desktopTotalLength}`;
        activePathRef.current.style.strokeDashoffset = `${desktopTotalLength}`;
      }

      // Precompute 101 points along desktop path to eliminate layout calls during scroll
      const desktopLut = [];
      for (let i = 0; i <= 100; i++) {
        const len = (i / 100) * desktopTotalLength;
        try {
          const pt = path.getPointAtLength(len);
          desktopLut.push({ x: pt.x.toFixed(2), y: pt.y.toFixed(2) });
        } catch (e) {
          desktopLut.push({ x: '0', y: '0' });
        }
      }

      if (blueHeadCircleRef.current && desktopLut[0]) {
        blueHeadCircleRef.current.setAttribute('cx', desktopLut[0].x);
        blueHeadCircleRef.current.setAttribute('cy', desktopLut[0].y);
      }

      let lastDesktopStage = -1;

      gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top 75px',
          end: '+=950',
          pin: true,
          pinSpacing: true,
          scrub: 0.4,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = Math.max(0, Math.min(self.progress, 1));
            const currentDist = p * desktopTotalLength;

            if (activePathRef.current) {
              const offset = Math.max(0, desktopTotalLength - currentDist);
              activePathRef.current.style.strokeDashoffset = `${offset}`;
            }

            const idx = Math.min(100, Math.max(0, Math.round(p * 100)));
            const pt = desktopLut[idx];
            if (blueHeadCircleRef.current && pt) {
              blueHeadCircleRef.current.setAttribute('cx', pt.x);
              blueHeadCircleRef.current.setAttribute('cy', pt.y);
            }

            let stageIndex = 0;
            if (p < 0.18) {
              stageIndex = 0;
            } else if (p < 0.42) {
              stageIndex = 1;
            } else if (p < 0.65) {
              stageIndex = 2;
            } else if (p < 0.88) {
              stageIndex = 3;
            } else {
              stageIndex = 4;
            }

            if (stageIndex !== lastDesktopStage) {
              lastDesktopStage = stageIndex;
              setActiveStage(stageIndex);
            }
          }
        }
      });
    });

    // ── MOBILE (Width <= 768px): Dedicated horizontal translation track ──
    // Pinned vertical page scroll drives horizontal translation across 5 full panels
    mm.add("(max-width: 768px)", () => {
      const pinEl = mobilePinnedRef.current;
      const trackEl = mobileTrackRef.current;
      const mPath = mobileSvgPathRef.current;
      const activePath = mobileActivePathRef.current;

      if (!pinEl || !trackEl || !mPath) return;

      const totalLength = mPath.getTotalLength ? mPath.getTotalLength() : (5.6 * w);
      if (activePath) {
        activePath.style.strokeDasharray = `${totalLength}`;
        activePath.style.strokeDashoffset = `${totalLength}`;
      }

      // Initial state: Track starts at 0, displaying 01 DISCOVER
      gsap.set(trackEl, { x: 0 });

      // Precompute 101-element lookup table on initialization ONCE:
      // Eliminates all getPointAtLength calls during scrolling for silky 60fps performance
      const mobileLut = [];
      for (let step = 0; step <= 100; step++) {
        const progress = step / 100;
        const targetX = x1 + progress * (x5 - x1);
        let low = 0;
        let high = totalLength;
        for (let i = 0; i < 20; i++) {
          const mid = (low + high) / 2;
          const pt = mPath.getPointAtLength(mid);
          if (pt.x < targetX) low = mid;
          else high = mid;
        }
        const dist = (low + high) / 2;
        const pt = mPath.getPointAtLength(dist);
        mobileLut.push({
          dist,
          x: pt.x.toFixed(1),
          y: pt.y.toFixed(1)
        });
      }

      let lastMobileStage = -1;

      const updateIndicator = (p) => {
        const idx = Math.min(100, Math.max(0, Math.round(p * 100)));
        const entry = mobileLut[idx];
        if (!entry) return;

        // 1. Draw glowing blue active path up to current point (instant calculation)
        if (activePath) {
          activePath.style.strokeDashoffset = `${Math.max(0, totalLength - entry.dist)}`;
        }

        // 2. Position travelling blue dot directly on curve (instantaneous, 60fps)
        if (mobileIndicatorGroupRef.current) {
          mobileIndicatorGroupRef.current.setAttribute(
            'transform',
            `translate(${entry.x}, ${entry.y})`
          );
        }
      };

      // Set initial indicator position immediately
      updateIndicator(0);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinEl,
          start: 'top 75px',
          end: '+=1400',
          pin: true,
          pinSpacing: true,
          scrub: 0.4,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = Math.max(0, Math.min(self.progress, 1));
            updateIndicator(p);

            // Stage indicator updates only when stage boundary crosses
            let stageIndex = 0;
            if (p < 0.18) {
              stageIndex = 0;
            } else if (p < 0.38) {
              stageIndex = 1;
            } else if (p < 0.62) {
              stageIndex = 2;
            } else if (p < 0.85) {
              stageIndex = 3;
            } else {
              stageIndex = 4;
            }

            if (stageIndex !== lastMobileStage) {
              lastMobileStage = stageIndex;
              setActiveStage(stageIndex);
            }
          }
        }
      });

      // Normal vertical scrolling smoothly drives horizontal translation of the track
      // Translates by exactly 4 full screen widths across all 5 panels
      tl.to(trackEl, {
        x: () => -(4 * w),
        ease: 'none',
        duration: 1
      });
    });

    return () => {
      mm.revert();
    };
  }, [viewportWidth]);

  // Lock document scroll when popup is open
  useEffect(() => {
    if (activePopupStage !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activePopupStage]);

  const handleCardClick = (e, stage, idx) => {
    e.stopPropagation();
    setActiveStage(idx);
    setActivePopupStage(stage);
  };

  const closePopup = () => {
    setActivePopupStage(null);
  };

  return (
    <section className="journey-section-root" id="how-it-works">
      {/* ══════════════════════════════════════════════════════════════════════
          DESKTOP VIEW (Width > 768px): Exact original desktop composition
          100% UNTOUCHED
          ══════════════════════════════════════════════════════════════════════ */}
      <div className="journey-desktop-view">
        {/* PART 1: INTRO / HEADER AREA */}
        <div className="journey-intro-area">
          <div className="journey-header-row">
            <div className="journey-header-left">
              <h2 className="journey-main-heading">
                A clear path from<br />
                learning to <span className="highlight-blue">real opportunities.</span>
              </h2>
              <p className="journey-subtext">
                Practical learning. Real projects. Industry experience. All in one place.
              </p>
            </div>

            <div className="journey-editorial-story">
              <div className="editorial-eyebrow">THE NEO MINDS JOURNEY</div>
              <h3 className="editorial-statement">
                &ldquo;Skills become valuable when you can prove them.&rdquo;
              </h3>
              <p className="editorial-supporting">
                Every stage moves you closer to doing real work — not just completing another course.
              </p>

              <div className="journey-stage-indicator">
                {JOURNEY_STAGES.map((stg, i) => (
                  <div
                    key={stg.number}
                    className={`stage-indicator-step ${activeStage >= i ? 'step-active' : ''}`}
                    onClick={(e) => handleCardClick(e, stg, i)}
                  >
                    <span className="step-num">{stg.number}</span>
                    <span className="step-title">{stg.title.toUpperCase()}</span>
                    {i < JOURNEY_STAGES.length - 1 && <span className="step-arrow">&rarr;</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* PART 2: PINNED JOURNEY / WAVE AREA */}
        <div ref={pinnedJourneyRef} className="journey-pinned-stage">
          <div ref={canvasStageRef} className="journey-canvas-stage">
            <svg
              className="journey-svg-canvas"
              viewBox="-60 0 1560 380"
              fill="none"
              preserveAspectRatio="none"
              style={{ overflow: 'visible' }}
            >
              <path ref={svgPathRef} d={pathD} style={{ display: 'none' }} />
              <path className="journey-base-path" d={pathD} />
              <path ref={activePathRef} className="journey-active-path" d={pathD} />

              <circle cx="-30" cy="111" r="5" className="decorative-glow-dot" />
              <circle cx="80" cy="115" r="7" className="decorative-glow-dot" />
              <circle cx="160" cy="190" r="4" className="decorative-outline-dot" />
              <circle cx="360" cy="225" r="5" className="decorative-outline-dot" />
              <circle cx="580" cy="240" r="4" className="decorative-glow-dot" />
              <circle cx="860" cy="210" r="4" className="decorative-outline-dot" />
              <circle cx="1080" cy="245" r="5" className="decorative-outline-dot" />
              <circle cx="1380" cy="250" r="7" className="decorative-glow-dot" />
              <circle cx="1470" cy="256" r="7" className="decorative-glow-dot" />

              <g className="travelling-point-group">
                <circle
                  ref={blueHeadCircleRef}
                  cx="-60"
                  cy="110"
                  r="8"
                  className="travelling-head-circle"
                />
              </g>
            </svg>

            <div className="journey-nodes-layer">
              {JOURNEY_STAGES.map((stage, idx) => {
                const isActive = activeStage === idx;
                const isAbove = idx === 1 || idx === 3;

                return (
                  <div
                    key={stage.number}
                    className={`journey-stage-anchor stage-${stage.number} ${
                      isAbove ? 'pos-above' : 'pos-below'
                    } ${isActive ? 'stage-active' : 'stage-inactive'}`}
                    style={{ left: stage.posX, top: stage.posY }}
                  >
                    <div className={`path-anchor-point ${isActive ? 'point-active' : ''}`}>
                      <span className="point-pulse-glow" />
                      <span className="point-solid-core" />
                    </div>

                    <div className={`stage-vertical-stem ${isAbove ? 'stem-up' : 'stem-down'}`} />

                    {isAbove ? (
                      <div className="stage-composition layout-above">
                        <div
                          className="stage-glass-pill pill-above"
                          onClick={(e) => handleCardClick(e, stage, idx)}
                        >
                          <div className="pill-header">
                            <span className="pill-num">{stage.number}</span>
                          </div>
                          <h4 className="pill-title">{stage.title}</h4>
                          <p className="pill-sub">
                            {stage.tagline.split(' ').slice(0, 2).join(' ')}<br />
                            {stage.tagline.split(' ').slice(2).join(' ')}
                          </p>
                          <div className="pill-arrow-btn">
                            <ArrowUpRight size={14} />
                          </div>
                        </div>
                        <div className="stage-circular-avatar">
                          <img src={stage.image} alt={stage.title} />
                        </div>
                      </div>
                    ) : (
                      <div className="stage-composition layout-below">
                        <div className="stage-circular-avatar">
                          <img src={stage.image} alt={stage.title} />
                        </div>
                        <div
                          className="stage-glass-pill pill-below"
                          onClick={(e) => handleCardClick(e, stage, idx)}
                        >
                          <div className="pill-header">
                            <span className="pill-num">{stage.number}</span>
                          </div>
                          <h4 className="pill-title">{stage.title}</h4>
                          <p className="pill-sub">
                            {stage.tagline.split(' ').slice(0, 2).join(' ')}<br />
                            {stage.tagline.split(' ').slice(2).join(' ')}
                          </p>
                          <div className="pill-arrow-btn">
                            <ArrowUpRight size={14} />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          MOBILE VIEW (Width <= 768px): Dedicated Pinned Horizontal Track
          - Window through which the entire journey slides
          - ONLY DISCOVER is visible initially (no other stages around it)
          - Single consistent layout across all 5 stages in one horizontal line:
            [01 DISCOVER] -> Avatar -> Glass Card -> Continuous Curved Wave
          - Vertical scroll translates the entire journey horizontally
          - Glowing blue line and head travel with the journey in real time
          - Clean unpin on reaching Stage 05 INTERN
          ══════════════════════════════════════════════════════════════════════ */}
      <div className="journey-mobile-view">
        <div ref={mobilePinnedRef} className="journey-mobile-pinned">
          {/* Mobile Header */}
          <div className="journey-mobile-header">
            <div className="journey-mobile-eyebrow">THE NEO MINDS JOURNEY</div>
            <h2 className="journey-mobile-heading">
              A clear path from learning to <span className="highlight-blue">real opportunities.</span>
            </h2>
          </div>

          {/* Viewport window clipping the 500vw horizontal track */}
          <div ref={mobileViewportRef} className="journey-mobile-viewport">
            <div ref={mobileTrackRef} className="journey-mobile-track">
              {/* Continuous wave SVG spanning the full 500vw track */}
              {/* Continuous wave SVG spanning the full 500vw track (viewBox: 0 0 5000 360) */}
              <svg
                className="journey-mobile-svg"
                viewBox={`0 0 ${5 * w} 430`}
                style={{ width: `${5 * w}px`, height: '430px' }}
                fill="none"
              >
                {/* Thin visible solid vertical connectors meeting wave and avatar with zero gap */}
                {/* Discover (x1): wave crest at yCrest -> meets avatar top at 172 */}
                <line x1={x1} y1={yCrest} x2={x1} y2={172} stroke="#1677FF" strokeWidth="2.5" strokeLinecap="round" />
                {/* Assess (x2): wave trough at yTrough -> meets avatar bottom at 248 */}
                <line x1={x2} y1={yTrough} x2={x2} y2={248} stroke="#1677FF" strokeWidth="2.5" strokeLinecap="round" />
                {/* Learn (x3): wave crest at yCrest -> meets avatar top at 172 */}
                <line x1={x3} y1={yCrest} x2={x3} y2={172} stroke="#1677FF" strokeWidth="2.5" strokeLinecap="round" />
                {/* Build (x4): wave trough at yTrough -> meets avatar bottom at 248 */}
                <line x1={x4} y1={yTrough} x2={x4} y2={248} stroke="#1677FF" strokeWidth="2.5" strokeLinecap="round" />
                {/* Intern (x5): wave crest at yCrest -> meets avatar top at 172 */}
                <line x1={x5} y1={yCrest} x2={x5} y2={172} stroke="#1677FF" strokeWidth="2.5" strokeLinecap="round" />

                {/* Dark charcoal base path - smooth, elegant, continuous edge-to-edge */}
                <path
                  ref={mobileSvgPathRef}
                  d={dynamicMobilePathD}
                  stroke="#0B1736"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  fill="none"
                />

                {/* Glowing blue active drawing path */}
                <path
                  ref={mobileActivePathRef}
                  d={dynamicMobilePathD}
                  stroke="#1677FF"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  fill="none"
                  filter="drop-shadow(0 0 6px rgba(22, 119, 255, 0.75))"
                />

                {/* Anchor node dots on wave at each stage crest & trough */}
                <circle cx={x1} cy={yCrest} r="4.5" fill="#FFFFFF" stroke="#1677FF" strokeWidth="2.5" />
                <circle cx={x2} cy={yTrough} r="4.5" fill="#FFFFFF" stroke="#1677FF" strokeWidth="2.5" />
                <circle cx={x3} cy={yCrest} r="4.5" fill="#FFFFFF" stroke="#1677FF" strokeWidth="2.5" />
                <circle cx={x4} cy={yTrough} r="4.5" fill="#FFFFFF" stroke="#1677FF" strokeWidth="2.5" />
                <circle cx={x5} cy={yCrest} r="4.5" fill="#FFFFFF" stroke="#1677FF" strokeWidth="2.5" />

                {/* Travelling Blue Dot INSIDE the exact same SVG element (scale 1:1, perfectly circular!) */}
                <g ref={mobileIndicatorGroupRef} pointerEvents="none">
                  <circle r="14" fill="rgba(22, 119, 255, 0.22)" />
                  <circle r="7.5" fill="#1677FF" stroke="#FFFFFF" strokeWidth="2.5" />
                  <circle r="2.5" fill="#FFFFFF" />
                </g>
              </svg>

              {/* 5 Stage Panels (100vw each) with Alternating Above/Below arrangement */}
              {JOURNEY_STAGES.map((stage, idx) => {
                const isAbove = idx === 1 || idx === 3; // Assess (02) and Build (04) are ABOVE
                return (
                  <div
                    key={stage.number}
                    className={`journey-mobile-panel ${activeStage === idx ? 'panel-active' : ''} ${
                      isAbove ? 'panel-stage-above' : 'panel-stage-below'
                    }`}
                  >
                    {isAbove ? (
                      /* STAGE ABOVE THE WAVE (Assess 02, Build 04) */
                      <div className="mobile-stage-unit unit-above">
                        {/* Info Card sits ABOVE */}
                        <div
                          className="stage-glass-pill mobile-pill"
                          onClick={(e) => handleCardClick(e, stage, idx)}
                        >
                          <div className="mobile-pill-header">
                            <span className="badge-num">{stage.number}</span>
                            <span className="badge-title">{stage.title.toUpperCase()}</span>
                          </div>
                          <h4 className="pill-title">{stage.title}</h4>
                          <p className="pill-sub">{stage.tagline}</p>
                          <div className="pill-arrow-btn">
                            <ArrowUpRight size={14} />
                          </div>
                        </div>

                        {/* Circular Avatar / Image sits between card and stem */}
                        <div className="mobile-stage-avatar">
                          <img src={stage.image} alt={stage.title} />
                        </div>
                      </div>
                    ) : (
                      /* STAGE BELOW THE WAVE (Discover 01, Learn 03, Intern 05) */
                      <div className="mobile-stage-unit unit-below">
                        {/* Circular Avatar / Image sits between stem and card */}
                        <div className="mobile-stage-avatar">
                          <img src={stage.image} alt={stage.title} />
                        </div>

                        {/* Info Card sits BELOW */}
                        <div
                          className="stage-glass-pill mobile-pill"
                          onClick={(e) => handleCardClick(e, stage, idx)}
                        >
                          <div className="mobile-pill-header">
                            <span className="badge-num">{stage.number}</span>
                            <span className="badge-title">{stage.title.toUpperCase()}</span>
                          </div>
                          <h4 className="pill-title">{stage.title}</h4>
                          <p className="pill-sub">{stage.tagline}</p>
                          <div className="pill-arrow-btn">
                            <ArrowUpRight size={14} />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* CONTEXTUAL CARD POPUP WHEN CLICKED (Shared by both desktop and mobile) */}
      {activePopupStage && (
        <div className="stage-context-popup-overlay" onClick={closePopup}>
          <div
            className="stage-context-popup-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="popup-top-row">
              <div className="popup-phase-badge">
                <span>STAGE {activePopupStage.number}</span>
              </div>
              <button
                className="popup-close-btn"
                onClick={closePopup}
                type="button"
                aria-label="Close details"
              >
                <X size={16} />
              </button>
            </div>

            <h3 className="popup-card-title">{activePopupStage.title}</h3>
            <p className="popup-card-tagline">{activePopupStage.tagline}</p>
            <p className="popup-card-body">{activePopupStage.popupContent}</p>

            <div className="popup-footer-row">
              <button
                className="popup-action-btn"
                onClick={() => {
                  closePopup();
                  if (navigateTo) navigateTo(activePopupStage.route);
                }}
                type="button"
              >
                <span>Explore Pathway</span>
                <ArrowUpRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
