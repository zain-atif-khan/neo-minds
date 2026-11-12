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
  },
  {
    index: 1,
    phase: '02',
    title: 'Core Systems & Tooling',
    duration: 'WEEK 3 – 5',
    description: 'Modern engineering stacks & CI/CD pipelines',
  },
  {
    index: 2,
    phase: '03',
    title: 'Applied Architecture',
    duration: 'WEEK 6 – 8',
    description: 'Distributed services & real-time systems',
  },
  {
    index: 3,
    phase: '04',
    title: 'Partner Project Gate',
    duration: 'WEEK 9 – 12',
    description: 'Production code for industry partner briefs',
  },
  {
    index: 4,
    phase: '05',
    title: 'Intern & Career Launch',
    duration: 'WEEK 13 – 14',
    description: 'Direct placement & industry onboarding',
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
  const contextTagRef = useRef(null);

  const [pathD, setPathD] = useState('');
  const [totalLength, setTotalLength] = useState(0);
  const [nodeStopLengths, setNodeStopLengths] = useState([0, 0, 0, 0, 0]);

  // Dynamic, organic SVG path calculation using DOM layout offsets
  const computePath = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const panels = panelRefs.current.filter(Boolean);
    if (panels.length < 5) return;

    // Measure node center relative to canvas
    const nodes = panels.map((panel) => ({
      x: panel.offsetLeft + 2,
      y: panel.offsetTop + panel.offsetHeight / 2,
    }));

    const isMobile = window.innerWidth <= 768;
    let d = '';

    if (isMobile) {
      // Mobile route: starts slightly above Phase 01 and connects nodes down left side
      const startY = nodes[0].y - 30;
      d = `M ${nodes[0].x.toFixed(1)} ${startY.toFixed(1)}`;
      d += ` L ${nodes[0].x.toFixed(1)} ${nodes[0].y.toFixed(1)}`;

      for (let i = 0; i < nodes.length - 1; i++) {
        const nA = nodes[i];
        const nB = nodes[i + 1];
        const dy = nB.y - nA.y;
        const cp1x = nA.x - 14;
        const cp1y = nA.y + dy * 0.35;
        const cp2x = nB.x - 14;
        const cp2y = nB.y - dy * 0.35;
        d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${nB.x.toFixed(1)} ${nB.y.toFixed(1)}`;
      }
    } else {
      // ── DESKTOP ASCENDING ROUTE WITH ORGANIC DIVERSE CURVES & 360-DEGREE LOOP ──
      const n0 = nodes[0];
      const n1 = nodes[1];
      const n2 = nodes[2];
      const n3 = nodes[3];
      const n4 = nodes[4];

      // Starting point: approach curve into Phase 01
      const startX = n0.x - 45;
      const startY = n0.y + 36;
      d = `M ${startX.toFixed(1)} ${startY.toFixed(1)}`;

      // Intro curve into Phase 01 node
      const cp_intro1_x = startX + 18;
      const cp_intro1_y = startY + 6;
      const cp_intro2_x = n0.x - 22;
      const cp_intro2_y = n0.y + 16;
      d += ` C ${cp_intro1_x.toFixed(1)} ${cp_intro1_y.toFixed(1)}, ${cp_intro2_x.toFixed(1)} ${cp_intro2_y.toFixed(1)}, ${n0.x.toFixed(1)} ${n0.y.toFixed(1)}`;

      // 1. Connection 1 (Phase 01 -> Phase 02): Low sweeping pocket curve with gentle rise
      const dx0 = n1.x - n0.x;
      const m1_x = n0.x + dx0 * 0.46;
      const m1_y = n0.y + 26; // graceful pocket dip
      // Sub-curve 1a: dip
      const cp1_0a_x = n0.x + dx0 * 0.22;
      const cp1_0a_y = n0.y + 20;
      const cp2_0a_x = m1_x - dx0 * 0.12;
      const cp2_0a_y = m1_y + 4;
      // Sub-curve 1b: ascent into Phase 02
      const cp1_0b_x = m1_x + dx0 * 0.26;
      const cp1_0b_y = m1_y - 32;
      const cp2_0b_x = n1.x - dx0 * 0.20;
      const cp2_0b_y = n1.y + 12;
      d += ` C ${cp1_0a_x.toFixed(1)} ${cp1_0a_y.toFixed(1)}, ${cp2_0a_x.toFixed(1)} ${cp2_0a_y.toFixed(1)}, ${m1_x.toFixed(1)} ${m1_y.toFixed(1)}`;
      d += ` C ${cp1_0b_x.toFixed(1)} ${cp1_0b_y.toFixed(1)}, ${cp2_0b_x.toFixed(1)} ${cp2_0b_y.toFixed(1)}, ${n1.x.toFixed(1)} ${n1.y.toFixed(1)}`;

      // 2. Connection 2 (Phase 02 -> Phase 03): Tall dramatic arch with serpentine crest
      const dx1 = n2.x - n1.x;
      const h_peak = n2.y - 54; // peaks above Phase 03
      const s2_x = n1.x + dx1 * 0.52;
      const s2_y = h_peak - 4;
      // Sub-curve 2a: steep upward surge
      const cp1_1a_x = n1.x + dx1 * 0.18;
      const cp1_1a_y = n1.y - 38;
      const cp2_1a_x = s2_x - dx1 * 0.16;
      const cp2_1a_y = h_peak - 12;
      // Sub-curve 2b: graceful swoop down into Phase 03
      const cp1_1b_x = s2_x + dx1 * 0.22;
      const cp1_1b_y = h_peak + 6;
      const cp2_1b_x = n2.x - dx1 * 0.18;
      const cp2_1b_y = n2.y - 24;
      d += ` C ${cp1_1a_x.toFixed(1)} ${cp1_1a_y.toFixed(1)}, ${cp2_1a_x.toFixed(1)} ${cp2_1a_y.toFixed(1)}, ${s2_x.toFixed(1)} ${s2_y.toFixed(1)}`;
      d += ` C ${cp1_1b_x.toFixed(1)} ${cp1_1b_y.toFixed(1)}, ${cp2_1b_x.toFixed(1)} ${cp2_1b_y.toFixed(1)}, ${n2.x.toFixed(1)} ${n2.y.toFixed(1)}`;

      // 3. Connection 3 (Phase 03 -> Phase 04): Tight hook followed by expansive sweep
      const dx2 = n3.x - n2.x;
      const dy2 = n3.y - n2.y;
      const m2_x = n2.x + dx2 * 0.35;
      const m2_y = n2.y + dy2 * 0.74;
      // Sub-curve 3a: tight hook rise
      const cp1_2a_x = n2.x + dx2 * 0.12;
      const cp1_2a_y = n2.y - 22;
      const cp2_2a_x = m2_x - dx2 * 0.08;
      const cp2_2a_y = m2_y + 16;
      // Sub-curve 3b: wide expansive arrival
      const cp1_2b_x = m2_x + dx2 * 0.35;
      const cp1_2b_y = m2_y - 26;
      const cp2_2b_x = n3.x - dx2 * 0.24;
      const cp2_2b_y = n3.y;
      d += ` C ${cp1_2a_x.toFixed(1)} ${cp1_2a_y.toFixed(1)}, ${cp2_2a_x.toFixed(1)} ${cp2_2a_y.toFixed(1)}, ${m2_x.toFixed(1)} ${m2_y.toFixed(1)}`;
      d += ` C ${cp1_2b_x.toFixed(1)} ${cp1_2b_y.toFixed(1)}, ${cp2_2b_x.toFixed(1)} ${cp2_2b_y.toFixed(1)}, ${n3.x.toFixed(1)} ${n3.y.toFixed(1)}`;

      // 4. Connection 4 (Phase 04 -> Phase 05): Genuine, prominent 360-degree loop
      const dx3 = n4.x - n3.x;
      const loopR = 34;
      const loopCx = n3.x + dx3 * 0.44;
      const loopCy = Math.max(n4.y - 12, loopR + 6);

      // Approach curve to bottom-left of loop
      const loopEntryX = loopCx - 10;
      const loopEntryY = loopCy + loopR;
      const cp1_3x = n3.x + dx3 * 0.18;
      const cp1_3y = n3.y - 18;
      const cp2_3x = loopCx - loopR * 0.85;
      const cp2_3y = loopEntryY + 12;
      d += ` C ${cp1_3x.toFixed(1)} ${cp1_3y.toFixed(1)}, ${cp2_3x.toFixed(1)} ${cp2_3y.toFixed(1)}, ${loopEntryX.toFixed(1)} ${loopEntryY.toFixed(1)}`;

      // Complete 360-Degree Loop (Clockwise):
      // Loop Arc 1: sweep up left side to top (loopCx + 2, loopCy - loopR)
      const cp1_loop_x = loopCx - loopR * 1.15;
      const cp1_loop_y = loopCy + loopR * 0.45;
      const cp2_loop_x = loopCx - loopR * 1.05;
      const cp2_loop_y = loopCy - loopR * 0.85;
      const loopTopX = loopCx + 2;
      const loopTopY = loopCy - loopR;
      d += ` C ${cp1_loop_x.toFixed(1)} ${cp1_loop_y.toFixed(1)}, ${cp2_loop_x.toFixed(1)} ${cp2_loop_y.toFixed(1)}, ${loopTopX.toFixed(1)} ${loopTopY.toFixed(1)}`;

      // Loop Arc 2: sweep down right side crossing bottom (loopCx + 12, loopCy + loopR)
      const cp3_loop_x = loopCx + loopR * 1.15;
      const cp3_loop_y = loopCy - loopR * 0.45;
      const cp4_loop_x = loopCx + loopR * 1.05;
      const cp4_loop_y = loopCy + loopR * 0.85;
      const loopCrossX = loopCx + 12;
      const loopCrossY = loopCy + loopR;
      d += ` C ${cp3_loop_x.toFixed(1)} ${cp3_loop_y.toFixed(1)}, ${cp4_loop_x.toFixed(1)} ${cp4_loop_y.toFixed(1)}, ${loopCrossX.toFixed(1)} ${loopCrossY.toFixed(1)}`;

      // Exit curve from loop towards Phase 05 entrance node
      const cp1_exit_x = loopCx + loopR + 28;
      const cp1_exit_y = loopCy + loopR * 0.35;
      const cp2_exit_x = n4.x - 32;
      const cp2_exit_y = n4.y + 2;
      d += ` C ${cp1_exit_x.toFixed(1)} ${cp1_exit_y.toFixed(1)}, ${cp2_exit_x.toFixed(1)} ${cp2_exit_y.toFixed(1)}, ${n4.x.toFixed(1)} ${n4.y.toFixed(1)}`;
    }

    setPathD(d);
  };

  useEffect(() => {
    computePath();
    const handleResize = () => {
      computePath();
    };

    window.addEventListener('resize', handleResize);
    const t = setTimeout(computePath, 100);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(t);
    };
  }, []);

  // Compute exact arc lengths corresponding to each milestone node
  useEffect(() => {
    if (!hiddenPathRef.current || !pathD) return;
    try {
      const len = hiddenPathRef.current.getTotalLength();
      setTotalLength(len);

      const panels = panelRefs.current.filter(Boolean);
      if (panels.length < 5) return;

      const nodes = panels.map((panel) => ({
        x: panel.offsetLeft + 2,
        y: panel.offsetTop + panel.offsetHeight / 2,
      }));

      const samples = 450;
      const stopLens = [];

      for (let i = 0; i < nodes.length; i++) {
        const target = nodes[i];
        let bestDist = 0;
        let minDistSq = Infinity;
        for (let s = 0; s <= samples; s++) {
          const l = (s / samples) * len;
          const pt = hiddenPathRef.current.getPointAtLength(l);
          const distSq = (pt.x - target.x) ** 2 + (pt.y - target.y) ** 2;
          if (distSq < minDistSq) {
            minDistSq = distSq;
            bestDist = l;
          }
        }
        stopLens.push(bestDist);
      }
      stopLens[stopLens.length - 1] = len;
      setNodeStopLengths(stopLens);
    } catch {
      // Geometry fallback
    }
  }, [pathD]);

  // High-performance GSAP ScrollTrigger:
  // Progressively draws SVG path and reveals each card strictly when line reaches it!
  // ZERO React re-renders during scroll for buttery-smooth 60fps performance!
  useEffect(() => {
    if (!pinnedStageRef.current || totalLength === 0 || nodeStopLengths.length < 5) return;

    let activeIndexRef = -1;

    // Reveal thresholds (progress p when each milestone is reached and revealed)
    const revealThresholds = [0.06, 0.28, 0.50, 0.72, 0.94];
    const L0 = nodeStopLengths[0];
    const L1 = nodeStopLengths[1];
    const L2 = nodeStopLengths[2];
    const L3 = nodeStopLengths[3];
    const L4 = nodeStopLengths[4];

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: pinnedStageRef.current,
        start: 'top 70px',
        end: '+=2400',
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        scrub: 0.5,
        refreshPriority: 10,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p = Math.max(0, Math.min(1, self.progress));

          // 1. Calculate continuous path distance synchronized with arrival intervals
          let currentDist = 0;
          if (p < 0.08) {
            // Segment 0 (Pstart -> Phase 01)
            const t = p / 0.06;
            currentDist = L0 * Math.min(t, 1);
          } else if (p < 0.30) {
            // Segment 1 (Phase 01 -> Phase 02)
            const t = (p - 0.08) / 0.20;
            currentDist = L0 + (L1 - L0) * Math.min(Math.max(t, 0), 1);
          } else if (p < 0.52) {
            // Segment 2 (Phase 02 -> Phase 03)
            const t = (p - 0.30) / 0.20;
            currentDist = L1 + (L2 - L1) * Math.min(Math.max(t, 0), 1);
          } else if (p < 0.74) {
            // Segment 3 (Phase 03 -> Phase 04)
            const t = (p - 0.52) / 0.20;
            currentDist = L2 + (L3 - L2) * Math.min(Math.max(t, 0), 1);
          } else {
            // Segment 4 (Phase 04 -> 360 Loop -> Phase 05)
            const t = (p - 0.74) / 0.20;
            currentDist = L3 + (L4 - L3) * Math.min(Math.max(t, 0), 1);
          }

          if (p >= 0.94) {
            currentDist = totalLength;
          }

          // 2. Reveal SVG active stroke
          if (maskPathRef.current) {
            const offset = Math.max(0, totalLength - currentDist);
            maskPathRef.current.style.strokeDashoffset = `${offset}`;
          }

          // 3. Arrowhead visibility & smooth tangent rotation along curve
          if (arrowRef.current && hiddenPathRef.current) {
            if (p < 0.015) {
              arrowRef.current.style.opacity = '0';
            } else {
              arrowRef.current.style.opacity = '1';

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
          }

          // 4. Milestone Individual Reveal & Active State Management
          let currentActive = -1;
          if (p >= revealThresholds[4]) currentActive = 4;
          else if (p >= revealThresholds[3]) currentActive = 3;
          else if (p >= revealThresholds[2]) currentActive = 2;
          else if (p >= revealThresholds[1]) currentActive = 1;
          else if (p >= revealThresholds[0]) currentActive = 0;

          // Toggle revealed and active classes on each panel
          panelRefs.current.forEach((panel, i) => {
            if (!panel) return;
            const isRevealed = p >= revealThresholds[i];
            const isActive = isRevealed && i === currentActive;

            panel.classList.toggle('roadmap-panel--revealed', isRevealed);
            panel.classList.toggle('roadmap-panel--active', isActive);
            panel.classList.toggle('roadmap-panel--inactive', isRevealed && !isActive);
          });

          // Toggle active glowing node
          nodeRefs.current.forEach((node, i) => {
            if (!node) return;
            const isRevealed = p >= revealThresholds[i];
            const isActive = isRevealed && i === currentActive;
            node.classList.toggle('roadmap-node--active', isActive);
          });

          // Update Context Header Tag
          if (currentActive !== activeIndexRef) {
            activeIndexRef = currentActive;
            if (contextTagRef.current) {
              if (currentActive >= 0) {
                contextTagRef.current.innerHTML = `Active Milestone: <strong>${PHASES[currentActive].phase} — ${PHASES[currentActive].title}</strong>`;
              } else {
                contextTagRef.current.innerHTML = `Active Milestone: <strong>Scroll to Begin</strong>`;
              }
            }
          }
        },
      });
    }, pinnedStageRef);

    return () => ctx.revert();
  }, [totalLength, nodeStopLengths]);

  return (
    <section className="roadmap-section" id="how-it-works" ref={sectionRef}>
      <div className="roadmap-pin-wrapper">
        <div className="roadmap-pinned-stage" ref={pinnedStageRef}>
          <div className="roadmap-stage-inner">

            {/* ── SECTION HEADING (Remains visible throughout pinned animation) ── */}
            <div className="roadmap-header">
              <div className="roadmap-title-row">
                <div className="roadmap-title-block">
                  <h2 className="roadmap-title">
                    The Five-Phase <span className="roadmap-title-orange">Engineering Roadmap</span>
                  </h2>
                  <p className="roadmap-subtitle">
                    A structured progression taking engineering talent from diagnostic<br />
                    evaluation to direct fellowship placement.
                  </p>
                </div>

                {/* Active Phase Badge Indicator */}
                <div className="roadmap-context-badge">
                  <span className="roadmap-live-dot" />
                  <span className="roadmap-context-active-tag" ref={contextTagRef}>
                    Active Milestone: <strong>Scroll to Begin</strong>
                  </span>
                </div>
              </div>
            </div>

            {/* ── PROGRESSIVE ASCENDING STAIRCASE CANVAS (Cards reveal on arrival) ── */}
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

                {/* Active Luminous Orange Dotted Line (Progressively revealed, future segments hidden!) */}
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
                  <g ref={arrowRef} className="roadmap-arrowhead" style={{ opacity: 0 }}>
                    <polygon
                      points="-7,-4.5 6,0 -7,4.5 -3.5,0"
                      fill="#FF6A00"
                      stroke="#080808"
                      strokeWidth="0.8"
                    />
                  </g>
                )}
              </svg>

              {/* Five Opaque Milestone Panels (Hidden initially, reveal progressively on scroll!) */}
              {PHASES.map((phase, idx) => (
                <div
                  key={phase.phase}
                  ref={(el) => (panelRefs.current[idx] = el)}
                  className={`roadmap-panel roadmap-panel--${phase.index} roadmap-panel--inactive`}
                >
                  {/* Glowing Node on Left Edge */}
                  <div
                    ref={(el) => (nodeRefs.current[idx] = el)}
                    className="roadmap-node"
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
