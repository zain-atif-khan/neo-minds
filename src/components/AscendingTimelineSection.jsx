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
    duration: '1–2 WEEKS',
    description: 'Algorithmic diagnostics & squad alignment',
    scaleLabel: 'WEEK 1–2',
  },
  {
    index: 1,
    phase: '02',
    title: 'Core Systems & Tooling',
    duration: '3–5 WEEKS',
    description: 'Modern engineering stacks & CI/CD pipelines',
    scaleLabel: 'WEEK 3–5',
  },
  {
    index: 2,
    phase: '03',
    title: 'Applied Architecture',
    duration: '6–8 WEEKS',
    description: 'Distributed services & real-time systems',
    scaleLabel: 'WEEK 6–8',
  },
  {
    index: 3,
    phase: '04',
    title: 'Partner Project Gate',
    duration: '9–12 WEEKS',
    description: 'Production code for industry partner briefs',
    scaleLabel: 'WEEK 9–12',
  },
  {
    index: 4,
    phase: '05',
    title: 'Technical Defense & Audit',
    duration: '13–14 WEEKS',
    description: 'Security fuzzing, architecture defense & stress tests',
    scaleLabel: 'WEEK 13–14',
  },
  {
    index: 5,
    phase: '06',
    title: 'Fellowship & Career Launch',
    duration: 'WEEK 15+',
    description: 'Direct company placement & talent network entry',
    scaleLabel: 'WEEK 15+',
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
  const [segmentStopLengths, setSegmentStopLengths] = useState([0, 0, 0, 0, 0, 0]);
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);
  const [completedPhases, setCompletedPhases] = useState([]);

  // Calculate the staircase connecting path
  const recalculatePath = () => {
    if (!svgRef.current || !canvasRef.current) return;
    const svgRect = svgRef.current.getBoundingClientRect();
    if (svgRect.width === 0 || svgRect.height === 0) return;

    const isMobile = window.innerWidth <= 768;

    // Collect exit and entrance points for each bar
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

    if (points.length < 6) return;

    // Build the continuous connecting SVG path from Phase 01 to Phase 06
    let d = `M ${points[0].out.x.toFixed(1)} ${points[0].out.y.toFixed(1)}`;
    for (let i = 0; i < points.length - 1; i++) {
      const pOut = points[i].out;
      const pIn = points[i + 1].in;
      const dx = pIn.x - pOut.x;
      const dy = pIn.y - pOut.y;

      if (isMobile) {
        // Vertical connecting segment on mobile
        const cp1x = pOut.x;
        const cp1y = pOut.y + dy * 0.45;
        const cp2x = pIn.x;
        const cp2y = pIn.y - dy * 0.45;
        d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${pIn.x.toFixed(1)} ${pIn.y.toFixed(1)}`;
      } else {
        // Architectural staircase curve: Leaves pOut horizontally, curves upward, enters pIn horizontally
        const cp1x = pOut.x + dx * 0.52;
        const cp1y = pOut.y;
        const cp2x = pOut.x + dx * 0.52;
        const cp2y = pIn.y;
        d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${pIn.x.toFixed(1)} ${pIn.y.toFixed(1)}`;
      }
    }

    setPathD(d);
  };

  useEffect(() => {
    recalculatePath();
    const handleResize = () => {
      recalculatePath();
    };

    window.addEventListener('resize', handleResize);
    const t1 = setTimeout(recalculatePath, 80);
    const t2 = setTimeout(recalculatePath, 350);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  // Compute exact arc lengths once SVG path `d` changes
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

      // Sample along the curve to find exact arc lengths when reaching each bar
      const samples = 350;
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

      // Initial arrowhead setup at Phase 01
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
  // Pins ONLY the timeline animation stage once it reaches below the sticky navbar.
  // The header & intro paragraph scroll normally above it!
  useEffect(() => {
    if (!pinnedStageRef.current || totalLength === 0 || segmentStopLengths.length < 6) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: pinnedStageRef.current,
        start: 'top 85px',
        end: '+=2400',
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        scrub: 0.5,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p = Math.max(0, Math.min(1, self.progress));
          const numSegments = 5;

          const segIdx = Math.min(Math.floor(p * numSegments), numSegments - 1);
          const segProgress = (p - segIdx / numSegments) * numSegments;

          // 82% of segment draws the line, 18% pauses at arrival for reveal
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

          if (p >= 0.99) {
            currentDist = totalLength;
          }

          // 1. Update SVG Mask strokeDashoffset
          if (maskPathRef.current) {
            const offset = Math.max(0, totalLength - currentDist);
            maskPathRef.current.style.strokeDashoffset = `${offset}`;
          }

          // 2. Position Arrowhead precisely along path with tangent angle
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

          // 3. Update active & completed phases
          let activeIdx = 0;
          if (p < 0.18) activeIdx = 0;
          else if (p < 0.38) activeIdx = 1;
          else if (p < 0.58) activeIdx = 2;
          else if (p < 0.78) activeIdx = 3;
          else if (p < 0.96) activeIdx = 4;
          else activeIdx = 5;

          setActivePhaseIndex(activeIdx);

          const completed = [];
          for (let i = 0; i < activeIdx; i++) {
            completed.push(i);
          }
          setCompletedPhases(completed);
        },
      });
    }, pinnedStageRef);

    return () => ctx.revert();
  }, [totalLength, segmentStopLengths]);

  return (
    <section className="ascending-timeline-section" id="how-it-works" ref={sectionRef}>
      {/* 1. SCROLLABLE INTRO BLOCK (Scrolls naturally, NOT part of pin) */}
      <div className="staircase-intro-block">
        <div className="staircase-header-row">
          <div className="staircase-title-block">
            <h2 className="staircase-heading">
              Where the six phases <span>actually lead.</span>
            </h2>
            <p className="staircase-subtext">
              A structured progression taking engineering talent from diagnostic evaluation to direct fellowship placement.
            </p>
          </div>

          <div className="staircase-status-badge">
            <span className="badge-live-dot" />
            <span>Active Milestone:</span>
            <span className="badge-phase-text">Phase {PHASES[activePhaseIndex].phase}</span>
          </div>
        </div>
      </div>

      {/* 2. PINNED TIMELINE STAGE (Pins only when reaching viewport below navbar) */}
      <div className="staircase-pin-trigger-wrapper">
        <div className="staircase-pinned-stage" ref={pinnedStageRef}>
          {/* Horizontal Timeline Scale Across the Top (Matching Image 2) */}
          <div className="staircase-scale-track">
            <div className="staircase-scale-labels">
              {PHASES.map((phase, idx) => {
                const isActive = activePhaseIndex === idx;
                return (
                  <div
                    key={phase.phase}
                    className={`scale-label-item ${isActive ? 'scale-active' : ''}`}
                  >
                    {phase.scaleLabel}
                  </div>
                );
              })}
            </div>
            <div className="staircase-scale-line" />
          </div>

          {/* Ascending Staircase Canvas (Bottom-Left to Top-Right) */}
          <div className="staircase-canvas" ref={canvasRef}>
            {/* Continuous SVG Connecting Path */}
            <svg className="staircase-svg-overlay" ref={svgRef} xmlns="http://www.w3.org/2000/svg">
              <defs>
                <mask id="staircase-mask">
                  <path
                    ref={maskPathRef}
                    d={pathD}
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="12"
                    strokeDasharray={totalLength || 1}
                    strokeDashoffset={totalLength || 1}
                  />
                </mask>
              </defs>

              {/* Hidden Path for distance queries */}
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
                  strokeDasharray="4 6"
                />
              )}

              {/* Active Orange Dotted Connecting Line */}
              {pathD && totalLength > 0 && (
                <path
                  d={pathD}
                  fill="none"
                  stroke="#FF6A00"
                  strokeWidth="2.8"
                  strokeDasharray="4 6"
                  strokeLinecap="round"
                  mask="url(#staircase-mask)"
                />
              )}

              {/* Small Precise Arrowhead traveling at leading tip */}
              {pathD && (
                <g ref={arrowRef} className="timeline-arrowhead">
                  <path
                    d="M -5 -3.5 L 4 0 L -5 3.5 L -2.5 0 Z"
                    fill="#FF6A00"
                    stroke="#080808"
                    strokeWidth="0.8"
                  />
                </g>
              )}
            </svg>

            {/* Exactly Six Opaque Horizontal Phase Bars */}
            {PHASES.map((phase) => {
              const isActive = activePhaseIndex === phase.index;
              const isCompleted = completedPhases.includes(phase.index);

              let barStateClass = 'bar-inactive';
              if (isActive) barStateClass = 'bar-active';
              else if (isCompleted) barStateClass = 'bar-completed';

              return (
                <div
                  key={phase.phase}
                  className={`staircase-bar ${barStateClass}`}
                >
                  {/* Left/Entrance Anchor Dot for SVG Line */}
                  <div
                    className="bar-anchor-dot bar-anchor-in"
                    ref={(el) => {
                      anchorInRefs.current[phase.index] = el;
                    }}
                  />

                  {/* Top Row: Phase Num + Title on Left, Duration on Right */}
                  <div className="bar-top-row">
                    <div className="bar-title-group">
                      <span className="bar-phase-num">{phase.phase}</span>
                      <h3 className="bar-title-text">{phase.title}</h3>
                    </div>
                    <span className="bar-duration-text">{phase.duration}</span>
                  </div>

                  {/* Bottom Row: Short Description */}
                  <p className="bar-desc-text">{phase.description}</p>

                  {/* Right/Exit Anchor Dot for SVG Line */}
                  <div
                    className="bar-anchor-dot bar-anchor-out"
                    ref={(el) => {
                      anchorOutRefs.current[phase.index] = el;
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
