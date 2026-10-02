import React, { useState } from 'react';
import Navbar from './components/Navbar';
import FooterSection from './components/FooterSection';
import HomePage from './pages/HomePage';

// Modals
import AssessmentModal from './components/AssessmentModal';
import CollegeDetailModal from './components/CollegeDetailModal';
import ProjectDemoModal from './components/ProjectDemoModal';
import ApplyModal from './components/ApplyModal';
import AuthModal from './components/AuthModal';

import { SKILL_ASSESSMENT_DATA } from './data/mockData';

export default function App() {
  // Dynamic Assessment State
  const [hasCompletedAssessment, setHasCompletedAssessment] = useState(() => {
    return localStorage.getItem('neominds_assessment_done') === 'true';
  });
  const [currentScore, setCurrentScore] = useState(() => {
    const saved = localStorage.getItem('neominds_user_score');
    return saved ? Number(saved) : 0;
  });
  const [skillBreakdown, setSkillBreakdown] = useState(SKILL_ASSESSMENT_DATA.breakdown);

  // Track Hero animation on Home page (Navbar hidden during Hero animation, visible after)
  const [isHeroAnimationComplete, setIsHeroAnimationComplete] = useState(false);

  // Modals state
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);
  const [activeCollegeModal, setActiveCollegeModal] = useState(null);
  const [activeProjectDemo, setActiveProjectDemo] = useState(null);
  const [applyModalData, setApplyModalData] = useState(null); // { item, type }
  const [authModalState, setAuthModalState] = useState({ isOpen: false, mode: 'login' });

  // User state
  const [user, setUser] = useState(null);

  // Smooth in-page section scrolling
  const scrollToSection = (targetId) => {
    if (!targetId || targetId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(targetId);
    if (el) {
      const navOffset = 75;
      const targetPos = el.getBoundingClientRect().top + window.pageYOffset - navOffset;
      window.scrollTo({ top: targetPos, behavior: 'smooth' });
    }
  };

  const handleScoreUpdate = (newScore, newBreakdown) => {
    setCurrentScore(newScore);
    setSkillBreakdown(newBreakdown);
    setHasCompletedAssessment(true);
    try {
      localStorage.setItem('neominds_assessment_done', 'true');
      localStorage.setItem('neominds_user_score', String(newScore));
    } catch (e) {
      // LocalStorage access guard
    }
  };

  // Navbar is visible once hero animation completes
  const isNavbarVisible = isHeroAnimationComplete;

  return (
    <div className="neominds-app">
      {/* Primary Sticky Header */}
      <Navbar 
        navigateTo={scrollToSection}
        openJoinModal={() => setAuthModalState({ isOpen: true, mode: 'join' })}
        isVisible={isNavbarVisible}
      />

      {/* Main Single-Page Website Content (z-index: 10, background: #FFFFFF) */}
      <main className="curtain-content">
        <HomePage 
          navigateTo={scrollToSection}
          openJoinModal={() => setAuthModalState({ isOpen: true, mode: 'join' })}
          onSelectCollege={(college) => setActiveCollegeModal(college)}
          onSelectProgram={() => scrollToSection('programs')}
          onOpenDemo={(project) => setActiveProjectDemo(project)}
          onOpenAssessmentModal={() => setIsAssessmentOpen(true)}
          onApplyInternship={(internship) => setApplyModalData({ item: internship, type: 'internship' })}
          currentScore={currentScore}
          skillBreakdown={skillBreakdown}
          hasCompletedAssessment={hasCompletedAssessment}
          onHeroAnimationComplete={() => setIsHeroAnimationComplete(true)}
        />
      </main>

      {/* Neo Minds Curtain Footer Layer (z-index: 1, sticky bottom: 0) */}
      <FooterSection navigateTo={scrollToSection} />

      {/* Interactive Global Modals */}
      <AssessmentModal 
        isOpen={isAssessmentOpen}
        onClose={() => setIsAssessmentOpen(false)}
        onCompleteScore={handleScoreUpdate}
        navigateTo={scrollToSection}
      />

      <CollegeDetailModal 
        college={activeCollegeModal}
        onClose={() => setActiveCollegeModal(null)}
        onJoinCampus={() => {
          setActiveCollegeModal(null);
          setApplyModalData({ item: { title: `${activeCollegeModal.name} Chapter` }, type: 'campus' });
        }}
      />

      <ProjectDemoModal 
        project={activeProjectDemo}
        onClose={() => setActiveProjectDemo(null)}
      />

      <ApplyModal 
        item={applyModalData?.item}
        type={applyModalData?.type}
        onClose={() => setApplyModalData(null)}
      />

      <AuthModal 
        isOpen={authModalState.isOpen}
        initialMode={authModalState.mode}
        onClose={() => setAuthModalState({ isOpen: false, mode: 'login' })}
        onAuthSuccess={(userProfile) => setUser(userProfile)}
      />
    </div>
  );
}
