import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, X } from 'lucide-react';

const JOURNEY_STAGES = [
  {
    number: '01',
    title: 'Discover',
    tagline: 'Explore opportunities',
    popupContent:
      'Explore technology tracks, campus opportunities, events and pathways based on your interests.',
    image: '/img1.jpeg',
    route: 'programs',
    // Exact fraction along the SVG path (total length ~1577px)
    fraction: 0.168,
    // Node position in viewBox (0..1440, 0..380)
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

export default function HowItWorksSection({ navigateTo }) {
  // State for which stages have appeared (-1 = none, 0 = 01 revealed, 1 = 02, etc.)
  const [revealedStage, setRevealedStage] = useState(-1);
  const [activeStage, setActiveStage] = useState(-1);
  const [activePopupStage, setActivePopupStage] = useState(null);

  const sectionRef = useRef(null);
  const svgPathRef = useRef(null);
  const blueHeadCircleRef = useRef(null);
  const activePathRef = useRef(null);

  const hasTriggeredRef = useRef(false);
  const animFrameRef = useRef(null);

  // Single continuous organic curved path spanning extreme left (0 110) to extreme right (1440 260)
  const pathD =
    'M 0 110 C 90 115 130 235 220 235 C 310 235 340 160 430 165 C 520 170 560 270 650 260 C 740 250 790 195 880 205 C 970 215 1020 265 1110 260 C 1200 255 1250 180 1330 185 C 1380 190 1410 250 1440 260';

  // Total calculated length of this exact cubic bezier path
  const PATH_LENGTH = 1577.3;

  // Automatic smooth continuous animation of the journey line and nodes within this single section
  // Triggers automatically when the section scrolls into viewport, no scroll-hijacking, no pinning
  useEffect(() => {
    const el = sectionRef.current;
    const path = svgPathRef.current;
    if (!el || !path) return;

    if (activePathRef.current) {
      activePathRef.current.style.strokeDasharray = `${PATH_LENGTH}`;
      activePathRef.current.style.strokeDashoffset = `${PATH_LENGTH}`;
    }
    if (blueHeadCircleRef.current) {
      blueHeadCircleRef.current.setAttribute('cx', '0');
      blueHeadCircleRef.current.setAttribute('cy', '110');
    }

    let isCancelled = false;
    let animId = null;
    let startTime = null;
    const DURATION = 6500; // 6.5 seconds smooth complete journey

    const updateFrame = (timestamp) => {
      if (isCancelled) return;
      if (!startTime) startTime = timestamp;

      const elapsed = timestamp - startTime;
      // Loop smoothly from 0 to 1 with a gentle pause at end
      const rawT = (elapsed % (DURATION + 1500)) / DURATION;
      const progress = Math.min(rawT, 1);

      const currentDist = progress * PATH_LENGTH;

      // Update active path stroke
      if (activePathRef.current) {
        const offset = Math.max(0, PATH_LENGTH - currentDist);
        activePathRef.current.style.strokeDashoffset = `${offset}`;
      }

      // Update blue head point position along the SVG curve
      const clampedDist = Math.min(Math.max(currentDist, 0), PATH_LENGTH);
      try {
        const pt = path.getPointAtLength(clampedDist);
        if (blueHeadCircleRef.current && pt) {
          blueHeadCircleRef.current.setAttribute('cx', pt.x.toFixed(2));
          blueHeadCircleRef.current.setAttribute('cy', pt.y.toFixed(2));
        }
      } catch (err) {
        // Fallback for svg getPointAtLength
      }

      // Reveal stages progressively as head passes them
      let highestReached = -1;
      JOURNEY_STAGES.forEach((stage, idx) => {
        if (progress >= stage.fraction - 0.03) {
          highestReached = idx;
        }
      });

      setRevealedStage(highestReached);
      setActiveStage(highestReached);

      animId = requestAnimationFrame(updateFrame);
    };

    // Use IntersectionObserver so it only animates when user views this section
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          if (!animId) {
            startTime = null;
            animId = requestAnimationFrame(updateFrame);
          }
        } else {
          if (animId) {
            cancelAnimationFrame(animId);
            animId = null;
          }
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);

    return () => {
      isCancelled = true;
      if (animId) cancelAnimationFrame(animId);
      observer.disconnect();
    };
  }, []);

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

  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      document.body.style.overflow = '';
    };
  }, []);

  const handleCardClick = (e, stage, idx) => {
    e.stopPropagation();
    // Only allow clicking once card has appeared
    if (revealedStage >= idx) {
      setActiveStage(idx);
      setActivePopupStage(stage);
    }
  };

  const closePopup = () => {
    setActivePopupStage(null);
  };

  return (
    <section ref={sectionRef} className="journey-section-root" id="how-it-works">
      <div className="journey-inner-container">
        {/* SECTION HEADER ROW — NO TOP-RIGHT CARD, TIGHT HEADING TO JOURNEY */}
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
        </div>

        {/* NATURAL IRREGULAR JOURNEY CANVAS — EXTREME LEFT TO EXTREME RIGHT */}
        <div className="journey-canvas-stage">
          <svg
            className="journey-svg-canvas"
            viewBox="0 0 1440 380"
            fill="none"
            preserveAspectRatio="none"
          >
            {/* Hidden reference path used for getPointAtLength */}
            <path ref={svgPathRef} d={pathD} style={{ display: 'none' }} />

            {/* BASE INACTIVE PATH (Dark charcoal line spanning extreme left to extreme right) */}
            <path className="journey-base-path" d={pathD} />

            {/* ACTIVE BLUE TRAVELING PATH (Progressively drawn behind travelling point) */}
            <path ref={activePathRef} className="journey-active-path" d={pathD} />

            {/* DECORATIVE SMALL ORBITAL RINGS & ACCENT DOTS FROM REFERENCE */}
            <circle cx="80" cy="115" r="7" className="decorative-glow-dot" />
            <circle cx="160" cy="190" r="4" className="decorative-outline-dot" />
            <circle cx="360" cy="225" r="5" className="decorative-outline-dot" />
            <circle cx="580" cy="240" r="4" className="decorative-glow-dot" />
            <circle cx="860" cy="210" r="4" className="decorative-outline-dot" />
            <circle cx="1080" cy="245" r="5" className="decorative-outline-dot" />
            <circle cx="1380" cy="250" r="7" className="decorative-glow-dot" />

            {/* TRAVELLING BLUE HEAD POINT (Physically moves along path as blue line follows behind) */}
            <g className="travelling-point-group">
              <circle
                ref={blueHeadCircleRef}
                cx="0"
                cy="110"
                r="8"
                className="travelling-head-circle"
              />
            </g>
          </svg>

          {/* 5 STAGES ALONG THE NATURAL CURVE WITH ALTERNATING VERTICAL POSITIONS */}
          <div className="journey-nodes-layer">
            {JOURNEY_STAGES.map((stage, idx) => {
              const isRevealed = revealedStage >= idx;
              const isActive = activeStage === idx;
              // 01: BELOW, 02: ABOVE, 03: BELOW, 04: ABOVE, 05: BELOW
              const isAbove = idx === 1 || idx === 3;

              return (
                <div
                  key={stage.number}
                  className={`journey-stage-anchor stage-${stage.number} ${
                    isAbove ? 'pos-above' : 'pos-below'
                  } ${isRevealed ? 'stage-revealed' : 'stage-hidden'} ${
                    isActive ? 'stage-active' : ''
                  }`}
                  style={{ left: stage.posX, top: stage.posY }}
                >
                  {/* ON-PATH BLUE CONNECTOR POINT */}
                  <div className={`path-anchor-point ${isRevealed ? 'point-active' : ''}`}>
                    <span className="point-pulse-glow" />
                    <span className="point-solid-core" />
                  </div>

                  {/* VERTICAL CONNECTOR STEM LINKING CARD TO THE PATH */}
                  <div className={`stage-vertical-stem ${isAbove ? 'stem-up' : 'stem-down'}`} />

                  {/* STAGE 01: DISCOVER → CARD BELOW */}
                  {idx === 0 && (
                    <div className="stage-composition comp-discover layout-below">
                      <div className="stage-circular-avatar">
                        <img src="/img1.jpeg" alt="Discover" />
                      </div>
                      <div
                        className="stage-glass-pill pill-below"
                        onClick={(e) => handleCardClick(e, stage, idx)}
                      >
                        <div className="pill-header">
                          <span className="pill-num">01</span>
                        </div>
                        <h4 className="pill-title">Discover</h4>
                        <p className="pill-sub">Explore<br />opportunities</p>
                        <div className="pill-arrow-btn">
                          <ArrowUpRight size={14} />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STAGE 02: ASSESS → CARD ABOVE */}
                  {idx === 1 && (
                    <div className="stage-composition comp-assess layout-above">
                      <div
                        className="stage-glass-pill pill-above"
                        onClick={(e) => handleCardClick(e, stage, idx)}
                      >
                        <div className="pill-header">
                          <span className="pill-num">02</span>
                        </div>
                        <h4 className="pill-title">Assess</h4>
                        <p className="pill-sub">Know your<br />current skills</p>
                        <div className="pill-arrow-btn">
                          <ArrowUpRight size={14} />
                        </div>
                      </div>
                      <div className="stage-circular-avatar">
                        <img src="/img2.jpeg" alt="Assess" />
                      </div>
                    </div>
                  )}

                  {/* STAGE 03: LEARN → CARD BELOW */}
                  {idx === 2 && (
                    <div className="stage-composition comp-learn layout-below">
                      <div className="stage-circular-avatar">
                        <img src="/img3.jpeg" alt="Learn" />
                      </div>
                      <div
                        className="stage-glass-pill pill-below"
                        onClick={(e) => handleCardClick(e, stage, idx)}
                      >
                        <div className="pill-header">
                          <span className="pill-num">03</span>
                        </div>
                        <h4 className="pill-title">Learn</h4>
                        <p className="pill-sub">Fill your<br />skill gaps</p>
                        <div className="pill-arrow-btn">
                          <ArrowUpRight size={14} />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STAGE 04: BUILD → CARD ABOVE */}
                  {idx === 3 && (
                    <div className="stage-composition comp-build layout-above">
                      <div
                        className="stage-glass-pill pill-above"
                        onClick={(e) => handleCardClick(e, stage, idx)}
                      >
                        <div className="pill-header">
                          <span className="pill-num">04</span>
                        </div>
                        <h4 className="pill-title">Build</h4>
                        <p className="pill-sub">Work on<br />real projects</p>
                        <div className="pill-arrow-btn">
                          <ArrowUpRight size={14} />
                        </div>
                      </div>
                      <div className="stage-circular-avatar">
                        <img src="/img4.jpeg" alt="Build" />
                      </div>
                    </div>
                  )}

                  {/* STAGE 05: INTERN → CARD BELOW */}
                  {idx === 4 && (
                    <div className="stage-composition comp-intern layout-below">
                      <div className="stage-circular-avatar">
                        <img src="/img5.jpeg" alt="Intern" />
                      </div>
                      <div
                        className="stage-glass-pill pill-below"
                        onClick={(e) => handleCardClick(e, stage, idx)}
                      >
                        <div className="pill-header">
                          <span className="pill-num">05</span>
                        </div>
                        <h4 className="pill-title">Intern</h4>
                        <p className="pill-sub">Gain industry<br />experience</p>
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

          {/* CONTEXTUAL CARD POPUP WHEN CLICKED */}
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
        </div>
      </div>
    </section>
  );
}
