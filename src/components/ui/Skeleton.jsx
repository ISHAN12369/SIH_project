import React from 'react';

export function Skeleton({ width, height, className = '' }) {
  return (
    <div
      className={`skeleton ${className}`}
      style={{
        width: width || '100%',
        height: height || '1rem',
      }}
    />
  );
}

export function SkeletonText({ lines = 3, className = '' }) {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="skeleton"
          style={{
            height: '0.875rem',
            width: i === lines - 1 ? '60%' : '100%',
          }}
        />
      ))}
    </div>
  );
}

export function SkeletonCard({ className = '' }) {
  return (
    <div className={`p-6 rounded-xl bg-[var(--color-bg-card)] border border-white/10 ${className}`}>
      <Skeleton height="1.25rem" width="40%" className="mb-4" />
      <SkeletonText lines={3} />
    </div>
  );
}
