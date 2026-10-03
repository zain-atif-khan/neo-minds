import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// ─── PROJECT DATA ─────────────────────────────────────────────────
// Sourced from the real project showcase images provided.
const STACK_PROJECTS = [
  {
    n: '01',
    category: 'HR & RECRUITMENT',
    title: 'Resume Screener — Fit Scores & Red Flags in Seconds',
    description:
      'When hundreds of resumes hit the inbox, manual screening becomes a bottleneck. We built a fully autonomous n8n pipeline: Gmail triggers intake, Groq AI pre-screens and deep-evaluates against live Sheets criteria, Teamwork gets the task and PDF — and HR gets a polished Fit Score briefing in seconds.',
    tech: ['HR', 'Automation', 'Resume Screening', 'Google Sheets', 'n8n'],
    image: '/proj1.png',
  },
  {
    n: '02',
    category: 'MENTAL WELLNESS',
    title: 'Mindspace.ai: 24/7 AI Companion (TARA) for Mental Wellness',
    description:
      'Mindspace is a Progressive Web App that combines AI voice calling and text chat with TARA — GoodMind\'s mental wellness companion — plus six mental health assessments, therapist booking (Cal.com), and subscription-based minutes (Razorpay). Real-time voice via ElevenLabs, streaming responses and a simple, calm interface.',
    tech: ['Mental Wellness', 'AI Companion', 'TARA', 'ElevenLabs', 'Cal.com', 'Razorpay', 'PWA'],
    image: '/proj2.png',
  },
  {
    n: '03',
    category: 'E-COMMERCE / ANALYTICS',
    title: 'IncStores: 360° E-commerce Analytics & AI Queries',
    description:
      'A single pane of glass for eCommerce: revenue, sales, products, customers, customizations, and web analytics. IncStores Dashboard connects to MySQL (Magento/IncStores schema), offers AI-powered natural language queries via an in-app Groq chatbot, integrates Google Analytics-style insights and reporting.',
    tech: ['E-commerce', 'Analytics', 'BI Dashboard', 'React', 'TypeScript', 'Node.js'],
    image: '/proj3.png',
  },
  {
    n: '04',
    category: 'ENTERPRISE AI / RAG',
    title: 'Project Buddy: AI That Knows Your Drive, Jira & Slack',
    description:
      'Finding answers across 47+ project docs used to take 15–30 minutes. We built an AI assistant in Slack that uses Vertex AI RAG to search your Drive (and context), return grounded answers in 1–2 seconds, and cite sources — so the whole team stays in the loop without leaving the app.',
    tech: ['AI', 'RAG', 'Slack', 'Google Drive', 'Vertex AI', 'Jira', 'Enterprise', 'Automation'],
    image: '/proj4.png',
  },
];

const SCROLL_PER_PROJECT = 900; // px of scroll distance per project transition

// ─── MAIN COMPONENT ───────────────────────────────────────────────
export default function ProjectsSection({ navigateTo }) {
  const sectionRef    = useRef(null);
  const pinnedRef     = useRef(null);
  const cardRefs      = useRef([]);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const pinned  = pinnedRef.current;
    if (!section || !pinned) return;

    const ctx = gsap.context(() => {
      const totalProjects = STACK_PROJECTS.length;
      const scrollDistance = SCROLL_PER_PROJECT * (totalProjects - 1);

      // Set initial z-index and layer order — cards stacked newest on top
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        gsap.set(card, {
          zIndex: i + 1,
          // All cards except 0 start slightly offset downward and scaled
          y:      i === 0 ? 0 : 48,
          scale:  i === 0 ? 1 : 0.97,
          opacity: i === 0 ? 1 : 0,
        });
      });

      ScrollTrigger.create({
        trigger: section,
        start: 'top 75px',
        end: `+=${scrollDistance}`,
        pin: pinnedRef.current,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        scrub: 0.5,
        onUpdate(self) {
          const p = self.progress;
          const floatIdx = p * (totalProjects - 1);
          const currentIdx = Math.min(Math.floor(floatIdx + 0.5), totalProjects - 1);
          setActiveIdx(currentIdx);

          cardRefs.current.forEach((card, i) => {
            if (!card) return;
            // Each card transition occupies 1/(n-1) of total progress
            const segStart = i / (totalProjects - 1);
            const segEnd   = (i + 1) / (totalProjects - 1);
            const segProgress = Math.max(0, Math.min(1, (p - segStart) / (1 / (totalProjects - 1))));

            if (i < currentIdx) {
              // Already passed — push up and fade back
              const pushAmount = (currentIdx - i) * 32;
              gsap.set(card, {
                y: -(pushAmount),
                scale: Math.max(0.9, 1 - (currentIdx - i) * 0.035),
                opacity: Math.max(0, 1 - (currentIdx - i) * 0.45),
                zIndex: i + 1,
              });
            } else if (i === currentIdx) {
              // Active card — fully visible
              gsap.set(card, { y: 0, scale: 1, opacity: 1, zIndex: totalProjects + 10 });
            } else {
              // Upcoming card — slightly below
              const nextOffset = (i - currentIdx);
              gsap.set(card, {
                y: nextOffset * 18,
                scale: 1 - nextOffset * 0.025,
                opacity: Math.max(0, 1 - nextOffset * 0.55),
                zIndex: i + 1,
              });
            }
          });
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="ps-root" id="projects">

      {/* ── Section header (scrolls away before pin) ── */}
      <div className="container">
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
            <div className="ps-counter-inline">
              <span className="ps-counter-active">{String(activeIdx + 1).padStart(2, '0')}</span>
              <span className="ps-counter-sep">/</span>
              <span className="ps-counter-total">{String(STACK_PROJECTS.length).padStart(2, '0')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Pinned Viewport ── */}
      <div ref={pinnedRef} className="ps-pinned-viewport">
        <div className="ps-stack">
          {STACK_PROJECTS.map((proj, i) => (
            <div
              key={proj.n}
              ref={el => cardRefs.current[i] = el}
              className={`ps-card ${i === activeIdx ? 'ps-card--active' : ''}`}
            >
              {/* LEFT: editorial meta */}
              <div className="ps-card-meta">
                <div className="ps-card-num">{proj.n}</div>
                <div className="ps-card-rule" />
                <div className="ps-card-category">{proj.category}</div>
                <h3 className="ps-card-title">{proj.title}</h3>
                <p className="ps-card-desc">{proj.description}</p>
                <div className="ps-card-tech">
                  {proj.tech.map(t => (
                    <span key={t} className="ps-tech-tag">{t}</span>
                  ))}
                </div>
              </div>

              {/* RIGHT: project image */}
              <div className="ps-card-image-wrap">
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="ps-card-image"
                  draggable={false}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Progress dots — subtle position indicator */}
        <div className="ps-progress-dots" aria-hidden="true">
          {STACK_PROJECTS.map((_, i) => (
            <span
              key={i}
              className={`ps-dot ${i === activeIdx ? 'ps-dot--active' : ''}`}
            />
          ))}
        </div>
      </div>

    </section>
  );
}
