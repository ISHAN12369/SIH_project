import React from 'react';

const items = [
  'SMART HISTORY',
  'VOICE INPUT',
  'DOCUMENT SCAN',
  'AI SUMMARY',
  'RED FLAG ALERTS',
  'PHYSICIAN REVIEW',
  'DIGITAL RECORDS',
  'MULTILINGUAL',
];

export default function FeaturesMarquee() {
  const content = items.map((item, i) => (
    <React.Fragment key={i}>
      <span>{item}</span>
      <span className="marquee-dot" />
    </React.Fragment>
  ));

  return (
    <div className="py-6 border-y border-white/5 overflow-hidden relative">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[var(--color-bg)] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[var(--color-bg)] to-transparent z-10 pointer-events-none" />

      <div className="marquee-track animate-marquee">
        <div className="marquee-content">{content}</div>
        <div className="marquee-content" aria-hidden="true">{content}</div>
      </div>
    </div>
  );
}
