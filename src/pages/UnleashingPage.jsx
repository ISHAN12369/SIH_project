import React, { useState, useEffect } from 'react';
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
import LottieAvatar from '../components/unleashing/LottieAvatar';
import { ArrowDown, MessageSquare, Upload, ClipboardList, Calendar, ShieldCheck } from 'lucide-react';

export default function UnleashingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('assessment-section');

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
    <div className="unleashing-app" style={{ backgroundColor: '#f8fafc' }}>
      <CustomCursor />

      {/* Top Fixed Navigation */}
      <Navbar
        themeColor="#016c8f"
        centerLabel={
          activeSection === 'assessment-section'
            ? 'HEALTH ASSESSMENT'
            : activeSection === 'records-section'
            ? 'CLINICAL RECORDS'
            : 'PHYSICIAN SUMMARY'
        }
        onLogoClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onProfileClick={() => setIsProfileOpen(true)}
        onStartClick={() => scrollTo('assessment-section')}
      />

      {/* ==========================================================================
          1. UNIFIED HERO / INTRODUCTION SECTION
          ========================================================================== */}
      <section
        style={{
          minHeight: '88vh',
          width: '100%',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(180deg, #e7d6eb 0%, #fdfcff 60%, #f8fafc 100%)',
          padding: '8rem 2rem 4rem',
          overflow: 'hidden',
          textAlign: 'center',
        }}
      >
        {/* Soft Decorative Dome Curve in Background */}
        <div
          style={{
            position: 'absolute',
            top: '-20vw',
            left: '-10vw',
            width: '120vw',
            height: '65vh',
            background: '#eee6f5',
            borderRadius: '0 0 50% 50%',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />

        <div style={{ position: 'relative', zIndex: 5, maxWidth: '64rem' }}>
          {/* Subtle Tagline */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.4rem 1.1rem',
              borderRadius: '9999px',
              background: 'rgba(255, 255, 255, 0.8)',
              border: '1px solid rgba(135, 53, 159, 0.2)',
              color: '#87359f',
              fontFamily: 'var(--font-sans-bold)',
              fontSize: '0.72rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '1.5rem',
            }}
          >
            <ShieldCheck size={14} /> AI Drafts • Physician Verifies • Never Autonomous
          </div>

          {/* Kinetic Headline */}
          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(3.5rem, 8vw, 6.75rem)',
              lineHeight: 0.95,
              color: '#111111',
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
              marginBottom: '1.5rem',
            }}
          >
            MediKiosk
          </h1>

          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(1.05rem, 1.8vw, 1.35rem)',
              color: '#444444',
              maxWidth: '44rem',
              margin: '0 auto 2.5rem',
              lineHeight: 1.5,
            }}
          >
            An adaptive pre-consultation kiosk that captures conversational patient history, extracts medical reports via OCR, and generates verified clinical summaries for doctors.
          </p>

          {/* Quick Jump Buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem', justifyContent: 'center', marginBottom: '3.5rem' }}>
            <button
              className="ub-see-chap-btn"
              style={{ background: '#35705b', color: '#fff', borderColor: '#35705b' }}
              onClick={() => scrollTo('assessment-section')}
            >
              <MessageSquare size={14} style={{ marginRight: '6px' }} /> 01. Health Assessment
            </button>
            <button
              className="ub-see-chap-btn"
              style={{ background: '#f57431', color: '#fff', borderColor: '#f57431' }}
              onClick={() => scrollTo('records-section')}
            >
              <Upload size={14} style={{ marginRight: '6px' }} /> 02. Document OCR
            </button>
            <button
              className="ub-see-chap-btn"
              style={{ background: '#016c8f', color: '#fff', borderColor: '#016c8f' }}
              onClick={() => scrollTo('summary-section')}
            >
              <ClipboardList size={14} style={{ marginRight: '6px' }} /> 03. Physician Summary
            </button>
            <button
              className="ub-see-chap-btn"
              style={{ borderColor: '#87359f', color: '#87359f' }}
              onClick={() => setIsProfileOpen(true)}
            >
              Patient Profile
            </button>
          </div>

          {/* Continuous Kinetic Marquee */}
          <div className="ub-marquee-container" style={{ position: 'relative', top: 'auto', transform: 'none', color: '#87359f', opacity: 0.85 }}>
            <div className="ub-marquee-track">
              <span className="ub-marquee-text" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
                CONVERSATIONAL INTAKE <span className="ub-marquee-dot">•</span> OCR DOCUMENT EXTRACTION <span className="ub-marquee-dot">•</span> 7 CLINICAL SUMMARY SECTIONS <span className="ub-marquee-dot">•</span> DOCTOR SIGN-OFF <span className="ub-marquee-dot">•</span>
              </span>
              <span className="ub-marquee-text" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
                CONVERSATIONAL INTAKE <span className="ub-marquee-dot">•</span> OCR DOCUMENT EXTRACTION <span className="ub-marquee-dot">•</span> 7 CLINICAL SUMMARY SECTIONS <span className="ub-marquee-dot">•</span> DOCTOR SIGN-OFF <span className="ub-marquee-dot">•</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
          FEATURE 1: CONVERSATIONAL HEALTH ASSESSMENT (Chat with Voice/Text/Chips)
          ========================================================================== */}
      <section id="assessment-section" style={{ position: 'relative', scrollMarginTop: '5rem' }}>
        <div style={{ textAlign: 'center', paddingTop: '3rem', paddingBottom: '1rem', background: '#d6e2de' }}>
          <span style={{ fontFamily: 'var(--font-sans-bold)', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#35705b' }}>
            CHAPTER • 01
          </span>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 4vw, 3.25rem)', color: '#35705b', marginTop: '0.25rem' }}>
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
      <section id="records-section" style={{ position: 'relative', scrollMarginTop: '5rem' }}>
        <div style={{ textAlign: 'center', paddingTop: '4rem', paddingBottom: '1rem', background: '#fde3d5' }}>
          <span style={{ fontFamily: 'var(--font-sans-bold)', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#f57431' }}>
            CHAPTER • 02
          </span>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 4vw, 3.25rem)', color: '#f57431', marginTop: '0.25rem' }}>
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
      <section id="summary-section" style={{ position: 'relative', scrollMarginTop: '5rem' }}>
        <div style={{ textAlign: 'center', paddingTop: '4rem', paddingBottom: '1rem', background: '#cce1e8' }}>
          <span style={{ fontFamily: 'var(--font-sans-bold)', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#016c8f' }}>
            CHAPTER • 03
          </span>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 4vw, 3.25rem)', color: '#016c8f', marginTop: '0.25rem' }}>
            Physician Summary & Human-in-the-Loop Sign-Off
          </h2>
        </div>

        <PhysicianSummaryView />
      </section>

      {/* ==========================================================================
          FEATURE 4: PATIENT LONGITUDINAL VISITS & TIMELINE
          ========================================================================== */}
      <section id="visits-section" style={{ position: 'relative', scrollMarginTop: '5rem', background: '#f3d9d6', padding: '5rem 2rem 8rem' }}>
        <div style={{ maxWidth: '64rem', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ fontFamily: 'var(--font-sans-bold)', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#c74332' }}>
              CHAPTER • 04
            </span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 4vw, 3.25rem)', color: '#c74332', marginTop: '0.25rem' }}>
              Longitudinal History & ABDM Integration
            </h2>
            <p style={{ fontSize: '0.95rem', color: '#555', marginTop: '0.5rem', maxWidth: '38rem', margin: '0.5rem auto 0' }}>
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
