import React from 'react';
import { User } from 'lucide-react';

export default function Navbar({
  themeColor = '#016c8f',
  centerLabel = '',
  onLogoClick,
  onProfileClick,
  onStartClick,
}) {
  return (
    <header className="ub-nav">
      <div className="ub-nav-logo" onClick={onLogoClick}>
        <span className="logo-top" style={{ color: themeColor }}>MEDIKIOSK</span>
        <span className="logo-title" style={{ color: themeColor }}>
          Clinical Intake<br />& Physician Summary
        </span>
      </div>

      {centerLabel && (
        <div className="ub-nav-center" style={{ color: themeColor }}>
          <div className="tick" />
          <span className="label">° {centerLabel} °</span>
        </div>
      )}

      <div className="ub-nav-right" style={{ color: themeColor }}>
        {/* Profile Avatar Button */}
        <button
          onClick={onProfileClick}
          title="Patient Profile & Health Records"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            background: 'rgba(255, 255, 255, 0.85)',
            border: `1px solid ${themeColor}44`,
            borderRadius: '9999px',
            padding: '0.4rem 0.85rem 0.4rem 0.5rem',
            cursor: 'pointer',
            color: themeColor,
            transition: 'all 0.25s ease',
          }}
        >
          <div
            style={{
              width: '2rem',
              height: '2rem',
              borderRadius: '50%',
              background: `${themeColor}22`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <User size={15} color={themeColor} />
          </div>
          <span style={{ fontFamily: 'var(--font-sans-bold)', fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Profile
          </span>
        </button>

        {/* Start Assessment Pill Button */}
        <button
          className="ub-btn-pill"
          style={{ borderColor: themeColor, color: themeColor }}
          onClick={onStartClick}
        >
          <div className="ub-btn-pill-text-wrap">
            <span className="ub-btn-pill-text main">START ASSESSMENT</span>
            <span className="ub-btn-pill-text hover-clone">START ASSESSMENT</span>
          </div>
        </button>
      </div>
    </header>
  );
}
