import React, { useState } from 'react';

export default function AmbientMedicalObject({
  name,
  color = '#016c8f',
  size = 64,
  top = '20%',
  left,
  right,
  rotate = 0,
  children,
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="ambient-medical-object hidden xl:block"
      style={{
        position: 'absolute',
        top: top,
        left: left || 'auto',
        right: right || 'auto',
        width: `${size}px`,
        height: `${size}px`,
        transform: `rotate(${rotate + (isHovered ? 12 : 0)}deg) scale(${isHovered ? 1.3 : 1})`,
        transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), filter 0.3s ease, opacity 0.3s ease',
        opacity: isHovered ? 1 : 0.72,
        cursor: 'pointer',
        filter: isHovered
          ? `drop-shadow(0 14px 28px ${color}66) drop-shadow(0 0 16px ${color}50)`
          : `drop-shadow(0 4px 12px rgba(0, 0, 0, 0.08))`,
        userSelect: 'none',
        zIndex: isHovered ? 40 : 5,
        pointerEvents: 'auto',
      }}
    >
      {/* Ambient Glow */}
      <div
        style={{
          position: 'absolute',
          inset: '-8px',
          borderRadius: '50%',
          background: isHovered ? `${color}25` : 'transparent',
          transition: 'background 0.3s ease',
          filter: 'blur(8px)',
        }}
      />

      {/* SVG Icon Graphic */}
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        {children}
      </div>

      {/* Medical Tooltip on Hover */}
      {isHovered && (
        <div
          style={{
            position: 'absolute',
            bottom: '-2.4rem',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(15, 23, 42, 0.94)',
            color: '#ffffff',
            backdropFilter: 'blur(10px)',
            padding: '0.35rem 0.75rem',
            borderRadius: '9999px',
            border: `1.5px solid ${color}`,
            boxShadow: `0 8px 24px rgba(0, 0, 0, 0.3)`,
            fontSize: '0.7rem',
            fontFamily: 'var(--font-sans-bold)',
            whiteSpace: 'nowrap',
            letterSpacing: '0.04em',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            zIndex: 100,
          }}
        >
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: color }} />
          <span>{name}</span>
        </div>
      )}
    </div>
  );
}
