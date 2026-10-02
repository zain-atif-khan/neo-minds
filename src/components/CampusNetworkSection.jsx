import React from 'react';
import { ArrowRight } from 'lucide-react';
import FlexCarousel from './FlexCarousel';
import { COLLEGES } from '../data/mockData';

export default function CampusNetworkSection({ navigateTo, onSelectCollege }) {
  // Map COLLEGES data to FlexCarousel item format
  const campusItems = COLLEGES.map((college) => ({
    src: college.image,
    alt: college.name,
    title: college.name,
    subtitle: `${college.city} · ${college.status}`,
    collegeData: college
  }));

  const handleSelect = (index, item) => {
    if (item && item.collegeData && onSelectCollege) {
      onSelectCollege(item.collegeData);
    }
  };

  return (
    <section className="campus-network-section" id="campus">
      <div className="campus-network-container">
        {/* TOP CONTENT — Clean, no blue heading, preserving eyebrow and button */}
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

        {/* WEBGL FLEX CAROUSEL STAGE */}
        <div className="campus-flex-carousel-wrapper">
          <FlexCarousel
            items={campusItems}
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
            onSelect={handleSelect}
          />
        </div>
      </div>
    </section>
  );
}


