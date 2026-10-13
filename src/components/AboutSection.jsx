import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, X, Building2, Shield } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const PRINCIPLES = [
  {
    index: '01',
    title: 'Practical Over Theory',
    text: 'Colleges teach computer science foundations, but industry runs on modern stacks: autonomous workflows, vector systems, and production serverless architectures.',
    pillars: ['TOOL MASTERY', 'PRODUCTION STACKS'],
  },
  {
    index: '02',
    title: 'Proof Over Resumes',
    text: "Resumes with textbook bullet points don't convince modern engineering teams. Real code repositories, live hosted web applications, and verified diagnostic skill benchmarks speak louder.",
    pillars: ['LIVE DEPLOYMENTS', 'VERIFIED PROOF'],
  },
  {
    index: '03',
    title: 'Campus to Career',
    text: 'By partnering directly with collegiate chapters and vetted tech employers, we establish direct pipeline relationships where students move smoothly from learning to paid internships.',
    pillars: ['50+ CAMPUS HUBS', 'DIRECT MATCHING'],
  },
];

export default function AboutSection({ onOpenJoinModal }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeHoverIndex, setActiveHoverIndex] = useState(0); // Exactly one principle active at a time

  const sectionRef = useRef(null);
  const trackWrapperRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(max-width: 768px)', () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      const cols = track.querySelectorAll('.about-principle-col');
      if (cols.length < 3) return;

      const getPanelWidth = () => window.innerWidth;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 75px',
          end: '+=1200',
          pin: true,
          pinSpacing: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            if (p < 0.38) {
              setActiveHoverIndex(0);
            } else if (p < 0.76) {
              setActiveHoverIndex(1);
            } else {
              setActiveHoverIndex(2);
            }
          },
        },
      });

      // Card 01 -> Card 02 -> Card 03 with comfortable reading holds
      tl.to({}, { duration: 0.1 })
        .to(track, {
          x: () => -getPanelWidth(),
          ease: 'power1.inOut',
          duration: 0.8,
        })
        .to({}, { duration: 0.1 })
        .to(track, {
          x: () => -(2 * getPanelWidth()),
          ease: 'power1.inOut',
          duration: 0.8,
        })
        .to({}, { duration: 0.3 });
    });

    return () => mm.revert();
  }, []);

  return (
    <section className="about-bridge-section" id="about" ref={sectionRef}>
      <div className="container about-bridge-container">
        {/* Header Row */}
        <div className="section-header-row about-bridge-header">
          <div className="section-header-left">
            <div className="kicker">
              OUR PURPOSE &amp; THESIS
            </div>
            <h2 className="section-title editorial-serif about-bridge-title">
              Bridging college to<br />
              <span className="text-blue">industry.</span>
            </h2>
          </div>

          <div className="section-header-right">
            <p className="section-subtext about-bridge-subtext">
              We help students build practical skills, work on real projects, and secure a verified pathway toward industry experience.
            </p>
            <button 
              className="about-explore-cta" 
              onClick={() => setIsModalOpen(true)}
              type="button"
            >
              <span>EXPLORE THE BRIDGE</span>
              <ArrowRight size={14} className="about-explore-arrow" />
            </button>
          </div>
        </div>

        {/* ── 3 EDITORIAL PRINCIPLES (HORIZONTAL SCROLL ON MOBILE, 3-COL ON DESKTOP) ── */}
        <div className="about-principles-track-wrapper" ref={trackWrapperRef}>
          <div className="about-bridge-principles" ref={trackRef}>
            {PRINCIPLES.map((principle, idx) => {
              const isActive = activeHoverIndex === idx;
              const isSubdued = activeHoverIndex !== null && !isActive;

              return (
                <div
                  key={principle.index}
                  className={`about-principle-col ${isActive ? 'is-active' : ''} ${isSubdued ? 'is-subdued' : ''}`}
                  onMouseEnter={() => setActiveHoverIndex(idx)}
                  tabIndex={0}
                  role="region"
                  aria-label={`Principle ${principle.index}: ${principle.title}`}
                >
                {/* Faint Oversized Watermark Number */}
                <div className="about-principle-watermark" aria-hidden="true">
                  {principle.index}
                </div>

                {/* Top Number */}
                <div className="about-principle-num">
                  {principle.index}
                </div>

                {/* Heading */}
                <h3 className="about-principle-heading">
                  {principle.title}
                </h3>

                {/* Paragraph */}
                <p className="about-principle-text">
                  {principle.text}
                </p>

                {/* Vertical Blue Accent Pillars (No Pills!) */}
                <div className="about-principle-pillars">
                  <div className="about-pillars-accent" aria-hidden="true" />
                  <div className="about-pillars-list">
                    {principle.pillars.map((pillar, pIdx) => (
                      <span key={pIdx} className="about-pillar-word">
                        {pillar}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>

      {/* Detailed Thesis Modal */}
      {isModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsModalOpen(false)}>
          <div 
            className="modal-container about-detail-modal" 
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <button 
              className="modal-close-btn" 
              onClick={() => setIsModalOpen(false)}
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            <div className="kicker" style={{ marginBottom: '0.5rem' }}>
              ABOUT NEO MINDS · THE FULL THESIS
            </div>

            <h3 className="modal-title editorial-serif" style={{ fontSize: '2.1rem', marginBottom: '1.25rem', lineHeight: '1.18' }}>
              Why Neo Minds exists and why collegiate education must evolve.
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', color: 'var(--text-secondary)', fontSize: '0.96rem', lineHeight: '1.7' }}>
              <p>
                Every year, millions of ambitious engineering and science students graduate with strong theoretical grades but near-zero exposure to the tools and architectures currently driving tech teams globally.
              </p>

              <div style={{ padding: '1.25rem', background: 'var(--bg-secondary)', borderLeft: '3px solid #1677FF', borderRadius: '4px 12px 12px 4px' }}>
                <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                  The Structural Dilemma
                </div>
                Academic syllabi take years to adapt. Meanwhile, paradigms like AI workflow orchestration, cloud automation, vector embeddings, and real-time backend state engines move in months.
              </div>

              <p>
                <strong>Neo Minds does not replace colleges — we empower them.</strong> We introduce dynamic technical clubs, mentor-led sprints, and standardized skill diagnostic assessments directly into campus life. When a student builds with us, they do not just pass an exam; they deploy software used by actual end users.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginTop: '0.5rem' }}>
                <div style={{ border: '1px solid var(--border-light)', padding: '1.25rem', borderRadius: '14px', background: '#FFFFFF' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                    <Building2 size={18} className="text-blue" />
                    For Universities
                  </div>
                  <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                    Accreditation-ready technical clubs, faculty upskilling workshops, and measurable placement outcome growth.
                  </div>
                </div>

                <div style={{ border: '1px solid var(--border-light)', padding: '1.25rem', borderRadius: '14px', background: '#FFFFFF' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                    <Shield size={18} className="text-blue" />
                    For Hiring Partners
                  </div>
                  <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                    Immediate access to pre-evaluated talent with verified GitHub portfolios, eliminating candidate guesswork.
                  </div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '2rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-light)', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
              <button 
                className="btn btn-secondary"
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </button>
              {onOpenJoinModal && (
                <button 
                  className="btn btn-primary"
                  onClick={() => {
                    setIsModalOpen(false);
                    onOpenJoinModal();
                  }}
                >
                  Join Neo Minds <ArrowRight size={15} />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
