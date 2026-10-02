import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, ChevronRight, Layers, Target, ShieldCheck, Zap } from 'lucide-react';
import { HOW_IT_WORKS_STEPS } from '../data/mockData';

export default function HowItWorksPage({ navigateTo, onOpenAssessmentModal }) {
  const [activeStepIndex, setActiveStepIndex] = useState(1);
  const currentStep = HOW_IT_WORKS_STEPS[activeStepIndex];

  return (
    <div className="section-spacing" style={{ paddingTop: '3.5rem' }}>
      <div className="container">
        {/* Header */}
        <div style={{ maxWidth: '800px', marginBottom: '3.5rem' }}>
          <div className="kicker">
            THE METHODOLOGY & ECOSYSTEM
          </div>
          <h1 className="editorial-serif" style={{ fontSize: '3.6rem', lineHeight: '1.1', marginBottom: '1.25rem' }}>
            A clear path from<br />learning to real opportunities.
          </h1>
          <p className="editorial-subtext" style={{ fontSize: '1.15rem' }}>
            Traditional education separates learning from working by 4 long years. 
            Neo Minds integrates assessment, modern tool mastery, hands-on capstone builds, and direct paid internships into a seamless continuous flywheel.
          </p>
        </div>

        {/* 5 Circular Nodes Horizontal Process */}
        <div className="journey-nodes-wrapper" style={{ margin: '2rem 0 3.5rem 0' }}>
          <div className="journey-connecting-line" />

          <div className="journey-nodes-container">
            {HOW_IT_WORKS_STEPS.map((step, idx) => {
              const isActive = idx === activeStepIndex;
              return (
                <React.Fragment key={step.number}>
                  <div
                    className={`journey-node-item ${isActive ? 'active' : ''}`}
                    onClick={() => setActiveStepIndex(idx)}
                  >
                    <div className="node-circle">
                      <span className="node-number">{step.number}</span>
                      <span className="node-title">{step.title}</span>
                      <span className="node-tagline">{step.tagline}</span>
                    </div>
                  </div>

                  {idx < HOW_IT_WORKS_STEPS.length - 1 && (
                    <div className="journey-step-arrow">
                      <ChevronRight size={20} />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Dynamic Detail Card */}
        <div className="journey-detail-card" style={{ marginBottom: '4rem' }}>
          <div className="journey-detail-info">
            <div className="kicker">
              DETAILED PHASE {currentStep.number} • {currentStep.title.toUpperCase()}
            </div>
            <h3 className="journey-detail-heading" style={{ fontSize: '1.8rem' }}>
              {currentStep.tagline}
            </h3>
            <p className="journey-detail-text" style={{ fontSize: '1.05rem', lineHeight: '1.7' }}>
              {currentStep.description}
            </p>

            <div className="journey-outcomes-pills">
              {currentStep.outcomes.map((outcome, i) => (
                <span key={i} className="badge badge-blue" style={{ fontSize: '0.85rem', padding: '0.45rem 1rem' }}>
                  <CheckCircle2 size={14} /> {outcome}
                </span>
              ))}
            </div>
          </div>

          <div style={{ minWidth: '220px', textAlign: 'center' }}>
            <button
              className="btn btn-primary"
              style={{ width: '100%', padding: '0.85rem 1.5rem' }}
              onClick={() => {
                if (currentStep.title === 'Assess') onOpenAssessmentModal ? onOpenAssessmentModal() : navigateTo('skill-assessment');
                else if (currentStep.title === 'Learn') navigateTo('programs');
                else if (currentStep.title === 'Build') navigateTo('projects');
                else if (currentStep.title === 'Intern') navigateTo('internships');
                else navigateTo('programs');
              }}
            >
              Action: {currentStep.title} <ArrowRight size={15} />
            </button>
          </div>
        </div>

        {/* Traditional College vs Neo Minds Ecosystem Comparison */}
        <div style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-light)',
          borderRadius: '24px',
          padding: '3rem',
          marginBottom: '4rem'
        }}>
          <div className="kicker" style={{ color: 'var(--accent-blue)', marginBottom: '1rem' }}>
            SYSTEMIC COMPARISON
          </div>
          <h2 className="editorial-serif" style={{ fontSize: '2.4rem', marginBottom: '2rem' }}>
            The Old Way vs The Neo Minds Model
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid var(--border-light)', padding: '2rem' }}>
              <div style={{ fontSize: '1.15rem', fontWeight: 700, color: '#EF4444', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                Traditional College Pathway
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.925rem', color: 'var(--text-muted)' }}>
                <li>❌ Theoretical rote learning tested via memorization exams</li>
                <li>❌ Legacy tools (C/C++ basics, paper pseudo-code submissions)</li>
                <li>❌ No diagnostic evaluation of real technical gaps</li>
                <li>❌ Toy classroom assignments with zero real users</li>
                <li>❌ Unpaid / generic internships arranged through connections</li>
              </ul>
            </div>

            <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1.5px solid var(--accent-blue)', padding: '2rem', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--accent-blue)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Zap size={20} /> The Neo Minds Tech Hub Engine
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.925rem', color: 'var(--text-primary)' }}>
                <li>✅ Quantified diagnostic skill scoring mapped to industry benchmarks</li>
                <li>✅ Modern tool mastery: n8n, OpenAI GPT-4o, Next.js, REST APIs</li>
                <li>✅ Production capstone projects reviewed by staff engineers</li>
                <li>✅ Live deployments with real metrics, users, and GitHub code proof</li>
                <li>✅ Verified paid internships with guaranteed stipends (₹15K - ₹30K/mo)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
