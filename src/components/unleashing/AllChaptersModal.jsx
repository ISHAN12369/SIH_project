import React, { useState } from 'react';
import { X } from 'lucide-react';
import LottieAvatar from './LottieAvatar';

export const CLINICAL_CHAPTERS = [
  {
    id: '01',
    title: 'HEALTH ASSESSMENT',
    subtitle: 'Conversational Voice & Adaptive Questioning',
    colorStrong: '#35705b',
    colorLight: '#d6e2de',
    targetSection: 'assessment-section',
    lottiePath: '/lottie_avatar_1.json',
  },
  {
    id: '02',
    title: 'CLINICAL RECORDS',
    subtitle: 'Prescriptions & Lab Report OCR Extraction',
    colorStrong: '#f57431',
    colorLight: '#fde3d5',
    targetSection: 'records-section',
    lottiePath: '/lottie_avatar_2.json',
  },
  {
    id: '03',
    title: 'PHYSICIAN SUMMARY',
    subtitle: '7 Editable Clinical Sections & Verification',
    colorStrong: '#016c8f',
    colorLight: '#cce1e8',
    targetSection: 'summary-section',
    lottiePath: '/lottie_avatar_3.json',
  },
  {
    id: '04',
    title: 'PREVIOUS VISITS',
    subtitle: 'Longitudinal Patient History & Timeline',
    colorStrong: '#c74332',
    colorLight: '#f3d9d6',
    targetSection: 'visits-section',
    lottiePath: '/lottie_avatar_4.json',
  },
  {
    id: '05',
    title: 'PATIENT PROFILE',
    subtitle: 'ABHA ID, Demographics & Local Database Cache',
    colorStrong: '#87359f',
    colorLight: '#e7d6eb',
    targetSection: 'profile',
    lottiePath: '/lottie_avatar_5.json',
  },
];

export default function AllChaptersModal({
  isOpen,
  onClose,
  onSelectFeature,
}) {
  const [hoveredChapter, setHoveredChapter] = useState(null);

  if (!isOpen) return null;

  const currentBg = hoveredChapter ? hoveredChapter.colorLight : '#ffffff';

  const playClickSound = () => {
    try {
      const snd = new Audio('/audio/click.mp3');
      snd.volume = 0.4;
      snd.play().catch(() => {});
    } catch (e) {}
  };

  const handleSelect = (ch) => {
    playClickSound();
    onSelectFeature(ch);
    onClose();
  };

  return (
    <div className="ub-modal-chapters" style={{ backgroundColor: currentBg }}>
      {/* Top Bar */}
      <div className="ub-modal-top-bar">
        <div className="ub-nav-logo" onClick={onClose}>
          <span className="logo-top" style={{ color: '#000000' }}>MEDIKIOSK</span>
          <span className="logo-title" style={{ color: '#000000' }}>
            Clinical Intake<br />& Physician Summary
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button className="ub-modal-close-btn" onClick={onClose} title="Close Menu">
            <X size={18} color="#000000" />
          </button>
        </div>
      </div>

      {/* Chapters Stacked List */}
      <div className="ub-modal-list">
        {CLINICAL_CHAPTERS.map((ch) => {
          const isHovered = hoveredChapter?.id === ch.id;
          return (
            <div
              key={ch.id}
              className="ub-modal-row"
              style={{ color: ch.colorStrong }}
              onMouseEnter={() => setHoveredChapter(ch)}
              onMouseLeave={() => setHoveredChapter(null)}
              onClick={() => handleSelect(ch)}
            >
              <div
                className="ub-modal-row-badge"
                style={{
                  borderColor: isHovered ? ch.colorStrong : 'rgba(0,0,0,0.25)',
                  color: isHovered ? ch.colorStrong : '#000000',
                  background: isHovered ? 'rgba(255,255,255,0.8)' : 'transparent',
                }}
              >
                {ch.id}
              </div>

              <div>
                <div className="ub-modal-row-title">{ch.title}</div>
                <div style={{ fontSize: '0.8rem', fontFamily: 'var(--font-sans)', opacity: 0.7, marginTop: '0.2rem' }}>
                  {ch.subtitle}
                </div>
              </div>

              {/* Avatar Preview on Hover */}
              <div className="ub-modal-row-avatar-preview">
                <LottieAvatar
                  path={ch.lottiePath}
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
