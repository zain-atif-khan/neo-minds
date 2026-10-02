import React, { useState } from 'react';
import { X, MapPin, Users, Calendar, Award, CheckCircle2, ArrowRight } from 'lucide-react';

export default function CollegeDetailModal({ college, onClose, onJoinCampus }) {
  const [joined, setJoined] = useState(false);

  if (!college) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '620px', padding: '0' }}>
        <button className="modal-close-btn" onClick={onClose} style={{ zIndex: 10, background: 'rgba(255, 255, 255, 0.9)' }}>
          <X size={18} />
        </button>

        {/* Hero Image */}
        <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
          <img 
            src={college.image} 
            alt={college.name} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(11, 23, 54, 0.7) 0%, transparent 60%)'
          }} />

          <div style={{ position: 'absolute', bottom: '1.25rem', left: '1.5rem', color: 'white' }}>
            <span className="badge badge-success" style={{ marginBottom: '0.4rem' }}>
              ● {college.status}
            </span>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'white' }}>
              {college.name}
            </h3>
            <div style={{ fontSize: '0.85rem', color: '#E2EDFD', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <MapPin size={13} /> {college.city}, {college.state} • Est. {college.establishedYear}
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '1.75rem' }}>
          <p style={{ fontSize: '0.925rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
            {college.description}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-light)', borderRadius: '12px', padding: '0.85rem', textAlign: 'center' }}>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-blue)' }}>{college.members}+</div>
              <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)', fontWeight: 600 }}>Active Members</div>
            </div>
            <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-light)', borderRadius: '12px', padding: '0.85rem', textAlign: 'center' }}>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-blue)' }}>{college.activeProjects}</div>
              <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)', fontWeight: 600 }}>Live Projects</div>
            </div>
            <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-light)', borderRadius: '12px', padding: '0.85rem', textAlign: 'center' }}>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-blue)' }}>Bi-Weekly</div>
              <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)', fontWeight: 600 }}>Build Sprints</div>
            </div>
          </div>

          {/* Ambassador & Upcoming Event Box */}
          <div style={{ background: 'var(--bg-tertiary)', borderRadius: '14px', border: '1px solid var(--border-light)', padding: '1.25rem', marginBottom: '1.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <Award size={18} style={{ color: 'var(--accent-blue)' }} />
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase' }}>CAMPUS AMBASSADOR</div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>{college.ambassador}</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Calendar size={18} style={{ color: 'var(--accent-blue)' }} />
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase' }}>UPCOMING SPRINT</div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>{college.upcomingEvent}</div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '1rem' }}>
            {joined ? (
              <div style={{
                flex: 1,
                padding: '0.85rem',
                background: '#ECFDF5',
                border: '1px solid #A7F3D0',
                borderRadius: '12px',
                textAlign: 'center',
                color: '#059669',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}>
                <CheckCircle2 size={18} /> Request Submitted! Your Ambassador will contact you.
              </div>
            ) : (
              <>
                <button className="btn btn-secondary" style={{ flex: 1 }} onClick={onClose}>
                  Close
                </button>
                <button 
                  className="btn btn-primary" 
                  style={{ flex: 2 }}
                  onClick={() => setJoined(true)}
                >
                  Join Campus Chapter <ArrowRight size={15} />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
