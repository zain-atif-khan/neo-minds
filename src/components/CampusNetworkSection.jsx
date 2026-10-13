import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import FlexCarousel from './FlexCarousel';
import InfiniteMenu from './InfiniteMenu';
import { COLLEGES } from '../data/mockData';

export default function CampusNetworkSection({ navigateTo, onSelectCollege }) {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(max-width: 768px)').matches;
    }
    return false;
  });

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 768px)');
    const onChange = (e) => setIsMobile(e.matches);
    if (mql.addEventListener) {
      mql.addEventListener('change', onChange);
    } else {
      mql.addListener(onChange);
    }
    return () => {
      if (mql.removeEventListener) {
        mql.removeEventListener('change', onChange);
      } else {
        mql.removeListener(onChange);
      }
    };
  }, []);

  // Items for desktop FlexCarousel
  const flexCarouselItems = COLLEGES.map((college) => ({
    src: college.image,
    alt: college.name,
    title: college.name,
    subtitle: `${college.city} · ${college.status}`,
    collegeData: college
  }));

  // Items for mobile InfiniteMenu
  const infiniteMenuItems = COLLEGES.map((college) => ({
    image: college.image,
    src: college.image,
    title: college.name,
    description: `${college.city} · ${college.status}`,
    link: '#',
    collegeData: college
  }));

  const handleSelect = (indexOrItem, itemMaybe) => {
    const item = itemMaybe || indexOrItem;
    if (item && item.collegeData && onSelectCollege) {
      onSelectCollege(item.collegeData);
    }
  };

  return (
    <section className="campus-network-section" id="campus">
      <div className="campus-network-container">
        {/* TOP CONTENT — Asymmetric Header */}
        <div className="campus-header-row">
          <div className="campus-header-left">
            <h2 className="campus-heading">
              A growing community<br />
              across <span className="highlight-colleges">colleges.</span>
            </h2>
          </div>

          <div className="campus-header-right">
            <p className="campus-subtext">
              Neo Minds clubs in colleges,<br />
              led by student ambassadors.
            </p>
            <button
              className="campus-view-all-btn"
              onClick={() => navigateTo('internships')}
            >
              Campus Internships <ArrowRight size={14} className="view-all-arrow" />
            </button>
          </div>
        </div>

        {/* DESKTOP ONLY: Original WebGL FlexCarousel */}
        {!isMobile && (
          <div className="campus-flex-carousel-wrapper desktop-only-campus-carousel">
            <FlexCarousel
              items={flexCarouselItems}
              preset="ribbon"
              intro="rise"
              cardHeight={0.62}
              gap={20}
              radius={20}
              bend={0.32}
              reach={0.36}
              tilt={0}
              roundness={1}
              dispersion={0.25}
              liquid={0}
              squeeze={0.15}
              autoplay={false}
              autoScroll={true}
              autoScrollSpeed={35}
              focusOnClick={true}
              captureWheel={false}
              onSelect={(index, item) => handleSelect(item)}
            />
          </div>
        )}

        {/* MOBILE ONLY: 3D InfiniteMenu Sphere with auto-changing college pictures */}
        {isMobile && (
          <div className="campus-infinite-menu-wrapper mobile-only-campus-carousel">
            <InfiniteMenu
              items={infiniteMenuItems}
              count={120}
              tileSize={0.62}
              roundness={0.25}
              zoom={1.65}
              stretch={0.6}
              inertia={0.65}
              autoplay={2.5}
              grayscale={false}
              dim={0.25}
              theme="light"
              accentColor="#1677FF"
              onItemClick={(item) => handleSelect(item)}
            />
          </div>
        )}
      </div>
    </section>
  );
}
