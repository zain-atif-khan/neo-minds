import React, { useState } from 'react';
import { Building2, ArrowRight, CheckCircle2, ShieldCheck, Award, FileText, Send } from 'lucide-react';
import { CAMPUS_PROGRAM_STEPS } from '../data/mockData';

export default function CampusProgramPage({ navigateTo }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    collegeName: '',
    city: '',
    contactPerson: '',
    designation: 'Principal / Director',
    email: '',
    phone: '',
    studentCount: '1000 - 3000'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="section-spacing" style={{ paddingTop: '3.5rem' }}>
      <div className="container">
        {/* Header */}
        <div style={{ maxWidth: '750px', marginBottom: '3rem' }}>
          <div className="kicker">
            INSTITUTIONAL PARTNERSHIP MODEL
          </div>
          <h1 className="editorial-serif" style={{ fontSize: '3.5rem', lineHeight: '1.1', marginBottom: '1.25rem' }}>
            Empower your campus<br />with Neo Minds Hub.
          </h1>
          <p className="editorial-subtext" style={{ fontSize: '1.15rem' }}>
            Transform your collegiate curriculum into an active startup-connected innovation hub. 
            We partner with higher education colleges to charter technical clubs, mentor ambassadors, and connect students directly with hiring companies.
          </p>
        </div>

        {/* 9-Stage Institutional Roadmap */}
        <div style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-light)',
          borderRadius: '24px',
          padding: '3rem',
          marginBottom: '4rem'
        }}>
          <div className="kicker" style={{ color: 'var(--accent-blue)', marginBottom: '1.5rem' }}>
            THE 9-STAGE ONBOARDING JOURNEY
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.5rem'
          }}>
            {CAMPUS_PROGRAM_STEPS.map((s) => (
              <div key={s.step} style={{ background: '#FFFFFF', border: '1px solid var(--border-light)', borderRadius: '16px', padding: '1.5rem' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', fontWeight: 800, color: 'var(--accent-blue)', marginBottom: '0.4rem' }}>
                  {s.step}
                </div>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                  {s.title}
                </h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Institution Benefits vs Inquiry Form */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3.5rem', alignItems: 'flex-start', marginBottom: '4rem' }}>
          <div>
            <div className="kicker">WHY COLLEGES PARTNER</div>
            <h2 className="editorial-serif" style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>
              Bridging academic theory with verified industry outcomes.
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {[
                { title: 'Elevate NAAC / NBA Accreditations', desc: 'Tangible student innovation metrics, verifiable industry MOUs, and quantifiable internship placements.' },
                { title: 'Zero Financial Burden on College', desc: 'No infrastructure setup fees. We leverage existing computer labs and empower self-sustaining student leadership.' },
                { title: 'Faculty Upskilling & Co-Mentorship', desc: 'Professors gain access to emerging tech curriculum frameworks, guest lectures, and industry hackathon judging panels.' },
                { title: 'Proven Placement Multipliers', desc: 'Students enter campus recruitment rounds with production GitHub repositories and demonstrated project proof.' }
              ].map((b, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--bg-tertiary)', color: 'var(--accent-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <CheckCircle2 size={16} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.2rem' }}>{b.title}</h4>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Institutional Partnership Form */}
          <div style={{
            background: '#FFFFFF',
            border: '1px solid var(--border-light)',
            borderRadius: '24px',
            padding: '2.5rem',
            boxShadow: 'var(--shadow-md)'
          }}>
            {!submitted ? (
              <div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                  Request Institutional MoU Discussion
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                  Our academic relations team will schedule an exploratory briefing with your institution.
                </p>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label className="form-label">College / University Name *</label>
                    <input 
                      required 
                      type="text" 
                      placeholder="e.g. Osmania University College of Engineering" 
                      className="form-input"
                      value={formData.collegeName}
                      onChange={(e) => setFormData({ ...formData, collegeName: e.target.value })}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label className="form-label">City *</label>
                      <input 
                        required 
                        type="text" 
                        placeholder="e.g. Hyderabad" 
                        className="form-input"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="form-label">Total Student Strength</label>
                      <select 
                        className="form-select"
                        value={formData.studentCount}
                        onChange={(e) => setFormData({ ...formData, studentCount: e.target.value })}
                      >
                        <option value="Under 1000">Under 1,000</option>
                        <option value="1000 - 3000">1,000 - 3,000</option>
                        <option value="3000 - 8000">3,000 - 8,000</option>
                        <option value="8000+">8,000+</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label className="form-label">Contact Person Name *</label>
                      <input 
                        required 
                        type="text" 
                        placeholder="Dr. K. Srinivas" 
                        className="form-input"
                        value={formData.contactPerson}
                        onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="form-label">Designation</label>
                      <input 
                        type="text" 
                        placeholder="Dean / HOD CSE / TPO" 
                        className="form-input"
                        value={formData.designation}
                        onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label className="form-label">Official Email *</label>
                      <input 
                        required 
                        type="email" 
                        placeholder="dean@college.edu" 
                        className="form-input"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="form-label">Official Phone *</label>
                      <input 
                        required 
                        type="tel" 
                        placeholder="+91 98765 43210" 
                        className="form-input"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
                    Submit Partnership Inquiry <Send size={15} />
                  </button>
                </form>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#ECFDF5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem auto' }}>
                  <CheckCircle2 size={32} />
                </div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                  Partnership Dossier Dispatched
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                  Thank you, <strong>{formData.contactPerson}</strong>. Our academic partnerships team will contact {formData.collegeName} within 24 business hours with the institutional collaboration deck and MoU template.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
