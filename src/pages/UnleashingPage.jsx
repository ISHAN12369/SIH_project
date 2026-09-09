import React, { useState, useEffect, useRef } from 'react';
import '../styles/unleashing.css';
import '../styles/clinical.css';
import Navbar from '../components/unleashing/Navbar';
import HealthAssessmentView from '../components/unleashing/HealthAssessmentView';
import ClinicalRecordsView from '../components/unleashing/ClinicalRecordsView';
import PhysicianSummaryView from '../components/unleashing/PhysicianSummaryView';
import ProfileModal from '../components/unleashing/ProfileModal';
import AllChaptersModal from '../components/unleashing/AllChaptersModal';
import AllChaptersTrigger from '../components/unleashing/AllChaptersTrigger';
import SoundButton from '../components/unleashing/SoundButton';
import CustomCursor from '../components/unleashing/CustomCursor';
import DoctorAvatar from '../components/unleashing/DoctorAvatar';
import AmbientMedicalObject from '../components/unleashing/AmbientMedicalObject';
import {
  StethoscopeIcon,
  CapsuleIcon,
  EcgIcon,
  SyringeIcon,
  FirstAidKitIcon,
  ThermometerIcon,
  MicroscopeIcon,
  MedicineBottleIcon,
  ChartIcon,
  BlisterPackIcon,
  DripIcon,
  DnaIcon,
  CaduceusIcon,
  PlasterIcon,
} from '../components/unleashing/HospitalItems';
import { ArrowDown, MessageSquare, Upload, ClipboardList, Calendar, ShieldCheck } from 'lucide-react';

const SECTION_THEMES = {
  'hero-section': { themeColor: '#026482' },
  'assessment-section': { themeColor: '#11684c' },
  'records-section': { themeColor: '#ea580c' },
  'summary-section': { themeColor: '#026482' },
  'visits-section': { themeColor: '#be123c' },
};

export default function UnleashingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero-section');
  const bgRef = useRef(null);

  // Real-time continuous smooth background color morph on scroll
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;

          // Milestone definitions matching section offsets dynamically
          const heroEl = document.getElementById('hero-section');
          const assessEl = document.getElementById('assessment-section');
          const recordsEl = document.getElementById('records-section');
          const summaryEl = document.getElementById('summary-section');
          const visitsEl = document.getElementById('visits-section');

          const getSectionTop = (el, fallback) => {
            if (!el) return fallback;
            const rect = el.getBoundingClientRect();
            return rect.top + window.scrollY - 160;
          };

          const y0 = 0;
          const y1 = getSectionTop(assessEl, 850);
          const y2 = getSectionTop(recordsEl, 1950);
          const y3 = getSectionTop(summaryEl, 3100);
          const y4 = getSectionTop(visitsEl, 4300);

          const MILESTONES = [
            { y: y0, r1: 205, g1: 232, b1: 242, r2: 236, g2: 248, b2: 252 }, // Hero: Fresh Clinical Teal/Cyan
            { y: y1, r1: 212, g1: 242, b1: 232, r2: 236, g2: 252, b2: 246 }, // Chapter 01: Fresh Sage Emerald
            { y: y2, r1: 254, g1: 234, b1: 220, r2: 255, g2: 247, b2: 240 }, // Chapter 02: Warm Clinical Amber/Peach
            { y: y3, r1: 211, g1: 235, b1: 246, r2: 239, g2: 248, b2: 253 }, // Chapter 03: Physician Soft Blue
            { y: y4, r1: 253, g1: 228, b1: 234, r2: 255, g2: 243, b2: 246 }, // Chapter 04: Soft Medical Rose
          ];

          let i = 0;
          while (i < MILESTONES.length - 1 && scrollY > MILESTONES[i + 1].y) {
            i++;
          }

          if (i >= MILESTONES.length - 1) {
            const last = MILESTONES[MILESTONES.length - 1];
            if (bgRef.current) {
              bgRef.current.style.background = `linear-gradient(180deg, rgb(${last.r1},${last.g1},${last.b1}) 0%, rgb(${last.r2},${last.g2},${last.b2}) 50%, #ffffff 100%)`;
            }
          } else {
            const m1 = MILESTONES[i];
            const m2 = MILESTONES[i + 1];
            const span = Math.max(1, m2.y - m1.y);
            const progress = Math.max(0, Math.min(1, (scrollY - m1.y) / span));
            // Smooth ease-in-out curve
            const t = progress * progress * (3 - 2 * progress);

            const r1 = Math.round(m1.r1 + (m2.r1 - m1.r1) * t);
            const g1 = Math.round(m1.g1 + (m2.g1 - m1.g1) * t);
            const b1 = Math.round(m1.b1 + (m2.b1 - m1.b1) * t);
            const r2 = Math.round(m1.r2 + (m2.r2 - m1.r2) * t);
            const g2 = Math.round(m1.g2 + (m2.g2 - m1.g2) * t);
            const b2 = Math.round(m1.b2 + (m2.b2 - m1.b2) * t);

            if (bgRef.current) {
              bgRef.current.style.background = `linear-gradient(180deg, rgb(${r1},${g1},${b1}) 0%, rgb(${r2},${g2},${b2}) 55%, #ffffff 100%)`;
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Section Observer for Navbar active tab highlighting
  useEffect(() => {
    const sectionIds = ['hero-section', 'assessment-section', 'records-section', 'summary-section', 'visits-section'];
    const observers = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        const obs = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          },
          { threshold: 0.25, rootMargin: '-10% 0px -40% 0px' }
        );
        obs.observe(el);
        observers.push(obs);
      }
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  const currentTheme = SECTION_THEMES[activeSection] || SECTION_THEMES['hero-section'];

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectFeature = (ch) => {
    if (ch.targetSection === 'profile') {
      setIsProfileOpen(true);
    } else {
      scrollTo(ch.targetSection);
    }
  };

  return (
    <div className="unleashing-app" style={{ backgroundColor: '#ffffff', minHeight: '100vh', position: 'relative' }}>
      <CustomCursor />

      {/* Real-Time Continuous Gradual Background Color Shift */}
      <div
        ref={bgRef}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          background: 'linear-gradient(180deg, #cde5ee 0%, #edf7fa 45%, #ffffff 85%)',
          pointerEvents: 'none',
        }}
      />

      {/* Subtle Clinical Dot Grid Watermark Texture */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundImage:
            'radial-gradient(rgba(1, 108, 143, 0.06) 1.2px, transparent 1.2px), radial-gradient(rgba(234, 88, 12, 0.035) 1.2px, transparent 1.2px)',
          backgroundSize: '48px 48px, 96px 96px',
          opacity: 0.85,
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* Top Fixed Navigation */}
      <Navbar
        themeColor={currentTheme.themeColor}
        activeSection={activeSection}
        onSelectChapter={handleSelectFeature}
        onLogoClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onProfileClick={() => setIsProfileOpen(true)}
        onStartClick={() => scrollTo('assessment-section')}
      />

      {/* ==========================================================================
          1. UNIFIED HERO / INTRODUCTION SECTION
          ========================================================================== */}
      <section
        id="hero-section"
        style={{
          minHeight: '90vh',
          width: '100%',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'transparent',
          padding: '8.5rem 2rem 4.5rem',
          overflow: 'hidden',
          textAlign: 'center',
        }}
      >
        {/* Ambient Medical Objects for Hero Section (Scrolls naturally with Hero) */}
        <AmbientMedicalObject name="Clinical Stethoscope" color="#016c8f" size={72} top="20%" left="3.5%" rotate={-15}>
          <StethoscopeIcon color="#016c8f" />
        </AmbientMedicalObject>
        <AmbientMedicalObject name="Prescription Capsule" color="#ea580c" size={56} top="24%" right="3.5%" rotate={32}>
          <CapsuleIcon color="#ea580c" />
        </AmbientMedicalObject>
        <AmbientMedicalObject name="Cardiac Vitals Monitor" color="#be123c" size={76} top="68%" left="3%" rotate={4}>
          <EcgIcon color="#be123c" />
        </AmbientMedicalObject>
        <AmbientMedicalObject name="Diagnostic Syringe" color="#0284c7" size={64} top="72%" right="3%" rotate={-45}>
          <SyringeIcon color="#0284c7" />
        </AmbientMedicalObject>

        {/* Soft Decorative Dome Curve in Background */}
        <div
          style={{
            position: 'absolute',
            top: '-20vw',
            left: '-10vw',
            width: '120vw',
            height: '65vh',
            background: 'linear-gradient(180deg, #b9dbe6 0%, #d5ebf2 100%)',
            borderRadius: '0 0 50% 50%',
            zIndex: 1,
            pointerEvents: 'none',
            boxShadow: 'inset 0 -15px 30px rgba(1, 108, 143, 0.08)',
          }}
        />

        <div style={{ position: 'relative', zIndex: 5, maxWidth: '64rem', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 auto' }}>
          {/* Doctor Avatar Spotlight at the starting */}
          <DoctorAvatar
            size={280}
            showGreeting={true}
            onStartAssessment={() => scrollTo('assessment-section')}
          />

          {/* Subtle Tagline */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.45rem 1.25rem',
              borderRadius: '9999px',
              background: 'rgba(255, 255, 255, 0.95)',
              border: '1.5px solid #026482',
              color: '#026482',
              fontFamily: 'var(--font-sans-bold)',
              fontSize: '0.74rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              marginBottom: '1.25rem',
              boxShadow: '0 4px 14px rgba(2, 100, 130, 0.12)',
            }}
          >
            <ShieldCheck size={15} /> AI Drafts • Physician Verifies • Never Autonomous
          </div>

          {/* Kinetic Headline with Tall Architectural Typography */}
          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(4.2rem, 9.5vw, 7.8rem)',
              lineHeight: 0.88,
              color: '#0a192f',
              letterSpacing: '0.03em',
              textTransform: 'uppercase',
              fontWeight: 800,
              marginBottom: '1.5rem',
              textShadow: '0 2px 10px rgba(10, 25, 47, 0.08)',
            }}
          >
            MEDU VADA
          </h1>

          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(1.05rem, 1.8vw, 1.32rem)',
              color: '#1e293b',
              maxWidth: '44rem',
              margin: '0 auto 2.5rem',
              lineHeight: 1.55,
              fontWeight: 500,
            }}
          >
            An adaptive pre-consultation kiosk that captures conversational patient history, extracts medical reports via OCR, and generates verified clinical summaries for doctors.
          </p>

          {/* Quick Jump Buttons with High Contrast */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem', justifyContent: 'center', marginBottom: '3.5rem' }}>
            <button
              className="ub-see-chap-btn"
              style={{ background: '#11684c', color: '#fff', borderColor: '#11684c', boxShadow: '0 4px 14px rgba(17, 104, 76, 0.25)' }}
              onClick={() => scrollTo('assessment-section')}
            >
              <MessageSquare size={14} style={{ marginRight: '6px' }} /> 01. Health Assessment
            </button>
            <button
              className="ub-see-chap-btn"
              style={{ background: '#ea580c', color: '#fff', borderColor: '#ea580c', boxShadow: '0 4px 14px rgba(234, 88, 12, 0.25)' }}
              onClick={() => scrollTo('records-section')}
            >
              <Upload size={14} style={{ marginRight: '6px' }} /> 02. Document OCR
            </button>
            <button
              className="ub-see-chap-btn"
              style={{ background: '#026482', color: '#fff', borderColor: '#026482', boxShadow: '0 4px 14px rgba(2, 100, 130, 0.25)' }}
              onClick={() => scrollTo('summary-section')}
            >
              <ClipboardList size={14} style={{ marginRight: '6px' }} /> 03. Physician Summary
            </button>
            <button
              className="ub-see-chap-btn"
              style={{ borderColor: '#7e22ce', color: '#7e22ce', background: '#f3e8ff' }}
              onClick={() => setIsProfileOpen(true)}
            >
              Patient Profile
            </button>
          </div>

          {/* Continuous Kinetic Marquee with Tall Font & High Contrast */}
          <div className="ub-marquee-container" style={{ position: 'relative', top: 'auto', transform: 'none', color: '#0a192f', opacity: 0.95 }}>
            <div className="ub-marquee-track">
              <span className="ub-marquee-text" style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.75rem, 5.5vw, 4.8rem)', letterSpacing: '0.04em', fontWeight: 800 }}>
                CONVERSATIONAL INTAKE <span className="ub-marquee-dot" style={{ color: '#026482' }}>•</span> OCR DOCUMENT EXTRACTION <span className="ub-marquee-dot" style={{ color: '#ea580c' }}>•</span> 7 CLINICAL SUMMARY SECTIONS <span className="ub-marquee-dot" style={{ color: '#11684c' }}>•</span> DOCTOR SIGN-OFF <span className="ub-marquee-dot" style={{ color: '#7e22ce' }}>•</span>
              </span>
              <span className="ub-marquee-text" style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.75rem, 5.5vw, 4.8rem)', letterSpacing: '0.04em', fontWeight: 800 }}>
                CONVERSATIONAL INTAKE <span className="ub-marquee-dot" style={{ color: '#026482' }}>•</span> OCR DOCUMENT EXTRACTION <span className="ub-marquee-dot" style={{ color: '#ea580c' }}>•</span> 7 CLINICAL SUMMARY SECTIONS <span className="ub-marquee-dot" style={{ color: '#11684c' }}>•</span> DOCTOR SIGN-OFF <span className="ub-marquee-dot" style={{ color: '#7e22ce' }}>•</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
          FEATURE 1: CONVERSATIONAL HEALTH ASSESSMENT (Chat with Voice/Text/Chips)
          ========================================================================== */}
      <section id="assessment-section" style={{ position: 'relative', scrollMarginTop: '5rem', background: 'transparent' }}>
        {/* Ambient Medical Objects for Chapter 1 (Scrolls naturally with Chapter 1) */}
        <AmbientMedicalObject name="Emergency Medical Kit" color="#11684c" size={64} top="15%" left="3.5%" rotate={8}>
          <FirstAidKitIcon color="#11684c" />
        </AmbientMedicalObject>
        <AmbientMedicalObject name="Clinical Thermometer" color="#156149" size={60} top="18%" right="3.5%" rotate={22}>
          <ThermometerIcon color="#156149" />
        </AmbientMedicalObject>
        <AmbientMedicalObject name="Pathology Microscope" color="#11684c" size={68} top="65%" left="3%" rotate={-8}>
          <MicroscopeIcon color="#11684c" />
        </AmbientMedicalObject>
        <AmbientMedicalObject name="Medicine Dropper" color="#156149" size={58} top="68%" right="3.5%" rotate={-15}>
          <MedicineBottleIcon color="#156149" />
        </AmbientMedicalObject>

        <div style={{ textAlign: 'center', paddingTop: '4.5rem', paddingBottom: '1.5rem', background: 'transparent' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.35rem 1.1rem',
              borderRadius: '9999px',
              background: 'rgba(255, 255, 255, 0.9)',
              border: '1.5px solid rgba(17, 104, 76, 0.3)',
              boxShadow: '0 4px 14px rgba(17, 104, 76, 0.08)',
              backdropFilter: 'blur(8px)',
              marginBottom: '0.6rem',
            }}
          >
            <span style={{ fontFamily: 'var(--font-sans-bold)', fontSize: '0.74rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#11684c' }}>
              CHAPTER • 01
            </span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 5.5vw, 4.2rem)', color: '#11684c', marginTop: '0.2rem', fontWeight: 800, letterSpacing: '0.02em', textTransform: 'uppercase' }}>
            Health Assessment & Conversational Intake
          </h2>
        </div>

        <HealthAssessmentView
          onNavigateToUpload={() => scrollTo('records-section')}
          onNavigateToSummary={() => scrollTo('summary-section')}
        />
      </section>

      {/* ==========================================================================
          FEATURE 2: CLINICAL DOCUMENT OCR & EXTRACTION TABLE
          ========================================================================== */}
      <section id="records-section" style={{ position: 'relative', scrollMarginTop: '6rem', background: 'transparent' }}>
        {/* Ambient Medical Objects for Chapter 2 (Scrolls naturally with Chapter 2) */}
        <AmbientMedicalObject name="Lab Pathology Chart" color="#ea580c" size={66} top="14%" left="3.5%" rotate={-10}>
          <ChartIcon color="#ea580c" />
        </AmbientMedicalObject>
        <AmbientMedicalObject name="Pharmaceutical Blister Pack" color="#f97316" size={60} top="18%" right="3.5%" rotate={18}>
          <BlisterPackIcon color="#f97316" />
        </AmbientMedicalObject>
        <AmbientMedicalObject name="IV Saline Infusion" color="#ea580c" size={68} top="68%" left="3%" rotate={-5}>
          <DripIcon color="#ea580c" />
        </AmbientMedicalObject>
        <AmbientMedicalObject name="Sterile Adhesive Bandage" color="#f97316" size={56} top="72%" right="3.5%" rotate={35}>
          <PlasterIcon color="#f97316" />
        </AmbientMedicalObject>

        <div style={{ textAlign: 'center', paddingTop: '5rem', paddingBottom: '1.5rem', background: 'transparent' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.35rem 1.1rem',
              borderRadius: '9999px',
              background: 'rgba(255, 255, 255, 0.9)',
              border: '1.5px solid rgba(234, 88, 12, 0.3)',
              boxShadow: '0 4px 14px rgba(234, 88, 12, 0.08)',
              backdropFilter: 'blur(8px)',
              marginBottom: '0.6rem',
            }}
          >
            <span style={{ fontFamily: 'var(--font-sans-bold)', fontSize: '0.74rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#ea580c' }}>
              CHAPTER • 02
            </span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 5.5vw, 4.2rem)', color: '#ea580c', marginTop: '0.2rem', fontWeight: 800, letterSpacing: '0.02em', textTransform: 'uppercase' }}>
            Clinical Records & OCR Extraction
          </h2>
        </div>

        <ClinicalRecordsView
          onNavigateToSummary={() => scrollTo('summary-section')}
        />
      </section>

      {/* ==========================================================================
          FEATURE 3: PHYSICIAN-FACING SUMMARY (7 Editable Sections & Sign-off)
          ========================================================================== */}
      <section id="summary-section" style={{ position: 'relative', scrollMarginTop: '6rem', background: 'transparent' }}>
        {/* Ambient Medical Objects for Chapter 3 (Scrolls naturally with Chapter 3) */}
        <AmbientMedicalObject name="Genomic DNA Helix" color="#026482" size={68} top="12%" left="3.5%" rotate={12}>
          <DnaIcon color="#026482" />
        </AmbientMedicalObject>
        <AmbientMedicalObject name="Staff of Asclepius" color="#0284c7" size={64} top="16%" right="3.5%" rotate={-10}>
          <CaduceusIcon color="#0284c7" />
        </AmbientMedicalObject>
        <AmbientMedicalObject name="Acoustic Stethoscope" color="#026482" size={70} top="65%" left="3%" rotate={-18}>
          <StethoscopeIcon color="#026482" />
        </AmbientMedicalObject>
        <AmbientMedicalObject name="Cardiac Rhythm Vitals" color="#0284c7" size={66} top="70%" right="3.5%" rotate={8}>
          <EcgIcon color="#0284c7" />
        </AmbientMedicalObject>

        <div style={{ textAlign: 'center', paddingTop: '5rem', paddingBottom: '1.5rem', background: 'transparent' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.35rem 1.1rem',
              borderRadius: '9999px',
              background: 'rgba(255, 255, 255, 0.9)',
              border: '1.5px solid rgba(2, 100, 130, 0.3)',
              boxShadow: '0 4px 14px rgba(2, 100, 130, 0.08)',
              backdropFilter: 'blur(8px)',
              marginBottom: '0.6rem',
            }}
          >
            <span style={{ fontFamily: 'var(--font-sans-bold)', fontSize: '0.74rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#026482' }}>
              CHAPTER • 03
            </span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 5.5vw, 4.2rem)', color: '#026482', marginTop: '0.2rem', fontWeight: 800, letterSpacing: '0.02em', textTransform: 'uppercase' }}>
            Physician Summary & Human-in-the-Loop Sign-Off
          </h2>
        </div>

        <PhysicianSummaryView />
      </section>

      {/* ==========================================================================
          FEATURE 4: PATIENT LONGITUDINAL VISITS & TIMELINE
          ========================================================================== */}
      <section id="visits-section" style={{ position: 'relative', scrollMarginTop: '6rem', background: 'transparent', padding: '5rem 2rem 8rem' }}>
        {/* Ambient Medical Objects for Chapter 4 (Scrolls naturally with Chapter 4) */}
        <AmbientMedicalObject name="Clinical Pharmacopoeia" color="#be123c" size={62} top="10%" left="3.5%" rotate={-12}>
          <MedicineBottleIcon color="#be123c" />
        </AmbientMedicalObject>
        <AmbientMedicalObject name="Emergency Medical Kit" color="#e11d48" size={66} top="14%" right="3.5%" rotate={15}>
          <FirstAidKitIcon color="#e11d48" />
        </AmbientMedicalObject>
        <AmbientMedicalObject name="Diagnostic Syringe" color="#be123c" size={64} top="62%" left="3%" rotate={28}>
          <SyringeIcon color="#be123c" />
        </AmbientMedicalObject>
        <AmbientMedicalObject name="Precision Thermometer" color="#e11d48" size={58} top="66%" right="3.5%" rotate={-20}>
          <ThermometerIcon color="#e11d48" />
        </AmbientMedicalObject>

        <div style={{ maxWidth: '64rem', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.35rem 1.1rem',
                borderRadius: '9999px',
                background: 'rgba(255, 255, 255, 0.9)',
                border: '1.5px solid rgba(190, 18, 60, 0.3)',
                boxShadow: '0 4px 14px rgba(190, 18, 60, 0.08)',
                backdropFilter: 'blur(8px)',
                marginBottom: '0.6rem',
              }}
            >
              <span style={{ fontFamily: 'var(--font-sans-bold)', fontSize: '0.74rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#be123c' }}>
                CHAPTER • 04
              </span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 5.5vw, 4.2rem)', color: '#be123c', marginTop: '0.2rem', fontWeight: 800, letterSpacing: '0.02em', textTransform: 'uppercase' }}>
              Longitudinal History & ABDM Integration
            </h2>
            <p style={{ fontSize: '0.95rem', color: '#334155', marginTop: '0.5rem', maxWidth: '38rem', margin: '0.5rem auto 0', fontWeight: 500 }}>
              Empowers attending doctors to recognize chronic symptom patterns across past consultations without digging through paper files.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(18rem, 1fr))', gap: '1.5rem' }}>
            <div style={{ background: '#ffffff', padding: '1.75rem', borderRadius: '1.25rem', border: '1px solid rgba(199, 67, 50, 0.15)', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
              <span style={{ fontSize: '0.75rem', color: '#888' }}>10 Jul 2024 • Dr. Sharma</span>
              <h4 style={{ fontFamily: 'var(--font-sans-bold)', fontSize: '1rem', color: '#111', margin: '0.5rem 0 0.35rem' }}>
                Viral Upper Respiratory Infection
              </h4>
              <p style={{ fontSize: '0.85rem', color: '#555' }}>
                Chief complaint: 3-day fever & body aches. Paracetamol administered, symptoms resolved with no residual cough.
              </p>
            </div>

            <div style={{ background: '#ffffff', padding: '1.75rem', borderRadius: '1.25rem', border: '1px solid rgba(199, 67, 50, 0.15)', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
              <span style={{ fontSize: '0.75rem', color: '#888' }}>22 Mar 2024 • Dr. Priya Mehta</span>
              <h4 style={{ fontFamily: 'var(--font-sans-bold)', fontSize: '1rem', color: '#111', margin: '0.5rem 0 0.35rem' }}>
                Quarterly Diabetes Review
              </h4>
              <p style={{ fontSize: '0.85rem', color: '#555' }}>
                HbA1c recorded at 7.2%. Maintained Metformin 500mg BD. Advised low glycemic index diet and 30-minute daily walk.
              </p>
            </div>

            <div style={{ background: '#ffffff', padding: '1.75rem', borderRadius: '1.25rem', border: '1px solid rgba(199, 67, 50, 0.15)', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
              <span style={{ fontSize: '0.75rem', color: '#888' }}>05 Nov 2023 • Dr. R. Verma</span>
              <h4 style={{ fontFamily: 'var(--font-sans-bold)', fontSize: '1rem', color: '#111', margin: '0.5rem 0 0.35rem' }}>
                Lumbar Musculoskeletal Strain
              </h4>
              <p style={{ fontSize: '0.85rem', color: '#555' }}>
                Acute lower back pain post lifting heavy luggage. Treated with muscle relaxants and ergonomics education.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
          BOTTOM FIXED CONTROLS: ALL CHAPTERS & SOUND EQUALIZER
          ========================================================================== */}
      <div className="ub-bottom-controls" style={{ color: '#016c8f' }}>
        <AllChaptersTrigger
          themeColor="#016c8f"
          onClick={() => setIsModalOpen(true)}
        />
        <SoundButton themeColor="#016c8f" />
      </div>

      {/* All Chapters Fullscreen Modal (Now housing all 5 MediKiosk modules) */}
      <AllChaptersModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelectFeature={handleSelectFeature}
      />

      {/* Patient Profile Modal (Local storage persistence, DB ready) */}
      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />
    </div>
  );
}
