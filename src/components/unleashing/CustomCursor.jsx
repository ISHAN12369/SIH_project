import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target;
      if (
        target.closest('button') ||
        target.closest('a') ||
        target.closest('.ub-modal-row') ||
        target.closest('.ub-nav-logo') ||
        target.closest('.ub-see-chap-btn') ||
        target.closest('.ub-btn-pill') ||
        target.closest('.ub-read-sentence')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 9999,
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        transition: 'transform 0.08s ease-out',
      }}
    >
      <div
        style={{
          width: isHovered ? '48px' : '20px',
          height: isHovered ? '48px' : '20px',
          borderRadius: '50%',
          border: '1.5px solid rgba(0, 0, 0, 0.4)',
          backgroundColor: isHovered ? 'rgba(0, 0, 0, 0.05)' : 'transparent',
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.25s cubic-bezier(0.16, 1, 0.3, 1), height 0.25s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.25s ease, border-color 0.25s ease',
          backdropFilter: isHovered ? 'blur(1px)' : 'none',
        }}
      />
    </div>
  );
}
