import React from 'react';
import { ArrowRight, ChevronRight, AlertCircle, BarChart3, Target } from 'lucide-react';
import { SKILL_ASSESSMENT_DATA } from '../data/mockData';

export default function SkillAssessmentSection({ navigateTo, onOpenAssessmentModal, currentScore = 68, skillBreakdown = null }) {
  const breakdown = skillBreakdown || SKILL_ASSESSMENT_DATA.breakdown;

  // SVG Gauge calculations
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (currentScore / 100) * circumference;

  return (
    <section className="section-spacing assessment-section" id="assessment">
      <div className="container">
        {/* Header Row */}
        <div className="section-header-row">
          <div className="section-header-left">
            <div className="kicker">
              KNOW YOUR SKILLS
            </div>
            <h2 className="section-title editorial-serif">
              Understand<br />
              your skill <span style={{ color: '#1677FF' }}>level.</span>
            </h2>
          </div>

          <div className="section-header-right">
            <p className="section-subtext">
              Take an assessment, identify your gaps<br />
              and get a personalised learning path.
            </p>
            <button 
              className="btn btn-primary"
              onClick={onOpenAssessmentModal}
            >
              Take Assessment <ArrowRight size={15} />
            </button>
          </div>
        </div>

        {/* Skill Assessment Dashboard Card (As in Reference 06) */}
        <div className="assessment-dashboard-card">
          {/* Left: Circular Overall Score Gauge */}
          <div className="score-gauge-col">
            <div className="gauge-svg-wrapper">
              <svg className="gauge-svg" viewBox="0 0 160 160">
                <circle 
                  className="gauge-track" 
                  cx="80" 
                  cy="80" 
                  r={radius} 
                />
                <circle 
                  className="gauge-progress" 
                  cx="80" 
                  cy="80" 
                  r={radius}
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                />
              </svg>

              <div className="gauge-center-content">
                <div style={{ display: 'flex', alignItems: 'baseline' }}>
                  <span className="gauge-score-val">{currentScore}</span>
                  <span className="gauge-percent-sign">%</span>
                </div>
                <span className="gauge-score-label">Overall Score</span>
              </div>
            </div>

            <div style={{ marginTop: '1.25rem' }}>
              <span className="badge badge-blue">
                <Target size={12} /> Industry Readiness
              </span>
            </div>
          </div>

          {/* Middle: Skill Breakdown Bars */}
          <div className="breakdown-col">
            <h3 className="breakdown-title">Skill Breakdown</h3>
            <div className="breakdown-list">
              {breakdown.map((item, idx) => (
                <div key={idx} className="breakdown-row">
                  <div className="breakdown-meta">
                    <span className="breakdown-skill-name">{item.skill}</span>
                    <span className="breakdown-score-text">{item.score}%</span>
                  </div>
                  <div className="breakdown-bar-track">
                    <div 
                      className="breakdown-bar-fill" 
                      style={{ 
                        width: `${item.score}%`,
                        background: item.score >= 70 ? 'var(--accent-blue)' : item.score >= 50 ? '#3B82F6' : '#94A3B8'
                      }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Your Top Gaps */}
          <div className="gaps-col">
            <h3 className="gaps-title">Your Top Gaps</h3>
            <div className="gaps-list">
              {SKILL_ASSESSMENT_DATA.topGaps.map((gap, idx) => (
                <div 
                  key={idx} 
                  className="gap-item-card"
                  onClick={() => navigateTo('programs')}
                >
                  <div>
                    <div className="gap-item-title">{gap.title}</div>
                    <div className="gap-item-status">{gap.note}</div>
                  </div>
                  <ChevronRight size={18} style={{ color: 'var(--text-light)' }} />
                </div>
              ))}
            </div>

            <div style={{ marginTop: '1.25rem', textAlign: 'center' }}>
              <button 
                className="btn btn-ghost" 
                style={{ fontSize: '0.825rem', color: 'var(--accent-blue)', fontWeight: 600 }}
                onClick={() => navigateTo('programs')}
              >
                View Recommended Courses →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
