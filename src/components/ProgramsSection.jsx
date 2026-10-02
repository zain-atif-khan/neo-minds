import React, { useState } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { PROGRAMS } from '../data/mockData';
import BounceCards from './BounceCards';

export default function ProgramsSection({ navigateTo, onSelectProgram }) {
  const [activeProgramId, setActiveProgramId] = useState('ai-automation');

  const cardTransforms = [
    'rotate(-4deg) translate(-280px)',
    'rotate(-1deg) translate(-95px)',
    'rotate(2deg) translate(95px)',
    'rotate(5deg) translate(280px)'
  ];

  return (
    <section className="section-spacing programs-section" id="programs">
      <div className="container">
        {/* Header Row without INDUSTRY-RELEVANT PROGRAMS kicker */}
        <div className="section-header-row programs-header-row">
          <div className="section-header-left">
            <h2 className="section-title editorial-serif">
              Skills for what<br />
              comes <span className="highlight-next">next.</span>
            </h2>
          </div>

          <div className="section-header-right">
            <p className="section-subtext">
              Practical, industry-focused programs<br />
              designed for real world opportunities.
            </p>
            <button 
              className="btn btn-secondary"
              onClick={() => navigateTo('projects')}
            >
              Explore Projects <ArrowRight size={15} />
            </button>
          </div>
        </div>

        {/* BounceCards Program Cards Stage */}
        <div className="programs-bounce-stage">
          <BounceCards
            className="programs-bounce-cards"
            containerWidth={980}
            containerHeight={460}
            animationDelay={0.3}
            animationStagger={0.08}
            easeType="elastic.out(1, 0.8)"
            transformStyles={cardTransforms}
            enableHover={true}
          >
            {PROGRAMS.map((program) => {
              const isActive = program.id === activeProgramId;

              return (
                <div 
                  key={program.id}
                  className={`program-shelf-card ${isActive ? 'active-card' : ''}`}
                  onClick={() => {
                    setActiveProgramId(program.id);
                    if (onSelectProgram) onSelectProgram(program);
                  }}
                >
                  <div>
                    <div className="program-card-num">{program.number}</div>
                    <h3 className="program-card-title">{program.title}</h3>
                    <p className="program-card-desc">{program.tagline}</p>

                    {/* Tools preview */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '1rem' }}>
                      {program.tools.slice(0, 3).map((t, i) => (
                        <span 
                          key={i} 
                          style={{
                            fontSize: '0.725rem',
                            fontWeight: 600,
                            padding: '0.2rem 0.5rem',
                            borderRadius: '6px',
                            background: isActive ? 'rgba(255, 255, 255, 0.2)' : 'var(--bg-secondary)',
                            color: isActive ? '#FFFFFF' : 'var(--text-secondary)'
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="program-card-action">
                    <button 
                      className={isActive ? 'btn-circle' : 'btn-circle-primary'}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigateTo('programs', { programId: program.id });
                      }}
                      aria-label={`Learn more about ${program.title}`}
                    >
                      <ArrowUpRight size={18} />
                    </button>
                  </div>
                </div>
              );
            })}
          </BounceCards>
        </div>
      </div>
    </section>
  );
}
