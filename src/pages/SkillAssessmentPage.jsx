import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, RotateCcw, Target, Sparkles, BarChart3, AlertCircle } from 'lucide-react';
import { SKILL_ASSESSMENT_DATA } from '../data/mockData';

export default function SkillAssessmentPage({ navigateTo, onOpenAssessmentModal }) {
  const [currentScore, setCurrentScore] = useState(68);
  const [breakdown, setBreakdown] = useState(SKILL_ASSESSMENT_DATA.breakdown);

  // SVG Gauge calculations
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (currentScore / 100) * circumference;

  return (
    <div className="section-spacing" style={{ paddingTop: '3.5rem' }}>
      <div className="container">
        {/* Header */}
        <div style={{ maxWidth: '750px', marginBottom: '3rem' }}>
          <div className="kicker">
            DIAGNOSTIC COMPETENCY ENGINE
          </div>
          <h1 className="editorial-serif" style={{ fontSize: '3.5rem', lineHeight: '1.1', marginBottom: '1.25rem' }}>
            Understand<br />your skill level.
          </h1>
          <p className="editorial-subtext" style={{ fontSize: '1.15rem' }}>
            Traditional marks cards do not reflect practical engineering readiness. 
            Take our diagnostic evaluation, identify your exact technical gaps, and unlock an individualized sprint roadmap.
          </p>
        </div>

        {/* Master Dashboard Container */}
        <div className="assessment-dashboard-card" style={{ marginTop: '0', marginBottom: '3.5rem' }}>
          {/* Gauge Column */}
          <div className="score-gauge-col">
            <div className="gauge-svg-wrapper">
              <svg className="gauge-svg" viewBox="0 0 160 160">
                <circle className="gauge-track" cx="80" cy="80" r={radius} />
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

            <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
              <button 
                className="btn btn-primary"
                onClick={onOpenAssessmentModal}
                style={{ fontSize: '0.85rem', padding: '0.65rem 1.4rem' }}
              >
                Launch Diagnostic Quiz <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* Breakdown Column */}
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

          {/* Gaps Column */}
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
                  <ArrowRight size={16} style={{ color: 'var(--accent-blue)' }} />
                </div>
              ))}
            </div>

            <div style={{ marginTop: '1.25rem', padding: '0.85rem', background: '#FFFFFF', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-light)' }}>ACTION PATHWAY</div>
              <div style={{ fontSize: '0.825rem', color: 'var(--accent-blue)', fontWeight: 600, marginTop: '2px' }}>
                Complete Module 3: REST & Webhooks in AI Automation
              </div>
            </div>
          </div>
        </div>

        {/* 6-Stage Student Competency Flow */}
        <div style={{ marginBottom: '4rem' }}>
          <div className="kicker" style={{ textAlign: 'center', justifyContent: 'center' }}>
            THE EVALUATION JOURNEY
          </div>
          <h2 className="editorial-serif" style={{ fontSize: '2.4rem', textAlign: 'center', marginBottom: '2.5rem' }}>
            From Evaluation to Internship Offer
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            gap: '1rem',
            textAlign: 'center'
          }}>
            {[
              { num: '01', title: 'Take Assessment', desc: '15-min practical benchmark' },
              { num: '02', title: 'Skill Score', desc: 'Normalized percentage & percentile' },
              { num: '03', title: 'Skill Breakdown', desc: 'Granular sub-domain analysis' },
              { num: '04', title: 'Skill Gaps', desc: 'Pinpoint blind spots' },
              { num: '05', title: 'Recommended Track', desc: 'Tailored hands-on labs' },
              { num: '06', title: 'Learning Path', desc: 'PPO & internship placement' },
            ].map((step, idx) => (
              <div
                key={idx}
                style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-light)',
                  borderRadius: '16px',
                  padding: '1.5rem 1rem'
                }}
              >
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 800, color: 'var(--accent-blue)', marginBottom: '0.5rem' }}>
                  {step.num}
                </div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                  {step.title}
                </div>
                <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>
                  {step.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
