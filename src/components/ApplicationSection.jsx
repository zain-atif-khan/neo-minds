import React, { useState } from 'react';
import { X, ArrowRight, CheckCircle2 } from 'lucide-react';

// ─── APPLICATION MODAL ────────────────────────────────────────────
function ApplicationModal({ type, onClose }) {
  const isStudent = type === 'student';

  const initialForm = isStudent
    ? {
        name: '',
        email: '',
        phone: '',
        college: '',
        courseYear: '',
        skills: '',
        why: '',
      }
    : {
        name: '',
        email: '',
        phone: '',
        college: '',
        courseYear: '',
        campusCity: '',
        why: '',
        experience: '',
      };

  const [formData, setFormData] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-card"
        onClick={e => e.stopPropagation()}
        style={{ maxWidth: '580px' }}
      >
        <button className="modal-close-btn" onClick={onClose} aria-label="Close">
          <X size={18} />
        </button>

        {!submitted ? (
          <div>
            <div className="kicker">
              {isStudent ? 'STUDENT APPLICATION' : 'AMBASSADOR APPLICATION'}
            </div>
            <h3 style={{
              fontSize: '1.55rem', fontWeight: 700,
              color: 'var(--text-primary)', marginBottom: '0.25rem', lineHeight: 1.2
            }}>
              {isStudent ? 'Start building your skills.' : 'Lead Neo Minds on your campus.'}
            </h3>
            <p style={{
              fontSize: '0.875rem', color: 'var(--text-muted)',
              marginBottom: '1.75rem', lineHeight: 1.6
            }}>
              {isStudent
                ? "Fill in your details and we'll reach out with your next steps."
                : "Tell us about yourself and your campus. We'll be in touch."}
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* Row 1: Name + Email */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label className="form-label">Full Name *</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Ayaan Khan"
                    className="form-input"
                    value={formData.name}
                    onChange={e => handleChange('name', e.target.value)}
                  />
                </div>
                <div>
                  <label className="form-label">Email Address *</label>
                  <input
                    required
                    type="email"
                    placeholder="you@college.edu"
                    className="form-input"
                    value={formData.email}
                    onChange={e => handleChange('email', e.target.value)}
                  />
                </div>
              </div>

              {/* Row 2: Phone + College */}
              <div style={{ display: 'grid', gridTemplateColumns: '0.8fr 1.2fr', gap: '1rem' }}>
                <div>
                  <label className="form-label">Phone *</label>
                  <input
                    required
                    type="tel"
                    placeholder="+91 9876543210"
                    className="form-input"
                    value={formData.phone}
                    onChange={e => handleChange('phone', e.target.value)}
                  />
                </div>
                <div>
                  <label className="form-label">College / Institute *</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Anwar Ul Uloom College"
                    className="form-input"
                    value={formData.college}
                    onChange={e => handleChange('college', e.target.value)}
                  />
                </div>
              </div>

              {/* Row 3: Course Year + (City for ambassador / Skills for student) */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label className="form-label">Course / Year *</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. B.Tech CSE, 2nd Year"
                    className="form-input"
                    value={formData.courseYear}
                    onChange={e => handleChange('courseYear', e.target.value)}
                  />
                </div>
                {isStudent ? (
                  <div>
                    <label className="form-label">Skills / Area of Interest</label>
                    <input
                      type="text"
                      placeholder="e.g. Web Dev, AI, Design"
                      className="form-input"
                      value={formData.skills}
                      onChange={e => handleChange('skills', e.target.value)}
                    />
                  </div>
                ) : (
                  <div>
                    <label className="form-label">Campus / City *</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Hyderabad"
                      className="form-input"
                      value={formData.campusCity}
                      onChange={e => handleChange('campusCity', e.target.value)}
                    />
                  </div>
                )}
              </div>

              {/* Why */}
              <div>
                <label className="form-label">
                  {isStudent ? 'Why do you want to join Neo Minds? *' : 'Why do you want to become an ambassador? *'}
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder={isStudent
                    ? 'Tell us about your goals and what you hope to build...'
                    : 'Tell us why you want to represent Neo Minds at your campus...'}
                  className="form-textarea"
                  value={formData.why}
                  onChange={e => handleChange('why', e.target.value)}
                />
              </div>

              {/* Ambassador only: Relevant experience */}
              {!isStudent && (
                <div>
                  <label className="form-label">Relevant Experience (optional)</label>
                  <textarea
                    rows={2}
                    placeholder="Any club leadership, events organized, community work..."
                    className="form-textarea"
                    value={formData.experience}
                    onChange={e => handleChange('experience', e.target.value)}
                  />
                </div>
              )}

              <button
                type="submit"
                className="btn btn-primary"
                style={{ marginTop: '0.25rem', width: '100%' }}
              >
                {isStudent ? 'Submit Student Application' : 'Submit Ambassador Application'}
                <ArrowRight size={15} />
              </button>
            </form>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '2.5rem 1rem' }}>
            <div style={{
              width: 64, height: 64, borderRadius: '50%',
              background: '#ECFDF5', color: '#059669',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 1.25rem auto'
            }}>
              <CheckCircle2 size={36} />
            </div>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              Application Received!
            </h3>
            <p style={{
              fontSize: '0.95rem', color: 'var(--text-muted)',
              lineHeight: 1.6, maxWidth: 380, margin: '0 auto 2rem auto'
            }}>
              Thank you, <strong>{formData.name}</strong>. We'll review your application and reach out at{' '}
              <strong>{formData.email}</strong> with next steps.
            </p>
            <button className="btn btn-primary" onClick={onClose}>
              Back to Website
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── MAIN SECTION ────────────────────────────────────────────────
export default function ApplicationSection() {
  const [activeModal, setActiveModal] = useState(null); // 'student' | 'ambassador' | null

  return (
    <>
      <section className="section-spacing application-section" id="apply">
        <div className="container">

          {/* ── Section Label ─────────────────────────── */}
          <div className="app-section-header">
            <div className="kicker">JOIN NEO MINDS</div>
            <h2 className="app-section-headline editorial-serif">
              Build skills.<br />
              <span style={{ color: '#1677FF' }}>Join the movement.</span>
            </h2>
            <p className="app-section-desc">
              Neo Minds helps students develop practical, industry-ready skills through
              learning, projects, assessments and real opportunities.
            </p>
          </div>

          {/* ── Editorial Split Layout ────────────────── */}
          <div className="app-split">

            {/* ── LEFT: STUDENT (primary pathway) ─────── */}
            <div className="app-pathway app-pathway--student">
              <div className="app-pathway-index">01</div>
              <div className="app-pathway-divider" />

              <div className="app-pathway-body">
                <div className="app-pathway-label">STUDENTS</div>
                <h3 className="app-pathway-title">
                  Start building<br />your skills.
                </h3>
                <p className="app-pathway-text">
                  Join Neo Minds, assess your current skills, learn practical tools,
                  build real projects and work toward industry opportunities — all while
                  still in college.
                </p>

                <div className="app-pathway-tags">
                  <span className="app-tag">Skill Assessment</span>
                  <span className="app-tag">Live Projects</span>
                  <span className="app-tag">Internship Path</span>
                </div>

                <button
                  className="app-pathway-cta"
                  onClick={() => setActiveModal('student')}
                  id="apply-student-btn"
                >
                  Apply as a Student
                  <span className="app-cta-arrow">→</span>
                </button>
              </div>
            </div>

            {/* ── CENTER DIVIDER ───────────────────────── */}
            <div className="app-center-rule" aria-hidden="true">
              <div className="app-rule-line" />
              <span className="app-rule-dot" />
              <div className="app-rule-line" />
            </div>

            {/* ── RIGHT: AMBASSADOR ────────────────────── */}
            <div className="app-pathway app-pathway--ambassador">
              <div className="app-pathway-index">02</div>
              <div className="app-pathway-divider" />

              <div className="app-pathway-body">
                <div className="app-pathway-label">AMBASSADORS</div>
                <h3 className="app-pathway-title">
                  Lead Neo Minds<br />on your campus.
                </h3>
                <p className="app-pathway-text">
                  Represent Neo Minds at your college, build a student community,
                  organise activities and help more students discover practical
                  learning opportunities.
                </p>

                <div className="app-pathway-tags">
                  <span className="app-tag">Campus Chapter</span>
                  <span className="app-tag">Community Building</span>
                  <span className="app-tag">Leadership</span>
                </div>

                <button
                  className="app-pathway-cta app-pathway-cta--secondary"
                  onClick={() => setActiveModal('ambassador')}
                  id="apply-ambassador-btn"
                >
                  Become an Ambassador
                  <span className="app-cta-arrow">→</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── Modals ─────────────────────────────────────── */}
      {activeModal && (
        <ApplicationModal
          type={activeModal}
          onClose={() => setActiveModal(null)}
        />
      )}
    </>
  );
}
