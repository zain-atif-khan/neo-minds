import React from 'react';
import HeroSection from '../components/HeroSection';
import HowItWorksSection from '../components/HowItWorksSection';
import ProgramsSection from '../components/ProgramsSection';
import CampusNetworkSection from '../components/CampusNetworkSection';
import ProjectsSection from '../components/ProjectsSection';
import InternshipsSection from '../components/InternshipsSection';
import ApplicationSection from '../components/ApplicationSection';
import EventsSection from '../components/EventsSection';
import AboutSection from '../components/AboutSection';

export default function HomePage({ 
  navigateTo, 
  openJoinModal,
  onSelectCollege, 
  onSelectProgram, 
  onOpenDemo, 
  onOpenAssessmentModal, 
  onApplyInternship,
  currentScore,
  skillBreakdown,
  hasCompletedAssessment,
  onHeroAnimationComplete
}) {
  return (
    <div className="home-page" id="home">
      {/* 01 — HOME HERO */}
      <HeroSection 
        navigateTo={navigateTo} 
        openJoinModal={openJoinModal}
        onOpenHowItWorks={() => {
          const el = document.getElementById('how-it-works');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onHeroAnimationComplete={onHeroAnimationComplete}
      />

      {/* 02 — HOW IT WORKS / NEO MINDS LEARNING PATHWAY */}
      <HowItWorksSection navigateTo={navigateTo} />

      {/* 03 — PROGRAMS */}
      <ProgramsSection 
        navigateTo={navigateTo} 
        onSelectProgram={onSelectProgram} 
      />

      {/* 04 — CAMPUS / COLLEGE CATALOGUE */}
      <CampusNetworkSection 
        navigateTo={navigateTo} 
        onSelectCollege={onSelectCollege} 
      />

      {/* 05 — FEATURED PROJECTS */}
      <ProjectsSection 
        navigateTo={navigateTo} 
        onOpenDemo={onOpenDemo} 
      />

      {/* 06 — FROM STUDENT TO INDUSTRY / INTERNSHIPS */}
      <InternshipsSection 
        navigateTo={navigateTo} 
        onApplyInternship={onApplyInternship} 
        hasCompletedAssessment={hasCompletedAssessment}
        currentScore={currentScore}
        skillBreakdown={skillBreakdown}
        onOpenAssessmentModal={onOpenAssessmentModal}
      />

      {/* 07 — AMBASSADOR + STUDENT APPLICATION */}
      <ApplicationSection />

      {/* 09 — EVENTS & WORKSHOPS (What's happening at Neo Minds) */}
      <EventsSection />

      {/* 10 — ABOUT NEO MINDS */}
      <AboutSection onOpenJoinModal={openJoinModal} />
    </div>
  );
}
