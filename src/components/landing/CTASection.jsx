import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Shield, Brain, Stethoscope } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { icon: Brain, value: 'AI-Powered', label: 'Conversational Engine' },
  { icon: Shield, value: 'ABDM', label: 'Aligned Architecture' },
  { icon: Stethoscope, value: 'Doctor', label: 'Always In Control' },
];

export default function CTASection() {
  const sectionRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current.querySelectorAll('.cta-animate'),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-4 md:px-8 relative" id="cta">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary-600/10 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Stats row */}
        <div className="flex flex-wrap justify-center gap-8 mb-16">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="cta-animate flex items-center gap-3 px-6 py-3 rounded-xl border border-white/10 bg-white/5">
                <Icon size={24} className="text-teal-400" />
                <div className="text-left">
                  <div className="font-display font-bold text-sm">{stat.value}</div>
                  <div className="text-xs text-white/40">{stat.label}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Headline */}
        <h2 className="cta-animate font-display text-section font-bold mb-6">
          Ready to <span className="gradient-text">reimagine</span> <br />patient intake?
        </h2>

        <p className="cta-animate text-lg text-white/50 max-w-xl mx-auto mb-10 leading-relaxed">
          Start your consultation in under a minute. Voice or text — your choice. 
          The doctor gets a structured summary before you even walk in.
        </p>

        {/* CTA button */}
        <div className="cta-animate">
          <button
            onClick={() => navigate('/auth')}
            className="
              group relative inline-flex items-center gap-3
              px-10 py-5 rounded-full
              bg-gradient-to-r from-primary-600 to-teal-600
              text-white font-bold text-lg
              overflow-hidden cursor-pointer
              transition-all duration-300
              hover:shadow-[0_0_40px_rgba(29,228,200,0.3)]
              hover:scale-105
            "
          >
            <span className="relative z-10">Begin Consultation</span>
            <ArrowRight size={22} className="relative z-10 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Trust line */}
        <p className="cta-animate mt-8 text-sm text-white/30">
          Built for SIH 2024 · ABDM-aligned · No data leaves the hospital network
        </p>
      </div>
    </section>
  );
}
