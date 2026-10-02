import React, { useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Award, Briefcase, GraduationCap } from 'lucide-react';
import { SUCCESS_STORIES } from '../data/mockData';

export default function SuccessStoriesSection({ navigateTo }) {
  const [storyIndex, setStoryIndex] = useState(0);
  const story = SUCCESS_STORIES[storyIndex];

  const prevStory = () => {
    setStoryIndex((prev) => (prev === 0 ? SUCCESS_STORIES.length - 1 : prev - 1));
  };

  const nextStory = () => {
    setStoryIndex((prev) => (prev === SUCCESS_STORIES.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="section-spacing success-stories-section" id="stories">
      <div className="container">
        {/* Header Row */}
        <div className="section-header-row">
          <div className="section-header-left">
            <div className="kicker">
              FROM STUDENT TO INDUSTRY
            </div>
            <h2 className="section-title editorial-serif">
              Real people.<br />
              Real <span style={{ color: '#1677FF' }}>journeys.</span>
            </h2>
          </div>

          <div className="section-header-right">
            <p className="section-subtext">
              Students who turned their skills<br />
              into internships and opportunities.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem' }}>
              <button 
                className="btn btn-secondary"
                onClick={nextStory}
              >
                Next Story <ArrowRight size={15} />
              </button>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button 
                  className="btn-circle" 
                  onClick={prevStory}
                  aria-label="Previous story"
                >
                  <ChevronLeft size={20} />
                </button>
                <button 
                  className="btn-circle" 
                  onClick={nextStory}
                  aria-label="Next story"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 5-Step Horizontal Transformation Journey Pathway */}
        <div className="stories-carousel-stage">
          <div className="transformation-journey-row">
            {story.journey.map((step, idx) => {
              const isHighlight = step.isHighlight;

              return (
                <div 
                  key={idx}
                  className={`journey-step-card ${isHighlight ? 'highlight-card' : ''}`}
                >
                  {isHighlight && (
                    <div className="student-avatar-wrap">
                      <img 
                        src={story.avatar} 
                        alt={story.name} 
                        className="student-avatar-img" 
                      />
                    </div>
                  )}

                  <div className="journey-step-phase">{step.phase}</div>
                  <div className="journey-step-label">{step.label}</div>
                  <div className="journey-step-detail">{step.detail}</div>
                </div>
              );
            })}
          </div>

          {/* Student Profile Card Bar */}
          <div className="story-meta-box">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'var(--bg-tertiary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-blue)',
                fontWeight: 800
              }}>
                <GraduationCap size={24} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
                  {story.name}
                </h4>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  {story.branch} • {story.college}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-light)', fontWeight: 600 }}>OUTCOME</div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--accent-blue)' }}>
                  {story.targetRole} @ {story.company}
                </div>
              </div>

              <button 
                className="btn btn-secondary"
                onClick={nextStory}
              >
                Next Journey →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
