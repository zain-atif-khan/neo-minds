import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import SplitType from "split-type";
import DodgeField from "./DodgeField";
import "./NeoMindsHero.css";

gsap.registerPlugin(CustomEase);
try {
  CustomEase.create("hop", "0.9, 0, 0.1, 1");
} catch (e) {
  // If already created, continue safely
}

export const projectsData = [
  {
    name: "Mindspace.ai",
    team: "Zain Atif Khan",
    director: "Zain Atif Khan",
    location: "Ali Asgar",
  },
  {
    name: "IncStores",
    team: "Md Shezan Ahmed",
    director: "Md Shezan Ahmed",
    location: "Syeda Sidra Fatima",
  },
  {
    name: "Project Buddy",
    team: "Syed Muneer Uddin",
    director: "Syed Muneer Uddin",
    location: "Mohd Khadar",
  },
  {
    name: "AI LMS",
    team: "Syed Tehniyat Mustafa",
    director: "Syed Tehniyat Mustafa",
    location: "Ahmed Ba Suleman",
  },
  {
    name: "AI Co-Teacher",
    team: "Akifa Arshi",
    director: "Akifa Arshi",
    location: "Madeeha Fatima Juhi",
  },
  {
    name: "Smart Fee Management",
    team: "Fatiha Fatima",
    director: "Fatiha Fatima",
    location: "Malik",
  },
  {
    name: "Aristotle",
    team: "Naef",
    director: "Naef",
    location: "Ali Asgar",
  },
  {
    name: "NeoMinds Attendance",
    team: "Mohammed Abdul Samad",
    director: "Mohammed Abdul Samad",
    location: "Syeda Sidra Fatima",
  },
  {
    name: "AI Social Posts",
    team: "Mohammed Ayaan Ur Rahman",
    director: "Mohammed Ayaan Ur Rahman",
    location: "Mohd Khadar",
  },
  {
    name: "Autonomous Agents",
    team: "Mohi Uddin",
    director: "Mohi Uddin",
    location: "Ahmed Ba Suleman",
  },
  {
    name: "Campus Workflow Engine",
    team: "Mohd Abdul Rafey",
    director: "Mohd Abdul Rafey",
    location: "Madeeha Fatima Juhi",
  },
  {
    name: "Enterprise Data Hub",
    team: "Ahmed Abdul Malik",
    director: "Ahmed Abdul Malik",
    location: "Malik",
  },
  {
    name: "AI Code Studio",
    team: "Mohd Muttaqui Ahmed",
    director: "Mohd Muttaqui Ahmed",
    location: "Ali Asgar",
  },
];

export default function NeoMindsHero({ navigateTo, onOpenHowItWorks, openJoinModal, onHeroAnimationComplete }) {
  const containerRef = useRef(null);
  const overlayRef = useRef(null);

  const handleJoinClick = (e) => {
    e.preventDefault();
    if (openJoinModal) {
      openJoinModal();
    } else if (navigateTo) {
      navigateTo('programs');
    }
  };

  const handleContactClick = (e) => {
    e.preventDefault();
    if (navigateTo) {
      navigateTo('contact');
    } else {
      window.location.hash = '#/contact';
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isMounted = true;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      if (overlayRef.current) overlayRef.current.style.display = "none";
      gsap.set(container.querySelector(".hero-opaque-sheet"), { scaleY: 1 });
      gsap.set(
        container.querySelectorAll(
          ".hero-orbital-container, .neo-minds-reveal-title, .neo-minds-sub-wrapper, .neo-minds-reveal-desc, .final-cta-btn"
        ),
        {
          opacity: 1,
          y: 0,
        }
      );
      if (onHeroAnimationComplete) onHeroAnimationComplete();
      return;
    }

    const gridImages = gsap.utils.toArray(container.querySelectorAll(".img"));
    const heroImage = container.querySelector(".img.hero-img");
    const images = gridImages.filter((img) => img !== heroImage);

    let introCopy = null;
    let titleHeading = null;

    try {
      introCopy = new SplitType(container.querySelectorAll(".intro-copy h3"), {
        types: "words",
        absolute: false,
      });

      titleHeading = new SplitType(container.querySelectorAll(".title h1"), {
        types: "words",
        absolute: false,
      });
    } catch (err) {
      console.warn("SplitType initialization error:", err);
    }

    const allImageSources = Array.from(
      { length: 35 },
      (_, i) => `/img${i + 1}.jpeg`
    );

    const getRandomImageSet = () => {
      const shuffled = [...allImageSources].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, 9);
    };

    function startImageRotation() {
      const totalCycles = 20;

      for (let cycle = 0; cycle < totalCycles; cycle++) {
        const randomImages = getRandomImageSet();

        gsap.to(
          {},
          {
            duration: 0,
            delay: cycle * 0.15,
            onComplete: () => {
              if (!isMounted) return;
              gridImages.forEach((img, index) => {
                const imgElement = img.querySelector("img");

                if (cycle === totalCycles - 1 && img === heroImage) {
                  if (imgElement) imgElement.src = "/images/hero_middle.png";
                  gsap.set(container.querySelector(".hero-img img"), { scale: 1 });
                } else if (imgElement && randomImages[index]) {
                  imgElement.src = randomImages[index];
                }
              });
            },
          }
        );
      }
    }

    function setupInitialStates() {
      if (introCopy && introCopy.words) {
        gsap.set(introCopy.words, {
          y: "110%",
        });
      }

      if (titleHeading && titleHeading.words) {
        gsap.set(titleHeading.words, {
          y: "110%",
        });
      }
    }

    setupInitialStates();

    const ctx = gsap.context(() => {
      const overlayTimeline = gsap.timeline();
      const imagesTimeline = gsap.timeline();
      const textTimeline = gsap.timeline();

      // 1. Overlay Timeline
      overlayTimeline.to(".logo-line-1", {
        backgroundPosition: "0% 0%",
        color: "#fff",
        duration: 1,
        ease: "none",
        delay: 0.5,
        onComplete: () => {
          gsap.to(".logo-line-2", {
            backgroundPosition: "0% 0%",
            color: "#fff",
            duration: 1,
            ease: "none",
          });
        },
      });

      overlayTimeline.to([".projects-header", ".project-item"], {
        opacity: 1,
        duration: 0.15,
        stagger: 0.075,
        delay: 1,
      });

      overlayTimeline.to(
        [".locations-header", ".location-item"],
        {
          opacity: 1,
          duration: 0.15,
          stagger: 0.075,
        },
        "<"
      );

      overlayTimeline.to(".project-item", {
        color: "#fff",
        duration: 0.15,
        stagger: 0.075,
      });

      overlayTimeline.to(
        ".location-item",
        {
          color: "#fff",
          duration: 0.15,
          stagger: 0.075,
        },
        "<"
      );

      overlayTimeline.to([".projects-header", ".project-item"], {
        opacity: 0,
        duration: 0.15,
        stagger: 0.075,
      });

      overlayTimeline.to(
        [".locations-header", ".location-item"],
        {
          opacity: 0,
          duration: 0.15,
          stagger: 0.075,
        },
        "<"
      );

      overlayTimeline.to(".overlay", {
        opacity: 0,
        duration: 0.5,
        delay: 1.5,
        onComplete: () => {
          if (overlayRef.current) {
            overlayRef.current.style.pointerEvents = "none";
            overlayRef.current.style.display = "none";
          }
        },
      });

      // 2. Images Timeline
      imagesTimeline.to(".img", {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 1,
        delay: 2.5,
        stagger: 0.05,
        ease: "hop",
        onStart: () => {
          setTimeout(() => {
            if (!isMounted) return;
            startImageRotation();
            gsap.to(".loader", { opacity: 0, duration: 0.3 });
          }, 1000);
        },
      });

      imagesTimeline.to(images, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        duration: 1,
        delay: 2.5,
        stagger: 0.05,
        ease: "hop",
      });

      imagesTimeline.to(".hero-img", {
        y: -50,
        duration: 1,
        ease: "hop",
      });

      imagesTimeline.to(".hero-img", {
        scale: 3.5,
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 1.5,
        ease: "hop",
        onStart: () => {
          gsap.to(".hero-img img", {
            scale: 1,
            duration: 1.5,
            ease: "hop",
          });
        },
      });

      // Banner images emerge from directly behind the center hero image to form the fanned trio
      imagesTimeline.fromTo(
        ".banner-img-1",
        {
          left: "50%",
          top: "45%",
          scale: 0.2,
          rotate: 0,
          opacity: 0,
        },
        {
          left: "34%",
          top: "45%",
          scale: 0.95,
          rotate: -13,
          opacity: 1,
          duration: 1.5,
          ease: "hop",
        },
        "<+=0.2"
      );

      imagesTimeline.fromTo(
        ".banner-img-2",
        {
          left: "50%",
          top: "45%",
          scale: 0.2,
          rotate: 0,
          opacity: 0,
        },
        {
          left: "66%",
          top: "45%",
          scale: 0.95,
          rotate: 13,
          opacity: 1,
          duration: 1.5,
          ease: "hop",
        },
        "<"
      );

      // 3. Text Timeline
      if (titleHeading && titleHeading.words) {
        textTimeline.to(titleHeading.words, {
          y: "0%",
          duration: 1,
          stagger: 0.1,
          delay: 9.5,
          ease: "power3.out",
        });
      }

      if (introCopy && introCopy.words) {
        textTimeline.to(
          introCopy.words,
          {
            y: "0%",
            duration: 1,
            stagger: 0.1,
            delay: 0.25,
            ease: "power3.out",
          },
          "<"
        );
      }

      // ============================================================
      // 4. NEW FINAL SEQUENCE — NEO MINDS TECH HUB REVEAL
      // Appended AFTER existing animation completes (200-400ms pause)
      // ============================================================
      textTimeline.addLabel("existingComplete", "+=0.3");

      // 1. Thin opaque white sheet begins and expands across Hero (scaleY: 0 -> 1)
      textTimeline.fromTo(
        ".hero-opaque-sheet",
        {
          scaleY: 0,
          transformOrigin: "50% 50%",
        },
        {
          scaleY: 1,
          duration: 0.65,
          ease: "power2.inOut",
        },
        "existingComplete"
      );

      // 2. NEO MINDS reveals with subtle upward movement + opacity
      textTimeline.to(
        ".neo-minds-reveal-title",
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: "power2.out",
        },
        "+=0.2"
      );

      // 3. TECH HUB and flanking lines reveal
      textTimeline.to(
        [".neo-minds-reveal-sub", ".tech-hub-line"],
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: "power2.out",
        },
        "-=0.15"
      );

      // 4. Orbital lines and blue glowing nodes subtly appear
      textTimeline.to(
        ".hero-orbital-container",
        {
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.3"
      );

      // 5. ONE-line description underneath
      textTimeline.to(
        ".neo-minds-reveal-desc",
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: "power2.out",
        },
        "-=0.4"
      );

      // 6. Two CTA buttons reveal (Join Now + Contact Us)
      textTimeline.to(
        ".final-cta-btn",
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.45,
          ease: "power2.out",
          onComplete: () => {
            if (onHeroAnimationComplete) onHeroAnimationComplete();
          },
        },
        "+=0.1"
      );
    }, container);

    return () => {
      isMounted = false;
      ctx.revert();
      if (introCopy) introCopy.revert();
      if (titleHeading) titleHeading.revert();
    };
  }, []);

  return (
    <section ref={containerRef} className="hero-component-root">
      {/* 1. OVERLAY WITH ORIGINAL NOVA / VICE AND PROJECTS */}
      <div ref={overlayRef} className="overlay">
        <div className="projects">
          <div className="projects-header">
            <p>Project</p>
            <p>Team</p>
          </div>
          {projectsData.map((project, idx) => (
            <div key={idx} className="project-item">
              <p>{project.name}</p>
              <p>{project.team || project.director}</p>
            </div>
          ))}
        </div>

        <div className="loader">
          <h1 className="logo-line-1">Neo Minds</h1>
          <h1 className="logo-line-2">Tech Hub</h1>
        </div>

        <div className="locations">
          <div className="locations-header">
            <p>Teams</p>
          </div>
          {projectsData.map((project, idx) => (
            <div key={idx} className="location-item">
              <p>{project.location}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 2. IMAGE GRID (ORIGINAL 3 ROWS × 3 COLS = 9 CELLS WITH CENTER HERO-IMG) */}
      <div className="image-grid">
        <div className="grid-row">
          <div className="img"><img src="/img1.jpeg" alt="" /></div>
          <div className="img"><img src="/img2.jpeg" alt="" /></div>
          <div className="img"><img src="/img3.jpeg" alt="" /></div>
        </div>
        <div className="grid-row">
          <div className="img"><img src="/img4.jpeg" alt="" /></div>
          <div className="img hero-img"><img src="/images/hero_middle.png" alt="" /></div>
          <div className="img"><img src="/img6.jpeg" alt="" /></div>
        </div>
        <div className="grid-row">
          <div className="img"><img src="/img7.jpeg" alt="" /></div>
          <div className="img"><img src="/img8.jpeg" alt="" /></div>
          <div className="img"><img src="/img9.jpeg" alt="" /></div>
        </div>
      </div>

      {/* 3. BANNER IMAGES */}
      <div className="banner-img banner-img-1"><img src="/images/hero_left.png" alt="" /></div>
      <div className="banner-img banner-img-2"><img src="/images/hero_right.png" alt="" /></div>

      {/* 4. INTRO COPY */}
      <div className="intro-copy">
        <h3>Creative Solutions</h3>
        <h3>Impactful Results</h3>
      </div>

      {/* 5. TITLE */}
      <div className="title">
        <h1>Crafting bold experiences</h1>
      </div>

      {/* 6. FINAL REVEAL: OPAQUE SHEET & PERFECTLY CENTERED TYPOGRAPHIC HERO CONTENT */}
      <div className="hero-opaque-sheet">
        {/* Subtle curved orbital lines with glowing blue nodes matching reference */}
        <div className="hero-orbital-container" aria-hidden="true">
          <svg className="hero-orbital-svg" viewBox="0 0 1440 900" fill="none" preserveAspectRatio="xMidYMid slice">
            {/* Lower-left upward sweep curve */}
            <path 
              d="M -150 480 C 120 440 260 620 420 950" 
              stroke="#D2E3FC" 
              strokeWidth="1.25" 
              strokeOpacity="0.85"
            />
            {/* Upper-right downward sweep curve */}
            <path 
              d="M 1150 -100 C 1170 200 1350 280 1550 320" 
              stroke="#D2E3FC" 
              strokeWidth="1.25" 
              strokeOpacity="0.85"
            />
            {/* Ambient subtle secondary flow line */}
            <path 
              d="M -80 620 C 180 580 320 780 480 980" 
              stroke="#E8F0FE" 
              strokeWidth="1" 
              strokeOpacity="0.5"
            />
          </svg>

          {/* Lower-left orbital node / glowing blue dot */}
          <div className="orbital-node orbital-node-lower-left">
            <span className="orbital-node-glow" />
            <span className="orbital-node-core" />
          </div>

          {/* Upper-right orbital node / glowing blue dot */}
          <div className="orbital-node orbital-node-upper-right">
            <span className="orbital-node-glow" />
            <span className="orbital-node-core" />
          </div>
        </div>

        <div className="hero-reveal-center">
          {/* Main Title: Exact font style and capitalization NeoMinds (Navy Neo, Blue Minds) */}
          <h1 className="neo-minds-reveal-title" aria-label="NeoMinds">
            <span className="brand-word-neo">Neo</span>
            <span className="brand-word-minds">Minds</span>
          </h1>

          {/* Tech Hub with symmetrical flanking horizontal lines matching reference */}
          <div className="neo-minds-sub-wrapper">
            <span className="tech-hub-line tech-hub-line-left" aria-hidden="true" />
            <h2 className="neo-minds-reveal-sub">TECH HUB</h2>
            <span className="tech-hub-line tech-hub-line-right" aria-hidden="true" />
          </div>

          {/* One-Line Description */}
          <p className="neo-minds-reveal-desc">
            Learn real skills. Build real projects. Gain real experience.
          </p>

          {/* Two CTA Buttons with DodgeField on Join Now */}
          <div className="final-cta-group">
            <DodgeField
              fieldHeight={50}
              radius={110}
              reach={48}
              patience={3}
              onCatch={handleJoinClick}
              className="join-dodge-field"
            >
              {({ dodges, gave, caught, fleeing }) => (
                <button 
                  className={`final-cta-btn final-cta-primary ${fleeing ? 'is-dodging' : ''}`}
                  onClick={handleJoinClick}
                  type="button"
                >
                  <span>
                    {caught || gave
                      ? 'Joined!' 
                      : dodges === 1 
                      ? 'Almost!' 
                      : dodges === 2 
                      ? 'Try Again!' 
                      : 'Join Now'}
                  </span>
                  <span className="btn-arrow" aria-hidden="true">→</span>
                </button>
              )}
            </DodgeField>

            <button 
              className="final-cta-btn final-cta-secondary" 
              onClick={handleContactClick}
              type="button"
            >
              <span>Contact Us</span>
              <span className="btn-arrow" aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
