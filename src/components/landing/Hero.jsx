import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const containerRef = useRef(null);
  const headlineRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Split headline into letters
      const headline = headlineRef.current;
      const text = headline.textContent;
      headline.innerHTML = '';

      // Split into words first, then letters within each word
      const words = text.split(' ');
      words.forEach((word, wordIndex) => {
        const wordSpan = document.createElement('span');
        wordSpan.style.display = 'inline-block';
        wordSpan.style.marginRight = '0.3em';

        word.split('').forEach(char => {
          const span = document.createElement('span');
          span.textContent = char;
          span.className = 'hero-letter';
          wordSpan.appendChild(span);
        });

        headline.appendChild(wordSpan);
      });

      const letters = headline.querySelectorAll('.hero-letter');

      // Animate letters
      gsap.to(letters, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.03,
        ease: 'power3.out',
        delay: 0.3,
      });

      // Animate subtitle
      gsap.fromTo(subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 1.2 }
      );

      // Animate CTA
      gsap.fromTo(ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 1.6 }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="landing-section relative overflow-hidden" id="hero">
      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-teal-500/10 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-500/5 rounded-full blur-[150px]" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 text-center max-w-5xl mx-auto px-4">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8 animate-fade-in">
          <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse-soft" />
          <span className="text-sm text-white/60 font-medium">AI-Powered Pre-Consultation</span>
        </div>

        {/* Headline */}
        <h1
          ref={headlineRef}
          className="font-display font-bold text-hero leading-[1.05] tracking-tight mb-6"
        >
          MEDU VADA
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-subtitle text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed opacity-0"
        >
          Smarter patient intake — powered by conversational AI. Voice or text history-taking,
          document scanning, and physician-ready clinical summaries. All in one kiosk.
        </p>

        {/* CTA */}
        <div ref={ctaRef} className="flex items-center justify-center gap-4 opacity-0">
          <button
            onClick={() => navigate('/auth')}
            className="
              group relative inline-flex items-center gap-3
              px-8 py-4 rounded-full
              bg-primary-600 text-white font-semibold text-base
              overflow-hidden cursor-pointer
              transition-all duration-300
              hover:shadow-[0_0_30px_rgba(51,141,255,0.4)]
              hover:scale-105
            "
          >
            <span className="relative z-10">Start Consultation</span>
            <ArrowRight size={20} className="relative z-10 transition-transform group-hover:translate-x-1" />
            {/* Hover fill effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>

          <button
            onClick={() => {
              document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="
              px-8 py-4 rounded-full
              border border-white/20 text-white/70 font-semibold text-base
              hover:border-white/40 hover:text-white hover:bg-white/5
              transition-all duration-300 cursor-pointer
            "
          >
            Learn More
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in" style={{ animationDelay: '2s' }}>
          <span className="text-xs text-white/30 uppercase tracking-widest">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent" />
        </div>
      </div>
    </section>
  );
}
