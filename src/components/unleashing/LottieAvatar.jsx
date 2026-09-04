import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';

export default function LottieAvatar({ path, fallbackSvg, className, style }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !path) return;

    let anim = null;
    try {
      anim = lottie.loadAnimation({
        container: containerRef.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: path,
      });
    } catch (e) {
      console.warn('Lottie load error:', e);
    }

    return () => {
      if (anim) anim.destroy();
    };
  }, [path]);

  return (
    <div
      ref={containerRef}
      className={`lottie-avatar-container ${className || ''}`}
      style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', ...style }}
    />
  );
}
