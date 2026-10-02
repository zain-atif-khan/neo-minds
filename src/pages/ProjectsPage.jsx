import React, { useState } from 'react';
import { ArrowRight, Code, ExternalLink, Play, Layers, Sparkles, CheckCircle2 } from 'lucide-react';
import { PROJECTS } from '../data/mockData';

export default function ProjectsPage({ onOpenDemo, navigateTo }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);

  const categories = ['All', 'AI & Automation', 'Web & Software', 'Digital Marketing'];

  const filteredProjects = selectedCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === selectedCategory);

  const currentProject = filteredProjects[activeProjectIndex] || filteredProjects[0] || PROJECTS[0];

  return (
    <div className="section-spacing" style={{ paddingTop: '3.5rem' }}>
      <div className="container">
        {/* Header */}
        <div style={{ maxWidth: '750px', marginBottom: '2.5rem' }}>
          <div className="kicker">
            STUDENT ENGINEERING REPOSITORY
          </div>
          <h1 className="editorial-serif" style={{ fontSize: '3.5rem', lineHeight: '1.1', marginBottom: '1.25rem' }}>
            Real Projects.<br />Real Impact.
          </h1>
          <p className="editorial-subtext" style={{ fontSize: '1.15rem' }}>
            Built by students. Guided by industry engineers. Designed to solve legitimate business workflows.
          </p>
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              className="btn"
              style={{
                padding: '0.5rem 1.25rem',
                fontSize: '0.85rem',
                borderRadius: '9999px',
                background: selectedCategory === cat ? 'var(--accent-blue)' : '#FFFFFF',
                color: selectedCategory === cat ? '#FFFFFF' : 'var(--text-secondary)',
                border: `1px solid ${selectedCategory === cat ? 'var(--accent-blue)' : 'var(--border-light)'}`
              }}
              onClick={() => {
                setSelectedCategory(cat);
                setActiveProjectIndex(0);
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Layered Showcase Card */}
        <div className="projects-layered-stage" style={{ marginTop: '0', marginBottom: '4rem' }}>
          {/* Stacked Number Tabs */}
          <div className="project-stack-tabs">
            {filteredProjects.map((p, idx) => (
              <button
                key={p.id}
                className={`stack-tab ${idx === activeProjectIndex ? 'active' : ''}`}
                onClick={() => setActiveProjectIndex(idx)}
              >
                {p.number}
              </button>
            ))}
          </div>

          {/* Left Details */}
          <div className="project-details-pane">
            <div className="project-num-badge">{currentProject.number} • {currentProject.category}</div>
            <h2 className="project-heading">{currentProject.title}</h2>

            <div className="tech-pills-row">
              {currentProject.tech.map((t, idx) => (
                <span key={idx} className="tech-pill">{t}</span>
              ))}
            </div>

            <p className="project-summary">{currentProject.description}</p>

            <div className="project-actions">
              <button 
                className="btn btn-primary"
                onClick={() => onOpenDemo ? onOpenDemo(currentProject) : null}
              >
                Launch Live Simulator <Play size={14} fill="currentColor" />
              </button>
              <a 
                href={currentProject.repoUrl} 
                target="_blank" 
                rel="noreferrer" 
                className="btn btn-secondary"
              >
                <Code size={14} /> View Code
              </a>
            </div>
          </div>

          {/* Right Workflow Architecture */}
          <div className="project-preview-pane">
            <div className="preview-browser-header">
              <div className="browser-dot" style={{ background: '#EF4444' }} />
              <div className="browser-dot" style={{ background: '#F59E0B' }} />
              <div className="browser-dot" style={{ background: '#10B981' }} />
              <span style={{ fontSize: '0.75rem', color: 'var(--text-light)', marginLeft: 'auto', fontFamily: 'var(--font-mono)' }}>
                neominds://repo/{currentProject.id}
              </span>
            </div>

            <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.825rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Verified Deployment
              </span>
              <span className="badge badge-blue" style={{ fontSize: '0.725rem' }}>
                Active in Production
              </span>
            </div>

            <div className="workflow-node-list">
              {currentProject.workflowSteps.map((ws, i) => (
                <div key={i} className="workflow-node-box">
                  <div className="workflow-node-step">{ws.step}</div>
                  <div className="workflow-node-desc">{ws.detail}</div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '1.25rem', padding: '0.85rem', background: 'var(--bg-secondary)', borderRadius: '12px' }}>
              <div style={{ fontSize: '0.785rem', color: 'var(--text-muted)' }}>Engineered By:</div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>{currentProject.author}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--accent-blue)', marginTop: '0.2rem', fontWeight: 600 }}>{currentProject.impact}</div>
            </div>
          </div>
        </div>

        {/* Capstone Sprints Banner */}
        <div style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-light)',
          borderRadius: '24px',
          padding: '2.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.5rem'
        }}>
          <div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
              Have an idea for a production capstone project?
            </h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>
              Join our technical cohorts to receive mentorship, cloud credits, and direct code reviews from industry staff engineers.
            </p>
          </div>

          <button 
            className="btn btn-primary"
            onClick={() => navigateTo('programs')}
          >
            Explore Build Cohorts <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
