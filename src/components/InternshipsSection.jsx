import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

// ─── QUALIFICATION RECORD DATA ─────────────────────────────────────
// Five gates, each with a clear record entry and detail panel content.
// Language is plain, direct, and honest — no corporate/AI phrasing.
const GATES = [
  {
    step: '01',
    title: 'APPLY',
    short: 'Profile + Portfolio',
    meta: 'CV · Projects · Basic details',
    description: 'Submit your profile and portfolio.',
    detailHeading: 'What we look at',
    detailSubject: 'PROFILE & PORTFOLIO',
    detailItems: [
      'Your background and course details',
      'Any projects you have built so far',
      'Links to your work (GitHub, live demos)',
    ],
    note: 'You do not need a perfect CV. We look at what you have actually done.',
    cta: 'Apply Now',
  },
  {
    step: '02',
    title: 'ASSESSMENT',
    short: 'Skills Check',
    meta: 'Practical test · Skill score',
    description: 'Complete a practical skills assessment.',
    detailHeading: 'What we look at',
    detailSubject: 'SKILLS CHECK',
    detailItems: [
      'Your ability to work through real problems',
      'How you approach and structure code',
      'Your current skill level across relevant areas',
    ],
    note: 'The assessment is practical, not a trick quiz. We want to see how you think.',
    cta: 'Take Assessment',
  },
  {
    step: '03',
    title: 'SHORTLIST',
    short: 'Project Review',
    meta: 'Projects · Portfolio review',
    description: 'We review your projects and experience.',
    detailHeading: 'What we look at',
    detailSubject: 'PROJECT PROOF',
    detailItems: [
      'What you actually built',
      'How you approached the problem',
      'Whether you can explain the decisions you made',
    ],
    note: 'Companies match with you based on your real project work, not a resume keyword scan.',
    cta: 'View Requirements',
  },
  {
    step: '04',
    title: 'INTERVIEW',
    short: 'Technical Review',
    meta: 'Technical discussion · Communication',
    description: 'Talk through your skills and projects with the team.',
    detailHeading: 'What we look at',
    detailSubject: 'TECHNICAL CONVERSATION',
    detailItems: [
      'How clearly you can explain technical decisions',
      'Your understanding of what you built',
      'Whether you are a good fit for the team',
    ],
    note: 'This is a real conversation — not a rehearsed interview. Be honest about what you know.',
    cta: 'Prepare for Interview',
  },
  {
    step: '05',
    title: 'INTERNSHIP',
    short: 'Work Experience',
    meta: 'Paid work · Mentorship',
    description: 'Start working on real projects with mentorship.',
    detailHeading: 'What you get',
    detailSubject: 'REAL WORK',
    detailItems: [
      'Paid work on actual company projects',
      'A senior mentor guiding your progress',
      'Experience that goes into your portfolio',
    ],
    note: 'This is not a shadowing programme. You work on real deliverables from day one.',
    cta: 'See Open Roles',
  },
];

// ─── DETAIL PANEL ─────────────────────────────────────────────────
// Content that appears on the right side when a gate is selected.
// Fades in/out via CSS transition — no GSAP needed here.
function GateDetailPanel({ gate, visible }) {
  return (
    <div className={`qr-detail-panel ${visible ? 'qrp-visible' : 'qrp-hidden'}`}>
      <div className="qrp-inner">
        {/* Gate identifier */}
        <div className="qrp-gate-id">
          <span className="qrp-gate-num">GATE {gate.step}</span>
          <span className="qrp-gate-rule" />
          <span className="qrp-gate-name">{gate.title}</span>
        </div>

        {/* Detail heading */}
        <div className="qrp-heading-row">
          <span className="qrp-what-label">{gate.detailHeading}</span>
          <h3 className="qrp-subject">{gate.detailSubject}</h3>
        </div>

        {/* Items — editorial numbered list, no bullets, no boxes */}
        <ol className="qrp-items">
          {gate.detailItems.map((item, i) => (
            <li key={i} className="qrp-item">
              <span className="qrp-item-index">{String(i + 1).padStart(2, '0')}</span>
              <span className="qrp-item-text">{item}</span>
            </li>
          ))}
        </ol>

        {/* Note — human qualifier */}
        <p className="qrp-note">{gate.note}</p>
      </div>
    </div>
  );
}

// ─── MAIN SECTION ─────────────────────────────────────────────────
export default function InternshipsSection({
  navigateTo,
  onApplyInternship,
  onOpenAssessmentModal,
}) {
  const [activeGate, setActiveGate] = useState(0);
  const [panelKey, setPanelKey] = useState(0); // forces re-mount for clean re-animation
  const prevGate = useRef(0);

  const handleSelectGate = (idx) => {
    if (idx === activeGate) return;
    prevGate.current = activeGate;
    setActiveGate(idx);
    setPanelKey(k => k + 1);
  };

  const gate = GATES[activeGate];

  const handleCta = () => {
    if (activeGate === 0) {
      onOpenAssessmentModal
        ? onOpenAssessmentModal()
        : navigateTo && navigateTo('apply');
    } else if (activeGate === 1) {
      onOpenAssessmentModal
        ? onOpenAssessmentModal()
        : navigateTo && navigateTo('skill-assessment');
    } else {
      navigateTo && navigateTo('internships');
    }
  };

  return (
    <section className="internships-qr-section" id="internships">
      <div className="container">

        {/* ── SECTION HEADER ──────────────────────────────────── */}
        <div className="qr-header-row">
          <div className="qr-header-left">
            <div className="qr-eyebrow">
              <span className="qr-eyebrow-rule" />
              THE QUALIFICATION PROCESS
            </div>
            <h2 className="qr-main-heading">
              Internships<br />
              that move you<br />
              <span className="qr-heading-blue">forward.</span>
            </h2>
          </div>
          <div className="qr-header-right">
            <p className="qr-subtext">
              You don&apos;t simply apply for an internship. You move through a clear
              qualification process where your actual work opens the door — not your CV.
            </p>
          </div>
        </div>

        {/* ── QUALIFICATION RECORD ─────────────────────────────── */}
        <div className="qr-body">

          {/* LEFT: GATE LIST — the qualification record */}
          <div className="qr-record">

            {/* Record header */}
            <div className="qr-record-header">
              <span className="qr-record-label">QUALIFICATION RECORD</span>
              <span className="qr-record-meta">5 GATES</span>
            </div>

            {/* Five gate rows */}
            <div className="qr-gate-list">
              {GATES.map((g, idx) => {
                const isActive = activeGate === idx;
                const isPast = activeGate > idx;

                return (
                  <div
                    key={g.step}
                    className={`qr-gate-row ${isActive ? 'qrg-active' : ''} ${isPast ? 'qrg-past' : ''}`}
                    onClick={() => handleSelectGate(idx)}
                    onMouseEnter={() => handleSelectGate(idx)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={e => e.key === 'Enter' && handleSelectGate(idx)}
                    aria-pressed={isActive}
                  >
                    {/* Left: step number + vertical connector */}
                    <div className="qrg-axis">
                      <div className="qrg-marker">
                        {isPast
                          ? <span className="qrg-marker-dot qrg-past-dot" />
                          : isActive
                          ? <span className="qrg-marker-dot qrg-active-dot" />
                          : <span className="qrg-marker-dot qrg-future-dot" />
                        }
                      </div>
                      {idx < GATES.length - 1 && (
                        <div className={`qrg-connector ${isPast ? 'qrgc-filled' : ''}`} />
                      )}
                    </div>

                    {/* Center: gate content */}
                    <div className="qrg-content">
                      <div className="qrg-top-row">
                        <span className="qrg-step">{g.step}</span>
                        <span className="qrg-divider-slash">/</span>
                        <span className="qrg-title">{g.title}</span>
                        {isActive && (
                          <span className="qrg-active-badge">ACTIVE</span>
                        )}
                        {isPast && (
                          <span className="qrg-past-badge">✓</span>
                        )}
                      </div>
                      <div className={`qrg-meta-row ${isActive ? 'qrgm-visible' : ''}`}>
                        <span className="qrg-short">{g.short}</span>
                        <span className="qrg-meta-sep">·</span>
                        <span className="qrg-meta">{g.meta}</span>
                      </div>
                      {isActive && (
                        <p className="qrg-desc">{g.description}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT: GATE DETAIL PANEL */}
          <div className="qr-panel-container">
            <GateDetailPanel key={panelKey} gate={gate} visible />

            {/* CTA */}
            <div className="qr-panel-cta-row">
              <button
                className="qr-panel-cta"
                onClick={handleCta}
                type="button"
              >
                {gate.cta}
                <ArrowRight size={14} className="qr-cta-arrow" />
              </button>
              <span className="qr-panel-cta-note">Gate {gate.step} of 05</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
