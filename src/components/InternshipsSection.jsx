import React, { useState, useRef } from 'react';

const GATES = [
  {
    step: '01',
    name: 'APPLY',
    subject: 'PROFILE + PORTFOLIO',
    items: [
      'Your background and course details',
      'Projects you have already built',
      'Links to your work',
      'Basic profile information',
    ],
    statusDesc: 'Submit your background and verified project links to enter the candidate pipeline.',
    cta: 'SUBMIT PROFILE & PROJECTS',
    note: 'Your actual project proof opens the door — not a resume keyword scan.',
  },
  {
    step: '02',
    name: 'ASSESS',
    subject: 'SKILL ASSESSMENT',
    items: [
      'Problem solving & algorithmic logic',
      'Technical understanding & code quality',
      'Practical engineering execution',
      'Communication of architectural tradeoffs',
    ],
    statusDesc: 'Complete a practical engineering assessment to benchmark your skills directly for company matching.',
    ctaPending: 'TAKE THE SKILL ASSESSMENT',
    ctaReady: 'RETAKE SKILL ASSESSMENT',
    note: 'The assessment is practical, not a trick quiz. We want to see how you build and think.',
  },
  {
    step: '03',
    name: 'SHORTLIST',
    subject: 'PROJECT REVIEW',
    items: [
      'Production code standards & architecture',
      'Verified real-world project outcomes',
      'Technical problem-solving depth',
      'Portfolio proof & live deployment',
    ],
    statusDesc: 'Companies review your verified project decisions directly from our talent bench.',
    ctaPending: 'COMPLETE ASSESSMENT FIRST',
    ctaReady: 'APPLY FOR SHORTLIST',
    note: 'Partner engineering teams evaluate your genuine commits and repository trade-offs.',
  },
  {
    step: '04',
    name: 'INTERVIEW',
    subject: 'TECHNICAL REVIEW',
    items: [
      'Technical discussion around your code',
      'Scenario-based engineering challenges',
      'Team communication & collaboration',
      'System design and architecture decisions',
    ],
    statusDesc: 'Direct conversation with lead engineers focusing on what you actually built.',
    cta: 'TECHNICAL PREPARATION GUIDE',
    note: 'A genuine discussion around your architecture tradeoffs with engineering founders.',
  },
  {
    step: '05',
    name: 'INTERNSHIP',
    subject: 'PRODUCTION PLACEMENT',
    items: [
      'Real client & production software work',
      'Dedicated senior mentor guidance',
      'Regular performance benchmarks & feedback',
      'Direct full-time conversion opportunities',
    ],
    statusDesc: 'Commercial engagements with senior leads guiding your production deliverables.',
    cta: 'EXPLORE PARTNER COMPANIES',
    note: 'Paid placements with top engineering teams and dedicated senior mentorship.',
  },
];

// Organic hand-drawn curved vertical divider lines between gates (exact curvature from reference screenshot)
const IDLE_BOUNDARY_CURVES = [
  // Divider 0 (between 01 and 02) — organic gentle right bow
  'M 15,22 C 14,90 21.5,170 21.5,250 C 21.5,330 14,410 15,478',
  // Divider 1 (between 02 and 03) — organic subtle wobble bow
  'M 15,22 C 15.5,95 22,180 21.5,260 C 21,340 14.5,415 15,478',
  // Divider 2 (between 03 and 04) — organic subtle wave
  'M 15,22 C 14.5,85 21.5,175 21,255 C 20.5,335 14,410 15,478',
  // Divider 3 (between 04 and 05)
  'M 15,22 C 14,90 21.5,170 21.5,250 C 21.5,330 14,410 15,478',
];

// Active blue boundary curve (distinctive hand-drawn S-wave curve bordering the active open gate)
const ACTIVE_BOUNDARY_CURVE =
  'M 15,16 C 14,80 22.5,150 22.5,225 C 22.5,300 10,370 11.5,430 C 12.5,455 16,470 15,484';


export default function InternshipsSection({
  navigateTo,
  onApplyInternship,
  hasCompletedAssessment = false,
  currentScore = 0,
  skillBreakdown,
  onOpenAssessmentModal,
}) {
  // Gate 01 (index 0) open initially matching requirement
  const [activeGateIndex, setActiveGateIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState('right');
  const hoverTimerRef = useRef(null);

  const readinessOverall = hasCompletedAssessment ? (currentScore || 82) : 0;
  const skillsScore = hasCompletedAssessment ? (skillBreakdown?.[0]?.score || 86) : 0;
  const projectsScore = hasCompletedAssessment ? (skillBreakdown?.[4]?.score || 91) : 0;
  const assessmentScore = hasCompletedAssessment ? (currentScore || 78) : 0;
  const portfolioScore = hasCompletedAssessment ? Math.max(0, (skillBreakdown?.[1]?.score || 73)) : 0;

  const getGateProgression = (idx) => {
    if (hasCompletedAssessment) {
      if (idx === 0 || idx === 1) return 'available';
      if (idx === 2) return 'available';
      return 'waiting';
    } else {
      if (idx === 0 || idx === 1) return 'available';
      if (idx === 2 || idx === 3) return 'waiting';
      return 'locked';
    }
  };

  const openGate = (idx) => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    if (idx === activeGateIndex) return;
    setSlideDirection(idx > activeGateIndex ? 'right' : 'left');
    setActiveGateIndex(idx);

    if (typeof window !== 'undefined' && window.innerWidth <= 768) {
      setTimeout(() => {
        const el = document.getElementById(`mobile-gate-${GATES[idx]?.step}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 50);
    }
  };

  const handleGateMouseEnter = (idx) => {
    if (idx === activeGateIndex) return;
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = setTimeout(() => {
      setSlideDirection(idx > activeGateIndex ? 'right' : 'left');
      setActiveGateIndex(idx);
    }, 80);
  };

  const handleGateMouseLeave = () => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
  };

  const handleGateCta = (idx) => {
    if (idx === 0) {
      onOpenAssessmentModal ? onOpenAssessmentModal() : navigateTo && navigateTo('apply');
    } else if (idx === 1) {
      onOpenAssessmentModal ? onOpenAssessmentModal() : navigateTo && navigateTo('skill-assessment');
    } else if (idx === 2) {
      if (hasCompletedAssessment) {
        onApplyInternship ? onApplyInternship({ role: 'Shortlist Placement' }) : navigateTo && navigateTo('internships');
      } else {
        onOpenAssessmentModal ? onOpenAssessmentModal() : navigateTo && navigateTo('skill-assessment');
      }
    } else {
      navigateTo && navigateTo('internships');
    }
  };

  return (
    <section className="fg-section" id="internships">
      <div className="container">

        {/* SECTION HEADER — Preserved Editorial Intro */}
        <div className="fg-header">
          <div className="fg-header-left">
            <div className="fg-eyebrow">THE QUALIFICATION PROCESS</div>
            <h2 className="fg-heading">
              Internships that move you <span className="fg-heading-blue">forward.</span>
            </h2>
          </div>
          <div className="fg-header-right">
            <p className="fg-subtext">
              You don&apos;t simply apply for an internship. You move through a clear qualification
              process where your actual work opens the door — not your CV.
            </p>
          </div>
        </div>

        {/*
          THE 5-GATE DESKTOP SYSTEM (UNTOUCHED FOR DESKTOP > 768px)
          ─────────────────────────────────────────────────────────────────
          - 5 gates BESIDE ONE ANOTHER in a single horizontal row (1-2-3-4-5)
          - Exactly 1 gate is OPEN, the other 4 are NARROW vertical strips.
          - Strictly locked container height (500px), never resizing or reflowing.
          ─────────────────────────────────────────────────────────────────
        */}
        <div className="ig-desktop-system">
          <div className="ig-system-wrapper">
            <div className="ig-system-container" aria-label="Internship Qualification Gates">
              {GATES.map((gate, idx) => {
                const isActive = activeGateIndex === idx;
                const progression = getGateProgression(idx);
                const hasRightBoundary = idx < GATES.length - 1;
                // Boundary line is active BLUE if it borders the active gate on left or right
                const isRightBoundaryActive = (activeGateIndex === idx) || (activeGateIndex === idx + 1);

                if (!isActive) {
                  /* ── NARROW CLOSED VERTICAL GATE STRIP (Beside one another) ── */
                  return (
                    <div
                      key={gate.step}
                      className={`ig-closed-lane ig-lane--${progression}`}
                      id={`gate-strip-${gate.step}`}
                      onClick={() => openGate(idx)}
                      onMouseEnter={() => handleGateMouseEnter(idx)}
                      onMouseLeave={handleGateMouseLeave}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && openGate(idx)}
                      aria-label={`Open Gate ${gate.step}: ${gate.name}`}
                    >
                      {/* Step Number at Top (01, 02, 03, 04, 05) */}
                      <div className="ig-closed-num">
                        {gate.step}
                      </div>

                      {/* Rotated Name in Center (APPLY, ASSESS, SHORTLIST, INTERVIEW) */}
                      <div className="ig-closed-rail">
                        <span className="ig-closed-name">{gate.name}</span>
                      </div>

                      {/* Rotated Status at Bottom (AVAILABLE, WAITING, LOCKED) */}
                      <div className="ig-closed-status-rail">
                        <span className="ig-closed-status">{progression}</span>
                      </div>

                      {/* Vertical Divider Line to the next gate */}
                      {hasRightBoundary && (
                        <div
                          className={`ig-curve-boundary ${isRightBoundaryActive ? 'ig-curve--active' : 'ig-curve--idle'}`}
                          aria-hidden="true"
                        >
                          <svg className="ig-curve-svg" viewBox="0 0 30 500" preserveAspectRatio="none">
                            <path
                              d={isRightBoundaryActive ? ACTIVE_BOUNDARY_CURVE : IDLE_BOUNDARY_CURVES[idx]}
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={isRightBoundaryActive ? '2.5' : '1.6'}
                              strokeLinecap="round"
                              vectorEffect="non-scaling-stroke"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                  );
                }

                /* ── OPEN EXPANDED GATE (Takes the remaining row space) ── */
                return (
                  <div
                    key={gate.step}
                    className="ig-open-lane"
                    id={`gate-open-${gate.step}`}
                    role="region"
                    aria-label={`Active Gate ${gate.step}: ${gate.name}`}
                  >
                    {/* Subtle directional slide animated content */}
                    <div
                      key={`content-${activeGateIndex}`}
                      className={`ig-open-inner ig-slide-${slideDirection}`}
                    >
                      {/* Large Faint Watermark Serif Number in background of right side */}
                      <div className="ig-watermark" aria-hidden="true">
                        {gate.step}
                      </div>

                      {/* Eyebrow + Huge Heading + Subtitle */}
                      <div className="ig-header-area">
                        <div className="ig-gate-eyebrow">
                          GATE {gate.step} / 05 — {progression.toUpperCase()}
                        </div>
                        <h3 className="ig-gate-title">{gate.name}</h3>
                        <div className="ig-gate-subject">{gate.subject}</div>
                      </div>

                      {/* Two-Column Editorial Grid: Left Criteria + Right Status & Action */}
                      <div className="ig-body-grid">
                        {/* Left Column: What we look at + Numbered Items + Bottom Statement */}
                        <div className="ig-left-col">
                          <div className="ig-look-heading">What we look at:</div>
                          <div className="ig-items-list">
                            {gate.items.map((item, itemIdx) => (
                              <div key={itemIdx} className="ig-item-row">
                                <span className="ig-item-num">
                                  {String(itemIdx + 1).padStart(2, '0')}
                                </span>
                                <span className="ig-item-text">{item}</span>
                              </div>
                            ))}
                          </div>
                          <div className="ig-closing-wrap">
                            <p className="ig-closing-text">{gate.note}</p>
                          </div>
                        </div>

                        {/* Right Column: Stage Status & Actions */}
                        <div className="ig-right-col">
                          <div className="ig-status-block">
                            <div className="ig-status-eyebrow">STAGE STATUS</div>
                            <div className="ig-status-headline">
                              {idx === 1 && !hasCompletedAssessment
                                ? 'NOT ASSESSED'
                                : progression.toUpperCase()}
                            </div>
                            <p className="ig-status-desc">
                              {idx === 1 && !hasCompletedAssessment
                                ? 'We test algorithmic thinking, code organization, and technical explanations.'
                                : gate.statusDesc}
                            </p>

                            {/* Gate 02 Readiness Index Display if Assessment Done */}
                            {idx === 1 && hasCompletedAssessment && (
                              <div className="ig-readiness-block">
                                <div className="ig-readiness-header">
                                  <span className="ig-rb-title">READINESS INDEX</span>
                                  <span className="ig-rb-score">{readinessOverall}%</span>
                                </div>
                                <div className="ig-measurement-list">
                                  {[
                                    { label: 'Skills', val: skillsScore },
                                    { label: 'Projects', val: projectsScore },
                                    { label: 'Assessment', val: assessmentScore },
                                    { label: 'Portfolio', val: portfolioScore },
                                  ].map(({ label, val }) => (
                                    <div key={label} className="ig-measurement-row">
                                      <span className="ig-m-label">{label}</span>
                                      <span className="ig-m-rule">
                                        <span className="ig-m-fill" style={{ width: `${val}%` }} />
                                      </span>
                                      <span className="ig-m-val">{val}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>

                          {/* CTA Button Block */}
                          <div className="ig-action-block">
                            {idx === 0 && !hasCompletedAssessment ? (
                              <div className="ig-gate01-actions">
                                <button
                                  className="ig-submit-cta"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onOpenAssessmentModal
                                      ? onOpenAssessmentModal()
                                      : navigateTo && navigateTo('skill-assessment');
                                  }}
                                  type="button"
                                >
                                  <span>TAKE THE SKILL ASSESSMENT</span>
                                  <span className="ig-cta-arrow">→</span>
                                </button>
                                <button
                                  type="button"
                                  className="ig-secondary-link-btn"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleGateCta(0);
                                  }}
                                >
                                  Or submit profile links directly →
                                </button>
                              </div>
                            ) : (
                              <button
                                className="ig-submit-cta"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleGateCta(idx);
                                }}
                                type="button"
                              >
                                <span>
                                  {idx === 1
                                    ? hasCompletedAssessment ? gate.ctaReady : gate.ctaPending
                                    : idx === 2
                                    ? hasCompletedAssessment ? gate.ctaReady : gate.ctaPending
                                    : gate.cta}
                                </span>
                                <span className="ig-cta-arrow">→</span>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Vertical Divider Line to the next gate if active gate is not the last */}
                    {hasRightBoundary && (
                      <div
                        className={`ig-curve-boundary ${isRightBoundaryActive ? 'ig-curve--active' : 'ig-curve--idle'}`}
                        aria-hidden="true"
                      >
                        <svg className="ig-curve-svg" viewBox="0 0 30 500" preserveAspectRatio="none">
                          <path
                            d={isRightBoundaryActive ? ACTIVE_BOUNDARY_CURVE : IDLE_BOUNDARY_CURVES[idx]}
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={isRightBoundaryActive ? '2.5' : '1.6'}
                            strokeLinecap="round"
                            vectorEffect="non-scaling-stroke"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/*
          THE DEDICATED MOBILE GATE SYSTEM (<= 768px ONLY)
          ─────────────────────────────────────────────────────────────────
          - One gate open at a time (activeGateIndex).
          - All 5 gates cleanly accessible via horizontal segmented rail.
          - Same content, same typography, same colors, same criteria & status.
        {/*
          THE DEDICATED MOBILE GATE SYSTEM (<= 768px ONLY)
          ─────────────────────────────────────────────────────────────────
          - Displays ALL 5 qualification gates written out sequentially.
          - Zero cards: seamless editorial layout directly on page background.
          - Authentic typography, organic curved divider lines, numbered criteria.
          ─────────────────────────────────────────────────────────────────
        */}
        <div className="ig-mobile-gate-system" aria-label="Internship Qualification Gates Mobile">
          {/*
            SINGLE VERTICAL SEQUENCE (5 STAGES)
            ───────────────────────────────────────────────────────────────────
            - Exactly ONE stage expanded at a time, replacing its own row inline.
            - Never show the active stage twice.
            - Other 4 stages remain compact collapsed rows above/below it.
            - No cards, no boxed backgrounds, borderless clean white background.
            ───────────────────────────────────────────────────────────────────
          */}
          <div className="ig-mobile-vertical-sequence" role="tablist" aria-label="Qualification Gates Selection">
            {GATES.map((gate, idx) => {
              const isActive = activeGateIndex === idx;
              const progression = getGateProgression(idx);

              if (isActive) {
                /* ── 1. ACTIVE EXPANDED STAGE IN ITS OWN VERTICAL POSITION ── */
                return (
                  <div
                    key={`mobile-stage-${gate.step}`}
                    className={`ig-mobile-expanded-stage ${idx > 0 ? 'ig-mobile-expanded-with-prev' : ''} ${idx < GATES.length - 1 ? 'ig-mobile-expanded-with-next' : ''}`}
                    role="tabpanel"
                    id={`mobile-gate-${gate.step}`}
                    aria-label={`Gate ${gate.step}: ${gate.name} (Expanded)`}
                  >
                    {/* Large faint background watermark */}
                    <div className="ig-mobile-watermark" aria-hidden="true">
                      {gate.step}
                    </div>

                    {/* Eyebrow & Gate Heading */}
                    <div className="ig-mobile-header">
                      <div className="ig-mobile-eyebrow">
                        GATE {gate.step} / 05 — {progression.toUpperCase()}
                      </div>
                      <h3 className="ig-mobile-title">{gate.name}</h3>
                      <div className="ig-mobile-subject">{gate.subject}</div>
                    </div>

                    {/* Hand-drawn organic wave divider */}
                    <div className="ig-mobile-curve-line" aria-hidden="true">
                      <svg viewBox="0 0 360 14" preserveAspectRatio="none" className="ig-mobile-curve-svg">
                        <path
                          d="M 0,7 C 60,13 120,1 180,7 C 240,13 300,1 360,7"
                          fill="none"
                          stroke="#1677FF"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>

                    {/* Criteria List */}
                    <div className="ig-mobile-criteria">
                      <div className="ig-mobile-look-heading">What we look at:</div>
                      <div className="ig-mobile-items-list">
                        {gate.items.map((item, itemIdx) => (
                          <div key={itemIdx} className="ig-mobile-item-row">
                            <span className="ig-mobile-item-num">
                              {String(itemIdx + 1).padStart(2, '0')}
                            </span>
                            <span className="ig-mobile-item-text">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Supporting note with vertical blue bar */}
                    <div className="ig-mobile-note-wrap">
                      <p className="ig-mobile-note-text">{gate.note}</p>
                    </div>

                    {/* Status Box */}
                    <div className="ig-mobile-status-block">
                      <div className="ig-mobile-status-eyebrow">STAGE STATUS</div>
                      <div className="ig-mobile-status-headline">
                        {idx === 1 && !hasCompletedAssessment
                          ? 'NOT ASSESSED'
                          : progression.toUpperCase()}
                      </div>
                      <p className="ig-mobile-status-desc">
                        {idx === 1 && !hasCompletedAssessment
                          ? 'We test algorithmic thinking, code organization, and technical explanations.'
                          : gate.statusDesc}
                      </p>

                      {/* Readiness Index if Assessment Done */}
                      {idx === 1 && hasCompletedAssessment && (
                        <div className="ig-readiness-block" style={{ marginTop: '0.85rem', marginBottom: 0 }}>
                          <div className="ig-readiness-header">
                            <span className="ig-rb-title">READINESS INDEX</span>
                            <span className="ig-rb-score">{readinessOverall}%</span>
                          </div>
                          <div className="ig-measurement-list">
                            {[
                              { label: 'Skills', val: skillsScore },
                              { label: 'Projects', val: projectsScore },
                              { label: 'Assessment', val: assessmentScore },
                              { label: 'Portfolio', val: portfolioScore },
                            ].map(({ label, val }) => (
                              <div key={label} className="ig-measurement-row">
                                <span className="ig-m-label">{label}</span>
                                <span className="ig-m-rule">
                                  <span className="ig-m-fill" style={{ width: `${val}%` }} />
                                </span>
                                <span className="ig-m-val">{val}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Mobile CTA Block */}
                    <div className="ig-mobile-action-block">
                      {idx === 0 && !hasCompletedAssessment ? (
                        <div className="ig-gate01-actions">
                          <button
                            className="ig-submit-cta ig-mobile-cta-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpenAssessmentModal
                                ? onOpenAssessmentModal()
                                : navigateTo && navigateTo('skill-assessment');
                            }}
                            type="button"
                          >
                            <span>TAKE THE SKILL ASSESSMENT</span>
                            <span className="ig-cta-arrow">→</span>
                          </button>
                          <button
                            type="button"
                            className="ig-secondary-link-btn"
                            style={{ textAlign: 'center', marginTop: '0.35rem' }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleGateCta(0);
                            }}
                          >
                            Or submit profile links directly →
                          </button>
                        </div>
                      ) : (
                        <button
                          className="ig-submit-cta ig-mobile-cta-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleGateCta(idx);
                          }}
                          type="button"
                        >
                          <span>
                            {idx === 1
                              ? hasCompletedAssessment ? gate.ctaReady : gate.ctaPending
                              : idx === 2
                              ? hasCompletedAssessment ? gate.ctaReady : gate.ctaPending
                              : gate.cta}
                          </span>
                          <span className="ig-cta-arrow">→</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              }

              /* ── 2. COLLAPSED COMPACT STAGE ROW IN ITS OWN POSITION ── */
              return (
                <div
                  key={`mobile-stage-${gate.step}`}
                  className={`ig-mobile-gate-row ig-lane--${progression}`}
                  onClick={() => openGate(idx)}
                  role="tab"
                  aria-selected={false}
                  tabIndex={0}
                  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && openGate(idx)}
                  aria-label={`Open Gate ${gate.step}: ${gate.name} (${progression})`}
                >
                  <div className="ig-mobile-gate-left">
                    <span className="ig-mobile-gate-num">{gate.step}</span>
                    <span className="ig-mobile-gate-dash">—</span>
                    <span className="ig-mobile-gate-name">{gate.name}</span>
                  </div>

                  <div className="ig-mobile-gate-right">
                    <span className="ig-mobile-gate-status">{progression.toUpperCase()}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
