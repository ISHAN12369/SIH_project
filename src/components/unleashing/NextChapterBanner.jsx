import React from 'react';
import LottieAvatar from './LottieAvatar';

export default function NextChapterBanner({
  chapter = {
    id: '01',
    title: 'WELL-BEING',
    colorStrong: '#35705b',
    colorLight: '#ddf3ec',
    lottiePath: '/lottie_avatar_1.json',
  },
  onSeeChapter,
}) {
  const repeatedTitle = `${chapter.title} • ${chapter.title} • ${chapter.title} • ${chapter.title} • `;

  const playClickSound = () => {
    try {
      const snd = new Audio('/audio/click.mp3');
      snd.volume = 0.4;
      snd.play().catch(() => {});
    } catch (e) {}
  };

  const handleSeeClick = () => {
    playClickSound();
    if (onSeeChapter) onSeeChapter();
  };

  return (
    <div className="ub-next-chap-view">
      {/* Chapter Number Indicator */}
      <div className="ub-chap-num-tag" style={{ color: chapter.colorStrong }}>
        CHAPTER • {chapter.id}
      </div>

      {/* Infinite Horizontal Typography Marquee */}
      <div className="ub-marquee-container" style={{ color: chapter.colorStrong }}>
        <div className="ub-marquee-track">
          <span className="ub-marquee-text">
            {chapter.title} <span className="ub-marquee-dot">•</span>
            {chapter.title} <span className="ub-marquee-dot">•</span>
            {chapter.title} <span className="ub-marquee-dot">•</span>
            {chapter.title} <span className="ub-marquee-dot">•</span>
          </span>
          <span className="ub-marquee-text">
            {chapter.title} <span className="ub-marquee-dot">•</span>
            {chapter.title} <span className="ub-marquee-dot">•</span>
            {chapter.title} <span className="ub-marquee-dot">•</span>
            {chapter.title} <span className="ub-marquee-dot">•</span>
          </span>
        </div>
      </div>

      {/* Central Circular Avatar */}
      <div className="ub-next-avatar-wrapper">
        <div className="ub-next-avatar-inner-circle">
          <LottieAvatar
            path={chapter.lottiePath || `/lottie_avatar_${parseInt(chapter.id, 10)}.json`}
            className="ub-next-avatar-lottie"
          />
        </div>
      </div>

      {/* SEE CHAPTER Button */}
      <div className="ub-see-chap-btn-wrap">
        <button
          className="ub-see-chap-btn"
          style={{ borderColor: `${chapter.colorStrong}33`, color: chapter.colorStrong }}
          onClick={handleSeeClick}
        >
          SEE CHAPTER
        </button>
      </div>
    </div>
  );
}
