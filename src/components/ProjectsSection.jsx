import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, ArrowUpRight, ArrowLeft, ArrowRight, CheckCircle2, Layers, Cpu } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// ─── PROJECT REPOSITORY DATA ───────────────────────────────────────────
const STACK_PROJECTS = [
  {
    id: 'resume-screener',
    n: '01',
    category: 'HR & RECRUITMENT',
    title: 'Resume Screener — Fit Scores & Red Flags in Seconds',
    shortDesc: 'Autonomous n8n pipeline: Gmail intake, Groq AI evaluation against live Sheets rubric, and automatic Teamwork task generation.',
    fullDesc:
      'When hundreds of resumes flood the hiring inbox, manual screening creates a multi-day bottleneck. We engineered a fully autonomous recruitment pipeline: Gmail triggers intake, Groq AI pre-screens and deeply evaluates candidates against live Google Sheets rubric criteria, Teamwork receives the candidate task and structured PDF dossier, and HR gets an instant, objective Fit Score briefing with highlighted red flags.',
    image: '/proj1.png',
    metrics: [
      { label: 'Evaluation Speed', value: '< 3s', desc: 'From inbox intake to briefing' },
      { label: 'Pipeline Automation', value: '100%', desc: 'Zero manual data entry' },
      { label: 'Scoring Accuracy', value: 'Objective', desc: 'Custom rubric-weighted evaluation' },
    ],
    architecture: [
      'Gmail Webhook Trigger: Instantly ingests incoming candidate attachments and resumes.',
      'Data Extraction & Formatting: Parses contact info, education, and career milestones.',
      'Live Rubric Sync: Fetches target role requirements directly from active Google Sheets.',
      'Groq LPU Reasoning: High-speed LLM evaluates candidate fit, scoring strengths and red flags.',
      'Teamwork API Integration: Automatically provisions task cards with attached briefing dossier.'
    ],
    tech: ['HR Tech', 'Automation', 'Groq LPU', 'Resume Screening', 'Google Sheets', 'n8n', 'Teamwork API'],
  },
  {
    id: 'mindspace-ai',
    n: '02',
    category: 'MENTAL WELLNESS',
    title: 'Mindspace.ai: 24/7 AI Companion (TARA) for Mental Wellness',
    shortDesc: 'PWA combining ultra-low-latency AI voice calling and text chat with TARA, mental health assessments, and Cal.com booking.',
    fullDesc:
      'Mindspace is a Progressive Web App (PWA) built to democratize compassionate mental wellness support. It combines real-time streaming voice calling and text chat with TARA — GoodMind\'s empathetic mental wellness companion — powered by ElevenLabs streaming voice synthesis, six clinically vetted mental health assessments (including GAD-7 and PHQ-9), licensed therapist scheduling via Cal.com, and subscription minute management through Razorpay.',
    image: '/proj2.png',
    metrics: [
      { label: 'Voice Latency', value: '< 400ms', desc: 'Real-time conversational streaming' },
      { label: 'Clinical Screens', value: '6 Vetted', desc: 'Diagnostic health assessments' },
      { label: 'Therapist Hand-off', value: 'Direct', desc: 'Cal.com scheduling integration' },
    ],
    architecture: [
      'ElevenLabs Real-time Streaming: Bi-directional low-latency voice synthesis for natural dialogue.',
      'TARA Conversational Agent: Grounded in cognitive behavioral wellness methodologies.',
      'Interactive Assessments: Self-administered clinical evaluations with personalized insights.',
      'Cal.com API Scheduling: Frictionless booking with accredited human therapists.',
      'Razorpay Minute Wallet: Secure pay-as-you-go micro-transactions for voice usage.'
    ],
    tech: ['Mental Wellness', 'Voice AI', 'TARA', 'ElevenLabs API', 'Cal.com', 'Razorpay', 'PWA', 'React'],
  },
  {
    id: 'incstores-analytics',
    n: '03',
    category: 'E-COMMERCE / ANALYTICS',
    title: 'IncStores: 360° E-commerce Analytics & AI Queries',
    shortDesc: 'Single pane of glass BI dashboard: revenue, orders, inventory, and natural-language AI queries via an in-app Groq chatbot.',
    fullDesc:
      'IncStores Dashboard delivers a comprehensive 360° intelligence cockpit for high-volume eCommerce operations. Directly connected to live MySQL databases and Magento schemas, it unifies revenue, order velocity, product margins, and customer acquisition metrics. An integrated Groq-powered AI chatbot allows non-technical executives to ask plain-English questions (e.g. "Which product category saw the steepest margin drop last week?") and receive instant charts and data tables.',
    image: '/proj3.png',
    metrics: [
      { label: 'Query Turnaround', value: '10x Faster', desc: 'Conversational SQL via Groq' },
      { label: 'Data Freshness', value: 'Real-Time', desc: 'Live MySQL & Magento synchronization' },
      { label: 'Reporting Systems', value: 'Unified', desc: 'Replaces 5 disparate spreadsheets' },
    ],
    architecture: [
      'High-Performance MySQL Connectors: Direct synchronization with Magento and IncStores data schemas.',
      'Conversational AI Agent: Groq LPU translates natural language into optimized SQL queries.',
      'Interactive Visualization Suite: Multi-series revenue vs order timelines and margin breakdowns.',
      'Custom SKU Filtering: Granular date range selectors and customer segmentation modules.',
      'Automated Anomaly Detection: Immediate alerts for unexpected dips in conversion or inventory levels.'
    ],
    tech: ['E-commerce', 'Analytics', 'BI Dashboard', 'MySQL', 'Magento', 'Groq AI', 'React', 'TypeScript', 'Node.js'],
  },
  {
    id: 'project-buddy',
    n: '04',
    category: 'ENTERPRISE AI / RAG',
    title: 'Project Buddy: AI That Knows Your Drive, Jira & Slack',
    shortDesc: 'Enterprise RAG assistant in Slack searching Google Drive, Jira & Confluence to return cited answers in 1–2 seconds.',
    fullDesc:
      'In fast-moving product teams, locating institutional knowledge scattered across 47+ project docs and Jira epics wastes 15–30 minutes per inquiry. Project Buddy is an intelligent Slack assistant powered by Google Vertex AI RAG. It indexes company Google Drive repositories, Jira issues, and Confluence documentation, returning authoritative, cited answers directly inside Slack channels within 1–2 seconds.',
    image: '/proj4.png',
    metrics: [
      { label: 'Search Latency', value: '< 2s', desc: 'Sub-second vector retrieval' },
      { label: 'Knowledge Scope', value: '47+ Repos', desc: 'Drive, Jira, Confluence, Slack' },
      { label: 'Time Saved', value: '90%', desc: 'Per technical architecture inquiry' },
    ],
    architecture: [
      'Slack Bolt SDK: Native interactive bot commands and conversational threads.',
      'Google Vertex AI RAG: High-dimensional semantic embeddings and enterprise vector search.',
      'Live Document Connectors: Continuous delta indexing of Google Drive, Jira Epics, and Confluence.',
      'Strict Permission Scopes: Role-based document access controls preserving team security.',
      'Source Grounding: Every answer includes direct clickable links to canonical source documentation.'
    ],
    tech: ['Enterprise AI', 'RAG', 'Slack Bolt API', 'Google Drive API', 'Vertex AI', 'Jira', 'Confluence', 'Python'],
  },
];

export default function ProjectsSection() {
  const sectionRef = useRef(null);
  const stackStageRef = useRef(null);
  const cardRefs = useRef([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);

  // Keyboard shortcut (ESC) to dismiss modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedProject(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Lock scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedProject]);

  // Dynamically cycle through projects every 2 seconds on mobile
  useEffect(() => {
    if (selectedProject) return;

    const interval = setInterval(() => {
      if (typeof window !== 'undefined' && window.innerWidth <= 768) {
        setActiveIdx((prev) => (prev + 1) % STACK_PROJECTS.length);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [selectedProject]);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stackStageRef.current;
    if (!section || !stage) return;

    const mm = gsap.matchMedia();

    // Desktop & Tablet: Vertical GSAP Scroll Stack with Pinning
    mm.add('(min-width: 769px)', () => {
      const cards = cardRefs.current.filter(Boolean);
      const total = cards.length;
      if (total === 0) return;

      // Scroll distance calculated dynamically from number of projects: crisp, tight stack transitions
      const scrollDistance = total * 220;

      // Initial placement:
      // Card 0 starts active at front center (yPercent: 0, y: 0)
      // Subsequent cards wait below at yPercent: 105, 100% OPAQUE, higher z-index
      cards.forEach((card, i) => {
        gsap.set(card, {
          yPercent: i === 0 ? 0 : 105,
          y: 0,
          scale: 1,
          zIndex: (i + 1) * 10,
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 70px',
          end: `+=${scrollDistance}`,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 0.6,
          invalidateOnRefresh: true,
          onUpdate(self) {
            const p = self.progress;
            // Accurately map progress to active project phase
            let phase = 0;
            if (p < 0.28) {
              phase = 0;
            } else if (p < 0.58) {
              phase = 1;
            } else if (p < 0.85) {
              phase = 2;
            } else {
              phase = 3;
            }
            setActiveIdx(phase);
          },
        },
      });

      // Sequential physical stack transitions:
      // Incoming card slides directly over the previous card to yPercent: 0.
      // Once it arrives, it completely and 100% covers the previous card.
      // ZERO opacity changes — all screenshots remain 100% solid & crisp.

      // Phase 1 -> 2: Project 02 slides up to completely cover Project 01
      if (cards[1]) {
        tl.to({}, { duration: 0.25 })
          .to(
            cards[1],
            { yPercent: 0, ease: 'power2.out', duration: 1 },
            '>'
          );
      }

      // Phase 2 -> 3: Project 03 slides up to completely cover Project 02
      if (cards[2]) {
        tl.to({}, { duration: 0.25 })
          .to(
            cards[2],
            { yPercent: 0, ease: 'power2.out', duration: 1 },
            '>'
          );
      }

      // Phase 3 -> 4: Project 04 slides up immediately over Project 03 (no dead gap)
      if (cards[3]) {
        tl.to({}, { duration: 0.25 })
          .to(
            cards[3],
            { yPercent: 0, ease: 'power2.out', duration: 1 },
            '>'
          );
      }

      // Final settle on Project 04
      tl.to({}, { duration: 0.25 });
    });

    return () => mm.revert();
  }, []);

  // Touch & swipe gestures for mobile showcase (does not hijack vertical page scroll)
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const touchEndX = useRef(0);
  const isHorizontalSwipe = useRef(false);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    touchEndX.current = e.touches[0].clientX;
    isHorizontalSwipe.current = false;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
    const deltaX = Math.abs(touchEndX.current - touchStartX.current);
    const deltaY = Math.abs(e.touches[0].clientY - touchStartY.current);

    // Only recognize as horizontal swipe if horizontal displacement is significantly greater than vertical
    if (deltaX > deltaY && deltaX > 12) {
      isHorizontalSwipe.current = true;
    }
  };

  const handleTouchEnd = () => {
    if (!isHorizontalSwipe.current) return;
    const diffX = touchEndX.current - touchStartX.current;
    const threshold = 40; // minimum swipe distance in px

    if (diffX < -threshold) {
      // Swipe left -> Next project
      setActiveIdx((prev) => Math.min(prev + 1, STACK_PROJECTS.length - 1));
    } else if (diffX > threshold) {
      // Swipe right -> Previous project
      setActiveIdx((prev) => Math.max(prev - 1, 0));
    }
  };

  // Pointer drag support for desktop emulators or mouse testing
  const isPointerDown = useRef(false);
  const pointerStartX = useRef(0);

  const handlePointerDown = (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    isPointerDown.current = true;
    pointerStartX.current = e.clientX;
  };

  const handlePointerUp = (e) => {
    if (!isPointerDown.current) return;
    isPointerDown.current = false;
    const diff = e.clientX - pointerStartX.current;
    if (diff < -45) {
      setActiveIdx((prev) => Math.min(prev + 1, STACK_PROJECTS.length - 1));
    } else if (diff > 45) {
      setActiveIdx((prev) => Math.max(prev - 1, 0));
    }
  };

  return (
    <section ref={sectionRef} className="ps-root" id="projects">
      <div className="ps-container">

        {/* ── SECTION HEADER (Shared, perfectly responsive) ── */}
        <div className="ps-header">
          <div className="ps-header-left">
            <div className="ps-eyebrow">FEATURED PROJECTS</div>
            <h2 className="ps-heading">
              Real Projects.<br />
              Real <span className="ps-heading-blue">Impact.</span>
            </h2>
          </div>

          <div className="ps-header-right">
            <p className="ps-subtext">
              Built by students. Guided by industry.<br />
              Designed for the real world.
            </p>

            <div className="ps-counter-bar">
              <div className="ps-counter-number">
                <span className="ps-counter-cur">{String(activeIdx + 1).padStart(2, '0')}</span>
                <span className="ps-counter-slash">/</span>
                <span className="ps-counter-total">{String(STACK_PROJECTS.length).padStart(2, '0')}</span>
              </div>
              <div className="ps-dots-indicator ps-desktop-only" aria-label="Projects pagination">
                {STACK_PROJECTS.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`ps-dot-item ${i === activeIdx ? 'ps-dot-item--active' : ''}`}
                    onClick={() => setActiveIdx(i)}
                    aria-label={`Jump to project ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── DESKTOP STACK STAGE (Strictly preserved for desktop & tablet min-width: 769px) ── */}
        <div ref={stackStageRef} className="ps-stack-stage ps-desktop-only">
          {STACK_PROJECTS.map((proj, i) => (
            <div
              key={proj.id}
              ref={(el) => (cardRefs.current[i] = el)}
              className={`ps-stack-card ${i === activeIdx ? 'ps-stack-card--active' : ''}`}
              onClick={() => setSelectedProject(proj)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedProject(proj);
                }
              }}
              aria-label={`View breakdown of ${proj.title}`}
            >
              <div className="ps-card-sheet">
                <div className="ps-card-front">
                  <div className="ps-image-viewport">
                    <img
                      src={proj.image}
                      alt={proj.title}
                      className="ps-poster-img"
                      draggable={false}
                      loading="eager"
                      decoding="sync"
                      width={3072}
                      height={1048}
                    />
                  </div>
                  <div className="ps-card-hover-pill">
                    <span className="ps-hover-pulse" />
                    <span className="ps-hover-text">Inspect Specs & Breakdown</span>
                    <ArrowUpRight size={13} className="ps-hover-arrow" />
                  </div>
                </div>
                <div className="ps-card-back" aria-hidden="true">
                  <div className="ps-back-surface">
                    <div className="ps-back-accent" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Exhibition Hint */}
        <div className="ps-scroll-hint ps-desktop-only" aria-hidden="true">
          <span className="ps-hint-line" />
          <span className="ps-hint-text">Scroll to inspect archive · Click sheet for breakdown</span>
        </div>

        {/* ── MOBILE SWIPEABLE SHOWCASE (Mobile only max-width: 768px — No cards, no stack pinning) ── */}
        <div className="ps-mobile-showcase">
          <div
            className="ps-mobile-slider-viewport"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
          >
            <div
              className="ps-mobile-slider-track"
              style={{ transform: `translateX(-${activeIdx * 100}%)` }}
            >
              {STACK_PROJECTS.map((proj, idx) => (
                <div key={proj.id} className="ps-mobile-slide">
                  {/* Direct natural screenshot — zero card panels, zero decorative layers */}
                  <div
                    className="ps-mobile-media"
                    onClick={() => setSelectedProject(proj)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Inspect ${proj.title}`}
                  >
                    <img
                      src={proj.image}
                      alt={proj.title}
                      className="ps-mobile-img"
                      loading={idx === 0 ? "eager" : "lazy"}
                      draggable={false}
                    />
                  </div>

                  {/* Clean project information layout */}
                  <div className="ps-mobile-info">
                    <div className="ps-mobile-meta">
                      <span className="ps-mobile-num">{proj.n} / 04</span>
                      <span className="ps-mobile-sep" aria-hidden="true">·</span>
                      <span className="ps-mobile-category">{proj.category}</span>
                    </div>

                    <h3 className="ps-mobile-title">{proj.title}</h3>

                    <p className="ps-mobile-desc">{proj.shortDesc}</p>

                    <div className="ps-mobile-tags">
                      {proj.tech.slice(0, 3).map((t, ti) => (
                        <span key={ti} className="ps-mobile-tag">{t}</span>
                      ))}
                    </div>

                    <button
                      type="button"
                      className="ps-mobile-link"
                      onClick={() => setSelectedProject(proj)}
                    >
                      <span>Explore Project</span>
                      <ArrowUpRight size={14} className="ps-mobile-link-arrow" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Minimal Navigation & Progress Row */}
          <div className="ps-mobile-nav-bar">
            <button
              type="button"
              className="ps-mobile-arrow-btn"
              onClick={() => setActiveIdx((prev) => Math.max(0, prev - 1))}
              disabled={activeIdx === 0}
              aria-label="Previous project"
            >
              <ArrowLeft size={16} />
            </button>

            <span className="ps-mobile-nav-counter">
              {String(activeIdx + 1).padStart(2, '0')} / {String(STACK_PROJECTS.length).padStart(2, '0')}
            </span>

            <button
              type="button"
              className="ps-mobile-arrow-btn"
              onClick={() => setActiveIdx((prev) => Math.min(STACK_PROJECTS.length - 1, prev + 1))}
              disabled={activeIdx === STACK_PROJECTS.length - 1}
              aria-label="Next project"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

      </div>

      {/* ── EDITORIAL POP-UP MODAL (Portaled to body) ── */}
      {selectedProject && typeof document !== 'undefined' &&
        createPortal(
          <div
            className="ps-modal-backdrop"
            onClick={() => setSelectedProject(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <div
              className="ps-modal-card"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Top Nav Bar */}
              <div className="ps-modal-topbar">
                <div className="ps-modal-tag-group">
                  <span className="ps-modal-num">{selectedProject.n}</span>
                  <span className="ps-modal-tag-sep">/</span>
                  <span className="ps-modal-category">{selectedProject.category}</span>
                </div>
                <button
                  className="ps-modal-close-btn"
                  onClick={() => setSelectedProject(null)}
                  aria-label="Close project modal"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal Title & Headline */}
              <h3 id="modal-title" className="ps-modal-title">
                {selectedProject.title}
              </h3>
              <p className="ps-modal-full-desc">
                {selectedProject.fullDesc}
              </p>

              {/* Key Impact Stats */}
              <div className="ps-modal-metrics-grid">
                {selectedProject.metrics.map((m, idx) => (
                  <div key={idx} className="ps-metric-box">
                    <div className="ps-metric-val">{m.value}</div>
                    <div className="ps-metric-lbl">{m.label}</div>
                    <div className="ps-metric-sub">{m.desc}</div>
                  </div>
                ))}
              </div>

              {/* Architecture / Pipeline Steps */}
              <div className="ps-modal-section">
                <div className="ps-modal-sec-header">
                  <Layers size={14} className="ps-sec-icon" />
                  <span className="ps-sec-title">ARCHITECTURE & WORKFLOW</span>
                </div>
                <ul className="ps-modal-arch-list">
                  {selectedProject.architecture.map((item, idx) => (
                    <li key={idx} className="ps-modal-arch-item">
                      <CheckCircle2 size={15} className="ps-arch-check" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack Pills */}
              <div className="ps-modal-section">
                <div className="ps-modal-sec-header">
                  <Cpu size={14} className="ps-sec-icon" />
                  <span className="ps-sec-title">TECHNOLOGY & PROTOCOLS</span>
                </div>
                <div className="ps-modal-tech-wrap">
                  {selectedProject.tech.map((t) => (
                    <span key={t} className="ps-modal-tech-tag">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="ps-modal-footer">
                <span className="ps-modal-footer-caption">
                  Verified Neo Minds Student Project
                </span>
                <button
                  className="ps-modal-dismiss-btn"
                  onClick={() => setSelectedProject(null)}
                >
                  Dismiss Overview
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
}
