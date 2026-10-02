import React, { useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Code, ExternalLink, Play, Layers } from 'lucide-react';
import { PROJECTS } from '../data/mockData';

export default function ProjectsSection({ navigateTo, onOpenDemo }) {
  const [projectIndex, setProjectIndex] = useState(0);
  const currentProject = PROJECTS[projectIndex];

  const prevProject = () => {
    setProjectIndex((prev) => (prev === 0 ? PROJECTS.length - 1 : prev - 1));
  };

  const nextProject = () => {
    setProjectIndex((prev) => (prev === PROJECTS.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="section-spacing projects-section" id="projects">
      <div className="container">
        {/* Header Row */}
        <div className="section-header-row">
          <div className="section-header-left">
            <div className="kicker">
              FEATURED PROJECTS
            </div>
            <h2 className="section-title editorial-serif">
              Real Projects.<br />
              Real <span style={{ color: '#1677FF' }}>Impact.</span>
            </h2>
          </div>

          <div className="section-header-right">
            <p className="section-subtext">
              Built by students. Guided by industry.<br />
              Designed for the real world.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
              <button 
                className="btn-circle" 
                onClick={prevProject}
                aria-label="Previous project"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                className="btn-circle" 
                onClick={nextProject}
                aria-label="Next project"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Layered 3D Project Showcase Stage */}
        <div className="projects-layered-stage">
          {/* Stacked Step Tabs in background */}
          <div className="project-stack-tabs">
            {PROJECTS.map((proj, idx) => (
              <button
                key={proj.id}
                className={`stack-tab ${idx === projectIndex ? 'active' : ''}`}
                onClick={() => setProjectIndex(idx)}
              >
                {proj.number}
              </button>
            ))}
          </div>

          {/* Left Details Pane */}
          <div className="project-details-pane">
            <div className="project-num-badge">{currentProject.number}</div>
            <h3 className="project-heading">{currentProject.title}</h3>

            {/* Tech Pills */}
            <div className="tech-pills-row">
              {currentProject.tech.map((item, idx) => (
                <span key={idx} className="tech-pill">
                  {item}
                </span>
              ))}
            </div>

            <p className="project-summary">{currentProject.description}</p>

            <div className="project-actions">
              <button 
                className="btn btn-primary"
                onClick={() => onOpenDemo ? onOpenDemo(currentProject) : navigateTo('projects')}
              >
                Live Demo <ArrowRight size={15} />
              </button>
              <button 
                className="btn btn-secondary"
                onClick={() => onOpenDemo ? onOpenDemo(currentProject) : navigateTo('projects')}
              >
                <Code size={15} /> View Code
              </button>
            </div>
          </div>

          {/* Right Workflow Architecture / Preview Pane */}
          <div className="project-preview-pane">
            <div className="preview-browser-header">
              <div className="browser-dot" style={{ background: '#EF4444' }} />
              <div className="browser-dot" style={{ background: '#F59E0B' }} />
              <div className="browser-dot" style={{ background: '#10B981' }} />
              <span style={{ fontSize: '0.75rem', color: 'var(--text-light)', marginLeft: 'auto', fontFamily: 'var(--font-mono)' }}>
                neominds://workflow-sim/{currentProject.id}
              </span>
            </div>

            <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.825rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Execution Pipeline
              </span>
              <span className="badge badge-success" style={{ fontSize: '0.725rem' }}>
                Verified Production
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

            <div style={{ marginTop: '1.25rem', fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between' }}>
              <span>Author: <strong>{currentProject.author}</strong></span>
              <span style={{ color: 'var(--accent-blue)', fontWeight: 600 }}>{currentProject.impact}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
