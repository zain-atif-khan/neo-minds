import React, { useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, GraduationCap, Briefcase, Award, TrendingUp, CheckCircle2 } from 'lucide-react';
import { SUCCESS_STORIES } from '../data/mockData';

export default function SuccessStoriesPage({ navigateTo }) {
  const [activeStoryIdx, setActiveStoryIdx] = useState(0);
  const story = SUCCESS_STORIES[activeStoryIdx];

  return (
    <div className="section-spacing" style={{ paddingTop: '3.5rem' }}>
      <div className="container">
        {/* Header */}
        <div style={{ maxWidth: '750px', marginBottom: '3rem' }}>
          <div className="kicker">
            VERIFIED STUDENT TRANSFORMATIONS
          </div>
          <h1 className="editorial-serif" style={{ fontSize: '3.5rem', lineHeight: '1.1', marginBottom: '1.25rem' }}>
            Real people.<br />Real journeys.
          </h1>
          <p className="editorial-subtext" style={{ fontSize: '1.15rem' }}>
            College students who took the diagnostic evaluation, filled their technical gaps, built verified production projects, and transitioned into high-paying technology roles.
          </p>
        </div>

        {/* Student Selector Switcher */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
          {SUCCESS_STORIES.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setActiveStoryIdx(idx)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.85rem',
                padding: '0.75rem 1.25rem',
                borderRadius: '16px',
                background: idx === activeStoryIdx ? 'var(--bg-tertiary)' : '#FFFFFF',
                border: `1.5px solid ${idx === activeStoryIdx ? 'var(--accent-blue)' : 'var(--border-light)'}`,
                cursor: 'pointer',
                transition: 'all var(--transition-fast)'
              }}
            >
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', overflow: 'hidden' }}>
                <img src={s.avatar} alt={s.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>{s.name}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{s.targetRole}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Master Transformation Journey Card */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid var(--border-light)',
          borderRadius: '24px',
          padding: '3rem',
          boxShadow: 'var(--shadow-md)',
          marginBottom: '4rem'
        }}>
          {/* Profile Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '2rem', paddingBottom: '2.5rem', borderBottom: '1px solid var(--border-light)', marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', overflow: 'hidden', border: '3px solid var(--accent-blue)' }}>
                <img src={story.avatar} alt={story.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>

              <div>
                <h2 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.3rem' }}>
                  {story.name}
                </h2>
                <div style={{ fontSize: '0.95rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <GraduationCap size={16} /> {story.college} • {story.branch}
                </div>
              </div>
            </div>

            <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-light)', borderRadius: '16px', padding: '1.25rem 2rem', textAlign: 'right' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase' }}>PLACEMENT OUTCOME</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-blue)', marginTop: '0.2rem' }}>
                {story.targetRole} @ {story.company}
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Stipend / Package: <strong>{story.stipend}</strong>
              </div>
            </div>
          </div>

          {/* Complete 5-Stage Transformation Pathway */}
          <div style={{ marginBottom: '2.5rem' }}>
            <div className="kicker" style={{ color: 'var(--accent-blue)', marginBottom: '1.25rem' }}>
              THE VERIFIED TRANSFORMATION TIMELINE
            </div>

            <div className="transformation-journey-row">
              {story.journey.map((step, idx) => (
                <div
                  key={idx}
                  className={`journey-step-card ${step.isHighlight ? 'highlight-card' : ''}`}
                  style={{ minHeight: '170px' }}
                >
                  <div className="journey-step-phase">{step.phase}</div>
                  <div className="journey-step-label">{step.label}</div>
                  <div className="journey-step-detail">{step.detail}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Student Narrative */}
          <div style={{ background: 'var(--bg-tertiary)', borderRadius: '16px', padding: '1.75rem', border: '1px solid var(--border-light)' }}>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              The Student Perspective
            </h4>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              "{story.story}"
            </p>
          </div>
        </div>

        {/* Start Your Own Journey CTA */}
        <div style={{
          background: 'var(--accent-blue-gradient)',
          borderRadius: '24px',
          padding: '3rem',
          color: 'white',
          textAlign: 'center'
        }}>
          <h3 style={{ fontSize: '2.2rem', fontWeight: 700, color: 'white', marginBottom: '0.5rem' }}>
            Ready to build your career transformation?
          </h3>
          <p style={{ fontSize: '1.05rem', color: 'rgba(255, 255, 255, 0.9)', maxWidth: '520px', margin: '0 auto 1.75rem auto' }}>
            Start with the diagnostic skill benchmark today and discover your tailored pathway to industry internships.
          </p>

          <button 
            className="btn"
            style={{ background: 'white', color: 'var(--accent-blue)', fontWeight: 700, padding: '0.85rem 2rem' }}
            onClick={() => navigateTo('skill-assessment')}
          >
            Take Skill Assessment <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
