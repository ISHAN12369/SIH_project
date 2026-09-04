import React from 'react';

export default function Navbar({
  themeColor = '#87359f',
  centerLabel = '',
  onLogoClick,
  onCourseClick,
  onStartCourseClick,
}) {
  return (
    <header className="ub-nav">
      <div className="ub-nav-logo" onClick={onLogoClick}>
        <span className="logo-top" style={{ color: themeColor }}>THE COURSE</span>
        <span className="logo-title" style={{ color: themeColor }}>
          Unleashing your<br />best version
        </span>
      </div>

      {centerLabel && (
        <div className="ub-nav-center" style={{ color: themeColor }}>
          <div className="tick" />
          <span className="label">° {centerLabel} °</span>
        </div>
      )}

      <div className="ub-nav-right" style={{ color: themeColor }}>
        <span className="ub-nav-link" onClick={onCourseClick}>
          THE COURSE
        </span>
        <button
          className="ub-btn-pill"
          style={{ borderColor: themeColor, color: themeColor }}
          onClick={onStartCourseClick}
        >
          <div className="ub-btn-pill-text-wrap">
            <span className="ub-btn-pill-text main">START COURSE</span>
            <span className="ub-btn-pill-text hover-clone">START COURSE</span>
          </div>
        </button>
      </div>
    </header>
  );
}
