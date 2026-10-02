import React, { useState } from 'react';
import { Send, CheckCircle2, User, Building, Award, Briefcase, HelpCircle, Mail, MapPin } from 'lucide-react';

export default function ContactPage() {
  const [selectedAudience, setSelectedAudience] = useState('Student');
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    message: ''
  });

  const audiences = [
    { id: 'Student', label: 'Student', icon: User, desc: 'Programs, assessments, or internships' },
    { id: 'College', label: 'College / Institute', icon: Building, desc: 'MoU, club chapters, campus sprints' },
    { id: 'Ambassador', label: 'Ambassador', icon: Award, desc: 'Fellowship inquiries & support' },
    { id: 'Company', label: 'Company / Industry', icon: Briefcase, desc: 'Hiring interns or project sponsorship' },
    { id: 'Other', label: 'Other', icon: HelpCircle, desc: 'General queries or press' },
  ];

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
            COMMUNICATIONS & INQUIRIES
          </div>
          <h1 className="editorial-serif" style={{ fontSize: '3.5rem', lineHeight: '1.1', marginBottom: '1.25rem' }}>
            How can we help?
          </h1>
          <p className="editorial-subtext" style={{ fontSize: '1.15rem' }}>
            Select who you are representing to help us direct your message to the correct team at Neo Minds.
          </p>
        </div>

        {/* Audience Selector Tabs */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '1rem',
          marginBottom: '3rem'
        }}>
          {audiences.map((aud) => {
            const isSelected = selectedAudience === aud.id;
            const Icon = aud.icon;

            return (
              <button
                key={aud.id}
                onClick={() => {
                  setSelectedAudience(aud.id);
                  setSubmitted(false);
                }}
                style={{
                  background: isSelected ? 'var(--accent-blue-gradient)' : '#FFFFFF',
                  color: isSelected ? '#FFFFFF' : 'var(--text-primary)',
                  border: `1.5px solid ${isSelected ? '#3B82F6' : 'var(--border-light)'}`,
                  borderRadius: '16px',
                  padding: '1.25rem 1rem',
                  textAlign: 'center',
                  boxShadow: isSelected ? 'var(--shadow-blue)' : 'var(--shadow-sm)',
                  cursor: 'pointer',
                  transition: 'all var(--transition-smooth)'
                }}
              >
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: isSelected ? 'rgba(255, 255, 255, 0.2)' : 'var(--bg-tertiary)',
                  color: isSelected ? '#FFFFFF' : 'var(--accent-blue)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 0.5rem auto'
                }}>
                  <Icon size={18} />
                </div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.2rem' }}>
                  {aud.label}
                </div>
                <div style={{ fontSize: '0.725rem', opacity: isSelected ? 0.9 : 0.6, lineHeight: '1.3' }}>
                  {aud.desc}
                </div>
              </button>
            );
          })}
        </div>

        {/* Clean Contact Form */}
        <div style={{
          maxWidth: '680px',
          margin: '0 auto',
          background: '#FFFFFF',
          border: '1px solid var(--border-light)',
          borderRadius: '24px',
          padding: '3rem',
          boxShadow: 'var(--shadow-md)',
          marginBottom: '4rem'
        }}>
          {!submitted ? (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div className="kicker" style={{ color: 'var(--accent-blue)', marginBottom: '0.25rem' }}>
                INQUIRY FOR: {selectedAudience.toUpperCase()}
              </div>

              <div>
                <label className="form-label">Your Name *</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  className="form-input"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div>
                <label className="form-label">Email Address *</label>
                <input
                  required
                  type="email"
                  placeholder="you@domain.com"
                  className="form-input"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div>
                <label className="form-label">
                  {selectedAudience === 'Student' ? 'College / University' :
                   selectedAudience === 'College' ? 'College Name & Designation' :
                   selectedAudience === 'Company' ? 'Company Name & Website' : 'Organization'}
                </label>
                <input
                  type="text"
                  placeholder="Organization or institute details..."
                  className="form-input"
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                />
              </div>

              <div>
                <label className="form-label">How can our team assist you? *</label>
                <textarea
                  required
                  rows={4}
                  placeholder={`Tell us about your specific goals or questions regarding ${selectedAudience.toLowerCase()} initiatives...`}
                  className="form-textarea"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
                Send Message <Send size={15} />
              </button>
            </form>
          ) : (
            <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#ECFDF5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem auto' }}>
                <CheckCircle2 size={36} />
              </div>
              <h3 style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                Message Transmitted
              </h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.6', maxWidth: '440px', margin: '0 auto 1.5rem auto' }}>
                Thank you, <strong>{formData.name}</strong>. Your inquiry has been routed to our dedicated {selectedAudience} liaison. We will reply to <strong>{formData.email}</strong> within 12 hours.
              </p>
              <button className="btn btn-secondary" onClick={() => setSubmitted(false)}>
                Submit Another Inquiry
              </button>
            </div>
          )}
        </div>

        {/* Direct Contact Coordinates */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1.5rem',
          maxWidth: '850px',
          margin: '0 auto'
        }}>
          <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-light)', borderRadius: '16px', padding: '1.5rem', textAlign: 'center' }}>
            <Mail size={20} style={{ color: 'var(--accent-blue)', margin: '0 auto 0.5rem auto' }} />
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>Email Directly</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>contact@neominds.dev</div>
          </div>

          <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-light)', borderRadius: '16px', padding: '1.5rem', textAlign: 'center' }}>
            <MapPin size={20} style={{ color: 'var(--accent-blue)', margin: '0 auto 0.5rem auto' }} />
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>Headquarters Hub</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Hyderabad, Telangana, India</div>
          </div>

          <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-light)', borderRadius: '16px', padding: '1.5rem', textAlign: 'center' }}>
            <Building size={20} style={{ color: 'var(--accent-blue)', margin: '0 auto 0.5rem auto' }} />
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>Campus Chapters</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>50+ Colleges Network</div>
          </div>
        </div>
      </div>
    </div>
  );
}
