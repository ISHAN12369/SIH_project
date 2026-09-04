import React, { useState } from 'react';
import '../styles/unleashing.css';
import Navbar from '../components/unleashing/Navbar';
import HeroDomeView from '../components/unleashing/HeroDomeView';
import NextChapterBanner from '../components/unleashing/NextChapterBanner';
import ChapterReadingView from '../components/unleashing/ChapterReadingView';
import AllChaptersModal from '../components/unleashing/AllChaptersModal';
import AllChaptersTrigger from '../components/unleashing/AllChaptersTrigger';
import SoundButton from '../components/unleashing/SoundButton';
import CustomCursor from '../components/unleashing/CustomCursor';
import { CHAPTERS } from '../data/unleashingChapters';

export default function UnleashingPage() {
  // Current view: 'hero' (SS 1) | 'nextChapter' (SS 2) | 'chapterRead' (SS 4)
  const [currentView, setCurrentView] = useState('chapterRead');
  const [activeChapterIndex, setActiveChapterIndex] = useState(2); // Chapter 3 (Successful People)
  const [isModalOpen, setIsModalOpen] = useState(false);

  const activeChapter = CHAPTERS[activeChapterIndex] || CHAPTERS[0];

  // Dynamic theme colors
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
  }

  const handleStartCourse = () => {
    setCurrentView('nextChapter');
  };

  const handleNextChapterInReading = () => {
    // Jump to next chapter (e.g. Chapter 4 Positioning)
    const nextIdx = (activeChapterIndex + 1) % CHAPTERS.length;
    setActiveChapterIndex(nextIdx);
    setCurrentView('chapterRead');
  };

  return (
    <div
      className="unleashing-app"
      style={{
        backgroundColor: currentView === 'chapterRead' ? activeChapter.colorLight : '#ffffff',
      }}
    >
      <CustomCursor />

      {/* Floating Demo View Switcher to quickly jump between the 4 exact screenshots */}
      <div className="ub-view-switcher">
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
          className={`ub-view-tab ${isModalOpen ? 'active' : ''}`}
          onClick={() => setIsModalOpen(true)}
        >
          4. All Chapters Menu
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
          setCurrentView('chapterRead');
        }}
      />
    </div>
  );
}
