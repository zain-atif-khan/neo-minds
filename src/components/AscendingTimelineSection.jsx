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
    title: 'Diagnostic Baseline & Squad Formation',
    duration: 'Weeks 1 – 2',
    status: 'Foundation',
    description: 'Algorithmic assessment, codebase diagnostic capability, and high-impact squad alignment.',
    colIndex: 0,
    colSpanLabel: 'Weeks 1 – 2',
  },
  {
    index: 1,
    phase: '02',
    title: 'Core Systems & Production Tooling',
    duration: 'Weeks 3 – 5',
    status: 'Acceleration',
    description: 'Mastery of modern engineering stacks, automated CI/CD pipelines, and enterprise testing standards.',
    colIndex: 1,
    colSpanLabel: 'Weeks 3 – 5',
  },
  {
    index: 2,
    phase: '03',
    title: 'Applied Architecture & Micro-Sprints',
    duration: 'Weeks 6 – 8',
    status: 'Development',
    description: 'Designing distributed services, real-time databases, and responsive interfaces under strict latency constraints.',
    colIndex: 2,
    colSpanLabel: 'Weeks 6 – 8',
  },
  {
    index: 3,
    phase: '04',
    title: 'Real-World Partner Project Gate',
    duration: 'Weeks 9 – 12',
    status: 'Immersion',
    description: 'Engineering battle-tested solutions for actual commercial partner briefs with weekly PR reviews from principal engineers.',
    colIndex: 3,
    colSpanLabel: 'Weeks 9 – 12',
  },
  {
    index: 4,
    phase: '05',
    title: 'Technical Defense & Security Audit',
    duration: 'Weeks 13 – 14',
    status: 'Hardening',
    description: 'Architectural defense presentations, rigorous stress testing, vulnerability scans, and performance optimizations.',
    colIndex: 4,
    colSpanLabel: 'Weeks 13 – 14',
  },
  {
    index: 5,
    phase: '06',
    title: 'Fellowship Placement & Career Launch',
    duration: 'Week 15+',
    status: 'Placement',
    description: 'Direct onboarding into partner company engineering teams, high-growth startup roles, and lifetime access to the Neo Minds talent network.',
    colIndex: 5,
    colSpanLabel: 'Week 15+',
  },
];

// Ascending row layout: Row 6 (Phase 06) is at top, down to Row 1 (Phase 01) at bottom
const DISPLAY_ROWS = [...PHASES].reverse();

const TIMELINE_COLUMNS = [
  { label: 'WEEKS 1 – 2', phase: '01' },
  { label: 'WEEKS 3 – 5', phase: '02' },
  { label: 'WEEKS 6 – 8', phase: '03' },
  { label: 'WEEKS 9 – 12', phase: '04' },
  { label: 'WEEKS 13 – 14', phase: '05' },
  { label: 'WEEK 15+', phase: '06' },
];

export default function AscendingTimelineSection() {
  const sectionRef = useRef(null);
  const rowsContainerRef = useRef(null);
  const svgRef = useRef(null);
  const hiddenPathRef = useRef(null);
  const maskPathRef = useRef(null);
  const arrowRef = useRef(null);
  const anchorRefs = useRef([]);

  const [pathD, setPathD] = useState('');
  const [totalLength, setTotalLength] = useState(0);
  const [phaseLengths, setPhaseLengths] = useState([0, 0, 0, 0, 0, 0]);
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);
  const [completedPhases, setCompletedPhases] = useState([]);

  // Calculate coordinates of connection anchors relative to SVG overlay
  const recalculateGeometry = () => {
    if (!svgRef.current || !rowsContainerRef.current) return;
    const svgRect = svgRef.current.getBoundingClientRect();
    if (svgRect.width === 0 || svgRect.height === 0) return;

    const isMobile = window.innerWidth <= 768;

    // Collect coordinates in chronological order (Phase 01 -> Phase 06)
    const points = PHASES.map((p) => {
      const el = anchorRefs.current[p.index];
      if (!el) return { x: 0, y: 0 };
      const r = el.getBoundingClientRect();
      return {
        x: r.left - svgRect.left + r.width / 2,
        y: r.top - svgRect.top + r.height / 2,
      };
    });

    if (points.some((pt) => pt.x === 0 && pt.y === 0)) return;

    // Build the ascending staircase path from Phase 01 (bottom-left) to Phase 06 (top-right)
    let d = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p1 = points[i];
      const p2 = points[i + 1];
      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;

      if (isMobile) {
        // Vertical connecting line on mobile
        const cp1x = p1.x;
        const cp1y = p1.y + dy * 0.45;
        const cp2x = p2.x;
        const cp2y = p2.y - dy * 0.45;
        d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
      } else {
        // Precision engineering staircase curve:
        // Leaves p1 moving rightwards, curves smoothly upward, enters p2 horizontally
        const cp1x = p1.x + dx * 0.52;
        const cp1y = p1.y;
        const cp2x = p1.x + dx * 0.52;
        const cp2y = p2.y;
        d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
      }
    }

    setPathD(d);
  };

  useEffect(() => {
    recalculateGeometry();
    const handleResize = () => {
      recalculateGeometry();
    };

    window.addEventListener('resize', handleResize);
    const timer1 = setTimeout(recalculateGeometry, 80);
    const timer2 = setTimeout(recalculateGeometry, 300);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  // Compute exact arc lengths once path `d` updates
  useEffect(() => {
    if (!hiddenPathRef.current || !pathD || !svgRef.current) return;
    try {
      const len = hiddenPathRef.current.getTotalLength();
      setTotalLength(len);

      const svgRect = svgRef.current.getBoundingClientRect();
      const points = PHASES.map((p) => {
        const el = anchorRefs.current[p.index];
        if (!el) return { x: 0, y: 0 };
        const r = el.getBoundingClientRect();
        return {
          x: r.left - svgRect.left + r.width / 2,
          y: r.top - svgRect.top + r.height / 2,
        };
      });

      // Sample along path to locate exact distances for each phase connection
      const samples = 300;
      const lengths = [0];
      for (let i = 1; i < points.length; i++) {
        const target = points[i];
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
      setPhaseLengths(lengths);

      // Initial arrowhead alignment at Phase 01
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
      // SVG geometry fallback
    }
  }, [pathD]);

  // GSAP ScrollTrigger Pinned Animation
  useEffect(() => {
    if (!sectionRef.current || totalLength === 0 || phaseLengths.length < 6) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 75px',
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
          const startLen = phaseLengths[segIdx];
          const endLen = phaseLengths[segIdx + 1];

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
    }, sectionRef);

    return () => ctx.revert();
  }, [totalLength, phaseLengths]);

  return (
    <section className="ascending-timeline-section" id="ascending-timeline" ref={sectionRef}>
      <div className="ascending-timeline-pin-container">
        {/* Section Header (Editorial, Strictly NO eyebrow) */}
        <div className="ascending-timeline-header-block">
          <div className="timeline-title-wrap">
            <h2 className="timeline-main-title">
              The Six-Phase <span>Engineering Roadmap</span>
            </h2>
            <p className="timeline-subtitle">
              A structured progression taking engineering talent from diagnostic evaluation to direct fellowship placement.
            </p>
          </div>

          <div className="timeline-active-status">
            <span className="status-indicator-dot" />
            <span>Active Milestone:</span>
            <span className="status-highlight-text">Phase {PHASES[activePhaseIndex].phase}</span>
          </div>
        </div>

        {/* Structured Timeline Board */}
        <div className="timeline-board">
          {/* Horizontal Timeline Scale Across the Top */}
          <div className="timeline-scale-header">
            <div className="scale-label-col">Program Milestone Track</div>
            <div className="scale-columns-grid">
              {TIMELINE_COLUMNS.map((col, idx) => {
                const isActive = activePhaseIndex === idx;
                return (
                  <div
                    key={col.phase}
                    className={`scale-column-slot ${isActive ? 'slot-active' : ''}`}
                  >
                    {col.label}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Staggered Rows Canvas */}
          <div className="timeline-rows-container" ref={rowsContainerRef}>
            {/* Background Column Lines */}
            <div className="timeline-grid-vertical-lines">
              {TIMELINE_COLUMNS.map((col) => (
                <div key={col.phase} className="grid-line-col" />
              ))}
            </div>

            {/* Continuous SVG Connecting Path */}
            <svg className="timeline-connecting-svg" ref={svgRef} xmlns="http://www.w3.org/2000/svg">
              <defs>
                <mask id="timeline-gantt-mask">
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

              {/* Hidden Path for length sampling */}
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
                  strokeDasharray="3 7"
                  strokeLinecap="round"
                  mask="url(#timeline-gantt-mask)"
                />
              )}

              {/* Precision Arrowhead traveling at leading edge of line */}
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

            {/* Render Rows in Ascending Order: Phase 06 at top, Phase 01 at bottom */}
            {DISPLAY_ROWS.map((phase) => {
              const isActive = activePhaseIndex === phase.index;
              const isCompleted = completedPhases.includes(phase.index);

              let rowClass = '';
              if (isActive) rowClass = 'row-state-active';
              else if (isCompleted) rowClass = 'row-state-completed';

              // Desktop column offset: each column is 16.666%
              const leftPercent = `${(phase.colIndex * 16.666).toFixed(2)}%`;
              const widthPercent = '16.666%';

              return (
                <div key={phase.phase} className={`timeline-phase-row ${rowClass}`}>
                  {/* Left Phase Information Cell */}
                  <div className="phase-info-cell">
                    <span className="phase-number-box">{phase.phase}</span>
                    <div className="phase-content-text">
                      <h3 className="phase-row-title">{phase.title}</h3>
                      <p className="phase-row-desc">{phase.description}</p>
                    </div>
                  </div>

                  {/* Right Track with Staggered Horizontal Bar Segment */}
                  <div className="phase-track-cell">
                    <div
                      className="timeline-bar-segment"
                      style={{
                        left: leftPercent,
                        width: widthPercent,
                      }}
                    >
                      <span className="bar-status-label">{phase.status}</span>
                      <span className="bar-duration-label">{phase.duration}</span>

                      {/* Bar Anchor Connection Point */}
                      <div
                        className="bar-connection-anchor"
                        ref={(el) => {
                          anchorRefs.current[phase.index] = el;
                        }}
                      />
                    </div>
                  </div>

                  {/* Mobile Left Anchor Point */}
                  <div className="mobile-row-anchor" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
