import React from 'react';
import LottieAvatar from './LottieAvatar';

export default function HeroDomeView({ onExploreClick }) {
  return (
    <div className="ub-hero-view">
      {/* Curved lavender dome at the top */}
      <div className="ub-hero-dome-bg" />

      {/* Avatar Spotlight at bottom center */}
      <div className="ub-hero-avatar-area" onClick={onExploreClick} style={{ cursor: 'pointer' }}>
        <div className="ub-hero-avatar-ring">
          <div className="ub-hero-avatar-inner">
            <LottieAvatar
              path="/lottie_avatar_5.json"
              className="ub-hero-avatar-lottie"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
