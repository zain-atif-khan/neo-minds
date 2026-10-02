import React, { useState } from 'react';
import { Search, MapPin, Filter, Users, Building, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { COLLEGES } from '../data/mockData';

export default function CampusNetworkPage({ onSelectCollege, navigateTo }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');
  const [onlyActiveClubs, setOnlyActiveClubs] = useState(false);

  const filteredColleges = COLLEGES.filter((college) => {
    const matchesSearch = college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          college.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = selectedCity === 'All' || college.city === selectedCity;
    const matchesClub = !onlyActiveClubs || college.status === 'Active Club';
    return matchesSearch && matchesCity && matchesClub;
  });

  return (
    <div className="section-spacing" style={{ paddingTop: '3.5rem' }}>
      <div className="container">
        {/* Header */}
        <div style={{ maxWidth: '750px', marginBottom: '2.5rem' }}>
          <div className="kicker">
            EXPANDING COLLEGIATE ECOSYSTEM
          </div>
          <h1 className="editorial-serif" style={{ fontSize: '3.5rem', lineHeight: '1.1', marginBottom: '1.25rem' }}>
            Neo Minds across campuses.
          </h1>
          <p className="editorial-subtext" style={{ fontSize: '1.15rem' }}>
            Active student-led technical chapters bridging academic departments with direct startup internships, hackathons, and capstone labs.
          </p>
        </div>

        {/* Search & Filter Toolbar */}
        <div style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-light)',
          borderRadius: '20px',
          padding: '1.25rem',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '2.5rem'
        }}>
          {/* Search Input */}
          <div style={{ position: 'relative', flex: '1 1 300px' }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              placeholder="Search by college name, city..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input"
              style={{ paddingLeft: '2.75rem', borderRadius: '12px' }}
            />
          </div>

          {/* City Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>City:</span>
            {['All', 'Hyderabad'].map((city) => (
              <button
                key={city}
                className="btn"
                style={{
                  padding: '0.45rem 1rem',
                  fontSize: '0.825rem',
                  borderRadius: '9999px',
                  background: selectedCity === city ? 'var(--accent-blue)' : '#FFFFFF',
                  color: selectedCity === city ? '#FFFFFF' : 'var(--text-secondary)',
                  border: `1px solid ${selectedCity === city ? 'var(--accent-blue)' : 'var(--border-light)'}`
                }}
                onClick={() => setSelectedCity(city)}
              >
                {city}
              </button>
            ))}
          </div>

          {/* Active Club Checkbox */}
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
            <input 
              type="checkbox" 
              checked={onlyActiveClubs} 
              onChange={(e) => setOnlyActiveClubs(e.target.checked)}
              style={{ accentColor: 'var(--accent-blue)', width: '16px', height: '16px' }}
            />
            Active Clubs Only
          </label>
        </div>

        {/* College Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
          gap: '2rem'
        }}>
          {filteredColleges.map((college) => (
            <div 
              key={college.id}
              className="campus-card"
              style={{ borderRadius: '20px', overflow: 'hidden', cursor: 'pointer' }}
              onClick={() => onSelectCollege(college)}
            >
              <div style={{ height: '220px', position: 'relative', overflow: 'hidden' }}>
                <img 
                  src={college.image} 
                  alt={college.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  left: '1rem'
                }}>
                  <span className="badge badge-success" style={{ background: 'rgba(255, 255, 255, 0.95)' }}>
                    ● {college.status}
                  </span>
                </div>
              </div>

              <div className="campus-info">
                <h3 className="campus-name" style={{ fontSize: '1.2rem', marginBottom: '0.35rem' }}>
                  {college.name}
                </h3>
                <div className="campus-location" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <MapPin size={14} /> {college.city}, {college.state}
                </div>

                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.5', margin: '0.85rem 0' }}>
                  {college.description.slice(0, 110)}...
                </p>

                <div className="campus-footer-row">
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    <strong>{college.members}+</strong> Active Members
                  </div>

                  <button 
                    className="btn-circle-primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectCollege(college);
                    }}
                    aria-label={`View ${college.name} campus chapter`}
                  >
                    <ArrowUpRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bring Neo Minds to Your Campus CTA */}
        <div style={{
          marginTop: '4.5rem',
          background: 'var(--accent-blue-gradient)',
          borderRadius: '24px',
          padding: '3rem',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '2rem'
        }}>
          <div>
            <h3 style={{ fontSize: '2rem', fontWeight: 700, color: 'white', marginBottom: '0.5rem' }}>
              Want a Neo Minds Club on your campus?
            </h3>
            <p style={{ fontSize: '1.05rem', color: 'rgba(255, 255, 255, 0.9)', maxWidth: '580px' }}>
              Partner with us to launch an official chapter, appoint student ambassadors, and unlock direct internship pathways for your college.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button 
              className="btn" 
              style={{ background: 'white', color: 'var(--accent-blue)', fontWeight: 700 }}
              onClick={() => navigateTo('campus-program')}
            >
              Institutional MoU Program
            </button>
            <button 
              className="btn" 
              style={{ background: 'rgba(255, 255, 255, 0.15)', color: 'white', border: '1px solid rgba(255, 255, 255, 0.3)' }}
              onClick={() => navigateTo('ambassador-program')}
            >
              Apply as Ambassador
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
