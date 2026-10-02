import React, { useState } from 'react';
import { Briefcase, ArrowRight, CheckCircle2, ShieldCheck, Users, Code, Award, Send } from 'lucide-react';
import { INDUSTRY_BENEFITS } from '../data/mockData';

export default function ForIndustryPage({ navigateTo }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    workEmail: '',
    contactName: '',
    roleToHire: 'AI / Automation Engineers',
    headcount: '1 - 5 Interns',
    projectSponsorship: 'Yes, interested in capstone project'
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
            ENTERPRISE TALENT & SPRINT INFRASTRUCTURE
          </div>
          <h1 className="editorial-serif" style={{ fontSize: '3.5rem', lineHeight: '1.1', marginBottom: '1.25rem' }}>
            Access a pipeline of<br />industry-ready talent.
          </h1>
          <p className="editorial-subtext" style={{ fontSize: '1.15rem' }}>
            Skip generic resumes. Hire pre-assessed college engineers with verified production code, tool fluency in n8n/APIs/React, and continuous mentorship.
          </p>
        </div>

        {/* 6-Stage Industry Hiring Journey */}
        <div style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-light)',
          borderRadius: '24px',
          padding: '3rem',
          marginBottom: '4rem'
        }}>
          <div className="kicker" style={{ color: 'var(--accent-blue)', marginBottom: '1.5rem' }}>
            THE TALENT DEPLOYMENT PIPELINE
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            gap: '1rem'
          }}>
            {[
              { step: '01', title: 'Company', desc: 'Define required tech stack & project scopes' },
              { step: '02', title: 'Skill Criteria', desc: 'Specify benchmarks in APIs, LLMs, or React' },
              { step: '03', title: 'Verification', desc: 'Candidates pass strict diagnostic evaluations' },
              { step: '04', title: 'Shortlist', desc: 'Review hosted demos & GitHub PR commits' },
              { step: '05', title: 'Internship', desc: '8 to 12-week sponsored sprint with check-ins' },
              { step: '06', title: 'PPO Hiring', desc: 'Convert proven performers to full-time SWEs' },
            ].map((s) => (
              <div key={s.step} style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid var(--border-light)', padding: '1.25rem' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 800, color: 'var(--accent-blue)', marginBottom: '0.35rem' }}>
                  {s.step}
                </div>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
                  {s.title}
                </h4>
                <p style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Value Proposition & Hiring Form */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '3.5rem', alignItems: 'flex-start', marginBottom: '4rem' }}>
          <div>
            <div className="kicker">WHY TECH COMPANIES CHOOSE NEO MINDS</div>
            <h2 className="editorial-serif" style={{ fontSize: '2.4rem', marginBottom: '1.5rem' }}>
              Engineers trained for day-one production impact.
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {INDUSTRY_BENEFITS.map((b, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--bg-tertiary)', color: 'var(--accent-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <ShieldCheck size={18} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>{b.title}</h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hiring Partner Request Form */}
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
                  Post an Internship or Commission a Project
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                  Connect with the Neo Minds industry team to receive verified student shortlists.
                </p>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label className="form-label">Company Name *</label>
                    <input 
                      required 
                      type="text" 
                      placeholder="e.g. FinTech Systems Inc." 
                      className="form-input"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label className="form-label">Work Email *</label>
                      <input 
                        required 
                        type="email" 
                        placeholder="hiring@company.com" 
                        className="form-input"
                        value={formData.workEmail}
                        onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="form-label">Contact Person *</label>
                      <input 
                        required 
                        type="text" 
                        placeholder="Priya Nair (VP Engg)" 
                        className="form-input"
                        value={formData.contactName}
                        onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="form-label">Talent Focus / Role *</label>
                    <select 
                      className="form-select"
                      value={formData.roleToHire}
                      onChange={(e) => setFormData({ ...formData, roleToHire: e.target.value })}
                    >
                      <option value="AI / Automation Engineers">AI & Automation Engineers (n8n, LLMs)</option>
                      <option value="Full Stack Developers">Full Stack Web Developers (React, Next.js, Node)</option>
                      <option value="Growth & Analytics">Growth Marketing & GA4 Analytics</option>
                      <option value="Cloud / DevOps">Cloud Infrastructure & DevOps</option>
                    </select>
                  </div>

                  <div>
                    <label className="form-label">Intended Headcount</label>
                    <select 
                      className="form-select"
                      value={formData.headcount}
                      onChange={(e) => setFormData({ ...formData, headcount: e.target.value })}
                    >
                      <option value="1 - 2 Interns">1 - 2 Interns</option>
                      <option value="3 - 5 Interns">3 - 5 Interns</option>
                      <option value="6 - 15 Interns">6 - 15 Interns (Cohort)</option>
                      <option value="Custom Project Lab">Custom Enterprise Project Lab</option>
                    </select>
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
                    Request Pre-Screened Candidate Dossier <Send size={15} />
                  </button>
                </form>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#ECFDF5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem auto' }}>
                  <CheckCircle2 size={32} />
                </div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                  Hiring Partner Request Logged
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                  Thank you, <strong>{formData.contactName}</strong>. Our enterprise talent director will reach out to {formData.companyName} at <strong>{formData.workEmail}</strong> with matching candidate portfolios.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
