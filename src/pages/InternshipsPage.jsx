import React, { useState } from 'react';
import { ArrowRight, ArrowUpRight, MapPin, Clock, Building, DollarSign, CheckCircle2, ShieldCheck, Briefcase } from 'lucide-react';
import { INTERNSHIPS, PIPELINE_STEPS } from '../data/mockData';

export default function InternshipsPage({ onApplyInternship, navigateTo }) {
  const [selectedRole, setSelectedRole] = useState('All');

  const filtered = selectedRole === 'All'
    ? INTERNSHIPS
    : INTERNSHIPS.filter(i => i.skills.some(s => s.toLowerCase().includes(selectedRole.toLowerCase())));

  return (
    <div className="section-spacing" style={{ paddingTop: '3.5rem' }}>
      <div className="container">
        {/* Header */}
        <div style={{ maxWidth: '750px', marginBottom: '3rem' }}>
          <div className="kicker">
            VERIFIED INDUSTRY INTERNSHIP SPRINT
          </div>
          <h1 className="editorial-serif" style={{ fontSize: '3.5rem', lineHeight: '1.1', marginBottom: '1.25rem' }}>
            Internships that<br />move you forward.
          </h1>
          <p className="editorial-subtext" style={{ fontSize: '1.15rem' }}>
            Work on authentic engineering challenges with fast-growing startups and enterprises. 
            All roles include guaranteed monthly stipends and founder mentorship.
          </p>
        </div>

        {/* 5-Step Pipeline Overview */}
        <div style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-light)',
          borderRadius: '24px',
          padding: '2.5rem',
          marginBottom: '3.5rem'
        }}>
          <div className="kicker" style={{ color: 'var(--accent-blue)', marginBottom: '1.5rem' }}>
            HOW OUR HIRING PIPELINE WORKS
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '1.25rem'
          }}>
            {PIPELINE_STEPS.map((step, idx) => (
              <div key={idx} style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid var(--border-light)', padding: '1.25rem' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 800, color: 'var(--accent-blue)', marginBottom: '0.4rem' }}>
                  {step.step}
                </div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                  {step.title}
                </h4>
                <p style={{ fontSize: '0.785rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Roles Catalogue */}
        <div style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h2 className="editorial-serif" style={{ fontSize: '2.2rem' }}>
              Active Internship Openings
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              Showing {filtered.length} verified technical roles open for applications
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {['All', 'AI', 'React', 'Marketing', 'Cloud'].map((filter) => (
              <button
                key={filter}
                className="btn"
                style={{
                  padding: '0.45rem 1rem',
                  fontSize: '0.825rem',
                  borderRadius: '9999px',
                  background: selectedRole === filter ? 'var(--accent-blue)' : '#FFFFFF',
                  color: selectedRole === filter ? '#FFFFFF' : 'var(--text-secondary)',
                  border: `1px solid ${selectedRole === filter ? 'var(--accent-blue)' : 'var(--border-light)'}`
                }}
                onClick={() => setSelectedRole(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Grid of Internship Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(420px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
          {filtered.map((item) => (
            <div
              key={item.id}
              className="internship-floating-card"
              style={{ padding: '2rem' }}
            >
              <div className="card-geometric-accent" />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                <span className="badge badge-blue">
                  {item.company}
                </span>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#059669', background: '#ECFDF5', padding: '0.2rem 0.6rem', borderRadius: '6px' }}>
                  {item.openings} Openings
                </span>
              </div>

              <h3 style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                {item.title}
              </h3>

              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <MapPin size={13} /> {item.location} • <Clock size={13} /> {item.duration}
              </div>

              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '1.25rem' }}>
                {item.description}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
                {item.skills.map((s, idx) => (
                  <span key={idx} className="badge badge-outline" style={{ fontSize: '0.75rem' }}>
                    {s}
                  </span>
                ))}
              </div>

              <div className="internship-card-footer">
                <div>
                  <div style={{ fontSize: '0.725rem', color: 'var(--text-light)', fontWeight: 600 }}>STIPEND</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                    {item.stipend}
                  </div>
                </div>

                <button 
                  className="btn btn-primary"
                  style={{ padding: '0.6rem 1.25rem', fontSize: '0.85rem' }}
                  onClick={() => onApplyInternship ? onApplyInternship(item) : null}
                >
                  Quick Apply <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
