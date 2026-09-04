import React from 'react';

export default function AllChaptersTrigger({ onClick, themeColor = '#87359f' }) {
  return (
    <button
      className="ub-trg-modalchap"
      onClick={onClick}
      style={{ color: themeColor }}
      title="View All Chapters"
    >
      <div className="ub-trg-squares">
        <span className="ub-trg-square" />
        <span className="ub-trg-square" />
        <span className="ub-trg-square" />
        <span className="ub-trg-square" />
        <span className="ub-trg-square" />
        <span className="ub-trg-square" />
      </div>
      <span className="ub-trg-text">ALL CHAPTERS</span>
    </button>
  );
}
