import React, { useState } from 'react';
import { X } from 'lucide-react';
import LottieAvatar from './LottieAvatar';

export default function AllChaptersModal({
  isOpen,
  onClose,
  chapters = [],
  activeChapter,
  onSelectChapter,
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
    onSelectChapter(ch);
    onClose();
  };

  return (
    <div className="ub-modal-chapters" style={{ backgroundColor: currentBg }}>
      {/* Top Bar */}
      <div className="ub-modal-top-bar">
        <div className="ub-nav-logo" onClick={onClose}>
          <span className="logo-top" style={{ color: '#000000' }}>THE COURSE</span>
          <span className="logo-title" style={{ color: '#000000' }}>
            Unleashing your<br />best version
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button className="ub-modal-close-btn" onClick={onClose} title="Close Menu">
            <X size={18} color="#000000" />
          </button>

          <button className="ub-btn-pill" style={{ borderColor: '#000000', color: '#000000' }}>
            <div className="ub-btn-pill-text-wrap">
              <span className="ub-btn-pill-text main">START COURSE</span>
              <span className="ub-btn-pill-text hover-clone">START COURSE</span>
            </div>
          </button>
        </div>
      </div>

      {/* Chapters Stacked List */}
      <div className="ub-modal-list">
        {chapters.map((ch) => {
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

              <div className="ub-modal-row-title">{ch.title}</div>

              {/* Avatar Preview on Hover */}
              <div className="ub-modal-row-avatar-preview">
                <LottieAvatar
                  path={`/lottie_avatar_${parseInt(ch.id, 10)}.json`}
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
