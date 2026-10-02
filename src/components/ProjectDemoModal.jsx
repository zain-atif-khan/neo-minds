import React, { useState } from 'react';
import { X, Play, CheckCircle2, Terminal, Code, Cpu, Database, Send, ExternalLink } from 'lucide-react';

export default function ProjectDemoModal({ project, onClose }) {
  const [leadName, setLeadName] = useState('Rahul Kulkarni');
  const [collegeName, setCollegeName] = useState('CBIT Hyderabad');
  const [track, setTrack] = useState('AI & Automation');
  const [executing, setExecuting] = useState(false);
  const [executionLogs, setExecutionLogs] = useState([]);
  const [executionDone, setExecutionDone] = useState(false);

  if (!project) return null;

  const runSimulation = () => {
    setExecuting(true);
    setExecutionLogs([]);
    setExecutionDone(false);

    const logs = [
      `[T+0ms] ⚡ Inbound Webhook Received from form: "${leadName}" (${collegeName})`,
      `[T+120ms] 🔍 Payload validated with JSON Schema. Target track: ${track}`,
      `[T+340ms] 🤖 Calling OpenAI GPT-4o with extraction prompt...`,
      `[T+890ms] ✨ Intent scored: 96% Qualification Index. Priority: HIGH`,
      `[T+1100ms] 📊 Appending enriched row to PostgreSQL & Google Sheets CRM`,
      `[T+1450ms] ✉️ Dispatching automated invitation & orientation syllabus email`,
      `[T+1600ms] ✅ Workflow Completed Successfully! Status code 200 OK`
    ];

    logs.forEach((log, index) => {
      setTimeout(() => {
        setExecutionLogs((prev) => [...prev, log]);
        if (index === logs.length - 1) {
          setExecuting(false);
          setExecutionDone(true);
        }
      }, (index + 1) * 350);
    });
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '720px' }}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={18} />
        </button>

        <div className="kicker">
          INTERACTIVE WORKFLOW SIMULATOR • PROJECT #{project.number}
        </div>

        <h3 style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
          {project.title}
        </h3>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
          {project.tagline}
        </p>

        {/* Simulator Input Box */}
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-light)', borderRadius: '16px', padding: '1.25rem', marginBottom: '1.5rem' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Cpu size={15} style={{ color: 'var(--accent-blue)' }} /> Trigger Test Payload
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>Student Name</label>
              <input 
                type="text" 
                value={leadName} 
                onChange={(e) => setLeadName(e.target.value)} 
                className="form-input" 
                style={{ fontSize: '0.85rem', padding: '0.5rem 0.75rem' }} 
              />
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>College</label>
              <input 
                type="text" 
                value={collegeName} 
                onChange={(e) => setCollegeName(e.target.value)} 
                className="form-input" 
                style={{ fontSize: '0.85rem', padding: '0.5rem 0.75rem' }} 
              />
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>Track</label>
              <select 
                value={track} 
                onChange={(e) => setTrack(e.target.value)} 
                className="form-select" 
                style={{ fontSize: '0.85rem', padding: '0.5rem 0.75rem' }}
              >
                <option value="AI & Automation">AI & Automation</option>
                <option value="Web & Software">Web & Software</option>
                <option value="Digital Marketing">Digital Marketing</option>
              </select>
            </div>
          </div>

          <button 
            className="btn btn-primary" 
            onClick={runSimulation}
            disabled={executing}
            style={{ width: '100%', opacity: executing ? 0.7 : 1 }}
          >
            {executing ? 'Executing Automation Pipeline...' : 'Test Trigger Automation Workflow'} <Play size={14} fill="currentColor" />
          </button>
        </div>

        {/* Live Terminal / Console */}
        <div style={{
          background: '#0B1736',
          borderRadius: '14px',
          padding: '1.25rem',
          color: '#E2EDFD',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.8rem',
          minHeight: '170px',
          maxHeight: '220px',
          overflowY: 'auto',
          border: '1px solid #1E293B'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#94A3B8', marginBottom: '0.75rem', borderBottom: '1px solid #1E293B', paddingBottom: '0.5rem' }}>
            <Terminal size={14} /> <span>Automation Engine Stream Output</span>
          </div>

          {executionLogs.length === 0 ? (
            <div style={{ color: '#64748B', fontStyle: 'italic' }}>
              Click "Test Trigger Automation Workflow" above to dispatch live event payload...
            </div>
          ) : (
            executionLogs.map((log, idx) => (
              <div key={idx} style={{ marginBottom: '0.35rem', color: log.includes('✅') ? '#34D399' : log.includes('🤖') ? '#60A5FA' : '#F1F5F9' }}>
                {log}
              </div>
            ))
          )}
        </div>

        {/* Footer info & GitHub Link */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-light)' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Stack: {project.tech.join(' • ')}
          </div>
          <a 
            href={project.repoUrl} 
            target="_blank" 
            rel="noreferrer" 
            className="btn btn-secondary"
            style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
          >
            <Code size={14} /> Inspect GitHub Source <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </div>
  );
}
