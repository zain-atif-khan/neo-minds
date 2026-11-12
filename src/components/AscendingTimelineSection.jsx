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
  const svgRef = useRef(null);
  const hiddenPathRef = useRef(null);
  const maskPathRef = useRef(null);
  const arrowRef = useRef(null);
  const anchorInRefs = useRef([]);
  const anchorOutRefs = useRef([]);

  const [pathD, setPathD] = useState('');
  const [totalLength, setTotalLength] = useState(0);
  const [segmentStopLengths, setSegmentStopLengths] = useState([0, 0, 0, 0, 0]);
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);

  // Recalculate the organic continuous SVG connecting path across the 5 phases
  const recalculatePath = () => {
    if (!svgRef.current || !canvasRef.current) return;
    const svgRect = svgRef.current.getBoundingClientRect();
    if (svgRect.width === 0 || svgRect.height === 0) return;

    const isMobile = window.innerWidth <= 768;

    // Collect exit and entrance coordinates for each milestone
    const points = [];
    for (let i = 0; i < PHASES.length; i++) {
      const elIn = anchorInRefs.current[i];
      const elOut = anchorOutRefs.current[i] || elIn;
      if (!elIn) return;

      const rIn = elIn.getBoundingClientRect();
      const rOut = elOut.getBoundingClientRect();

      points.push({
        in: {
          x: rIn.left - svgRect.left + rIn.width / 2,
          y: rIn.top - svgRect.top + rIn.height / 2,
        },
        out: {
          x: rOut.left - svgRect.left + rOut.width / 2,
          y: rOut.top - svgRect.top + rOut.height / 2,
        },
      });
    }

    if (points.length < 5) return;

    let d = '';

    if (isMobile) {
      // Clean vertical connecting path down the left side for mobile
      d = `M ${points[0].out.x.toFixed(1)} ${points[0].out.y.toFixed(1)}`;
      for (let i = 0; i < points.length - 1; i++) {
        const pOut = points[i].out;
        const pIn = points[i + 1].in;
        const dy = pIn.y - pOut.y;
        const cp1x = pOut.x;
        const cp1y = pOut.y + dy * 0.45;
        const cp2x = pIn.x;
        const cp2y = pIn.y - dy * 0.45;
        d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${pIn.x.toFixed(1)} ${pIn.y.toFixed(1)}`;
      }
    } else {
      // ── DESKTOP ASCENDING PATH WITH 4 UNIQUE CURVES & 360-DEGREE LOOP ──

      // 1. Connection 1 (Phase 01 -> Phase 02): Low sweeping curve with gentle rise
      const p0Out = points[0].out;
      const p1In = points[1].in;
      const dx0 = p1In.x - p0Out.x;
      const cp1_0x = p0Out.x + dx0 * 0.45;
      const cp1_0y = p0Out.y + 12;
      const cp2_0x = p1In.x - dx0 * 0.45;
      const cp2_0y = p1In.y + 12;

      d = `M ${p0Out.x.toFixed(1)} ${p0Out.y.toFixed(1)}`;
      d += ` C ${cp1_0x.toFixed(1)} ${cp1_0y.toFixed(1)}, ${cp2_0x.toFixed(1)} ${cp2_0y.toFixed(1)}, ${p1In.x.toFixed(1)} ${p1In.y.toFixed(1)}`;

      // Traverse through Phase 02 panel (hidden behind opaque panel)
      const p1Out = points[1].out;
      d += ` L ${p1Out.x.toFixed(1)} ${p1Out.y.toFixed(1)}`;

      // 2. Connection 2 (Phase 02 -> Phase 03): Taller, dramatic upward curve
      const p2In = points[2].in;
      const dx1 = p2In.x - p1Out.x;
      const peakY1 = p2In.y - 48; // Peaks dramatically above Phase 03
      const cp1_1x = p1Out.x + dx1 * 0.35;
      const cp1_1y = peakY1;
      const cp2_1x = p2In.x - dx1 * 0.35;
      const cp2_1y = peakY1;

      d += ` C ${cp1_1x.toFixed(1)} ${cp1_1y.toFixed(1)}, ${cp2_1x.toFixed(1)} ${cp2_1y.toFixed(1)}, ${p2In.x.toFixed(1)} ${p2In.y.toFixed(1)}`;

      // Traverse through Phase 03 panel
      const p2Out = points[2].out;
      d += ` L ${p2Out.x.toFixed(1)} ${p2Out.y.toFixed(1)}`;

      // 3. Connection 3 (Phase 03 -> Phase 04): Tighter bend followed by a wider sweeping movement
      const p3In = points[3].in;
      const dx2 = p3In.x - p2Out.x;
      const dy2 = p3In.y - p2Out.y;
      const mx2 = p2Out.x + dx2 * 0.32;
      const my2 = p2Out.y + dy2 * 0.7;

      // Sub-curve A: tight rise
      const cp1_2a_x = p2Out.x + dx2 * 0.12;
      const cp1_2a_y = p2Out.y;
      const cp2_2a_x = mx2 - dx2 * 0.08;
      const cp2_2a_y = my2 + 18;

      // Sub-curve B: expansive sweep into Phase 04
      const cp1_2b_x = mx2 + dx2 * 0.32;
      const cp1_2b_y = my2 - 22;
      const cp2_2b_x = p3In.x - dx2 * 0.28;
      const cp2_2b_y = p3In.y;

      d += ` C ${cp1_2a_x.toFixed(1)} ${cp1_2a_y.toFixed(1)}, ${cp2_2a_x.toFixed(1)} ${cp2_2a_y.toFixed(1)}, ${mx2.toFixed(1)} ${my2.toFixed(1)}`;
      d += ` C ${cp1_2b_x.toFixed(1)} ${cp1_2b_y.toFixed(1)}, ${cp2_2b_x.toFixed(1)} ${cp2_2b_y.toFixed(1)}, ${p3In.x.toFixed(1)} ${p3In.y.toFixed(1)}`;

      // Traverse through Phase 04 panel
      const p3Out = points[3].out;
      d += ` L ${p3Out.x.toFixed(1)} ${p3Out.y.toFixed(1)}`;

      // 4. Connection 4 (Phase 04 -> Phase 05): Genuine 360-degree loop that finishes at Phase 05
      const p4In = points[4].in;
      const dx3 = p4In.x - p3Out.x;
      const cx = p3Out.x + dx3 * 0.44; // Loop center X
      const cy = p4In.y - 25;           // Loop center Y (elevated near top)
      const r = 36;                     // Loop radius

      // Approach curve from Phase 04 to bottom of loop
      const loopStartX = cx - 8;
      const loopStartY = cy + r;
      const cp1_3x = p3Out.x + dx3 * 0.2;
      const cp1_3y = p3Out.y;
      const cp2_3x = cx - r * 0.75;
      const cp2_3y = loopStartY + 12;

      d += ` C ${cp1_3x.toFixed(1)} ${cp1_3y.toFixed(1)}, ${cp2_3x.toFixed(1)} ${cp2_3y.toFixed(1)}, ${loopStartX.toFixed(1)} ${loopStartY.toFixed(1)}`;

      // Full 360-Degree Loop:
      // Loop Arc 1: Sweep up the right side to top (cx, cy - r)
      const cp1_loop_x = cx + r * 0.95;
      const cp1_loop_y = cy + r * 0.65;
      const cp2_loop_x = cx + r * 0.95;
      const cp2_loop_y = cy - r * 0.65;
      const loopTopX = cx;
      const loopTopY = cy - r;

      d += ` C ${cp1_loop_x.toFixed(1)} ${cp1_loop_y.toFixed(1)}, ${cp2_loop_x.toFixed(1)} ${cp2_loop_y.toFixed(1)}, ${loopTopX.toFixed(1)} ${loopTopY.toFixed(1)}`;

      // Loop Arc 2: Sweep down the left side back across bottom (cx + 8, cy + r)
      const cp3_loop_x = cx - r * 0.95;
      const cp3_loop_y = cy - r * 0.65;
      const cp4_loop_x = cx - r * 0.95;
      const cp4_loop_y = cy + r * 0.65;
      const loopCrossX = cx + 8;
      const loopCrossY = cy + r;

      d += ` C ${cp3_loop_x.toFixed(1)} ${cp3_loop_y.toFixed(1)}, ${cp4_loop_x.toFixed(1)} ${cp4_loop_y.toFixed(1)}, ${loopCrossX.toFixed(1)} ${loopCrossY.toFixed(1)}`;

      // Exit curve out of loop towards Phase 05 entrance node
      const cp1_exit_x = cx + r + 22;
      const cp1_exit_y = cy + r * 0.3;
      const cp2_exit_x = p4In.x - 38;
      const cp2_exit_y = p4In.y + 6;

      d += ` C ${cp1_exit_x.toFixed(1)} ${cp1_exit_y.toFixed(1)}, ${cp2_exit_x.toFixed(1)} ${cp2_exit_y.toFixed(1)}, ${p4In.x.toFixed(1)} ${p4In.y.toFixed(1)}`;
    }

    setPathD(d);
  };

  useEffect(() => {
    recalculatePath();
    const handleResize = () => {
      recalculatePath();
    };

    window.addEventListener('resize', handleResize);
    const t1 = setTimeout(recalculatePath, 60);
    const t2 = setTimeout(recalculatePath, 250);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  // Compute exact arc lengths once SVG path `d` is populated
  useEffect(() => {
    if (!hiddenPathRef.current || !pathD || !svgRef.current) return;
    try {
      const len = hiddenPathRef.current.getTotalLength();
      setTotalLength(len);

      const svgRect = svgRef.current.getBoundingClientRect();
      const entrancePoints = PHASES.map((_, i) => {
        const el = anchorInRefs.current[i];
        if (!el) return { x: 0, y: 0 };
        const r = el.getBoundingClientRect();
        return {
          x: r.left - svgRect.left + r.width / 2,
          y: r.top - svgRect.top + r.height / 2,
        };
      });

      // Find exact arc length corresponding to arriving at each phase
      const samples = 400;
      const lengths = [0];
      for (let i = 1; i < entrancePoints.length; i++) {
        const target = entrancePoints[i];
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
        lengths.push(bestDist);
      }
      lengths[lengths.length - 1] = len;
      setSegmentStopLengths(lengths);

      // Initial arrowhead orientation at Phase 01
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

  // GSAP ScrollTrigger Pinned Animation:
  // Pins the timeline stage cleanly once the heading block has scrolled naturally.
  // Uses refreshPriority: 10 to ensure proper sequential trigger calculations.
  useEffect(() => {
    if (!pinnedStageRef.current || totalLength === 0 || segmentStopLengths.length < 5) return;

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
          const numSegments = 4; // 4 transitions between 5 phases

          const segIdx = Math.min(Math.floor(p * numSegments), numSegments - 1);
          const segProgress = (p - segIdx / numSegments) * numSegments;

          // 82% of each segment draws the line, 18% pauses at arrival for active milestone highlight
          const drawRatio = 0.82;
          const startLen = segmentStopLengths[segIdx];
          const endLen = segmentStopLengths[segIdx + 1];

          let currentDist = 0;
          if (segProgress < drawRatio) {
            const t = segProgress / drawRatio;
            currentDist = startLen + (endLen - startLen) * t;
          } else {
            currentDist = endLen;
          }

          if (p >= 0.98) {
            currentDist = totalLength;
          }

          // 1. Reveal active path stroke
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

          // 3. Highlight exact active phase
          let activeIdx = 0;
          if (p < 0.22) activeIdx = 0;
          else if (p < 0.48) activeIdx = 1;
          else if (p < 0.72) activeIdx = 2;
          else if (p < 0.94) activeIdx = 3;
          else activeIdx = 4;

          setActivePhaseIndex(activeIdx);
        },
      });

      // Synchronize trigger offsets across document
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    }, pinnedStageRef);

    return () => ctx.revert();
  }, [totalLength, segmentStopLengths]);

  return (
    <section className="roadmap-section" id="how-it-works" ref={sectionRef}>
      {/* ── 1. HEADING BLOCK (Scrolls naturally, precedes pin) ── */}
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
              <span className="roadmap-context-active-tag">
                Active Phase: <strong>{PHASES[activePhaseIndex].phase} — {PHASES[activePhaseIndex].title}</strong>
              </span>
            </div>

            {/* ── TIMELINE RULER (5 WEEKS) MATCHING REFERENCE ── */}
            <div className="roadmap-ruler">
              <div className="roadmap-ruler-grid">
                {PHASES.map((phase, idx) => {
                  const isActive = activePhaseIndex === idx;
                  return (
                    <div
                      key={phase.phase}
                      className={`roadmap-ruler-col ${isActive ? 'roadmap-ruler-col--active' : ''}`}
                    >
                      <span className="roadmap-ruler-label">{phase.scaleLabel}</span>
                      <div className="roadmap-ruler-tick" />
                      {isActive && <div className="roadmap-ruler-active-bar" />}
                    </div>
                  );
                })}
              </div>
              <div className="roadmap-ruler-baseline" />
            </div>

            {/* ── ASCENDING STAIRCASE CANVAS (Bottom-Left to Top-Right) ── */}
            <div className="roadmap-canvas" ref={canvasRef}>
              {/* Continuous SVG Connecting Path */}
              <svg className="roadmap-svg" ref={svgRef} xmlns="http://www.w3.org/2000/svg">
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

                {/* Faint Background Guide Line */}
                {pathD && (
                  <path
                    d={pathD}
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.08)"
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
              {PHASES.map((phase) => {
                const isActive = activePhaseIndex === phase.index;
                return (
                  <div
                    key={phase.phase}
                    className={`roadmap-panel roadmap-panel--${phase.index} ${
                      isActive ? 'roadmap-panel--active' : 'roadmap-panel--inactive'
                    }`}
                  >
                    {/* Glowing Node on Left Edge */}
                    <div
                      className={`roadmap-node ${isActive ? 'roadmap-node--active' : ''}`}
                      ref={(el) => (anchorInRefs.current[phase.index] = el)}
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

                    {/* Exit Anchor for SVG curve connections */}
                    <div
                      className="roadmap-anchor-exit"
                      ref={(el) => (anchorOutRefs.current[phase.index] = el)}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
