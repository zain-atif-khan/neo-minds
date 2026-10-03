import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

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

// Natural organic curved path matching SCREENSHOT 2 (Discover below, Assess above, Learn below, Build above, Intern below/up)
const pathD =
  'M 0 110 C 90 115 130 235 220 235 C 310 235 340 160 430 165 C 520 170 560 270 650 260 C 740 250 790 195 880 205 C 970 215 1020 265 1110 260 C 1200 255 1250 180 1330 185 C 1380 190 1410 250 1440 260';

// Total calculated length of this exact cubic bezier path
const PATH_LENGTH = 1577.3;

export default function HowItWorksSection({ navigateTo }) {
  // Current active stage (0 = Discover, 1 = Assess, 2 = Learn, 3 = Build, 4 = Intern)
  const [activeStage, setActiveStage] = useState(0);
  const [activePopupStage, setActivePopupStage] = useState(null);

  const pinnedJourneyRef = useRef(null);
  const svgPathRef = useRef(null);
  const blueHeadCircleRef = useRef(null);
  const activePathRef = useRef(null);

  // GSAP ScrollTrigger: Pin ONLY the PinnedJourney container, letting the intro scroll away naturally
  useEffect(() => {
    const el = pinnedJourneyRef.current;
    const path = svgPathRef.current;
    if (!el || !path) return;

    if (activePathRef.current) {
      activePathRef.current.style.strokeDasharray = `${PATH_LENGTH}`;
      activePathRef.current.style.strokeDashoffset = `${PATH_LENGTH}`;
    }

    // Set initial position of blue head
    try {
      const initialPt = path.getPointAtLength(0);
      if (blueHeadCircleRef.current && initialPt) {
        blueHeadCircleRef.current.setAttribute('cx', initialPt.x.toFixed(2));
        blueHeadCircleRef.current.setAttribute('cy', initialPt.y.toFixed(2));
      }
    } catch (e) {}

    const ctx = gsap.context(() => {
      // Master timeline controlled by ScrollTrigger scrub
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top 75px', // Accounts for navbar height
          end: '+=3200',
          pin: true,
          pinSpacing: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = Math.max(0, Math.min(self.progress, 1));
            const currentDist = p * PATH_LENGTH;

            // 1. Travel blue path stroke behind the travelling point
            if (activePathRef.current) {
              const offset = Math.max(0, PATH_LENGTH - currentDist);
              activePathRef.current.style.strokeDashoffset = `${offset}`;
            }

            // 2. Move blue travelling head circle smoothly along path
            try {
              const pt = path.getPointAtLength(currentDist);
              if (blueHeadCircleRef.current && pt) {
                blueHeadCircleRef.current.setAttribute('cx', pt.x.toFixed(2));
                blueHeadCircleRef.current.setAttribute('cy', pt.y.toFixed(2));
              }
            } catch (err) {}

            // 3. Stage progression:
            // 0% -> 01 DISCOVER (idx 0)
            // 25% -> 02 ASSESS (idx 1)
            // 50% -> 03 LEARN (idx 2)
            // 75% -> 04 BUILD (idx 3)
            // 100% -> 05 INTERN (idx 4)
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

            setActiveStage(stageIndex);
          }
        }
      });
    }, el);

    return () => {
      ctx.revert();
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
      {/* ── PART 1: INTRO / HEADER AREA (Scrolls away normally before pin) ── */}
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

      {/* ── PART 2: PINNED JOURNEY / WAVE AREA (Exact composition from Screenshot 2) ── */}
      <div ref={pinnedJourneyRef} className="journey-pinned-stage">
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

          {/* 5 STAGES ALONG THE NATURAL CURVE — ALL 5 VISIBLE IN PINNED VIEWPORT */}
          <div className="journey-nodes-layer">
            {JOURNEY_STAGES.map((stage, idx) => {
              const isActive = activeStage === idx;
              // Alternating composition: 01 below, 02 above, 03 below, 04 above, 05 below (Matching Screenshot 2)
              const isAbove = idx === 1 || idx === 3;

              return (
                <div
                  key={stage.number}
                  className={`journey-stage-anchor stage-${stage.number} ${
                    isAbove ? 'pos-above' : 'pos-below'
                  } ${isActive ? 'stage-active' : 'stage-inactive'}`}
                  style={{ left: stage.posX, top: stage.posY }}
                >
                  {/* ON-PATH BLUE CONNECTOR POINT */}
                  <div className={`path-anchor-point ${isActive ? 'point-active' : ''}`}>
                    <span className="point-pulse-glow" />
                    <span className="point-solid-core" />
                  </div>

                  {/* VERTICAL CONNECTOR STEM LINKING CARD TO THE PATH */}
                  <div className={`stage-vertical-stem ${isAbove ? 'stem-up' : 'stem-down'}`} />

                  {/* STAGE COMPOSITION: Alternating layout */}
                  {isAbove ? (
                    // CARD ABOVE, AVATAR BELOW (02 ASSESS, 04 BUILD)
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
                    // AVATAR ABOVE, CARD BELOW (01 DISCOVER, 03 LEARN, 05 INTERN)
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
