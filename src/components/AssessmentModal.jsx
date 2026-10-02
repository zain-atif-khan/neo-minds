import React, { useState } from 'react';
import { X, CheckCircle2, ArrowRight, RotateCcw, AlertTriangle, Sparkles, Target } from 'lucide-react';
import { SKILL_ASSESSMENT_DATA } from '../data/mockData';

export default function AssessmentModal({ isOpen, onClose, onCompleteScore, navigateTo }) {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [calculatedResult, setCalculatedResult] = useState(null);

  if (!isOpen) return null;

  const questions = SKILL_ASSESSMENT_DATA.quizQuestions;
  const currentQ = questions[currentQIndex];

  const handleSelectOption = (optionIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQIndex]: optionIndex
    });
  };

  const handleNext = () => {
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
    } else {
      // Calculate score
      let correctCount = 0;
      const breakdownObj = {
        'AI Fundamentals': 80,
        'Prompt Engineering': 65,
        'APIs & Webhooks': 45,
        'Automation & Logic': 40,
        'Problem Solving': 70
      };

      questions.forEach((q, idx) => {
        if (selectedAnswers[idx] === q.correctIndex) {
          correctCount++;
          if (breakdownObj[q.category]) {
            breakdownObj[q.category] = Math.min(100, breakdownObj[q.category] + 15);
          }
        } else {
          if (breakdownObj[q.category]) {
            breakdownObj[q.category] = Math.max(30, breakdownObj[q.category] - 10);
          }
        }
      });

      const overall = Math.round((correctCount / questions.length) * 40 + 50); // Normalized score
      const newBreakdown = [
        { skill: 'AI Fundamentals', score: breakdownObj['AI Fundamentals'] || 82, status: 'Proficient' },
        { skill: 'Prompt Engineering', score: breakdownObj['Prompt Engineering'] || 68, status: 'Proficient' },
        { skill: 'APIs & Webhooks', score: breakdownObj['APIs & Webhooks'] || 48, status: 'Need improvement' },
        { skill: 'Automation & Logic', score: breakdownObj['Automation & Logic'] || 42, status: 'Need improvement' },
        { skill: 'Problem Solving', score: breakdownObj['Problem Solving'] || 75, status: 'Strong' }
      ];

      const result = {
        score: overall,
        correctCount,
        breakdown: newBreakdown,
        recommendedTrack: overall >= 75 ? 'AI & Automation' : 'AI Fundamentals & Web Software'
      };

      setCalculatedResult(result);
      setIsCompleted(true);
      if (onCompleteScore) {
        onCompleteScore(overall, newBreakdown);
      }
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setCurrentQIndex(0);
    setIsCompleted(false);
    setCalculatedResult(null);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '680px' }}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={18} />
        </button>

        {!isCompleted ? (
          <div>
            <div className="kicker">
              DIAGNOSTIC ASSESSMENT • QUESTION {currentQIndex + 1} OF {questions.length}
            </div>

            <div style={{
              height: '4px',
              background: '#EEF5FF',
              borderRadius: '4px',
              margin: '0.8rem 0 1.5rem 0',
              overflow: 'hidden'
            }}>
              <div style={{
                height: '100%',
                width: `${((currentQIndex + 1) / questions.length) * 100}%`,
                background: 'var(--accent-blue)',
                transition: 'width 0.3s ease'
              }} />
            </div>

            <div style={{
              fontSize: '0.785rem',
              fontWeight: 700,
              color: 'var(--accent-blue)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '0.4rem'
            }}>
              Category: {currentQ.category}
            </div>

            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: 700,
              lineHeight: '1.4',
              color: 'var(--text-primary)',
              marginBottom: '1.75rem'
            }}>
              {currentQ.question}
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
              {currentQ.options.map((opt, oIdx) => {
                const isSelected = selectedAnswers[currentQIndex] === oIdx;
                return (
                  <div
                    key={oIdx}
                    onClick={() => handleSelectOption(oIdx)}
                    style={{
                      padding: '1rem 1.25rem',
                      borderRadius: '14px',
                      border: `1.5px solid ${isSelected ? 'var(--accent-blue)' : 'var(--border-light)'}`,
                      background: isSelected ? 'var(--bg-tertiary)' : '#FFFFFF',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.85rem',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      border: `2px solid ${isSelected ? 'var(--accent-blue)' : '#CBD5E1'}`,
                      background: isSelected ? 'var(--accent-blue)' : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {isSelected && <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'white' }} />}
                    </div>
                    <span style={{ fontSize: '0.925rem', color: isSelected ? 'var(--text-primary)' : 'var(--text-secondary)', fontWeight: isSelected ? 600 : 400 }}>
                      {opt}
                    </span>
                  </div>
                );
              })}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                {selectedAnswers[currentQIndex] !== undefined ? 'Selected' : 'Select an answer to continue'}
              </span>

              <button
                className="btn btn-primary"
                disabled={selectedAnswers[currentQIndex] === undefined}
                onClick={handleNext}
                style={{ opacity: selectedAnswers[currentQIndex] === undefined ? 0.5 : 1 }}
              >
                {currentQIndex === questions.length - 1 ? 'Calculate Score' : 'Next Question'} <ArrowRight size={15} />
              </button>
            </div>
          </div>
        ) : (
          /* Results Stage */
          <div>
            <div className="kicker">
              ASSESSMENT COMPLETE • VERIFIED BENCHMARK
            </div>

            <div style={{
              textAlign: 'center',
              padding: '1.5rem',
              background: 'var(--bg-secondary)',
              borderRadius: '20px',
              border: '1px solid var(--border-light)',
              margin: '1rem 0 1.5rem 0'
            }}>
              <div style={{ fontSize: '3.5rem', fontWeight: 800, color: 'var(--accent-blue)', lineHeight: 1 }}>
                {calculatedResult.score}%
              </div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '0.4rem' }}>
                Your Overall Diagnostic Benchmark
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                Answered {calculatedResult.correctCount} of {questions.length} questions correctly.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.85rem', color: 'var(--text-primary)' }}>
                Calculated Skill Distribution
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {calculatedResult.breakdown.map((item, idx) => (
                  <div key={idx}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.825rem', fontWeight: 600, marginBottom: '0.2rem' }}>
                      <span>{item.skill}</span>
                      <span style={{ color: item.score >= 70 ? 'var(--accent-blue)' : '#EF4444' }}>{item.score}%</span>
                    </div>
                    <div style={{ height: '6px', background: '#F1F5F9', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${item.score}%`, background: item.score >= 70 ? 'var(--accent-blue)' : '#F59E0B' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{
              padding: '1rem 1.25rem',
              background: '#EEF5FF',
              borderRadius: '14px',
              border: '1px solid #DCEBFF',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <Sparkles size={24} style={{ color: 'var(--accent-blue)', flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Recommended Focus: {calculatedResult.recommendedTrack}
                </div>
                <div style={{ fontSize: '0.785rem', color: 'var(--text-muted)' }}>
                  Tailored curriculum designed to close your gaps in APIs & Automation.
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button className="btn btn-secondary" onClick={handleReset} style={{ flex: 1 }}>
                <RotateCcw size={14} /> Retake
              </button>
              <button 
                className="btn btn-primary" 
                style={{ flex: 2 }}
                onClick={() => {
                  onClose();
                  if (navigateTo) navigateTo('programs');
                }}
              >
                Enroll in Recommended Track <ArrowRight size={15} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
