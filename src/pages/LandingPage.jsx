import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from '../components/landing/Hero';
import FeaturesMarquee from '../components/landing/FeaturesMarquee';
import FeatureCards from '../components/landing/FeatureCards';
import CTASection from '../components/landing/CTASection';

gsap.registerPlugin(ScrollTrigger);

const sections = ['hero', 'features', 'cta'];

export default function LandingPage() {
  const cursorRef = useRef(null);
  const progressRef = useRef(null);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Custom cursor
    if (!prefersReducedMotion && window.innerWidth > 768) {
      const cursor = cursorRef.current;
      if (cursor) {
        const moveCursor = (e) => {
          gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.15,
            ease: 'power2.out',
          });
        };

        const addHover = () => cursor.classList.add('hovering');
        const removeHover = () => cursor.classList.remove('hovering');

        document.addEventListener('mousemove', moveCursor);

        const hoverables = document.querySelectorAll('button, a, .feature-card');
        hoverables.forEach(el => {
          el.addEventListener('mouseenter', addHover);
          el.addEventListener('mouseleave', removeHover);
        });

        return () => {
          document.removeEventListener('mousemove', moveCursor);
          hoverables.forEach(el => {
            el.removeEventListener('mouseenter', addHover);
            el.removeEventListener('mouseleave', removeHover);
          });
        };
      }
    }
  }, []);

  // Scroll progress bar
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Progress bar
      gsap.to(progressRef.current, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.3,
        },
      });

      // Track active section
      sections.forEach((id, i) => {
        ScrollTrigger.create({
          trigger: `#${id}`,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => setActiveSection(i),
          onEnterBack: () => setActiveSection(i),
        });
      });
    });

    return () => ctx.revert();
  }, []);

  const scrollToSection = (index) => {
    document.getElementById(sections[index])?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative bg-[var(--color-bg)] cursor-none md:cursor-none">
      {/* Custom cursor */}
      <div ref={cursorRef} className="custom-cursor hidden md:block" />

      {/* Scroll progress */}
      <div ref={progressRef} className="scroll-progress" />

      {/* Section nav rail */}
      <nav className="section-nav hidden md:flex">
        {sections.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToSection(i)}
            className={`section-nav-dot ${activeSection === i ? 'active' : ''}`}
            aria-label={`Go to section ${i + 1}`}
          />
        ))}
      </nav>

      {/* Sections */}
      <Hero />
      <FeaturesMarquee />
      <FeatureCards />
      <CTASection />

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-white/5 text-center">
        <p className="text-sm text-white/30">
          © 2024 MediKiosk · Built for Smart India Hackathon
        </p>
      </footer>
    </div>
  );
}
