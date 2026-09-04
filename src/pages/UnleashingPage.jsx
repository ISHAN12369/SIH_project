import React, { useState } from 'react';
import '../styles/unleashing.css';
import '../styles/clinical.css';
import Navbar from '../components/unleashing/Navbar';
import HeroDomeView from '../components/unleashing/HeroDomeView';
import NextChapterBanner from '../components/unleashing/NextChapterBanner';
import ChapterReadingView from '../components/unleashing/ChapterReadingView';
import HealthAssessmentView from '../components/unleashing/HealthAssessmentView';
import ClinicalRecordsView from '../components/unleashing/ClinicalRecordsView';
import PhysicianSummaryView from '../components/unleashing/PhysicianSummaryView';
import AuthModal from '../components/unleashing/AuthModal';
import AllChaptersModal from '../components/unleashing/AllChaptersModal';
import AllChaptersTrigger from '../components/unleashing/AllChaptersTrigger';
import SoundButton from '../components/unleashing/SoundButton';
import CustomCursor from '../components/unleashing/CustomCursor';
import { CHAPTERS } from '../data/unleashingChapters';

export default function UnleashingPage() {
  // Current view:
  // 'hero' | 'nextChapter' | 'chapterRead' | 'healthChat' | 'docUpload' | 'physicianSummary'
  const [currentView, setCurrentView] = useState('chapterRead');
  const [activeChapterIndex, setActiveChapterIndex] = useState(2); // Chapter 3 (Successful People)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const activeChapter = CHAPTERS[activeChapterIndex] || CHAPTERS[0];

  // Dynamic theme colors & labels
  let themeColor = activeChapter.colorStrong;
  let centerLabel = '';

  if (currentView === 'hero') {
    themeColor = '#87359f';
    centerLabel = '';
  } else if (currentView === 'nextChapter') {
    themeColor = CHAPTERS[0].colorStrong; // Well-Being green #35705b
    centerLabel = 'NEXT CHAPTER';
  } else if (currentView === 'chapterRead') {
    themeColor = activeChapter.colorStrong; // Chapter 3 blue #016c8f
    centerLabel = 'INTRODUCTION';
  } else if (currentView === 'healthChat') {
    themeColor = '#35705b';
    centerLabel = 'HEALTH ASSESSMENT';
  } else if (currentView === 'docUpload') {
    themeColor = '#f57431';
    centerLabel = 'CLINICAL RECORDS';
  } else if (currentView === 'physicianSummary') {
    themeColor = '#016c8f';
    centerLabel = 'PHYSICIAN SUMMARY';
  }

  const handleStartCourse = () => {
    setCurrentView('healthChat');
  };

  const handleNextChapterInReading = () => {
    const nextIdx = (activeChapterIndex + 1) % CHAPTERS.length;
    setActiveChapterIndex(nextIdx);
    setCurrentView('chapterRead');
  };

  return (
    <div
      className="unleashing-app"
      style={{
        backgroundColor:
          currentView === 'chapterRead'
            ? activeChapter.colorLight
            : currentView === 'healthChat'
            ? '#d6e2de'
            : currentView === 'docUpload'
            ? '#fde3d5'
            : currentView === 'physicianSummary'
            ? '#cce1e8'
            : '#ffffff',
      }}
    >
      <CustomCursor />

      {/* Floating View Switcher to quickly jump between the original screenshots & core features */}
      <div className="ub-view-switcher" style={{ maxWidth: '95vw', overflowX: 'auto' }}>
        <button
          className={`ub-view-tab ${currentView === 'hero' && !isModalOpen ? 'active' : ''}`}
          onClick={() => {
            setIsModalOpen(false);
            setCurrentView('hero');
          }}
        >
          1. Hero Dome
        </button>
        <button
          className={`ub-view-tab ${currentView === 'nextChapter' && !isModalOpen ? 'active' : ''}`}
          onClick={() => {
            setIsModalOpen(false);
            setCurrentView('nextChapter');
          }}
        >
          2. Next Chapter
        </button>
        <button
          className={`ub-view-tab ${currentView === 'chapterRead' && !isModalOpen ? 'active' : ''}`}
          onClick={() => {
            setIsModalOpen(false);
            setCurrentView('chapterRead');
          }}
        >
          3. Chapter 03 Reading
        </button>
        <button
          className={`ub-view-tab ${currentView === 'healthChat' && !isModalOpen ? 'active' : ''}`}
          onClick={() => {
            setIsModalOpen(false);
            setCurrentView('healthChat');
          }}
        >
          4. Health Assessment (Chat)
        </button>
        <button
          className={`ub-view-tab ${currentView === 'docUpload' && !isModalOpen ? 'active' : ''}`}
          onClick={() => {
            setIsModalOpen(false);
            setCurrentView('docUpload');
          }}
        >
          5. Document Upload
        </button>
        <button
          className={`ub-view-tab ${currentView === 'physicianSummary' && !isModalOpen ? 'active' : ''}`}
          onClick={() => {
            setIsModalOpen(false);
            setCurrentView('physicianSummary');
          }}
        >
          6. Physician Summary
        </button>
        <button
          className={`ub-view-tab ${isModalOpen ? 'active' : ''}`}
          onClick={() => setIsModalOpen(true)}
        >
          7. All Chapters Menu
        </button>
        <button
          className="ub-view-tab"
          style={{ borderLeft: '1px solid #ddd', color: '#87359f' }}
          onClick={() => setIsAuthOpen(true)}
        >
          Sign In
        </button>
      </div>

      {/* Top Fixed Navigation */}
      <Navbar
        themeColor={themeColor}
        centerLabel={centerLabel}
        onLogoClick={() => setCurrentView('hero')}
        onCourseClick={() => setCurrentView('hero')}
        onStartCourseClick={handleStartCourse}
      />

      {/* Main View Area */}
      <main>
        {currentView === 'hero' && (
          <HeroDomeView onExploreClick={() => setCurrentView('nextChapter')} />
        )}

        {currentView === 'nextChapter' && (
          <NextChapterBanner
            chapter={CHAPTERS[0]}
            onSeeChapter={() => {
              setActiveChapterIndex(2); // Jump into Chapter 3 Successful People
              setCurrentView('chapterRead');
            }}
          />
        )}

        {currentView === 'chapterRead' && (
          <ChapterReadingView
            chapter={activeChapter}
            onNextChapter={handleNextChapterInReading}
          />
        )}

        {/* 1. Conversational History-Taking Flow (Chat with Voice/Text/Chips/Red Flag) */}
        {currentView === 'healthChat' && (
          <HealthAssessmentView
            onNavigateToUpload={() => setCurrentView('docUpload')}
            onNavigateToSummary={() => setCurrentView('physicianSummary')}
          />
        )}

        {/* 2. Document Upload & Extraction Table */}
        {currentView === 'docUpload' && (
          <ClinicalRecordsView
            onNavigateToSummary={() => setCurrentView('physicianSummary')}
          />
        )}

        {/* 3. Physician Summary (7 Editable Clinical Sections + Previous Visits) */}
        {currentView === 'physicianSummary' && (
          <PhysicianSummaryView />
        )}
      </main>

      {/* Bottom Fixed Controls: ALL CHAPTERS + Sound Equalizer */}
      <div className="ub-bottom-controls" style={{ color: themeColor }}>
        <AllChaptersTrigger
          themeColor={themeColor}
          onClick={() => setIsModalOpen(true)}
        />
        <SoundButton themeColor={themeColor} />
      </div>

      {/* Fullscreen All Chapters Modal (Screenshot 3) */}
      <AllChaptersModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        chapters={CHAPTERS}
        activeChapter={activeChapter}
        onSelectChapter={(ch) => {
          const idx = CHAPTERS.findIndex((c) => c.id === ch.id);
          if (idx !== -1) setActiveChapterIndex(idx);
          if (ch.id === '01') {
            setCurrentView('healthChat');
          } else if (ch.id === '02') {
            setCurrentView('docUpload');
          } else if (ch.id === '03') {
            setCurrentView('physicianSummary');
          } else {
            setCurrentView('chapterRead');
          }
        }}
      />

      {/* Auth Modal (Supabase Auth + Session Persistence + 1-Click Demo Access) */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onAuthSuccess={() => {
          setCurrentView('healthChat');
        }}
      />
    </div>
  );
}
