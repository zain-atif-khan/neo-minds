import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROGRAMS } from '../data/mockData';
import BounceCards from './BounceCards';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ProgramsSection({ navigateTo, onSelectProgram }) {
  const [activeProgramId, setActiveProgramId] = useState('ai-automation');

  // Desktop card transforms
  const cardTransforms = [
    'rotate(-4deg) translate(-280px)',
    'rotate(-1deg) translate(-95px)',
    'rotate(2deg) translate(95px)',
    'rotate(5deg) translate(280px)'
  ];

  // Mobile GSAP ScrollTrigger pinned scroll stack refs & active card tracking
  const mobileSectionRef = useRef(null);
  const mobileCardsRef = useRef([]);
  const [mobileActiveIdx, setMobileActiveIdx] = useState(0);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(max-width: 768px)', () => {
      const section = mobileSectionRef.current;
      const cards = mobileCardsRef.current.filter(Boolean);
      if (!section || cards.length < 4) return;

      // Card Stacking Setup:
      // Card 01 rests pinned at y = 0, directly below the Explore Projects button (Screenshot 2).
      // Cards 02, 03, 04 start off-screen below (window.innerHeight).
      // Sequential offsets [0, 16, 32, 48] reveal only a small 16px strip of cards behind.
      const cardOffsets = [0, 16, 32, 48];

      cards.forEach((card, i) => {
        gsap.set(card, {
          y: i === 0 ? cardOffsets[0] : () => window.innerHeight || 700,
          scale: 1,
          opacity: 1,
          autoAlpha: 1,
          zIndex: (i + 1) * 10,
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 76px',
          end: '+=1800',
          pin: true,
          pinSpacing: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            let current = 0;
            if (p < 0.28) {
              current = 0;
            } else if (p < 0.58) {
              current = 1;
            } else if (p < 0.85) {
              current = 2;
            } else {
              current = 3;
            }
            setMobileActiveIdx(current);
          }
        }
      });

      // Sequential scroll stack timeline with dedicated pauses:
      // 1. (0.0 -> 0.7): Card 01 rests pinned in place alone, fully readable.
      tl.to({}, { duration: 0.7 })

        // 2. (0.7 -> 1.4): Card 02 slides upward from below and stacks over Card 01 at y = 16px.
        .to(cards[1], {
          y: cardOffsets[1],
          duration: 0.7,
          ease: 'power1.out'
        }, 'step1')
        // Rest period for Card 02 in front
        .to({}, { duration: 0.3 })

        // 3. (1.7 -> 2.4): Card 03 slides upward from below and stacks over Card 02 at y = 32px.
        .to(cards[2], {
          y: cardOffsets[2],
          duration: 0.7,
          ease: 'power1.out'
        }, 'step2')
        // Rest period for Card 03 in front
        .to({}, { duration: 0.3 })

        // 4. (2.7 -> 3.4): Card 04 slides upward from below and stacks over Card 03 at y = 48px.
        .to(cards[3], {
          y: cardOffsets[3],
          duration: 0.7,
          ease: 'power1.out'
        }, 'step3')
        // Rest period for Card 04 before natural release into next section
        .to({}, { duration: 0.6 });
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section className="section-spacing programs-section" id="programs">
      <div className="container">
        {/* DESKTOP HEADER ROW (Width > 768px): Exact original desktop layout */}
        <div className="section-header-row programs-header-row desktop-only-programs-header">
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

        {/* ══════════════════════════════════════════════════════════════════
            DESKTOP VIEW (Width > 768px): Exact original BounceCards
            100% UNTOUCHED
            ══════════════════════════════════════════════════════════════════ */}
        <div className="programs-desktop-view">
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

        {/* ══════════════════════════════════════════════════════════════════
            MOBILE VIEW (Width <= 768px): Vertical Scroll-Stack (01 → 02 → 03 → 04)
            - Pinned section displays Header + Pinned Stack together (Screenshot 2)
            - Card 01 pins right below Explore Projects button
            - Card 02, 03, 04 sequentially slide up and stack cleanly over Card 01
            - Releases naturally into next section after Card 04 finishes
            ══════════════════════════════════════════════════════════════════ */}
        <div ref={mobileSectionRef} className="programs-mobile-view">
          {/* Mobile Section Header matching Screenshot 2 */}
          <div className="programs-mobile-header">
            <h2 className="programs-mobile-heading">
              Skills for what<br />
              comes <span className="highlight-next">next.</span>
            </h2>
            <p className="programs-mobile-subtext">
              Practical, industry-focused programs<br />
              designed for real world opportunities.
            </p>
            <button 
              className="btn btn-secondary programs-mobile-btn"
              onClick={() => navigateTo('projects')}
            >
              Explore Projects <ArrowRight size={15} />
            </button>
          </div>

          <div className="programs-mobile-stack-container">
            <div className="programs-mobile-cards-stage">
              {PROGRAMS.map((program, idx) => {
                const isBlue = program.id === 'ai-automation';

                return (
                  <div
                    key={program.id}
                    ref={(el) => (mobileCardsRef.current[idx] = el)}
                    className={`programs-mobile-stack-card program-shelf-card ${isBlue ? 'active-card' : ''}`}
                    onClick={() => {
                      setActiveProgramId(program.id);
                      setMobileActiveIdx(idx);
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
                              background: isBlue ? 'rgba(255, 255, 255, 0.2)' : 'var(--bg-secondary)',
                              color: isBlue ? '#FFFFFF' : 'var(--text-secondary)'
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="program-card-action">
                      <button 
                        className={isBlue ? 'btn-circle' : 'btn-circle-primary'}
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
