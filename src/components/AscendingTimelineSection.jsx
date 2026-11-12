import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './AscendingTimelineSection.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const PHASES = [
  {
    index: 0,
    phase: '01',
    title: 'Diagnostic Baseline',
    duration: 'WEEK 1 – 2',
    description: 'Algorithmic diagnostics & squad alignment',
    scaleLabel: 'WEEK 1 – 2',
  },
  {
    index: 1,
    phase: '02',
    title: 'Core Systems & Tooling',
    duration: 'WEEK 3 – 5',
    description: 'Modern engineering stacks & CI/CD pipelines',
    scaleLabel: 'WEEK 3 – 5',
  },
  {
    index: 2,
    phase: '03',
    title: 'Applied Architecture',
    duration: 'WEEK 6 – 8',
    description: 'Distributed services & real-time systems',
    scaleLabel: 'WEEK 6 – 8',
  },
  {
    index: 3,
    phase: '04',
    title: 'Partner Project Gate',
    duration: 'WEEK 9 – 12',
    description: 'Production code for industry partner briefs',
    scaleLabel: 'WEEK 9 – 12',
  },
  {
    index: 4,
    phase: '05',
    title: 'Intern & Career Launch',
    duration: 'WEEK 13 – 14',
    description: 'Direct placement & industry onboarding',
    scaleLabel: 'WEEK 13 – 14',
  },
];

export default function AscendingTimelineSection() {
  const sectionRef = useRef(null);
  const pinnedStageRef = useRef(null);
  const canvasRef = useRef(null);
  const hiddenPathRef = useRef(null);
  const maskPathRef = useRef(null);
  const arrowRef = useRef(null);

  const panelRefs = useRef([]);
  const nodeRefs = useRef([]);
  const rulerColRefs = useRef([]);
  const contextTagRef = useRef(null);

  const [pathD, setPathD] = useState('');
  const [totalLength, setTotalLength] = useState(0);

  // Measure the exact relative coordinates of the 5 nodes on the canvas
  const computePath = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const panels = panelRefs.current.filter(Boolean);
    if (panels.length < 5) return;

    // Relative node positions inside canvas
    const nodes = panels.map((panel) => ({
      x: panel.offsetLeft + 2,
      y: panel.offsetTop + panel.offsetHeight / 2,
    }));

    const isMobile = window.innerWidth <= 768;
    let d = '';

    if (isMobile) {
      // Mobile vertical route down the left nodes
      d = `M ${nodes[0].x.toFixed(1)} ${nodes[0].y.toFixed(1)}`;
      for (let i = 0; i < nodes.length - 1; i++) {
        const nA = nodes[i];
        const nB = nodes[i + 1];
        const dy = nB.y - nA.y;
        const cp1x = nA.x - 12;
        const cp1y = nA.y + dy * 0.35;
        const cp2x = nB.x - 12;
        const cp2y = nB.y - dy * 0.35;
        d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${nB.x.toFixed(1)} ${nB.y.toFixed(1)}`;
      }
    } else {
      // ── DESKTOP ASCENDING STAIRCASE ROUTE (01 -> 02 -> 03 -> 04 -> 05) ──
      const n0 = nodes[0];
      const n1 = nodes[1];
      const n2 = nodes[2];
      const n3 = nodes[3];
      const n4 = nodes[4];

      d = `M ${n0.x.toFixed(1)} ${n0.y.toFixed(1)}`;

      // 1. Connection 1 (Phase 01 -> Phase 02): Low, sweeping curve with gentle rise
      const dx0 = n1.x - n0.x;
      const cp1_0x = n0.x + dx0 * 0.45;
      const cp1_0y = n0.y + 24;
      const cp2_0x = n1.x - dx0 * 0.35;
      const cp2_0y = n1.y + 14;
      d += ` C ${cp1_0x.toFixed(1)} ${cp1_0y.toFixed(1)}, ${cp2_0x.toFixed(1)} ${cp2_0y.toFixed(1)}, ${n1.x.toFixed(1)} ${n1.y.toFixed(1)}`;

      // 2. Connection 2 (Phase 02 -> Phase 03): Taller, dramatic upward curve
      const dx1 = n2.x - n1.x;
      const peakY1 = n2.y - 48; // Arches dramatically above Phase 03
      const cp1_1x = n1.x + dx1 * 0.35;
      const cp1_1y = peakY1;
      const cp2_1x = n2.x - dx1 * 0.35;
      const cp2_1y = peakY1;
      d += ` C ${cp1_1x.toFixed(1)} ${cp1_1y.toFixed(1)}, ${cp2_1x.toFixed(1)} ${cp2_1y.toFixed(1)}, ${n2.x.toFixed(1)} ${n2.y.toFixed(1)}`;

      // 3. Connection 3 (Phase 03 -> Phase 04): Tighter bend followed by a wider sweeping movement
      const dx2 = n3.x - n2.x;
      const dy2 = n3.y - n2.y;
      const mx2 = n2.x + dx2 * 0.32;
      const my2 = n2.y + dy2 * 0.72;
      // Sub-curve A: tight rise
      const cp1_2a_x = n2.x + dx2 * 0.12;
      const cp1_2a_y = n2.y - 18;
      const cp2_2a_x = mx2 - dx2 * 0.08;
      const cp2_2a_y = my2 + 15;
      // Sub-curve B: wider sweeping arrival
      const cp1_2b_x = mx2 + dx2 * 0.34;
      const cp1_2b_y = my2 - 24;
      const cp2_2b_x = n3.x - dx2 * 0.25;
      const cp2_2b_y = n3.y;
      d += ` C ${cp1_2a_x.toFixed(1)} ${cp1_2a_y.toFixed(1)}, ${cp2_2a_x.toFixed(1)} ${cp2_2a_y.toFixed(1)}, ${mx2.toFixed(1)} ${my2.toFixed(1)}`;
      d += ` C ${cp1_2b_x.toFixed(1)} ${cp1_2b_y.toFixed(1)}, ${cp2_2b_x.toFixed(1)} ${cp2_2b_y.toFixed(1)}, ${n3.x.toFixed(1)} ${n3.y.toFixed(1)}`;

      // 4. Connection 4 (Phase 04 -> Phase 05): Expressive, prominent 360-degree loop
      const dx3 = n4.x - n3.x;
      const loopR = 36;
      const loopCx = n3.x + dx3 * 0.44;
      const loopCy = n4.y - 14;

      // Approach to bottom of loop
      const loopStartX = loopCx - 6;
      const loopStartY = loopCy + loopR;
      const cp1_3x = n3.x + dx3 * 0.2;
      const cp1_3y = n3.y - 12;
      const cp2_3x = loopCx - loopR * 0.78;
      const cp2_3y = loopStartY + 14;
      d += ` C ${cp1_3x.toFixed(1)} ${cp1_3y.toFixed(1)}, ${cp2_3x.toFixed(1)} ${cp2_3y.toFixed(1)}, ${loopStartX.toFixed(1)} ${loopStartY.toFixed(1)}`;

      // Complete 360° Circular Loop:
      // Loop Arc 1: sweep up right side to top
      const cp1_loop_x = loopCx + loopR * 0.95;
      const cp1_loop_y = loopCy + loopR * 0.65;
      const cp2_loop_x = loopCx + loopR * 0.95;
      const cp2_loop_y = loopCy - loopR * 0.65;
      const loopTopX = loopCx;
      const loopTopY = loopCy - loopR;
      d += ` C ${cp1_loop_x.toFixed(1)} ${cp1_loop_y.toFixed(1)}, ${cp2_loop_x.toFixed(1)} ${cp2_loop_y.toFixed(1)}, ${loopTopX.toFixed(1)} ${loopTopY.toFixed(1)}`;

      // Loop Arc 2: sweep down left side crossing bottom
      const cp3_loop_x = loopCx - loopR * 0.95;
      const cp3_loop_y = loopCy - loopR * 0.65;
      const cp4_loop_x = loopCx - loopR * 0.95;
      const cp4_loop_y = loopCy + loopR * 0.65;
      const loopCrossX = loopCx + 6;
      const loopCrossY = loopCy + loopR;
      d += ` C ${cp3_loop_x.toFixed(1)} ${cp3_loop_y.toFixed(1)}, ${cp4_loop_x.toFixed(1)} ${cp4_loop_y.toFixed(1)}, ${loopCrossX.toFixed(1)} ${loopCrossY.toFixed(1)}`;

      // Exit curve out of loop towards Phase 05 entrance node
      const cp1_exit_x = loopCx + loopR + 24;
      const cp1_exit_y = loopCy + loopR * 0.35;
      const cp2_exit_x = n4.x - 36;
      const cp2_exit_y = n4.y + 4;
      d += ` C ${cp1_exit_x.toFixed(1)} ${cp1_exit_y.toFixed(1)}, ${cp2_exit_x.toFixed(1)} ${cp2_exit_y.toFixed(1)}, ${n4.x.toFixed(1)} ${n4.y.toFixed(1)}`;
    }

    setPathD(d);
  };

  // Run initial path measurement once layout mounts
  useEffect(() => {
    computePath();
    const handleResize = () => {
      computePath();
    };

    window.addEventListener('resize', handleResize);
    const t = setTimeout(computePath, 120);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(t);
    };
  }, []);

  // Update total length and arrowhead starting position when pathD changes
  useEffect(() => {
    if (!hiddenPathRef.current || !pathD) return;
    try {
      const len = hiddenPathRef.current.getTotalLength();
      setTotalLength(len);

      if (arrowRef.current && len > 0) {
        const p1 = hiddenPathRef.current.getPointAtLength(0);
        const p2 = hiddenPathRef.current.getPointAtLength(Math.min(4, len));
        const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x) * (180 / Math.PI);
        arrowRef.current.setAttribute(
          'transform',
          `translate(${p1.x.toFixed(2)}, ${p1.y.toFixed(2)}) rotate(${angle.toFixed(2)})`
        );
      }
    } catch {
      // Geometry fallback
    }
  }, [pathD]);

  // High-performance GSAP ScrollTrigger:
  // ZERO React re-renders during scroll! Class changes and mask offsets are applied directly to the DOM!
  useEffect(() => {
    if (!pinnedStageRef.current || totalLength === 0) return;

    let activeIndexRef = 0;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: pinnedStageRef.current,
        start: 'top top',
        end: '+=2400',
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        scrub: 0.5,
        refreshPriority: 10,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p = Math.max(0, Math.min(1, self.progress));
          const currentDist = p * totalLength;

          // 1. Reveal active path stroke via strokeDashoffset
          if (maskPathRef.current) {
            const offset = Math.max(0, totalLength - currentDist);
            maskPathRef.current.style.strokeDashoffset = `${offset}`;
          }

          // 2. Position Arrowhead precisely along curve with tangent rotation
          if (arrowRef.current && hiddenPathRef.current) {
            const pt = hiddenPathRef.current.getPointAtLength(currentDist);
            const prevDist = Math.max(0, currentDist - 2);
            const prevPt = hiddenPathRef.current.getPointAtLength(prevDist);
            const nextDist = Math.min(totalLength, currentDist + 2);
            const nextPt = hiddenPathRef.current.getPointAtLength(nextDist);

            const dx = nextPt.x - prevPt.x || 1;
            const dy = nextPt.y - prevPt.y || 0;
            const angle = Math.atan2(dy, dx) * (180 / Math.PI);

            arrowRef.current.setAttribute(
              'transform',
              `translate(${pt.x.toFixed(2)}, ${pt.y.toFixed(2)}) rotate(${angle.toFixed(2)})`
            );
          }

          // 3. Highlight exact active milestone (Direct DOM mutation: 0 React re-renders!)
          let newActive = 0;
          if (p < 0.22) newActive = 0;
          else if (p < 0.48) newActive = 1;
          else if (p < 0.72) newActive = 2;
          else if (p < 0.94) newActive = 3;
          else newActive = 4;

          if (newActive !== activeIndexRef) {
            activeIndexRef = newActive;

            // Update Panel states
            panelRefs.current.forEach((panel, i) => {
              if (!panel) return;
              if (i === newActive) {
                panel.classList.add('roadmap-panel--active');
                panel.classList.remove('roadmap-panel--inactive');
              } else {
                panel.classList.remove('roadmap-panel--active');
                panel.classList.add('roadmap-panel--inactive');
              }
            });

            // Update Nodes
            nodeRefs.current.forEach((node, i) => {
              if (!node) return;
              if (i === newActive) {
                node.classList.add('roadmap-node--active');
              } else {
                node.classList.remove('roadmap-node--active');
              }
            });

            // Update Ruler Columns
            rulerColRefs.current.forEach((col, i) => {
              if (!col) return;
              if (i === newActive) {
                col.classList.add('roadmap-ruler-col--active');
              } else {
                col.classList.remove('roadmap-ruler-col--active');
              }
            });

            // Update Header Context tag
            if (contextTagRef.current) {
              contextTagRef.current.innerHTML = `Active Phase: <strong>${PHASES[newActive].phase} — ${PHASES[newActive].title}</strong>`;
            }
          }
        },
      });
    }, pinnedStageRef);

    return () => ctx.revert();
  }, [totalLength]);

  return (
    <section className="roadmap-section" id="how-it-works" ref={sectionRef}>
      {/* ── 1. HEADING BLOCK (Scrolls naturally, precedes the pin) ── */}
      <div className="roadmap-intro-block">
        <div className="roadmap-header">
          <h2 className="roadmap-title">
            The Five-Phase <span className="roadmap-title-orange">Engineering Roadmap</span>
          </h2>
          <p className="roadmap-subtitle">
            A structured progression taking engineering talent from diagnostic<br />
            evaluation to direct fellowship placement.
          </p>
        </div>
      </div>

      {/* ── 2. PINNED TIMELINE STAGE (Pins precisely at 'top top' once heading scrolls past) ── */}
      <div className="roadmap-pin-wrapper">
        <div className="roadmap-pinned-stage" ref={pinnedStageRef}>
          <div className="roadmap-stage-inner">

            {/* Subtle top indicator bar preserving heading context while pinned */}
            <div className="roadmap-pinned-context-bar">
              <span className="roadmap-context-eyebrow">The Five-Phase Engineering Roadmap</span>
              <span className="roadmap-context-active-tag" ref={contextTagRef}>
                Active Phase: <strong>01 — Diagnostic Baseline</strong>
              </span>
            </div>

            {/* ── TIMELINE RULER (5 WEEKS) MATCHING REFERENCE ── */}
            <div className="roadmap-ruler">
              <div className="roadmap-ruler-grid">
                {PHASES.map((phase, idx) => (
                  <div
                    key={phase.phase}
                    ref={(el) => (rulerColRefs.current[idx] = el)}
                    className={`roadmap-ruler-col ${idx === 0 ? 'roadmap-ruler-col--active' : ''}`}
                  >
                    <span className="roadmap-ruler-label">{phase.scaleLabel}</span>
                    <div className="roadmap-ruler-tick" />
                    <div className="roadmap-ruler-active-bar" />
                  </div>
                ))}
              </div>
              <div className="roadmap-ruler-baseline" />
            </div>

            {/* ── ASCENDING STAIRCASE CANVAS (Bottom-Left to Top-Right) ── */}
            <div className="roadmap-canvas" ref={canvasRef}>
              {/* Continuous SVG Connecting Path */}
              <svg className="roadmap-svg" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <mask id="roadmap-mask">
                    <path
                      ref={maskPathRef}
                      d={pathD}
                      fill="none"
                      stroke="#FFFFFF"
                      strokeWidth="14"
                      strokeDasharray={totalLength || 1}
                      strokeDashoffset={totalLength || 1}
                    />
                  </mask>
                </defs>

                {/* Hidden path used for arc-length and coordinate sampling */}
                <path
                  ref={hiddenPathRef}
                  d={pathD}
                  fill="none"
                  stroke="transparent"
                  strokeWidth="1"
                />

                {/* Faint Background Guide Line (subtly visible across whole route) */}
                {pathD && (
                  <path
                    d={pathD}
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.14)"
                    strokeWidth="1.8"
                    strokeDasharray="5 6"
                  />
                )}

                {/* Active Luminous Orange Dotted Line */}
                {pathD && totalLength > 0 && (
                  <path
                    d={pathD}
                    fill="none"
                    stroke="#FF6A00"
                    strokeWidth="2.6"
                    strokeDasharray="5 6"
                    strokeLinecap="round"
                    mask="url(#roadmap-mask)"
                    className="roadmap-active-glow-path"
                  />
                )}

                {/* Moving Arrowhead traveling on leading tip */}
                {pathD && (
                  <g ref={arrowRef} className="roadmap-arrowhead">
                    <polygon
                      points="-7,-4.5 6,0 -7,4.5 -3.5,0"
                      fill="#FF6A00"
                      stroke="#080808"
                      strokeWidth="0.8"
                    />
                  </g>
                )}
              </svg>

              {/* Exactly Five Opaque Milestone Panels */}
              {PHASES.map((phase, idx) => (
                <div
                  key={phase.phase}
                  ref={(el) => (panelRefs.current[idx] = el)}
                  className={`roadmap-panel roadmap-panel--${phase.index} ${
                    idx === 0 ? 'roadmap-panel--active' : 'roadmap-panel--inactive'
                  }`}
                >
                  {/* Glowing Node on Left Edge */}
                  <div
                    ref={(el) => (nodeRefs.current[idx] = el)}
                    className={`roadmap-node ${idx === 0 ? 'roadmap-node--active' : ''}`}
                  />

                  {/* Left: Phase Number */}
                  <div className="roadmap-panel-left">
                    <span className="roadmap-panel-num">{phase.phase}</span>
                  </div>

                  {/* Vertical Divider */}
                  <div className="roadmap-panel-divider" />

                  {/* Middle: Title & Description */}
                  <div className="roadmap-panel-middle">
                    <h3 className="roadmap-panel-title">{phase.title}</h3>
                    <p className="roadmap-panel-desc">{phase.description}</p>
                  </div>

                  {/* Right: Week Duration */}
                  <div className="roadmap-panel-right">
                    <span className="roadmap-panel-week">{phase.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
