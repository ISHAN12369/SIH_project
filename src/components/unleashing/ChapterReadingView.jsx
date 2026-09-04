import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause } from 'lucide-react';

export default function ChapterReadingView({
  chapter = {
    id: '03',
    title: 'SUCCESSFUL PEOPLE',
    colorStrong: '#016c8f',
    colorLight: '#cce1e8',
  },
  onNextChapter,
}) {
  const [activeSentenceIndex, setActiveSentenceIndex] = useState(1);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [progress, setProgress] = useState(35);
  const timerRef = useRef(null);

  const sentences = [
    "In this chapter, I'm sharing some important daily keys that I use to and help me improve my performance and always put me on track. ",
    "Giving me the motivation, focus, ",
    "and ability to extract my best every single day. ",
    "Also, some important examples are discussed to map essential actions that successful people apply in their life to become references and highlighted in their fields.",
  ];

  const quote =
    '“The clock works in the way, giving 24 hours to everybody. Why dodo some people produce two or three times more than others? This happens mainly because those people focus on goals, do what must be done, and ignore what only gives pleasure.”';

  const toggleNarration = () => {
    setIsPlayingAudio((prev) => !prev);
  };

  useEffect(() => {
    if (isPlayingAudio) {
      timerRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlayingAudio(false);
            return 0;
          }
          const next = prev + 3;
          if (next > 70) setActiveSentenceIndex(3);
          else if (next > 45) setActiveSentenceIndex(2);
          else if (next > 20) setActiveSentenceIndex(1);
          else setActiveSentenceIndex(0);
          return next;
        });
      }, 500);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlayingAudio]);

  return (
    <div
      className="ub-chapter-read-view"
      style={{
        '--theme-bg': chapter.colorLight || '#cce1e8',
        '--theme-color': chapter.colorStrong || '#016c8f',
      }}
    >
      <div className="ub-read-hero-section">
        {/* Main Editorial Text with Sentence Scrub Highlighting */}
        <div className="ub-read-paragraph">
          {sentences.map((text, idx) => {
            const isRead = idx <= activeSentenceIndex;
            return (
              <span
                key={idx}
                className={`ub-read-sentence ${isRead ? 'active' : 'faded'}`}
                onClick={() => setActiveSentenceIndex(idx)}
                title="Click to highlight reading position"
              >
                {text}
              </span>
            );
          })}
        </div>

        {/* Audio Player Bar */}
        <div className="ub-audio-narration-bar" style={{ color: chapter.colorStrong }}>
          <button
            className="ub-audio-play-btn"
            onClick={toggleNarration}
            style={{ backgroundColor: chapter.colorStrong }}
          >
            {isPlayingAudio ? <Pause size={14} fill="#fff" /> : <Play size={14} fill="#fff" style={{ marginLeft: '2px' }} />}
          </button>
          <div className="ub-audio-time">
            CHAPTER DURATION (00:30) • 00:{String(Math.floor((progress / 100) * 30)).padStart(2, '0')} / 00:30
          </div>
          <div
            className="ub-audio-progress-track"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              const newPct = (clickX / rect.width) * 100;
              setProgress(newPct);
            }}
          >
            <div
              className="ub-audio-progress-fill"
              style={{ width: `${progress}%`, backgroundColor: chapter.colorStrong }}
            />
          </div>
        </div>

        {/* Quote Block on Right */}
        <div className="ub-read-quote-container" style={{ color: chapter.colorStrong }}>
          <div className="ub-quote-divider" style={{ backgroundColor: chapter.colorStrong }} />
          <p className="ub-quote-text">{quote}</p>
        </div>

        {/* Next Chapter Teaser at Bottom */}
        <div className="ub-next-teaser-section">
          <div className="ub-next-teaser-header" style={{ color: chapter.colorStrong }}>
            <span>NEXT CHAPTER</span>
            <span style={{ marginTop: '0.4rem', opacity: 0.6 }}>CHAPTER ∙ 04</span>
          </div>

          <div
            className="ub-marquee-container"
            style={{ position: 'relative', top: 'auto', transform: 'none', margin: '2rem 0', color: chapter.colorStrong }}
          >
            <div className="ub-marquee-track">
              <span className="ub-marquee-text" style={{ fontSize: 'clamp(4rem, 8vw, 7rem)' }}>
                POSITIONING <span className="ub-marquee-dot">•</span> POSITIONING <span className="ub-marquee-dot">•</span> POSITIONING <span className="ub-marquee-dot">•</span>
              </span>
              <span className="ub-marquee-text" style={{ fontSize: 'clamp(4rem, 8vw, 7rem)' }}>
                POSITIONING <span className="ub-marquee-dot">•</span> POSITIONING <span className="ub-marquee-dot">•</span> POSITIONING <span className="ub-marquee-dot">•</span>
              </span>
            </div>
          </div>

          <button
            className="ub-see-chap-btn"
            style={{
              borderColor: `${chapter.colorStrong}44`,
              color: chapter.colorStrong,
              marginTop: '1rem',
            }}
            onClick={onNextChapter}
          >
            SEE CHAPTER
          </button>
        </div>
      </div>
    </div>
  );
}
