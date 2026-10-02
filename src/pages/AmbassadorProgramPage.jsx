import React from 'react';
import { Award, ArrowRight, CheckCircle2, Star, Gift, Users, Zap, ShieldCheck } from 'lucide-react';
import { AMBASSADOR_PERKS } from '../data/mockData';

export default function AmbassadorProgramPage({ onApplyAmbassador, navigateTo }) {
  return (
    <div className="section-spacing" style={{ paddingTop: '3.5rem' }}>
      <div className="container">
        {/* Header */}
        <div style={{ maxWidth: '750px', marginBottom: '3rem' }}>
          <div className="kicker">
            STUDENT LEADERSHIP FELLOWSHIP
          </div>
          <h1 className="editorial-serif" style={{ fontSize: '3.5rem', lineHeight: '1.1', marginBottom: '1.25rem' }}>
            Become the bridge between<br />your campus and industry.
          </h1>
          <p className="editorial-subtext" style={{ fontSize: '1.15rem' }}>
            Lead technical workshops, organize 36-hour hackathons, mentor peers, and represent Neo Minds as the official ambassador at your institution.
          </p>

          <div style={{ marginTop: '2rem' }}>
            <button 
              className="btn btn-primary"
              onClick={() => onApplyAmbassador ? onApplyAmbassador({ title: 'Campus Ambassador Fellowship' }) : null}
            >
              Apply as Ambassador <ArrowRight size={15} />
            </button>
          </div>
        </div>

        {/* Ambassador Journey */}
        <div style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-light)',
          borderRadius: '24px',
          padding: '2.5rem',
          marginBottom: '4rem'
        }}>
          <div className="kicker" style={{ color: 'var(--accent-blue)', marginBottom: '1.5rem' }}>
            THE 8-STEP AMBASSADOR LEADERSHIP JOURNEY
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1rem'
          }}>
            {[
              { num: '01', title: 'Apply', desc: 'Submit leadership background & campus vision' },
              { num: '02', title: 'Review', desc: 'Screening by technical campus council' },
              { num: '03', title: 'Interview', desc: '15-min conversational strategy round' },
              { num: '04', title: 'Selection', desc: 'Official appointment letter & kit' },
              { num: '05', title: 'Training', desc: 'Intensive community management bootcamp' },
              { num: '06', title: 'Campus Activation', desc: 'Charter club & recruit core team' },
              { num: '07', title: 'Build Community', desc: 'Host bi-weekly sprints & hackathons' },
              { num: '08', title: 'Grow', desc: 'Fast-track internship & career PPO' },
            ].map((s) => (
              <div key={s.num} style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid var(--border-light)', padding: '1.25rem' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 800, color: 'var(--accent-blue)', marginBottom: '0.35rem' }}>
                  {s.num}
                </div>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
                  {s.title}
                </h4>
                <p style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Perks & Responsibilities Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', marginBottom: '4rem' }}>
          <div>
            <div className="kicker">LEADERSHIP REWARDS</div>
            <h2 className="editorial-serif" style={{ fontSize: '2.3rem', marginBottom: '1.5rem' }}>
              Exceptional perks for exceptional student leaders.
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {AMBASSADOR_PERKS.map((perk, idx) => (
                <div key={idx} style={{ background: '#FFFFFF', border: '1px solid var(--border-light)', borderRadius: '16px', padding: '1.25rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--bg-tertiary)', color: 'var(--accent-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Gift size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.2rem' }}>{perk.title}</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{perk.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="kicker">CORE RESPONSIBILITIES</div>
            <h2 className="editorial-serif" style={{ fontSize: '2.3rem', marginBottom: '1.5rem' }}>
              What you will actually execute on campus.
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { title: 'Charter & Lead Campus Chapter', desc: 'Serve as the recognized student president of the Neo Minds Tech Club at your institution.' },
                { title: 'Drive Diagnostic Assessments', desc: 'Facilitate department-wide skill evaluations to identify high-potential builders for project sprints.' },
                { title: 'Organize Build Sprints & Hackathons', desc: 'Coordinate physical and hybrid weekend hackathons with full sponsorship, mentors, and prize pools provided by Neo Minds.' },
                { title: 'Liaise with College Faculty & TPO', desc: 'Keep Department Heads and Placement Officers aligned on student milestone achievements and hiring drives.' }
              ].map((r, idx) => (
                <div key={idx} style={{ background: '#FFFFFF', border: '1px solid var(--border-light)', borderRadius: '16px', padding: '1.25rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#ECFDF5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <CheckCircle2 size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.2rem' }}>{r.title}</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{r.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
