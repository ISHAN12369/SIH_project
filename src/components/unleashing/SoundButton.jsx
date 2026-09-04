import React, { useState, useRef, useEffect } from 'react';

export default function SoundButton({ themeColor = '#87359f' }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio('/audio/soundtrack.mp3');
    audio.loop = true;
    audio.volume = 0.35;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  const toggleSound = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Autoplay restrictions
        setIsPlaying(false);
      });
    }
  };

  return (
    <button
      className="ub-button-sound"
      onClick={toggleSound}
      style={{ color: themeColor, borderColor: themeColor }}
      title={isPlaying ? 'Mute Audio' : 'Play Background Music'}
    >
      <div className={`ub-sound-bars ${isPlaying ? 'playing' : ''}`}>
        <span className="ub-sound-bar" />
        <span className="ub-sound-bar" />
        <span className="ub-sound-bar" />
        <span className="ub-sound-bar" />
      </div>
    </button>
  );
}
