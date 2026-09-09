import React, { useState } from 'react';
import LottieAvatar from './LottieAvatar';
import { CLINICAL_CHAPTERS } from './AllChaptersModal';
import { ArrowUpRight } from 'lucide-react';

export default function ChapterNavBar({
  activeSection = 'assessment-section',
  onSelectChapter,
  themeColor = '#016c8f',
}) {
  const [hoveredId, setHoveredId] = useState(null);

  const getIsActive = (chap) => {
    if (chap.targetSection === 'profile') return false;
    return activeSection === chap.targetSection;
  };

  return (
    <nav
      className="chapter-nav-bar"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.35rem',
        background: 'rgba(255, 255, 255, 0.92)',
        backdropFilter: 'blur(14px)',
        padding: '0.35rem 0.6rem',
        borderRadius: '9999px',
        border: '1.5px solid rgba(0, 0, 0, 0.08)',
        boxShadow: '0 6px 24px -2px rgba(0, 0, 0, 0.08)',
        position: 'relative',
      }}
    >
      {CLINICAL_CHAPTERS.map((chap) => {
        const isActive = getIsActive(chap);
        const isHovered = hoveredId === chap.id;

        return (
          <div
            key={chap.id}
            style={{ position: 'relative' }}
            onMouseEnter={() => setHoveredId(chap.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {/* Chapter Tab Button */}
            <button
              onClick={() => onSelectChapter && onSelectChapter(chap)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.45rem 0.85rem',
                borderRadius: '9999px',
                border: 'none',
                background: isActive
                  ? `${chap.colorStrong}18`
                  : isHovered
                  ? 'rgba(0, 0, 0, 0.06)'
                  : 'transparent',
                color: isActive ? chap.colorStrong : '#1e293b',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontFamily: 'var(--font-sans-bold)',
                fontSize: '0.75rem',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
              }}
            >
              {/* Chapter Number Badge */}
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '1.3rem',
                  height: '1.3rem',
                  borderRadius: '50%',
                  background: isActive ? chap.colorStrong : `${chap.colorStrong}22`,
                  color: isActive ? '#ffffff' : chap.colorStrong,
                  fontSize: '0.64rem',
                  fontWeight: 800,
                  transition: 'all 0.2s ease',
                }}
              >
                {chap.id}
              </span>

              {/* Label */}
              <span>{chap.title.split(' ')[0]}</span>

              {/* Active Pulse Indicator */}
              {isActive && (
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: chap.colorStrong,
                    boxShadow: `0 0 8px ${chap.colorStrong}`,
                  }}
                />
              )}
            </button>

            {/* Always-Mounted Animated Face Popup Card with Instant CSS Visibility */}
            <div
              style={{
                position: 'absolute',
                top: 'calc(100% + 0.85rem)',
                left: '50%',
                transform: isHovered
                  ? 'translateX(-50%) translateY(0) scale(1)'
                  : 'translateX(-50%) translateY(-10px) scale(0.95)',
                opacity: isHovered ? 1 : 0,
                visibility: isHovered ? 'visible' : 'hidden',
                pointerEvents: isHovered ? 'auto' : 'none',
                zIndex: 200,
                width: '18.5rem',
                background: '#ffffff',
                borderRadius: '1.5rem',
                boxShadow: `0 20px 40px -8px ${chap.colorStrong}38, 0 8px 24px rgba(0, 0, 0, 0.12)`,
                border: `2px solid ${chap.colorStrong}33`,
                padding: '1.35rem 1.15rem 1.15rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                transition: 'opacity 0.22s cubic-bezier(0.16, 1, 0.3, 1), transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.22s',
                cursor: 'pointer',
              }}
              onClick={() => onSelectChapter && onSelectChapter(chap)}
            >
              {/* Pointer Triangle */}
              <div
                style={{
                  position: 'absolute',
                  top: '-7px',
                  left: '50%',
                  transform: 'translateX(-50%) rotate(45deg)',
                  width: '12px',
                  height: '12px',
                  background: '#ffffff',
                  borderTop: `2px solid ${chap.colorStrong}33`,
                  borderLeft: `2px solid ${chap.colorStrong}33`,
                }}
              />

              {/* Circular Chapter Face Avatar (Pre-rendered and cached) */}
              <div
                style={{
                  width: '6.75rem',
                  height: '6.75rem',
                  borderRadius: '50%',
                  background: chap.colorLight,
                  border: `3px solid ${chap.colorStrong}`,
                  boxShadow: `0 10px 24px ${chap.colorStrong}30`,
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '0.85rem',
                  position: 'relative',
                }}
              >
                <LottieAvatar
                  path={chap.lottiePath}
                  style={{
                    width: '115%',
                    height: '115%',
                    transform: 'scale(1.12) translateY(2%)',
                  }}
                />
              </div>

              {/* Chapter Meta */}
              <span
                style={{
                  fontFamily: 'var(--font-sans-bold)',
                  fontSize: '0.68rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: chap.colorStrong,
                  marginBottom: '0.2rem',
                }}
              >
                CHAPTER • {chap.id}
              </span>

              <h4
                style={{
                  fontFamily: 'var(--font-sans-bold)',
                  fontSize: '1.05rem',
                  color: '#0f172a',
                  margin: '0.1rem 0 0.35rem',
                  lineHeight: 1.25,
                  letterSpacing: '0.02em',
                }}
              >
                {chap.title}
              </h4>

              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.76rem',
                  color: '#475569',
                  margin: '0 0 0.85rem',
                  lineHeight: 1.4,
                }}
              >
                {chap.subtitle}
              </p>

              {/* Action Button */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.42rem 1.1rem',
                  borderRadius: '9999px',
                  background: chap.colorStrong,
                  color: '#ffffff',
                  fontSize: '0.72rem',
                  fontFamily: 'var(--font-sans-bold)',
                  letterSpacing: '0.05em',
                  boxShadow: `0 6px 16px ${chap.colorStrong}44`,
                  transition: 'transform 0.2s ease',
                }}
                className="hover:scale-105"
              >
                <span>OPEN CHAPTER</span>
                <ArrowUpRight size={13} />
              </div>
            </div>
          </div>
        );
      })}
    </nav>
  );
}
