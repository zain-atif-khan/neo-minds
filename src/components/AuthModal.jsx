import React, { useState } from 'react';
import { X, ArrowRight, User, Building, Award, CheckCircle2 } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, initialMode = 'login', onAuthSuccess }) {
  const [mode, setMode] = useState(initialMode); // 'login' or 'join'
  const [role, setRole] = useState('student'); // 'student', 'ambassador', 'industry'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoggedIn(true);
    setTimeout(() => {
      if (onAuthSuccess) onAuthSuccess({ name: name || 'Student Member', email, role });
      onClose();
    }, 1200);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '480px' }}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={18} />
        </button>

        {!loggedIn ? (
          <div>
            {/* Mode Switcher */}
            <div style={{
              display: 'flex',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-light)',
              borderRadius: '9999px',
              padding: '4px',
              marginBottom: '1.75rem'
            }}>
              <button
                className="btn"
                style={{
                  flex: 1,
                  padding: '0.5rem',
                  fontSize: '0.85rem',
                  borderRadius: '9999px',
                  background: mode === 'login' ? 'white' : 'transparent',
                  color: mode === 'login' ? 'var(--text-primary)' : 'var(--text-muted)',
                  boxShadow: mode === 'login' ? 'var(--shadow-sm)' : 'none'
                }}
                onClick={() => setMode('login')}
              >
                Sign In
              </button>
              <button
                className="btn"
                style={{
                  flex: 1,
                  padding: '0.5rem',
                  fontSize: '0.85rem',
                  borderRadius: '9999px',
                  background: mode === 'join' ? 'white' : 'transparent',
                  color: mode === 'join' ? 'var(--text-primary)' : 'var(--text-muted)',
                  boxShadow: mode === 'join' ? 'var(--shadow-sm)' : 'none'
                }}
                onClick={() => setMode('join')}
              >
                Join Neo Minds
              </button>
            </div>

            <div className="kicker">
              {mode === 'login' ? 'WELCOME BACK' : 'START YOUR CAREER SPRINT'}
            </div>

            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              {mode === 'login' ? 'Sign in to Tech Hub' : 'Create Student Account'}
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              Access diagnostic benchmarks, capstone projects, and internship pipelines.
            </p>

            {/* Role Selector (when joining) */}
            {mode === 'join' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <button
                  type="button"
                  onClick={() => setRole('student')}
                  style={{
                    padding: '0.65rem 0.4rem',
                    borderRadius: '12px',
                    border: `1.5px solid ${role === 'student' ? 'var(--accent-blue)' : 'var(--border-light)'}`,
                    background: role === 'student' ? 'var(--bg-tertiary)' : 'white',
                    textAlign: 'center',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: role === 'student' ? 'var(--accent-blue)' : 'var(--text-secondary)'
                  }}
                >
                  <User size={16} style={{ margin: '0 auto 4px auto' }} />
                  Student
                </button>

                <button
                  type="button"
                  onClick={() => setRole('ambassador')}
                  style={{
                    padding: '0.65rem 0.4rem',
                    borderRadius: '12px',
                    border: `1.5px solid ${role === 'ambassador' ? 'var(--accent-blue)' : 'var(--border-light)'}`,
                    background: role === 'ambassador' ? 'var(--bg-tertiary)' : 'white',
                    textAlign: 'center',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: role === 'ambassador' ? 'var(--accent-blue)' : 'var(--text-secondary)'
                  }}
                >
                  <Award size={16} style={{ margin: '0 auto 4px auto' }} />
                  Ambassador
                </button>

                <button
                  type="button"
                  onClick={() => setRole('industry')}
                  style={{
                    padding: '0.65rem 0.4rem',
                    borderRadius: '12px',
                    border: `1.5px solid ${role === 'industry' ? 'var(--accent-blue)' : 'var(--border-light)'}`,
                    background: role === 'industry' ? 'var(--bg-tertiary)' : 'white',
                    textAlign: 'center',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: role === 'industry' ? 'var(--accent-blue)' : 'var(--text-secondary)'
                  }}
                >
                  <Building size={16} style={{ margin: '0 auto 4px auto' }} />
                  Industry
                </button>
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {mode === 'join' && (
                <div>
                  <label className="form-label">Full Name</label>
                  <input
                    required
                    type="text"
                    placeholder="Aryan Sharma"
                    className="form-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              )}

              <div>
                <label className="form-label">Email Address</label>
                <input
                  required
                  type="email"
                  placeholder="student@college.edu"
                  className="form-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="form-label">Password</label>
                <input
                  required
                  type="password"
                  placeholder="••••••••••••"
                  className="form-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ marginTop: '0.5rem', width: '100%' }}>
                {mode === 'login' ? 'Sign In to Workspace' : 'Create Neo Minds Account'} <ArrowRight size={15} />
              </button>
            </form>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: '#ECFDF5',
              color: '#059669',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem auto'
            }}>
              <CheckCircle2 size={32} />
            </div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
              Authentication Verified
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              Welcome to the Neo Minds Tech Hub ecosystem. Redirecting...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
