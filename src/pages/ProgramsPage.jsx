import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle2, Clock, Calendar, Laptop, Sparkles, BookOpen, Layers, Award } from 'lucide-react';
import { PROGRAMS } from '../data/mockData';

export default function ProgramsPage({ initialProgramId = 'ai-automation', onEnroll, navigateTo }) {
  const [selectedProgramId, setSelectedProgramId] = useState(initialProgramId);

  useEffect(() => {
    if (initialProgramId) {
      setSelectedProgramId(initialProgramId);
    }
  }, [initialProgramId]);

  const activeProgram = PROGRAMS.find(p => p.id === selectedProgramId) || PROGRAMS[0];

  return (
    <div className="section-spacing" style={{ paddingTop: '3.5rem' }}>
      <div className="container">
        {/* Page Header */}
        <div style={{ maxWidth: '750px', marginBottom: '3rem' }}>
          <div className="kicker">
            INDUSTRY-FOCUSED CURRICULA • 2026 COHORT
          </div>
          <h1 className="editorial-serif" style={{ fontSize: '3.5rem', lineHeight: '1.1', marginBottom: '1.25rem' }}>
            Skills for what<br />comes next.
          </h1>
          <p className="editorial-subtext" style={{ fontSize: '1.15rem' }}>
            Rigorous, hands-on technical programs designed alongside engineering leaders. 
            Learn through production builds, not theoretical slides.
          </p>
        </div>

        {/* 4 Program Category Nav Tabs */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1rem',
          marginBottom: '3rem'
        }}>
          {PROGRAMS.map((program) => {
            const isSelected = program.id === selectedProgramId;
            return (
              <button
                key={program.id}
                onClick={() => setSelectedProgramId(program.id)}
                style={{
                  background: isSelected ? 'var(--accent-blue-gradient)' : '#FFFFFF',
                  color: isSelected ? '#FFFFFF' : 'var(--text-primary)',
                  border: `1.5px solid ${isSelected ? '#3B82F6' : 'var(--border-light)'}`,
                  borderRadius: '16px',
                  padding: '1.5rem',
                  textAlign: 'left',
                  boxShadow: isSelected ? 'var(--shadow-blue)' : 'var(--shadow-sm)',
                  cursor: 'pointer',
                  transition: 'all var(--transition-smooth)'
                }}
              >
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  opacity: 0.8,
                  marginBottom: '0.5rem'
                }}>
                  {program.number}
                </div>
                <div style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                  {program.title}
                </div>
                <div style={{ fontSize: '0.775rem', opacity: isSelected ? 0.9 : 0.6 }}>
                  {program.duration} • {program.level}
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Program Showcase Card */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid var(--border-light)',
          borderRadius: '24px',
          padding: '3rem',
          boxShadow: 'var(--shadow-md)',
          marginBottom: '4rem'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '3rem', alignItems: 'flex-start' }}>
            {/* Left Info */}
            <div>
              <div className="kicker" style={{ color: 'var(--accent-blue)' }}>
                TRACK OVERVIEW • {activeProgram.number}
              </div>
              <h2 style={{ fontSize: '2.4rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                {activeProgram.title}
              </h2>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1.75rem' }}>
                {activeProgram.description}
              </p>

              {/* Tools Stack */}
              <div style={{ marginBottom: '2rem' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.6rem' }}>
                  Technologies & Industry Tools
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {activeProgram.tools.map((t, idx) => (
                    <span key={idx} className="badge badge-blue" style={{ fontSize: '0.85rem', padding: '0.45rem 1rem' }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Career Paths */}
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.6rem' }}>
                  Target Career Roles
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {activeProgram.careers.map((c, idx) => (
                    <span key={idx} className="badge badge-outline" style={{ fontSize: '0.85rem', padding: '0.45rem 1rem' }}>
                      <Award size={13} style={{ color: 'var(--accent-blue)' }} /> {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Meta Card & Action */}
            <div style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-light)',
              borderRadius: '20px',
              padding: '2rem'
            }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1.25rem' }}>
                Cohort Details
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Duration</span>
                  <span style={{ fontSize: '0.9rem', fontWeight: 700 }}>{activeProgram.duration}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Weekly Effort</span>
                  <span style={{ fontSize: '0.9rem', fontWeight: 700 }}>{activeProgram.commitment}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Format</span>
                  <span style={{ fontSize: '0.9rem', fontWeight: 700 }}>Hybrid / Online + Campus Labs</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Outcome</span>
                  <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--accent-blue)' }}>Internship Pathway</span>
                </div>
              </div>

              <button 
                className="btn btn-primary"
                style={{ width: '100%', padding: '0.9rem' }}
                onClick={() => onEnroll ? onEnroll(activeProgram) : null}
              >
                Enroll in {activeProgram.title} <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Curriculum Modules Breakdown */}
          <div style={{ marginTop: '3.5rem', paddingTop: '2.5rem', borderTop: '1px solid var(--border-light)' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1.5rem' }}>
              Curriculum Roadmap
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {activeProgram.modules.map((mod, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-light)',
                    borderRadius: '16px',
                    padding: '1.25rem 1.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1.5rem'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      color: 'var(--accent-blue)',
                      minWidth: '80px'
                    }}>
                      {mod.week}
                    </span>
                    <div>
                      <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                        {mod.title}
                      </h4>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                        {mod.topics}
                      </p>
                    </div>
                  </div>

                  <span className="badge badge-outline" style={{ whiteSpace: 'nowrap' }}>
                    <CheckCircle2 size={13} style={{ color: 'var(--accent-blue)' }} /> Hands-on Lab
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
