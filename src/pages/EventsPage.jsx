import React, { useState } from 'react';
import { Calendar, MapPin, Clock, User, ArrowRight, CheckCircle2, Ticket } from 'lucide-react';
import { EVENTS } from '../data/mockData';

export default function EventsPage({ navigateTo }) {
  const [selectedCat, setSelectedCat] = useState('All');
  const [rsvpSuccess, setRsvpSuccess] = useState(null);

  const categories = ['All', 'AI', 'Web', 'Campus', 'Industry'];

  const filteredEvents = selectedCat === 'All'
    ? EVENTS
    : EVENTS.filter(e => e.category === selectedCat);

  const featured = EVENTS[0];

  const handleRsvp = (eventId) => {
    setRsvpSuccess(eventId);
    setTimeout(() => {
      alert('RSVP Confirmed! Calendar invitation and access link sent to your registered email.');
    }, 400);
  };

  return (
    <div className="section-spacing" style={{ paddingTop: '3.5rem' }}>
      <div className="container">
        {/* Header */}
        <div style={{ maxWidth: '750px', marginBottom: '2.5rem' }}>
          <div className="kicker">
            COMMUNITY SESSIONS & HACKATHONS
          </div>
          <h1 className="editorial-serif" style={{ fontSize: '3.5rem', lineHeight: '1.1', marginBottom: '1.25rem' }}>
            Events that ignite<br />practical engineering.
          </h1>
          <p className="editorial-subtext" style={{ fontSize: '1.15rem' }}>
            Physical hackathons, expert architectural masterclasses, and direct hiring mixers connecting college students with industry practitioners.
          </p>
        </div>

        {/* Featured Event Editorial Banner */}
        <div style={{
          background: 'var(--bg-secondary)',
          border: '1.5px solid var(--border-light)',
          borderRadius: '24px',
          padding: '3rem',
          marginBottom: '3.5rem',
          display: 'grid',
          gridTemplateColumns: '1.2fr 0.8fr',
          gap: '2.5rem',
          alignItems: 'center'
        }}>
          <div>
            <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '1rem' }}>
              <span className="badge badge-blue">FEATURED SPRINT</span>
              <span className="badge badge-outline">{featured.category}</span>
            </div>

            <h2 style={{ fontSize: '2.2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem', lineHeight: '1.2' }}>
              {featured.title}
            </h2>

            <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1.75rem' }}>
              {featured.description}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Calendar size={15} /> {featured.date}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={15} /> {featured.time}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><MapPin size={15} /> {featured.location}</span>
            </div>
          </div>

          <div style={{
            background: '#FFFFFF',
            border: '1px solid var(--border-light)',
            borderRadius: '20px',
            padding: '2rem',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '0.785rem', fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase' }}>KEYNOTE SPEAKER</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', margin: '0.35rem 0 1rem 0' }}>
              {featured.speaker}
            </div>

            <div style={{ background: 'var(--bg-tertiary)', borderRadius: '12px', padding: '0.75rem', marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-blue)' }}>
                {featured.seatsRemaining} Physical Passes Remaining
              </span>
            </div>

            <button 
              className="btn btn-primary"
              style={{ width: '100%' }}
              onClick={() => handleRsvp(featured.id)}
            >
              {rsvpSuccess === featured.id ? 'Pass Confirmed ✓' : 'Reserve Free Ticket'} <Ticket size={16} />
            </button>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '2.5rem' }}>
          {categories.map((c) => (
            <button
              key={c}
              className="btn"
              style={{
                padding: '0.5rem 1.25rem',
                fontSize: '0.85rem',
                borderRadius: '9999px',
                background: selectedCat === c ? 'var(--accent-blue)' : '#FFFFFF',
                color: selectedCat === c ? '#FFFFFF' : 'var(--text-secondary)',
                border: `1px solid ${selectedCat === c ? 'var(--accent-blue)' : 'var(--border-light)'}`
              }}
              onClick={() => setSelectedCat(c)}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '2rem' }}>
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              style={{
                background: '#FFFFFF',
                border: '1px solid var(--border-light)',
                borderRadius: '20px',
                padding: '2rem',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '320px'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span className="badge badge-outline">{event.category}</span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-blue)' }}>{event.date}</span>
                </div>

                <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem', lineHeight: '1.3' }}>
                  {event.title}
                </h3>

                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: '1.5', marginBottom: '1.25rem' }}>
                  {event.description}
                </p>

                <div style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <MapPin size={13} /> {event.location}
                </div>
                <div style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <User size={13} /> {event.speaker}
                </div>
              </div>

              <div style={{ paddingTop: '1.25rem', borderTop: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem' }}>
                <span style={{ fontSize: '0.785rem', color: 'var(--text-light)', fontWeight: 600 }}>
                  {event.time}
                </span>

                <button 
                  className="btn btn-secondary"
                  style={{ padding: '0.45rem 1rem', fontSize: '0.825rem' }}
                  onClick={() => handleRsvp(event.id)}
                >
                  {rsvpSuccess === event.id ? 'Attending ✓' : 'RSVP Now'} <ArrowRight size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
