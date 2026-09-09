import React from 'react';
import { User } from 'lucide-react';
import ChapterNavBar from './ChapterNavBar';

export default function Navbar({
  themeColor = '#016c8f',
  activeSection = 'assessment-section',
  onSelectChapter,
  onLogoClick,
  onProfileClick,
  onStartClick,
}) {
  return (
    <header className="ub-nav">
      <div className="ub-nav-logo" onClick={onLogoClick}>
        <span className="logo-top" style={{ color: themeColor }}>MEDU VADA</span>
        <span className="logo-title" style={{ color: themeColor }}>
          Clinical Intake<br />& Physician Summary
        </span>
      </div>

      {/* Top Chapter Navigation Bar with Face Previews on Hover */}
      <div className="ub-nav-center-chapters hidden md:flex" style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
        <ChapterNavBar
          activeSection={activeSection}
          onSelectChapter={onSelectChapter}
          themeColor={themeColor}
        />
      </div>

      <div className="ub-nav-right" style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
        {/* Profile Avatar Button */}
        <button
          onClick={onProfileClick}
          title="Patient Profile & Health Records"
          className="ub-nav-btn-profile"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.55rem',
            background: '#ffffff',
            border: `1.5px solid ${themeColor}`,
            borderRadius: '9999px',
            padding: '0.42rem 1rem 0.42rem 0.55rem',
            cursor: 'pointer',
            color: themeColor,
            opacity: 1,
            boxShadow: '0 4px 14px rgba(0, 0, 0, 0.08)',
            transition: 'all 0.25s ease',
          }}
        >
          <div
            style={{
              width: '1.95rem',
              height: '1.95rem',
              borderRadius: '50%',
              background: `${themeColor}22`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <User size={15} color={themeColor} strokeWidth={2.4} />
          </div>
          <span style={{ fontFamily: 'var(--font-sans-bold)', fontSize: '0.74rem', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 700 }}>
            Profile
          </span>
        </button>

        {/* Start Assessment Pill Button */}
        <button
          className="ub-btn-pill"
          style={{
            background: '#ffffff',
            border: `1.5px solid ${themeColor}`,
            color: themeColor,
            opacity: 1,
            boxShadow: '0 4px 14px rgba(0, 0, 0, 0.08)',
            padding: '0.62rem 1.6rem',
          }}
          onClick={onStartClick}
        >
          <div className="ub-btn-pill-text-wrap">
            <span className="ub-btn-pill-text main" style={{ fontWeight: 700, letterSpacing: '0.1em' }}>START ASSESSMENT</span>
            <span className="ub-btn-pill-text hover-clone" style={{ fontWeight: 700, letterSpacing: '0.1em' }}>START ASSESSMENT</span>
          </div>
        </button>
      </div>
    </header>
  );
}
