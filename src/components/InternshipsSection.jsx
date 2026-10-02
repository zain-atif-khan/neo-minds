import React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { INTERNSHIPS } from '../data/mockData';
import BranchedMenu from './BranchedMenu';

const INTERNSHIP_ITEMS = [
  {
    label: 'Internship Journey',
    children: [
      {
        value: 'apply',
        number: '01',
        label: 'Apply',
        description: 'Submit your profile & verified project portfolio'
      },
      {
        value: 'assessment',
        number: '02',
        label: 'Assessment',
        description: 'Complete practical diagnostic benchmark'
      },
      {
        value: 'shortlist',
        number: '03',
        label: 'Shortlist',
        description: 'Direct matching based on verified project proof'
      },
      {
        value: 'interview',
        number: '04',
        label: 'Interview',
        description: 'Technical conversation with company founders/leads'
      },
      {
        value: 'internship',
        number: '05',
        label: 'Internship',
        description: 'Begin paid work with ongoing mentorship'
      }
    ]
  }
];

export default function InternshipsSection({ 
  navigateTo, 
  onApplyInternship,
  hasCompletedAssessment = false,
  currentScore = 0,
  skillBreakdown = null,
  onOpenAssessmentModal
}) {
  const [readinessVisible, setReadinessVisible] = React.useState(false);
  const readinessRef = React.useRef(null);

  // Animated numerical display state
  const [displayScore, setDisplayScore] = React.useState(0);
  const [displayMetrics, setDisplayMetrics] = React.useState({
    Skills: 0,
    Projects: 0,
    Assessment: 0,
    Portfolio: 0
  });

  React.useEffect(() => {
    const el = readinessRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setReadinessVisible(true);
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Compute target metrics based on whether assessment was completed
  const targetMetrics = React.useMemo(() => {
    if (!hasCompletedAssessment) {
      return {
        Skills: 0,
        Projects: 0,
        Assessment: 0,
        Portfolio: 0,
        overall: 0
      };
    }

    // When assessed, calculate real values from assessment and performance
    // If currentScore was saved/calculated (e.g. 82 or user score):
    const overall = currentScore > 0 ? currentScore : 82;

    // Derived category breakdown:
    let skillsVal = 90;
    let projectsVal = 82;
    let assessmentVal = Math.round(overall * 0.9); // e.g. 74%
    let portfolioVal = 88;

    if (Array.isArray(skillBreakdown) && skillBreakdown.length > 0) {
      const avg = Math.round(
        skillBreakdown.reduce((acc, item) => acc + (item.score || 0), 0) / skillBreakdown.length
      );
      skillsVal = Math.min(98, Math.max(50, Math.round((avg + overall) / 2) + 4));
      projectsVal = Math.min(95, Math.max(50, overall));
      assessmentVal = Math.min(95, Math.max(45, overall - 8));
      portfolioVal = Math.min(96, Math.max(55, Math.round(skillsVal * 0.96)));
    }

    return {
      Skills: skillsVal,
      Projects: projectsVal,
      Assessment: assessmentVal,
      Portfolio: portfolioVal,
      overall
    };
  }, [hasCompletedAssessment, currentScore, skillBreakdown]);

  // Smooth upward counter animation when user completes assessment and section is visible
  React.useEffect(() => {
    if (!hasCompletedAssessment) {
      setDisplayScore(0);
      setDisplayMetrics({
        Skills: 0,
        Projects: 0,
        Assessment: 0,
        Portfolio: 0
      });
      return;
    }

    if (!readinessVisible) {
      return;
    }

    const duration = 1200; // ms
    const startTime = performance.now();
    const startScore = displayScore;
    const targetOverall = targetMetrics.overall;
    const startMetrics = { ...displayMetrics };

    let animationFrameId;

    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);

      setDisplayScore(Math.round(startScore + (targetOverall - startScore) * easeProgress));
      setDisplayMetrics({
        Skills: Math.round(startMetrics.Skills + (targetMetrics.Skills - startMetrics.Skills) * easeProgress),
        Projects: Math.round(startMetrics.Projects + (targetMetrics.Projects - startMetrics.Projects) * easeProgress),
        Assessment: Math.round(startMetrics.Assessment + (targetMetrics.Assessment - startMetrics.Assessment) * easeProgress),
        Portfolio: Math.round(startMetrics.Portfolio + (targetMetrics.Portfolio - startMetrics.Portfolio) * easeProgress)
      });

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(tick);
      }
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [hasCompletedAssessment, targetMetrics, readinessVisible]);

  // Status text determination
  const statusText = hasCompletedAssessment 
    ? (targetMetrics.overall >= 75 ? 'INDUSTRY READY' : 'INTERN READY') 
    : 'NOT ASSESSED';

  const metricsList = [
    { label: 'Skills', value: displayMetrics.Skills, percentWidth: hasCompletedAssessment && readinessVisible ? targetMetrics.Skills : 0 },
    { label: 'Projects', value: displayMetrics.Projects, percentWidth: hasCompletedAssessment && readinessVisible ? targetMetrics.Projects : 0 },
    { label: 'Assessment', value: displayMetrics.Assessment, percentWidth: hasCompletedAssessment && readinessVisible ? targetMetrics.Assessment : 0 },
    { label: 'Portfolio', value: displayMetrics.Portfolio, percentWidth: hasCompletedAssessment && readinessVisible ? targetMetrics.Portfolio : 0 }
  ];

  return (
    <section className="section-spacing internships-section" id="internships">
      <div className="container">
        {/* Top Layout: Left Editorial Heading, Right Subtext & Button */}
        <div className="internships-header-row">
          <div className="internships-header-left">
            <h2 className="internships-main-heading">
              Internships<br />
              that move you<br />
              <span className="highlight-forward">forward.</span>
            </h2>
          </div>

          <div className="internships-header-right">
            <p className="internships-subtext">
              Work on real problems, gain industry<br />
              experience and build your career.
            </p>
            <button 
              className="internships-view-btn"
              onClick={onOpenAssessmentModal || (() => navigateTo('assessment'))}
            >
              Check Readiness <ArrowRight size={14} className="internships-btn-arrow" />
            </button>
          </div>
        </div>

        {/* Dual Layout: Left Journey Tree + Right Internship Readiness Dashboard */}
        <div className="internships-composite-grid">
          {/* LEFT: BranchedMenu Internship Journey */}
          <div className="internships-tree-stage">
            <BranchedMenu
              items={INTERNSHIP_ITEMS}
              defaultOpen={0}
              defaultActive="apply"
              width={540}
              rowHeight={88}
              indent={56}
              trunk={20}
              radius={16}
              lineWidth={2}
              color="#0B1736"
              accentColor="#1677FF"
              lineColor="#E2E8F0"
            />
          </div>

          {/* RIGHT: INTERNSHIP READINESS Data Visualization (Directly on white page) */}
          <div ref={readinessRef} className="internship-readiness-pane">
            <div className="readiness-kicker">INTERNSHIP READINESS</div>

            <div className="readiness-score-display">
              <span className="readiness-big-num">
                {displayScore}%
              </span>
              <div className="readiness-divider-track">
                <div 
                  className="readiness-divider-fill"
                  style={{ 
                    width: (hasCompletedAssessment && readinessVisible) 
                      ? `${targetMetrics.overall}%` 
                      : '0%' 
                  }}
                />
              </div>
              <span className="readiness-status-label">{statusText}</span>
            </div>

            {/* Metrics Breakdown */}
            <div className="readiness-metrics-list">
              {metricsList.map((item) => (
                <div key={item.label} className="readiness-metric-row">
                  <span className="metric-label">{item.label}</span>
                  <div className="metric-bar-track">
                    <div 
                      className="metric-bar-fill" 
                      style={{ width: `${item.percentWidth}%` }}
                    />
                  </div>
                  <span className="metric-val">{item.value}%</span>
                </div>
              ))}
            </div>

            {/* Bottom Action Link */}
            <div className="readiness-cta-row">
              {hasCompletedAssessment ? (
                <button 
                  type="button"
                  className="readiness-eligibility-btn"
                  onClick={() => navigateTo ? navigateTo('internships') : (window.location.hash = '#/internships')}
                >
                  <span>View Eligibility</span>
                  <span className="readiness-arrow" aria-hidden="true">→</span>
                </button>
              ) : (
                <button 
                  type="button"
                  className="readiness-eligibility-btn"
                  onClick={() => onOpenAssessmentModal ? onOpenAssessmentModal() : (navigateTo ? navigateTo('skill-assessment') : (window.location.hash = '#/skill-assessment'))}
                >
                  <span>Take Assessment</span>
                  <span className="readiness-arrow" aria-hidden="true">→</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
