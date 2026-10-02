import React from 'react';
import NeoMindsHero from './NeoMindsHero';

export default function HeroSection({ navigateTo, onOpenHowItWorks, openJoinModal, onHeroAnimationComplete }) {
  return (
    <NeoMindsHero 
      navigateTo={navigateTo} 
      onOpenHowItWorks={onOpenHowItWorks} 
      openJoinModal={openJoinModal}
      onHeroAnimationComplete={onHeroAnimationComplete}
    />
  );
}
