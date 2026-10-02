import React, { useState } from 'react';
import { ArrowRight, Compass, Shield, Users, ArrowUpRight, X, Sparkles, Building2 } from 'lucide-react';

export default function AboutSection({ onOpenJoinModal }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="section-spacing about-section" id="about">
      <div className="container">
        {/* Header Row */}
        <div className="section-header-row">
          <div className="section-header-left">
            <div className="kicker">
              OUR PURPOSE & THESIS
            </div>
            <h2 className="section-title editorial-serif">
              Bridging college to<br />
              <span style={{ color: '#1677FF' }}>industry.</span>
            </h2>
          </div>

          <div className="section-header-right">
            <p className="section-subtext">
              We help students build practical skills, work on real projects, and secure a verified pathway toward industry experience.
            </p>
            <button 
              className="btn btn-secondary" 
              onClick={() => setIsModalOpen(true)}
              style={{ marginTop: '0.5rem' }}
            >
              Read Our Thesis <ArrowRight size={15} />
            </button>
          </div>
        </div>

        {/* Editorial Structured 3-Pillar Row with Subtle Dividers (No Generic 3-Card Grid) */}
        <div className="about-editorial-manifesto">
          <div className="about-column-item">
            <div className="about-column-index">01</div>
            <h3 className="about-column-title">Practical Over Theory</h3>
            <p className="about-column-text">
              Colleges teach computer science foundations, but industry runs on modern stacks: autonomous workflows, vector systems, and production serverless architectures. We bridge this exact curriculum gap.
            </p>
            <div className="about-column-meta">
              <span className="about-tag">Tool Mastery</span>
              <span className="about-tag">Production Stacks</span>
            </div>
          </div>

          <div className="about-column-item">
            <div className="about-column-index">02</div>
            <h3 className="about-column-title">Proof Over Resumes</h3>
            <p className="about-column-text">
              Resumes with textbook bullet points don't convince modern engineering teams. Real code repositories, live hosted web applications, and verified diagnostic skill benchmarks speak louder.
            </p>
            <div className="about-column-meta">
              <span className="about-tag">Live Deployments</span>
              <span className="about-tag">Verified Proof</span>
            </div>
          </div>

          <div className="about-column-item">
            <div className="about-column-index">03</div>
            <h3 className="about-column-title">Campus to Career</h3>
            <p className="about-column-text">
              By partnering directly with collegiate chapters and vetted tech employers, we establish direct pipeline relationships where students move smoothly from learning to paid internships.
            </p>
            <div className="about-column-meta">
              <span className="about-tag">50+ Campus Hubs</span>
              <span className="about-tag">Direct Matching</span>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed About Modal / Manifesto */}
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
