import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './AscendingTimelineSection.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const PHASES = [
  {
    phase: '01',
    title: 'Diagnostic Baseline & Squad Formation',
    duration: 'Weeks 1 – 2',
    status: 'Foundation',
    description: 'Algorithmic diagnostics, codebase audit capabilities, and high-impact squad alignment to calibrate individual technical starting points.',
  },
  {
    phase: '02',
    title: 'Core Systems & Production Tooling',
    duration: 'Weeks 3 – 5',
    status: 'Skill Acceleration',
    description: 'Mastery of modern engineering stacks, automated CI/CD pipelines, containerization, and enterprise testing standards.',
  },
  {
    phase: '03',
    title: 'Applied Architecture & Micro-Sprints',
    duration: 'Weeks 6 – 8',
    status: 'Core Development',
    description: 'Designing distributed services, real-time databases, and responsive interfaces under strict memory and latency boundaries.',
  },
  {
    phase: '04',
    title: 'Real-World Partner Project Gate',
    duration: 'Weeks 9 – 12',
    status: 'Industry Immersion',
    description: 'Engineering battle-tested solutions for actual commercial partner briefs with weekly PR reviews from principal engineers.',
  },
  {
    phase: '05',
    title: 'Technical Defense & Security Audit',
    duration: 'Weeks 13 – 14',
    status: 'Hardening',
    description: 'Architectural defense presentations, rigorous stress testing, vulnerability scans, and performance optimizations.',
  },
  {
    phase: '06',
    title: 'Fellowship Placement & Career Launch',
    duration: 'Week 15+',
    status: 'Career Acceleration',
    description: 'Direct onboarding into partner company engineering teams, high-growth startup roles, and lifetime access to the Neo Minds talent network.',
  },
];

export default function AscendingTimelineSection() {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const hiddenPathRef = useRef(null);
  const maskPathRef = useRef(null);
  const arrowRef = useRef(null);
  const anchorNodeRefs = useRef([]);

  const [pathD, setPathD] = useState('');
  const [totalLength, setTotalLength] = useState(0);
  const [phaseLengths, setPhaseLengths] = useState([0, 0, 0, 0, 0, 0]);
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);
  const [revealedPhases, setRevealedPhases] = useState([true, false, false, false, false, false]);

  // Recalculate anchor positions and generate the smooth ascending staircase path
  const recalculatePath = () => {
    if (!stageRef.current) return;
    const stageRect = stageRef.current.getBoundingClientRect();
    if (stageRect.width === 0 || stageRect.height === 0) return;

    const isMobile = window.innerWidth <= 680;

    const points = anchorNodeRefs.current.map((el) => {
      if (!el) return { x: 0, y: 0 };
      const r = el.getBoundingClientRect();
      return {
        x: r.left - stageRect.left + r.width / 2,
        y: r.top - stageRect.top + r.height / 2,
      };
    });

    if (points.length < 6 || points.some(p => p.x === 0 && p.y === 0)) return;

    let d = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p1 = points[i];
      const p2 = points[i + 1];
      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;

      if (isMobile) {
        // Vertical zigzag staircase curve on mobile
        const cp1x = p1.x + dx * 0.75;
        const cp1y = p1.y + dy * 0.15;
        const cp2x = p2.x - dx * 0.15;
        const cp2y = p2.y - dy * 0.15;
        d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
      } else {
        // Smooth ascending horizontal-then-vertical staircase curve on desktop
        const cp1x = p1.x + dx * 0.55;
        const cp1y = p1.y + dy * 0.04;
        const cp2x = p1.x + dx * 0.45;
        const cp2y = p2.y;
        d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
      }
    }

    setPathD(d);
  };

  // Recompute SVG path on mount and on window resize
  useEffect(() => {
    recalculatePath();
    const handleResize = () => {
      recalculatePath();
    };

    window.addEventListener('resize', handleResize);
    const t1 = setTimeout(recalculatePath, 100);
    const t2 = setTimeout(recalculatePath, 400);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  // Compute exact arc lengths once path `d` changes
  useEffect(() => {
    if (!hiddenPathRef.current || !pathD) return;
    try {
      const len = hiddenPathRef.current.getTotalLength();
      setTotalLength(len);

      const stageRect = stageRef.current?.getBoundingClientRect();
      if (!stageRect) return;

      const points = anchorNodeRefs.current.map((el) => {
        if (!el) return { x: 0, y: 0 };
        const r = el.getBoundingClientRect();
        return {
          x: r.left - stageRect.left + r.width / 2,
          y: r.top - stageRect.top + r.height / 2,
        };
      });

      // Sample along path to find exact arc lengths corresponding to each phase
      const samples = 350;
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

      // Initial position for arrowhead at Phase 01
      if (arrowRef.current && len > 0) {
        const p1 = hiddenPathRef.current.getPointAtLength(0);
        const p2 = hiddenPathRef.current.getPointAtLength(Math.min(4, len));
        const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x) * (180 / Math.PI);
        arrowRef.current.setAttribute('transform', `translate(${p1.x.toFixed(2)}, ${p1.y.toFixed(2)}) rotate(${angle.toFixed(2)})`);
      }
    } catch {
      // SVG geometry fallback
    }
  }, [pathD]);

  // Setup GSAP ScrollTrigger Pinning & Scrubbing
  useEffect(() => {
    if (!sectionRef.current || totalLength === 0 || phaseLengths.length < 6) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 75px',
        end: '+=2600',
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        scrub: 0.5,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p = Math.max(0, Math.min(1, self.progress));
          const numSegments = 5;

          // Segment index 0 to 4
          const segmentIndex = Math.min(Math.floor(p * numSegments), numSegments - 1);
          const segmentProgress = (p - segmentIndex / numSegments) * numSegments;

          // 82% of segment draws the line, 18% pauses at arrival for reveal
          const drawRatio = 0.82;
          const currentSegStartLen = phaseLengths[segmentIndex];
          const currentSegEndLen = phaseLengths[segmentIndex + 1];

          let currentDist = 0;
          if (segmentProgress < drawRatio) {
            const t = segmentProgress / drawRatio;
            currentDist = currentSegStartLen + (currentSegEndLen - currentSegStartLen) * t;
          } else {
            currentDist = currentSegEndLen;
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

          // 3. Determine active phase and revealed phases
          let activeIdx = 0;
          if (p < 0.18) activeIdx = 0;
          else if (p < 0.38) activeIdx = 1;
          else if (p < 0.58) activeIdx = 2;
          else if (p < 0.78) activeIdx = 3;
          else if (p < 0.96) activeIdx = 4;
          else activeIdx = 5;

          setActivePhaseIndex(activeIdx);

          setRevealedPhases([
            true, // Phase 01 always revealed
            p >= 0.16, // Phase 02
            p >= 0.36, // Phase 03
            p >= 0.56, // Phase 04
            p >= 0.76, // Phase 05
            p >= 0.94, // Phase 06
          ]);
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [totalLength, phaseLengths]);

  return (
    <section className="ascending-timeline-section" id="ascending-timeline" ref={sectionRef}>
      <div className="ascending-timeline-pin-container">
        {/* Editorial Section Header — Strictly NO eyebrow labels */}
        <div className="ascending-timeline-header">
          <h2 className="ascending-timeline-title">
            The Ascending <span>Engineering Pathway</span>
          </h2>
          <p className="ascending-timeline-subtext">
            Six rigorous milestones engineered to advance raw potential into high-impact, industry-ready technical leadership.
          </p>

          {/* Real-time Stage Status Badge */}
          <div className="ascending-timeline-indicator">
            <span className="live-indicator-dot" />
            <span>Active Milestone:</span>
            <span className="phase-count">Phase {PHASES[activePhaseIndex].phase}</span>
          </div>
        </div>

        {/* Main Staircase Stage Canvas */}
        <div className="ascending-timeline-stage" ref={stageRef}>
          {/* Full-bleed SVG Overlay with Masked Dotted Drawing & Traveling Arrow */}
          <svg className="ascending-timeline-svg" xmlns="http://www.w3.org/2000/svg">
            <defs>
              {/* Mask revealing the dotted path strictly according to scroll progress */}
              <mask id="ascending-timeline-mask">
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

            {/* Hidden Reference Path for exact getPointAtLength() queries */}
            <path
              ref={hiddenPathRef}
              d={pathD}
              fill="none"
              stroke="transparent"
              strokeWidth="1"
            />

            {/* Faint Background Guide Track */}
            {pathD && (
              <path
                d={pathD}
                fill="none"
                stroke="rgba(255, 255, 255, 0.08)"
                strokeWidth="2"
                strokeDasharray="4 6"
              />
            )}

            {/* Active Vibrant Orange Dotted Line (#FF6A00) */}
            {pathD && totalLength > 0 && (
              <path
                d={pathD}
                fill="none"
                stroke="#FF6A00"
                strokeWidth="3.2"
                strokeDasharray="4 8"
                strokeLinecap="round"
                mask="url(#ascending-timeline-mask)"
              />
            )}

            {/* Direction Arrowhead traveling at leading tip of SVG line */}
            {pathD && (
              <g ref={arrowRef} className="timeline-arrowhead">
                <circle r="10" fill="#FF6A00" fillOpacity="0.22" />
                <path
                  d="M -7 -5 L 6 0 L -7 5 L -3.5 0 Z"
                  fill="#FF6A00"
                  stroke="#080808"
                  strokeWidth="0.8"
                />
              </g>
            )}
          </svg>

          {/* Exactly Six Ascending Phase Nodes */}
          {PHASES.map((phase, idx) => {
            const isRevealed = revealedPhases[idx];
            const isActive = activePhaseIndex === idx;
            const isCompleted = activePhaseIndex > idx;

            let stateClass = 'phase-state-inactive';
            if (isActive) stateClass = 'phase-state-active';
            else if (isCompleted) stateClass = 'phase-state-completed';

            return (
              <div
                key={phase.phase}
                className={`ascending-phase-item ${stateClass}`}
                style={{
                  opacity: isRevealed ? (isActive ? 1 : isCompleted ? 0.82 : 0) : 0,
                  transform: isRevealed ? 'translateY(0)' : 'translateY(22px)',
                }}
              >
                {/* Anchor connection node */}
                <div
                  className="phase-anchor-node"
                  ref={(el) => {
                    anchorNodeRefs.current[idx] = el;
                  }}
                >
                  <div className="phase-node-outer-ring" />
                  <div className="phase-node-center-dot" />
                </div>

                {/* Phase Number & Duration/Status Badge */}
                <div className="phase-meta-row">
                  <span className="phase-number">{phase.phase}</span>
                  <span className="phase-duration-tag">{phase.duration}</span>
                </div>

                {/* Phase Title */}
                <h3 className="phase-title">{phase.title}</h3>

                {/* Phase Description */}
                <p className="phase-description">{phase.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

