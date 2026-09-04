import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MessageSquare, Mic, FileSearch, ClipboardCheck, AlertTriangle, History } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: MessageSquare,
    title: 'Conversational History',
    description: 'Natural chat-style medical history taking — patients answer questions in a familiar messaging interface instead of confusing paper forms.',
    gradient: 'from-blue-500/20 to-cyan-500/20',
    accentColor: '#338dff',
  },
  {
    icon: Mic,
    title: 'Voice & Text Input',
    description: 'Speak or type — the system understands both. Perfect for elderly patients or those who find typing difficult.',
    gradient: 'from-violet-500/20 to-purple-500/20',
    accentColor: '#8b5cf6',
  },
  {
    icon: AlertTriangle,
    title: 'Red Flag Detection',
    description: 'Instant alerts when critical symptoms are detected. Chest pain, breathing difficulty — urgent cases get flagged immediately.',
    gradient: 'from-red-500/20 to-orange-500/20',
    accentColor: '#f83b3b',
  },
  {
    icon: FileSearch,
    title: 'Document Scanning',
    description: 'Upload prescriptions and lab reports. AI extracts diagnoses, medications, and lab values into structured, readable tables.',
    gradient: 'from-emerald-500/20 to-teal-500/20',
    accentColor: '#1de4c8',
  },
  {
    icon: ClipboardCheck,
    title: 'Physician Summary',
    description: 'Auto-generated clinical summaries in standard medical format. Every field editable — AI drafts, doctor verifies.',
    gradient: 'from-amber-500/20 to-yellow-500/20',
    accentColor: '#f59e0b',
  },
  {
    icon: History,
    title: 'Visit History',
    description: 'Longitudinal patient records. Doctors see past visits, complaints, and summaries at a glance — patterns visible instantly.',
    gradient: 'from-pink-500/20 to-rose-500/20',
    accentColor: '#ec4899',
  },
];

export default function FeatureCards() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(card,
          {
            opacity: 0,
            y: 60,
            x: i % 2 === 0 ? -30 : 30,
          },
          {
            opacity: 1,
            y: 0,
            x: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'top 50%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-4 md:px-8" id="features">
      {/* Section header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-sm font-semibold text-teal-400 uppercase tracking-widest mb-3 block">Features</span>
        <h2 className="font-display text-section font-bold mb-4">
          Everything a kiosk <span className="gradient-text">needs</span>
        </h2>
        <p className="text-white/50 text-lg leading-relaxed">
          From patient intake to physician handoff — every step designed for speed, accuracy, and accessibility.
        </p>
      </div>

      {/* Cards grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, i) => {
          const Icon = feature.icon;
          return (
            <div
              key={i}
              ref={el => cardsRef.current[i] = el}
              className="feature-card group p-8"
            >
              {/* Gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              {/* Icon */}
              <div
                className="relative z-10 w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ background: `${feature.accentColor}15`, border: `1px solid ${feature.accentColor}30` }}
              >
                <Icon size={24} style={{ color: feature.accentColor }} />
              </div>

              {/* Text */}
              <h3 className="relative z-10 font-display text-xl font-bold mb-3">{feature.title}</h3>
              <p className="relative z-10 text-white/50 text-sm leading-relaxed">{feature.description}</p>

              {/* Corner accent */}
              <div
                className="absolute top-0 right-0 w-32 h-32 opacity-10 rounded-bl-full"
                style={{ background: `radial-gradient(circle at 100% 0%, ${feature.accentColor}, transparent 70%)` }}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
