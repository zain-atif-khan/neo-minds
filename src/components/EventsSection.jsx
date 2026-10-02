import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, ArrowUpRight, X, Sparkles, CheckCircle2 } from 'lucide-react';
import { EVENTS } from '../data/mockData';

export default function EventsSection() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);

  const handleOpenModal = (event) => {
    setSelectedEvent(event);
    setRsvpSubmitted(false);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
    setRsvpSubmitted(false);
  };

  return (
    <section className="section-spacing events-section" id="events">
      <div className="container">
        {/* Header Row */}
        <div className="section-header-row">
          <div className="section-header-left">
            <div className="kicker">
              EVENTS & WORKSHOPS
            </div>
            <h2 className="section-title editorial-serif">
              What's happening<br />
              at Neo <span style={{ color: '#1677FF' }}>Minds.</span>
            </h2>
          </div>

          <div className="section-header-right">
            <p className="section-subtext">
              Hands-on builder sprints, campus summits,<br />
              and masterclasses with industry leads.
            </p>
          </div>
        </div>

        {/* Compact Editorial Event Rows (Lines and Typography, Not Generic Cards) */}
        <div className="events-editorial-list">
          {EVENTS.map((event, idx) => (
            <article 
              key={event.id || idx} 
              className="event-row-item"
              onClick={() => handleOpenModal(event)}
              tabIndex={0}
              role="button"
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleOpenModal(event); }}
            >
              {/* Left: Monospaced Date & Category Tag */}
              <div className="event-date-col">
                <span className="event-date-text">{event.date}</span>
                <span className="event-category-pill">{event.category || 'Tech'}</span>
              </div>

              {/* Middle: Title & Speaker / Overview */}
              <div className="event-main-col">
                <h3 className="event-title-text">{event.title}</h3>
                <div className="event-meta-line">
                  <span className="event-meta-item">
                    <Clock size={14} /> {event.time}
                  </span>
                  <span className="event-meta-divider">·</span>
                  <span className="event-meta-item">
                    <MapPin size={14} /> {event.location}
                  </span>
                </div>
              </div>

              {/* Right: Seats & Action Indicator */}
              <div className="event-action-col">
                <span className="event-seats-tag">
                  {event.seatsRemaining ? `${event.seatsRemaining} seats left` : 'Open'}
                </span>
                <div className="event-arrow-circle" aria-label="View event details">
                  <ArrowUpRight size={17} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="modal-backdrop" onClick={handleCloseModal}>
          <div 
            className="modal-container event-detail-modal" 
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <button 
              className="modal-close-btn" 
              onClick={handleCloseModal}
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            <div className="kicker" style={{ marginBottom: '0.5rem' }}>
              {selectedEvent.category || 'WORKSHOP'} · UPCOMING SPRINT
            </div>

            <h3 className="modal-title editorial-serif" style={{ fontSize: '2rem', marginBottom: '1rem', lineHeight: '1.2' }}>
              {selectedEvent.title}
            </h3>

            <div className="event-modal-grid">
              <div className="event-modal-info-block">
                <Calendar size={18} className="text-blue" />
                <div>
                  <div className="event-modal-label">DATE & TIME</div>
                  <div className="event-modal-val">{selectedEvent.date}</div>
                  <div className="event-modal-sub">{selectedEvent.time}</div>
                </div>
              </div>

              <div className="event-modal-info-block">
                <MapPin size={18} className="text-blue" />
                <div>
                  <div className="event-modal-label">LOCATION</div>
                  <div className="event-modal-val">{selectedEvent.location}</div>
                  <div className="event-modal-sub">Verified Chapter Host</div>
                </div>
              </div>

              {selectedEvent.speaker && (
                <div className="event-modal-info-block" style={{ gridColumn: 'span 2' }}>
                  <Users size={18} className="text-blue" />
                  <div>
                    <div className="event-modal-label">FEATURED SPEAKER / MENTOR</div>
                    <div className="event-modal-val">{selectedEvent.speaker}</div>
                  </div>
                </div>
              )}
            </div>

            <div style={{ margin: '1.5rem 0', padding: '1.25rem', background: 'var(--bg-secondary)', borderRadius: '14px', border: '1px solid var(--border-light)' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                Event Overview
              </div>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--text-secondary)', margin: 0 }}>
                {selectedEvent.description || 'Join fellow student builders and technical mentors for an intensive practical session focused on cutting-edge industry tools and collaborative production challenges.'}
              </p>
            </div>

            {rsvpSubmitted ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem', background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '12px', color: '#166534' }}>
                <CheckCircle2 size={20} />
                <span style={{ fontSize: '0.92rem', fontWeight: 600 }}>You are registered! A calendar invite & entry token have been reserved for you.</span>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-light)' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Free for Neo Minds campus community members
                </span>
                <button 
                  className="btn btn-primary"
                  onClick={() => setRsvpSubmitted(true)}
                  style={{ padding: '0.75rem 1.75rem' }}
                >
                  Reserve Your Spot <ArrowUpRight size={15} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
