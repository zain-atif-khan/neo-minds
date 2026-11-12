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
  const pathRef = useRef(null);
  const arrowRef = useRef(null);

  const panelRefs = useRef([]);
  const nodeRefs = useRef([]);

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
      const startY = nodes[0].y - 25;
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
      // ── DESKTOP ASCENDING ROUTE WITH ORGANIC, INTENTIONAL CURVES ──
      const n0 = nodes[0];
      const n1 = nodes[1];
      const n2 = nodes[2];
      const n3 = nodes[3];
      const n4 = nodes[4];

      // Starting point: approach curve near Phase 01
      const startX = n0.x - 36;
      const startY = n0.y + 24;
      d = `M ${startX.toFixed(1)} ${startY.toFixed(1)}`;

      // Intro curve into Phase 01 left anchor
      const cp_intro1_x = startX + 14;
      const cp_intro1_y = startY + 4;
      const cp_intro2_x = n0.x - 16;
      const cp_intro2_y = n0.y + 10;
      d += ` C ${cp_intro1_x.toFixed(1)} ${cp_intro1_y.toFixed(1)}, ${cp_intro2_x.toFixed(1)} ${cp_intro2_y.toFixed(1)}, ${n0.x.toFixed(1)} ${n0.y.toFixed(1)}`;

      // 1. Phase 01 -> Phase 02: A gentle upward sweeping curve
      const dx0 = n1.x - n0.x;
      const cp1_0x = n0.x + dx0 * 0.35;
      const cp1_0y = n0.y + 18; // gentle pocket dip under card
      const cp2_0x = n1.x - dx0 * 0.30;
      const cp2_0y = n1.y + 20; // upward approach into Phase 02 anchor
      d += ` C ${cp1_0x.toFixed(1)} ${cp1_0y.toFixed(1)}, ${cp2_0x.toFixed(1)} ${cp2_0y.toFixed(1)}, ${n1.x.toFixed(1)} ${n1.y.toFixed(1)}`;

      // 2. Phase 02 -> Phase 03: A wider S-shaped curve with slightly different direction
      const dx1 = n2.x - n1.x;
      const dy1 = n2.y - n1.y;
      const inflect_x = n1.x + dx1 * 0.50;
      const inflect_y = n1.y + dy1 * 0.50;
      // First bend of S
      const cp1_1x = n1.x + dx1 * 0.22;
      const cp1_1y = n1.y - 28;
      const cp2_1x = inflect_x - dx1 * 0.14;
      const cp2_1y = inflect_y + 16;
      d += ` C ${cp1_1x.toFixed(1)} ${cp1_1y.toFixed(1)}, ${cp2_1x.toFixed(1)} ${cp2_1y.toFixed(1)}, ${inflect_x.toFixed(1)} ${inflect_y.toFixed(1)}`;
      // Second bend of S into Phase 03 anchor
      const cp3_1x = inflect_x + dx1 * 0.14;
      const cp3_1y = inflect_y - 16;
      const cp4_1x = n2.x - dx1 * 0.22;
      const cp4_1y = n2.y - 8;
      d += ` C ${cp3_1x.toFixed(1)} ${cp3_1y.toFixed(1)}, ${cp4_1x.toFixed(1)} ${cp4_1y.toFixed(1)}, ${n2.x.toFixed(1)} ${n2.y.toFixed(1)}`;

      // 3. Phase 03 -> Phase 04: A longer, more relaxed flowing curve
      const dx2 = n3.x - n2.x;
      const cp1_2x = n2.x + dx2 * 0.38;
      const cp1_2y = n2.y - 10;
      const cp2_2x = n3.x - dx2 * 0.38;
      const cp2_2y = n3.y + 20;
      d += ` C ${cp1_2x.toFixed(1)} ${cp1_2y.toFixed(1)}, ${cp2_2x.toFixed(1)} ${cp2_2y.toFixed(1)}, ${n3.x.toFixed(1)} ${n3.y.toFixed(1)}`;

      // 4. Phase 04 -> Phase 05: Tighter, elegant circular turn/loop & smooth final upward curve
      const dx3 = n4.x - n3.x;
      const loopR = 26;
      const loopCx = n3.x + dx3 * 0.44;
      const loopCy = Math.max(n4.y - 4, loopR + 8);

      // Approach curve to bottom-left of loop
      const loopEntryX = loopCx - 6;
      const loopEntryY = loopCy + loopR;
      const cp1_3x = n3.x + dx3 * 0.20;
      const cp1_3y = n3.y - 18;
      const cp2_3x = loopCx - loopR * 0.85;
      const cp2_3y = loopEntryY + 10;
      d += ` C ${cp1_3x.toFixed(1)} ${cp1_3y.toFixed(1)}, ${cp2_3x.toFixed(1)} ${cp2_3y.toFixed(1)}, ${loopEntryX.toFixed(1)} ${loopEntryY.toFixed(1)}`;

      // Clockwise Circular Turn / Loop:
      // Loop Arc 1: sweep up left side to top
      const cp1_loop_x = loopCx - loopR * 1.12;
      const cp1_loop_y = loopCy + loopR * 0.45;
      const cp2_loop_x = loopCx - loopR * 0.90;
      const cp2_loop_y = loopCy - loopR * 0.85;
      const loopTopX = loopCx;
      const loopTopY = loopCy - loopR;
      d += ` C ${cp1_loop_x.toFixed(1)} ${cp1_loop_y.toFixed(1)}, ${cp2_loop_x.toFixed(1)} ${cp2_loop_y.toFixed(1)}, ${loopTopX.toFixed(1)} ${loopTopY.toFixed(1)}`;

      // Loop Arc 2: sweep down right side crossing bottom
      const cp3_loop_x = loopCx + loopR * 0.90;
      const cp3_loop_y = loopCy - loopR * 0.85;
      const cp4_loop_x = loopCx + loopR * 1.12;
      const cp4_loop_y = loopCy + loopR * 0.45;
      const loopCrossX = loopCx + 8;
      const loopCrossY = loopCy + loopR;
      d += ` C ${cp3_loop_x.toFixed(1)} ${cp3_loop_y.toFixed(1)}, ${cp4_loop_x.toFixed(1)} ${cp4_loop_y.toFixed(1)}, ${loopCrossX.toFixed(1)} ${loopCrossY.toFixed(1)}`;

      // 5. Final smooth upward curve leading directly to Phase 05 anchor
      const cp1_exit_x = loopCx + loopR + 20;
      const cp1_exit_y = loopCy + loopR * 0.35;
      const cp2_exit_x = n4.x - 24;
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
    if (!pathRef.current || !pathD) return;
    try {
      const len = pathRef.current.getTotalLength();
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
          const pt = pathRef.current.getPointAtLength(l);
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
  // Heading scrolls naturally above the pinned area.
  // Stage pins ONLY when the heading has completely moved out of view!
  // Scrub draws the single SVG path and reveals each card strictly when line reaches it!
  // ZERO React re-renders during scroll for smooth 60fps performance!
  useEffect(() => {
    if (!pinnedStageRef.current || totalLength === 0 || nodeStopLengths.length < 5) return;

    // Reveal thresholds (progress p when each milestone is reached and revealed)
    const revealThresholds = [0.06, 0.28, 0.50, 0.72, 0.96];
    const L0 = nodeStopLengths[0];
    const L1 = nodeStopLengths[1];
    const L2 = nodeStopLengths[2];
    const L3 = nodeStopLengths[3];
    const L4 = nodeStopLengths[4];

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: pinnedStageRef.current,
        start: 'top 70px',
        end: '+=1600',
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
            // Segment 0 (Start -> Phase 01)
            const t = p / 0.06;
            currentDist = L0 * Math.min(Math.max(t, 0), 1);
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
            // Segment 4 (Phase 04 -> Loop -> Phase 05)
            const t = (p - 0.74) / 0.22;
            currentDist = L3 + (L4 - L3) * Math.min(Math.max(t, 0), 1);
          }

          if (p >= 0.96) {
            currentDist = totalLength;
          }

          // 2. Animate single strokeDashoffset from totalLength to 0
          if (pathRef.current) {
            const offset = Math.max(0, totalLength - currentDist);
            pathRef.current.style.strokeDashoffset = `${offset}`;
          }

          // 3. Arrowhead visibility & smooth tangent rotation along curve
          if (arrowRef.current && pathRef.current) {
            if (p < 0.015) {
              arrowRef.current.style.opacity = '0';
            } else {
              arrowRef.current.style.opacity = '1';

              const pt = pathRef.current.getPointAtLength(currentDist);
              const prevDist = Math.max(0, currentDist - 2);
              const prevPt = pathRef.current.getPointAtLength(prevDist);
              const nextDist = Math.min(totalLength, currentDist + 2);
              const nextPt = pathRef.current.getPointAtLength(nextDist);

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
        },
      });
    }, pinnedStageRef);

    return () => ctx.revert();
  }, [totalLength, nodeStopLengths]);

  return (
    <section className="roadmap-section" id="how-it-works" ref={sectionRef}>
      
      {/* ── 1. EDITORIAL HEADING BLOCK (Scrolls naturally, unpinned) ── */}
      <div className="roadmap-intro-block">
        <div className="roadmap-intro-inner">
          <h2 className="roadmap-title">
            The Five-Phase <span className="roadmap-title-orange">Engineering Roadmap</span>
          </h2>
          <p className="roadmap-subtitle">
            A structured progression taking engineering talent from diagnostic<br className="roadmap-break" />
            evaluation to direct fellowship placement.
          </p>
        </div>
      </div>

      {/* ── 2. PINNED ANIMATION STAGE (Pins ONLY after heading has scrolled above) ── */}
      <div className="roadmap-pin-wrapper">
        <div className="roadmap-pinned-stage" ref={pinnedStageRef}>
          <div className="roadmap-canvas" ref={canvasRef}>
            {/* Continuous SVG Connecting Path */}
            <svg className="roadmap-svg" xmlns="http://www.w3.org/2000/svg">
              {/* Single continuous animated SVG path */}
              {pathD && (
                <path
                  ref={pathRef}
                  d={pathD}
                  fill="none"
                  stroke="#FF6A00"
                  strokeWidth="2.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    strokeDasharray: totalLength || 1,
                    strokeDashoffset: totalLength || 1,
                  }}
                  className="roadmap-drawn-path"
                />
              )}

              {/* Moving Arrowhead traveling on leading tip */}
              {pathD && (
                <g ref={arrowRef} className="roadmap-arrowhead" style={{ opacity: 0 }}>
                  <polygon
                    points="-6,-3.5 5,0 -6,3.5 -3,0"
                    fill="#FF6A00"
                    stroke="#080808"
                    strokeWidth="0.8"
                  />
                </g>
              )}
            </svg>

            {/* Five Opaque Milestone Panels (Hidden initially, reveal progressively on scroll!) */}
            {PHASES.map((phase) => (
              <div
                key={phase.phase}
                ref={(el) => (panelRefs.current[phase.index] = el)}
                className={`roadmap-panel roadmap-panel--${phase.index} roadmap-panel--inactive`}
              >
                {/* Glowing Node on Left Edge */}
                <div
                  ref={(el) => (nodeRefs.current[phase.index] = el)}
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
    </section>
  );
}
