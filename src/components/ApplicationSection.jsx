import React, { useState, useRef, useCallback } from 'react';
import { X, ArrowRight, CheckCircle2 } from 'lucide-react';

// ─── DATA ─────────────────────────────────────────────────────────
const STUDENT_PATH = [
  { n: '01', title: 'ASSESS',  desc: 'Understand what you already know and where you need to improve.' },
  { n: '02', title: 'LEARN',   desc: 'Learn the skills you are missing through practical training.' },
  { n: '03', title: 'BUILD',   desc: 'Work on real projects and create proof of what you can do.' },
  { n: '04', title: 'PREPARE', desc: 'Improve your portfolio, communication and interview readiness.' },
  { n: '05', title: 'INTERN',  desc: 'Use your skills and project work to work toward real industry opportunities.' },
];

const AMBASSADOR_PATH = [
  { n: '01', title: 'REPRESENT', desc: 'Bring Neo Minds to your college and introduce it to your peers.' },
  { n: '02', title: 'CONNECT',   desc: 'Build a community of students on your campus who want to grow.' },
  { n: '03', title: 'ORGANISE',  desc: 'Run workshops, events and activities that create real learning opportunities.' },
  { n: '04', title: 'LEAD',      desc: 'Take ownership of your campus chapter and create measurable impact.' },
];

// ─── APPLICATION MODAL ────────────────────────────────────────────
function ApplicationModal({ type, onClose }) {
  const isStudent = type === 'student';
  const initialForm = isStudent
    ? { name: '', email: '', phone: '', college: '', courseYear: '', skills: '', why: '' }
    : { name: '', email: '', phone: '', college: '', courseYear: '', campusCity: '', why: '', experience: '' };

  const [formData, setFormData] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));
  const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true); };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={e => e.stopPropagation()} style={{ maxWidth: '580px' }}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close">
          <X size={18} />
        </button>

        {!submitted ? (
          <div>
            <div className="kicker">
              {isStudent ? 'STUDENT APPLICATION' : 'AMBASSADOR APPLICATION'}
            </div>
            <h3 style={{ fontSize: '1.55rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem', lineHeight: 1.2 }}>
              {isStudent ? 'Start building your skills.' : 'Lead Neo Minds on your campus.'}
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.75rem', lineHeight: 1.6 }}>
              {isStudent
                ? "Fill in your details and we'll reach out with your next steps."
                : "Tell us about yourself and your campus. We'll be in touch."}
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label className="form-label">Full Name *</label>
                  <input required type="text" placeholder="e.g. Ayaan Khan" className="form-input"
                    value={formData.name} onChange={e => handleChange('name', e.target.value)} />
                </div>
                <div>
                  <label className="form-label">Email Address *</label>
                  <input required type="email" placeholder="you@college.edu" className="form-input"
                    value={formData.email} onChange={e => handleChange('email', e.target.value)} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '0.8fr 1.2fr', gap: '1rem' }}>
                <div>
                  <label className="form-label">Phone *</label>
                  <input required type="tel" placeholder="+91 9876543210" className="form-input"
                    value={formData.phone} onChange={e => handleChange('phone', e.target.value)} />
                </div>
                <div>
                  <label className="form-label">College / Institute *</label>
                  <input required type="text" placeholder="e.g. Anwar Ul Uloom College" className="form-input"
                    value={formData.college} onChange={e => handleChange('college', e.target.value)} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label className="form-label">Course / Year *</label>
                  <input required type="text" placeholder="e.g. B.Tech CSE, 2nd Year" className="form-input"
                    value={formData.courseYear} onChange={e => handleChange('courseYear', e.target.value)} />
                </div>
                {isStudent ? (
                  <div>
                    <label className="form-label">Skills / Area of Interest</label>
                    <input type="text" placeholder="e.g. Web Dev, AI, Design" className="form-input"
                      value={formData.skills} onChange={e => handleChange('skills', e.target.value)} />
                  </div>
                ) : (
                  <div>
                    <label className="form-label">Campus / City *</label>
                    <input required type="text" placeholder="e.g. Hyderabad" className="form-input"
                      value={formData.campusCity} onChange={e => handleChange('campusCity', e.target.value)} />
                  </div>
                )}
              </div>

              <div>
                <label className="form-label">
                  {isStudent ? 'Why do you want to join Neo Minds? *' : 'Why do you want to become an ambassador? *'}
                </label>
                <textarea required rows={3}
                  placeholder={isStudent
                    ? 'Tell us about your goals and what you hope to build...'
                    : 'Tell us why you want to represent Neo Minds at your campus...'}
                  className="form-textarea"
                  value={formData.why} onChange={e => handleChange('why', e.target.value)} />
              </div>

              {!isStudent && (
                <div>
                  <label className="form-label">Relevant Experience (optional)</label>
                  <textarea rows={2} placeholder="Any club leadership, events organized, community work..."
                    className="form-textarea"
                    value={formData.experience} onChange={e => handleChange('experience', e.target.value)} />
                </div>
              )}

              <button type="submit" className="btn btn-primary" style={{ marginTop: '0.25rem', width: '100%' }}>
                {isStudent ? 'Submit Student Application' : 'Submit Ambassador Application'}
                <ArrowRight size={15} />
              </button>
            </form>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '2.5rem 1rem' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#ECFDF5', color: '#059669',
              display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem auto' }}>
              <CheckCircle2 size={36} />
            </div>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              Application Received!
            </h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: 380, margin: '0 auto 2rem auto' }}>
              Thank you, <strong>{formData.name}</strong>. We'll review your application and reach out at{' '}
              <strong>{formData.email}</strong> with next steps.
            </p>
            <button className="btn btn-primary" onClick={onClose}>Back to Website</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── PATHWAY ITEMS — shared renderer ────────────────────────────────
function PathwayItems({ items }) {
  return (
    <div className="prz-items">
      {items.map((item) => (
        <div key={item.n} className="prz-item">
          <span className="prz-item-num">{item.n}</span>
          <div className="prz-item-body">
            <span className="prz-item-title">{item.title}</span>
            <span className="prz-item-desc">{item.desc}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── PATHWAY STAGE — ONE shared container, two exclusive states ────
// activePathway: 'student' | 'ambassador' (student is default/fallback)
function PathwayStage({ activePathway }) {
  // student is visible when activePathway is 'student' OR null (default)
  const showStudent = activePathway !== 'ambassador';

  return (
    <div className="prz-stage">
      {/* ── STUDENT PATHWAY ── */}
      <div className={`prz-panel ${showStudent ? 'prz-panel--visible' : 'prz-panel--hidden'}`}
        aria-hidden={!showStudent}>
        <div className="prz-eyebrow">
          <span className="prz-eyebrow-num">01</span>
          STUDENT PATHWAY
        </div>
        <PathwayItems items={STUDENT_PATH} />
      </div>

      {/* ── AMBASSADOR PATHWAY ── */}
      <div className={`prz-panel ${!showStudent ? 'prz-panel--visible' : 'prz-panel--hidden'}`}
        aria-hidden={showStudent}>
        <div className="prz-eyebrow">
          <span className="prz-eyebrow-num">02</span>
          AMBASSADOR PATHWAY
        </div>
        <PathwayItems items={AMBASSADOR_PATH} />
      </div>
    </div>
  );
}

// ─── MAIN SECTION ─────────────────────────────────────────────────
export default function ApplicationSection() {
  const [activeModal, setActiveModal] = useState(null);
  // 'student' | 'ambassador' | null — null defaults to showing student pathway
  const [hoverPathway, setHoverPathway] = useState(null);
  const [activeZone, setActiveZone] = useState(null);
  const [dotOffset, setDotOffset] = useState({ x: 0, y: 0 });

  const splitRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!splitRef.current) return;
    const rect = splitRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    // Left/right half detection — 40px center dead zone
    if (deltaX < -40) {
      setHoverPathway('student');
    } else if (deltaX > 40) {
      setHoverPathway('ambassador');
    } else {
      setHoverPathway(null);
    }

    // Magnetic pull — max 32px horizontal, 18px vertical
    const pullX = Math.max(-32, Math.min(32, deltaX * 0.09));
    const pullY = Math.max(-18, Math.min(18, deltaY * 0.06));
    setDotOffset({ x: pullX, y: pullY });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoverPathway(null);
    setDotOffset({ x: 0, y: 0 });
  }, []);

  // The displayed pathway: hover overrides, else default to 'student'
  const displayPathway = hoverPathway ?? 'student';

  return (
    <>
      <section className="section-spacing application-section" id="apply">
        <div className="container">

          {/* ── Section Header + Editorial Composition ── */}
          <div className="app-header-grid">
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

            {/* Borderless Editorial Typographic Composition */}
            <div className={`editorial-canvas ${
              activeZone === 'student' ? 'has-active-student' : ''
            } ${activeZone === 'ambassador' ? 'has-active-ambassador' : ''}`}>
              <div
                className="editorial-side editorial-side--student"
                onMouseEnter={() => setActiveZone('student')}
                onMouseLeave={() => setActiveZone(null)}
              >
                <span className="editorial-bg-num" aria-hidden="true">01</span>
                <div className="editorial-kicker-label">
                  <span className="editorial-indicator-dot" />
                  FOR STUDENTS
                </div>
                <div className="editorial-dominant-word">BUILD</div>
                <div className="editorial-scatter-cloud">
                  <div className="scatter-row scatter-row--1">
                    <span className="scatter-word word-skills">SKILLS</span>
                    <span className="scatter-word word-projects">PROJECTS</span>
                  </div>
                  <div className="scatter-row scatter-row--2">
                    <span className="scatter-word word-learn">LEARN</span>
                    <span className="scatter-word word-create">CREATE</span>
                  </div>
                </div>
              </div>

              <div
                className="editorial-side editorial-side--ambassador"
                onMouseEnter={() => setActiveZone('ambassador')}
                onMouseLeave={() => setActiveZone(null)}
              >
                <span className="editorial-bg-num" aria-hidden="true">02</span>
                <div className="editorial-kicker-label">
                  <span className="editorial-indicator-dot" />
                  FOR AMBASSADORS
                </div>
                <div className="editorial-dominant-word">LEAD</div>
                <div className="editorial-scatter-cloud">
                  <div className="scatter-row scatter-row--1">
                    <span className="scatter-word word-campus">CAMPUS</span>
                    <span className="scatter-word word-community">COMMUNITY</span>
                  </div>
                  <div className="scatter-row scatter-row--2">
                    <span className="scatter-word word-connect">CONNECT</span>
                    <span className="scatter-word word-impact">IMPACT</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Magnetic Split ── */}
          <div
            ref={splitRef}
            className={`app-split ${
              hoverPathway === 'student' ? 'split-active-student' : ''
            } ${hoverPathway === 'ambassador' ? 'split-active-ambassador' : ''}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* LEFT: STUDENT */}
            <div
              className="app-pathway app-pathway--student"
              onMouseEnter={() => setHoverPathway('student')}
              onClick={() => setActiveModal('student')}
              role="button" tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && setActiveModal('student')}
            >
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
                  onClick={e => { e.stopPropagation(); setActiveModal('student'); }}
                  id="apply-student-btn"
                >
                  Apply as a Student
                  <span className="app-cta-arrow">→</span>
                </button>
              </div>
            </div>

            {/* CENTER DOT */}
            <div className="app-center-rule" aria-hidden="true">
              <div className="app-rule-line app-rule-line--top" />
              <div
                className="app-rule-dot-wrap"
                style={{ transform: `translate3d(${dotOffset.x}px, ${dotOffset.y}px, 0)` }}
              >
                <span className="app-rule-dot" />
                <span className="app-rule-dot-glow" />
              </div>
              <div className="app-rule-line app-rule-line--bottom" />
            </div>

            {/* RIGHT: AMBASSADOR */}
            <div
              className="app-pathway app-pathway--ambassador"
              onMouseEnter={() => setHoverPathway('ambassador')}
              onClick={() => setActiveModal('ambassador')}
              role="button" tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && setActiveModal('ambassador')}
            >
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
                  onClick={e => { e.stopPropagation(); setActiveModal('ambassador'); }}
                  id="apply-ambassador-btn"
                >
                  Become an Ambassador
                  <span className="app-cta-arrow">→</span>
                </button>
              </div>
            </div>
          </div>

          {/* ── PATHWAY STAGE: ONE shared area, exclusive states ── */}
          <PathwayStage activePathway={displayPathway} />

        </div>
      </section>

      {/* Modals */}
      {activeModal && (
        <ApplicationModal
          type={activeModal}
          onClose={() => setActiveModal(null)}
        />
      )}
    </>
  );
}
