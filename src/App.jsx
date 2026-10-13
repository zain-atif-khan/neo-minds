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

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

import { saveCurrentScrollY, getSavedScrollY, checkIsReloadBelowHero } from './utils/scrollState';

export default function App() {
  // Detect if visitor reloaded while scrolled down past the hero
  const isReloadBelowHero = checkIsReloadBelowHero();

  // Dynamic Assessment State
  const [hasCompletedAssessment, setHasCompletedAssessment] = useState(() => {
    return localStorage.getItem('neominds_assessment_done') === 'true';
  });
  const [currentScore, setCurrentScore] = useState(() => {
    const saved = localStorage.getItem('neominds_user_score');
    return saved ? Number(saved) : 0;
  });
  const [skillBreakdown, setSkillBreakdown] = useState(SKILL_ASSESSMENT_DATA.breakdown);

  // Track Hero animation on Home page (Defaults to true if visitor reloads below the hero)
  const [isHeroAnimationComplete, setIsHeroAnimationComplete] = useState(() => isReloadBelowHero);

  // Continuously record the exact scroll position in sessionStorage
  React.useEffect(() => {
    const handleScroll = () => {
      saveCurrentScrollY();
    };

    const handleBeforeUnload = () => {
      saveCurrentScrollY();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('pagehide', handleBeforeUnload);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('pagehide', handleBeforeUnload);
    };
  }, []);

  // When reloading below the hero, restore the visitor to their exact saved scroll position
  React.useEffect(() => {
    if (isReloadBelowHero) {
      const targetY = getSavedScrollY();
      if (targetY > 80) {
        ScrollTrigger.refresh();
        window.scrollTo(0, targetY);

        const timer = setTimeout(() => {
          ScrollTrigger.refresh();
          window.scrollTo(0, targetY);
        }, 80);

        return () => clearTimeout(timer);
      }
    }
  }, [isReloadBelowHero]);

  // Synchronize ScrollTrigger instances when intro completes normally or assets finish loading
  React.useEffect(() => {
    const handleLoad = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('load', handleLoad);
    const timer = setTimeout(() => ScrollTrigger.refresh(), 500);
    const timer2 = setTimeout(() => ScrollTrigger.refresh(), 1200);

    return () => {
      window.removeEventListener('load', handleLoad);
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, []);

  React.useEffect(() => {
    if (isHeroAnimationComplete && !isReloadBelowHero) {
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 60);
      return () => clearTimeout(timer);
    }
  }, [isHeroAnimationComplete, isReloadBelowHero]);

  // Pin/lock page scrolling ONLY during genuine intro animation (never when restored below hero)
  React.useEffect(() => {
    if (!isHeroAnimationComplete && !isReloadBelowHero) {
      const originalOverflow = document.body.style.overflow;
      const originalHtmlOverflow = document.documentElement.style.overflow;
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';

      const preventScroll = (e) => {
        e.preventDefault();
      };

      window.addEventListener('wheel', preventScroll, { passive: false });
      window.addEventListener('touchmove', preventScroll, { passive: false });

      return () => {
        document.body.style.overflow = originalOverflow;
        document.documentElement.style.overflow = originalHtmlOverflow;
        window.removeEventListener('wheel', preventScroll);
        window.removeEventListener('touchmove', preventScroll);
      };
    }
  }, [isHeroAnimationComplete, isReloadBelowHero]);

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
