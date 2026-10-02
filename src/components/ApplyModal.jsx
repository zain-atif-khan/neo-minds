import React, { useState } from 'react';
import { X, CheckCircle2, ArrowRight, Upload, Building } from 'lucide-react';

export default function ApplyModal({ item, type = 'internship', onClose }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    college: '',
    branch: '',
    year: '3rd Year',
    portfolioUrl: '',
    statement: ''
  });

  const [submitted, setSubmitted] = useState(false);

  if (!item) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const getTitle = () => {
    if (type === 'internship') return `Apply for ${item.title}`;
    if (type === 'program') return `Enroll in ${item.title}`;
    if (type === 'ambassador') return 'Apply as Campus Ambassador';
    return 'Join Neo Minds';
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px' }}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={18} />
        </button>

        {!submitted ? (
          <div>
            <div className="kicker">
              APPLICATION FORM • {type.toUpperCase()}
            </div>

            <h3 style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
              {getTitle()}
            </h3>

            {item.company && (
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                {item.company} • {item.location} • {item.duration}
              </p>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label className="form-label">Full Name *</label>
                  <input 
                    required 
                    type="text" 
                    placeholder="e.g. Aryan Sharma" 
                    className="form-input"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  />
                </div>
                <div>
                  <label className="form-label">Email Address *</label>
                  <input 
                    required 
                    type="email" 
                    placeholder="aryan@college.edu" 
                    className="form-input"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1rem' }}>
                <div>
                  <label className="form-label">College / Institute *</label>
                  <input 
                    required 
                    type="text" 
                    placeholder="e.g. Anwar Ul Uloom College" 
                    className="form-input"
                    value={formData.college}
                    onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                  />
                </div>
                <div>
                  <label className="form-label">Year of Study *</label>
                  <select 
                    className="form-select"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  >
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="Final Year">Final Year</option>
                    <option value="Recent Graduate">Recent Graduate</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="form-label">GitHub Profile / Portfolio / LinkedIn *</label>
                <input 
                  required 
                  type="url" 
                  placeholder="https://github.com/username" 
                  className="form-input"
                  value={formData.portfolioUrl}
                  onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                />
              </div>

              <div>
                <label className="form-label">Why are you interested in this role/program?</label>
                <textarea 
                  rows={3} 
                  placeholder="Briefly describe your projects, current skills, and goals..." 
                  className="form-textarea"
                  value={formData.statement}
                  onChange={(e) => setFormData({ ...formData, statement: e.target.value })}
                />
              </div>

              <div style={{
                border: '1.5px dashed var(--border-light)',
                borderRadius: '12px',
                padding: '1rem',
                textAlign: 'center',
                background: 'var(--bg-secondary)',
                cursor: 'pointer'
              }}>
                <Upload size={18} style={{ color: 'var(--accent-blue)', margin: '0 auto 4px auto' }} />
                <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  Attach Resume / Project Dossier (PDF)
                </div>
                <div style={{ fontSize: '0.725rem', color: 'var(--text-light)' }}>
                  Max 5MB • Instant verification sync
                </div>
              </div>

              <button type="submit" className="btn btn-primary" style={{ marginTop: '0.5rem', width: '100%' }}>
                Submit Application <ArrowRight size={15} />
              </button>
            </form>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: '#ECFDF5',
              color: '#059669',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem auto'
            }}>
              <CheckCircle2 size={36} />
            </div>

            <h3 style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              Application Submitted!
            </h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.6', maxWidth: '420px', margin: '0 auto 1.75rem auto' }}>
              Thank you, <strong>{formData.fullName}</strong>. Your profile has been sent to the Neo Minds technical review team. You will receive an assessment link and status update at <strong>{formData.email}</strong>.
            </p>

            <button className="btn btn-primary" onClick={onClose}>
              Return to Website
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
