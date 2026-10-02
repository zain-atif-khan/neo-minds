import React from 'react';
import { ArrowRight, Compass, Shield, Users, Layers, Award, Sparkles } from 'lucide-react';

export default function AboutPage({ navigateTo }) {
  return (
    <div className="section-spacing" style={{ paddingTop: '3.5rem' }}>
      <div className="container">
        {/* Header */}
        <div style={{ maxWidth: '820px', marginBottom: '3.5rem' }}>
          <div className="kicker">
            OUR THESIS & MISSION
          </div>
          <h1 className="editorial-serif" style={{ fontSize: '3.8rem', lineHeight: '1.08', marginBottom: '1.5rem' }}>
            Bridging the gap between<br />lecture halls and production code.
          </h1>
          <p className="editorial-subtext" style={{ fontSize: '1.2rem', lineHeight: '1.7' }}>
            Millions of ambitious students graduate every year with high GPAs yet zero familiarity with modern production architectures. 
            At the same time, technology startups and enterprises struggle to hire engineers capable of contributing from day one. 
            Neo Minds was founded to erase this disconnect permanently.
          </p>
        </div>

        {/* The College-Industry Gap Editorial Block */}
        <div style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-light)',
          borderRadius: '24px',
          padding: '3rem',
          marginBottom: '4rem'
        }}>
          <div className="kicker" style={{ color: 'var(--accent-blue)', marginBottom: '1rem' }}>
            THE STRUCTURAL PROBLEM
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
            <div>
              <h3 style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                The Traditional College Paradox
              </h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                Collegiate syllabi update once every 5 to 7 years. In that window, entirely new paradigms emerge—like autonomous agentic workflows, serverless databases, and vector retrieval. Students spend 4 years passing pen-and-paper examinations on 1990s concepts while tech companies build in modern clouds.
              </p>
            </div>

            <div>
              <h3 style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                The Neo Minds Bridge
              </h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                We don't replace colleges; we elevate them. By embedding technical chapters directly into campuses, running live tool bootcamps (n8n, OpenAI, Next.js), and linking student code to real enterprise projects, we turn collegiate potential into verified industry impact.
              </p>
            </div>
          </div>
        </div>

        {/* The 3 Pillars of the Ecosystem */}
        <div style={{ marginBottom: '4rem' }}>
          <div className="kicker" style={{ textAlign: 'center', justifyContent: 'center' }}>
            THE TRI-PARTY ECOSYSTEM
          </div>
          <h2 className="editorial-serif" style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '2.5rem' }}>
            How Neo Minds creates compounding value.
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            <div style={{ background: '#FFFFFF', border: '1px solid var(--border-light)', borderRadius: '20px', padding: '2rem', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'var(--bg-tertiary)', color: 'var(--accent-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <Users size={22} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                For Students
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                Diagnostic skill clarity, mentor-led builds, production GitHub portfolios, verified badges, and guaranteed paid internship placements.
              </p>
            </div>

            <div style={{ background: '#FFFFFF', border: '1px solid var(--border-light)', borderRadius: '20px', padding: '2rem', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'var(--bg-tertiary)', color: 'var(--accent-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <Compass size={22} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                For Colleges
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                Active on-campus chapters, measurable placement uplift, faculty upskilling, NAAC/NBA compliance accreditation support, and hackathon co-hosting.
              </p>
            </div>

            <div style={{ background: '#FFFFFF', border: '1px solid var(--border-light)', borderRadius: '20px', padding: '2rem', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'var(--bg-tertiary)', color: 'var(--accent-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <Shield size={22} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                For Industry
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                A constant stream of pre-assessed talent, zero recruitment agency fees, live demonstrated project proof, and rapid candidate deployment.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Editorial Callout */}
        <div style={{
          textAlign: 'center',
          padding: '4rem 2rem',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-light)',
          borderRadius: '24px'
        }}>
          <h3 className="editorial-serif" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
            "Building industry-ready minds."
          </h3>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', maxWidth: '540px', margin: '0 auto 2rem auto' }}>
            Join our mission to transform college technical education across India.
          </p>

          <button 
            className="btn btn-primary"
            onClick={() => navigateTo('programs')}
          >
            Explore Programs <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
