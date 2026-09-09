import React, { useState, useEffect, useRef } from 'react';
import LottieAvatar from './LottieAvatar';
import { Stethoscope, ShieldCheck, Heart, Sparkles } from 'lucide-react';

export default function DoctorAvatar({ size = 270, showGreeting = true, onStartAssessment }) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const faceRef = useRef(null);
  const overlayRef = useRef(null);
  const badgeRightRef = useRef(null);
  const badgeLeftRef = useRef(null);
  const speechRef = useRef(null);

  // Mouse responsiveness with smooth 3D physics (lerp)
  useEffect(() => {
    let animId = null;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Distance from avatar center normalized to -1 .. 1
      const dx = (e.clientX - centerX) / (window.innerWidth * 0.45);
      const dy = (e.clientY - centerY) / (window.innerHeight * 0.45);

      // Clamp
      targetX = Math.max(-1, Math.min(1, dx));
      targetY = Math.max(-1, Math.min(1, dy));
    };

    const handleMouseLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    const updatePhysics = () => {
      // Smooth linear interpolation
      currentX += (targetX - currentX) * 0.085;
      currentY += (targetY - currentY) * 0.085;

      const tiltY = currentX * 16; // degrees rotation along Y
      const tiltX = -currentY * 16; // degrees rotation along X

      if (cardRef.current) {
        cardRef.current.style.transform = `perspective(1000px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg)`;
      }

      if (faceRef.current) {
        faceRef.current.style.transform = `translate3d(${(currentX * 12).toFixed(1)}px, ${(currentY * 12).toFixed(1)}px, 15px) scale(1.08)`;
      }

      if (overlayRef.current) {
        overlayRef.current.style.transform = `translate3d(${(currentX * 6).toFixed(1)}px, ${(currentY * 6).toFixed(1)}px, 35px) scale(1.08)`;
      }

      if (badgeRightRef.current) {
        badgeRightRef.current.style.transform = `translate3d(${(currentX * 22).toFixed(1)}px, ${(currentY * 18).toFixed(1)}px, 50px)`;
      }

      if (badgeLeftRef.current) {
        badgeLeftRef.current.style.transform = `translate3d(${(currentX * 22).toFixed(1)}px, ${(currentY * 18).toFixed(1)}px, 50px)`;
      }

      if (speechRef.current) {
        speechRef.current.style.transform = `translate3d(${(currentX * 8).toFixed(1)}px, ${(currentY * 6).toFixed(1)}px, 25px)`;
      }

      animId = requestAnimationFrame(updatePhysics);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    animId = requestAnimationFrame(updatePhysics);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  const handleAvatarClick = () => {
    setIsSpeaking((prev) => !prev);
    try {
      const snd = new Audio('/audio/click.mp3');
      snd.volume = 0.35;
      snd.play().catch(() => {});
    } catch (e) {}
  };

  return (
    <div
      ref={containerRef}
      className="doctor-avatar-wrapper"
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        margin: '0 auto 1.5rem',
        textAlign: 'center',
        perspective: '1200px',
      }}
    >
      {/* Centered Interactive Speech Bubble */}
      {showGreeting && (
        <div
          ref={speechRef}
          onClick={handleAvatarClick}
          style={{
            position: 'relative',
            marginBottom: '1.25rem',
            padding: '0.65rem 1.4rem',
            background: 'rgba(255, 255, 255, 0.96)',
            border: '1.5px solid #016c8f',
            borderRadius: '9999px',
            boxShadow: '0 10px 30px -5px rgba(1, 108, 143, 0.18)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.65rem',
            cursor: 'pointer',
            backdropFilter: 'blur(10px)',
            maxWidth: '92vw',
            transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
            transformStyle: 'preserve-3d',
            willChange: 'transform',
          }}
          className="hover:scale-105"
        >
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#016c8f',
              boxShadow: '0 0 10px #016c8f',
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-sans-bold)',
              fontSize: '0.85rem',
              color: '#016c8f',
              letterSpacing: '0.03em',
            }}
          >
            {isSpeaking
              ? "“Ready for triage! Tell me your symptoms or upload your reports.”"
              : "“Hello, I'm Dr. Medu Vada. Let's begin your pre-consultation!”"}
          </span>
          <Sparkles size={15} color="#016c8f" />

          {/* Symmetrically Centered Speech Bubble Pointer */}
          <div
            style={{
              position: 'absolute',
              bottom: '-7px',
              left: '50%',
              transform: 'translateX(-50%) rotate(45deg)',
              width: '12px',
              height: '12px',
              background: '#ffffff',
              borderRight: '1.5px solid #016c8f',
              borderBottom: '1.5px solid #016c8f',
            }}
          />
        </div>
      )}

      {/* Main Responsive Avatar Stage with 3D Tilt */}
      <div
        ref={cardRef}
        style={{
          position: 'relative',
          width: `${size}px`,
          height: `${size}px`,
          cursor: 'pointer',
          transformStyle: 'preserve-3d',
          willChange: 'transform',
          transition: isHovered ? 'none' : 'transform 0.5s ease-out',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleAvatarClick}
        title="Dr. Medu Vada — Interactive Clinical AI (Moves with your cursor!)"
      >
        {/* Glowing Vital Pulsing Rings (React to Mouse) */}
        <div
          style={{
            position: 'absolute',
            inset: '-16px',
            borderRadius: '50%',
            border: '2px dashed rgba(1, 108, 143, 0.3)',
            animation: 'spin 35s linear infinite',
            pointerEvents: 'none',
            transform: 'translateZ(-10px)',
            transition: 'all 0.3s ease',
            filter: isHovered ? 'drop-shadow(0 0 12px rgba(1, 108, 143, 0.4))' : 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: '-6px',
            borderRadius: '50%',
            border: `2px solid ${isHovered ? 'rgba(1, 108, 143, 0.7)' : 'rgba(1, 108, 143, 0.35)'}`,
            boxShadow: isHovered
              ? '0 0 30px rgba(1, 108, 143, 0.35), inset 0 0 15px rgba(1, 108, 143, 0.2)'
              : '0 0 20px rgba(1, 108, 143, 0.16)',
            pointerEvents: 'none',
            transform: 'translateZ(-5px)',
            transition: 'all 0.3s ease',
          }}
        />

        {/* Circular Avatar Frame */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            overflow: 'hidden',
            background: 'radial-gradient(circle at center, #dff0f5 0%, #cce1e8 100%)',
            boxShadow: isHovered
              ? '0 24px 48px -10px rgba(1, 108, 143, 0.38), inset 0 2px 8px rgba(255, 255, 255, 0.9)'
              : '0 16px 36px -8px rgba(1, 108, 143, 0.26), inset 0 2px 6px rgba(255, 255, 255, 0.8)',
            border: '3.5px solid #ffffff',
            transformStyle: 'preserve-3d',
            transition: 'box-shadow 0.3s ease',
          }}
        >
          {/* Base Animated Lottie Character (Parallax Depth Layer 1) */}
          <div
            ref={faceRef}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              transform: 'scale(1.08)',
              willChange: 'transform',
            }}
          >
            <LottieAvatar
              path="/lottie_avatar_3.json"
              style={{
                width: '100%',
                height: '100%',
              }}
            />
          </div>

          {/* Doctor Attire SVG Overlay (Parallax Depth Layer 2) */}
          <svg
            ref={overlayRef}
            viewBox="0 0 1000 1000"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
              transform: 'scale(1.08)',
              willChange: 'transform',
            }}
          >
            <defs>
              <linearGradient id="labCoatGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="60%" stopColor="#f8fafc" />
                <stop offset="100%" stopColor="#e2e8f0" />
              </linearGradient>

              <linearGradient id="lapelGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#edf2f7" />
              </linearGradient>

              <linearGradient id="stethTubing" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e293b" />
                <stop offset="50%" stopColor="#0f172a" />
                <stop offset="100%" stopColor="#334155" />
              </linearGradient>

              <linearGradient id="stethMetal" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#e2e8f0" />
                <stop offset="45%" stopColor="#ffffff" />
                <stop offset="70%" stopColor="#94a3b8" />
                <stop offset="100%" stopColor="#cbd5e1" />
              </linearGradient>

              <radialGradient id="headMirrorGrad" cx="40%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="45%" stopColor="#cbd5e1" />
                <stop offset="85%" stopColor="#64748b" />
                <stop offset="100%" stopColor="#334155" />
              </radialGradient>

              <filter id="doctorGlow" x="-10%" y="-10%" width="120%" height="120%">
                <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000000" floodOpacity="0.18" />
              </filter>
            </defs>

            {/* 1. DOCTOR HEAD MIRROR */}
            <g id="doctor-head-mirror">
              <path
                d="M 375 352 Q 500 340 625 352"
                fill="none"
                stroke="#334155"
                strokeWidth="10"
                strokeLinecap="round"
                opacity="0.85"
              />
              <rect x="492" y="322" width="16" height="26" rx="4" fill="url(#stethMetal)" />
              <circle cx="500" cy="326" r="30" fill="url(#headMirrorGrad)" filter="url(#doctorGlow)" stroke="#f8fafc" strokeWidth="3" />
              <circle cx="500" cy="326" r="8" fill="#0f172a" />
              <path
                d="M 482 312 A 20 20 0 0 1 518 312"
                fill="none"
                stroke="#ffffff"
                strokeWidth="3.5"
                strokeLinecap="round"
                opacity="0.8"
              />
            </g>

            {/* 2. WHITE DOCTOR LAB COAT */}
            <g id="doctor-lab-coat" filter="url(#doctorGlow)">
              <path
                d="M 270 790 
                   Q 330 680 435 680 
                   L 460 740
                   L 500 810 
                   L 540 740 
                   L 565 680 
                   Q 670 680 730 790 
                   L 730 920 
                   L 270 920 Z"
                fill="url(#labCoatGrad)"
                stroke="#cbd5e1"
                strokeWidth="3"
              />

              {/* Inner Medical Scrub V-Neck (Teal-Blue #016c8f) */}
              <path
                d="M 435 680 L 500 785 L 565 680 Z"
                fill="#016c8f"
              />

              {/* Left Lapel */}
              <path
                d="M 435 680 L 468 765 L 430 785 L 375 745 Z"
                fill="url(#lapelGrad)"
                stroke="#cbd5e1"
                strokeWidth="2.5"
              />
              <path
                d="M 468 765 L 500 835 L 460 920 L 410 920 L 430 785 Z"
                fill="url(#lapelGrad)"
                stroke="#cbd5e1"
                strokeWidth="2.5"
              />

              {/* Right Lapel */}
              <path
                d="M 565 680 L 532 765 L 570 785 L 625 745 Z"
                fill="url(#lapelGrad)"
                stroke="#cbd5e1"
                strokeWidth="2.5"
              />
              <path
                d="M 532 765 L 500 835 L 540 920 L 590 920 L 570 785 Z"
                fill="url(#lapelGrad)"
                stroke="#cbd5e1"
                strokeWidth="2.5"
              />

              {/* Coat Central Button Seam */}
              <line x1="500" y1="835" x2="500" y2="920" stroke="#cbd5e1" strokeWidth="3" strokeDasharray="6 4" />

              {/* Left Chest Pocket */}
              <path
                d="M 345 810 L 415 810 L 410 870 Q 380 885 350 870 Z"
                fill="#ffffff"
                stroke="#cbd5e1"
                strokeWidth="2"
              />

              {/* Clinical Pen in Pocket */}
              <rect x="360" y="785" width="8" height="30" rx="3" fill="#016c8f" />
              <rect x="358" y="795" width="4" height="15" rx="1" fill="url(#stethMetal)" />

              {/* Diagnostic Penlight / Thermometer */}
              <rect x="375" y="780" width="7" height="35" rx="3" fill="#ffffff" stroke="#94a3b8" strokeWidth="1.5" />
              <rect x="377" y="798" width="3" height="10" fill="#ef4444" />

              {/* DOCTOR ID BADGE (DR. MEDU VADA) */}
              <g id="doctor-badge" transform="translate(605, 805)">
                <rect x="25" y="-12" width="12" height="14" rx="2" fill="url(#stethMetal)" />
                <rect x="0" y="0" width="62" height="42" rx="4" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" filter="url(#doctorGlow)" />
                <rect x="0" y="0" width="62" height="12" rx="3" fill="#016c8f" />
                <path d="M 12 21 L 18 21 M 15 18 L 15 24" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
                <text x="24" y="22" fontFamily="sans-serif" fontSize="7" fontWeight="bold" fill="#016c8f">DR. MEDU</text>
                <text x="24" y="32" fontFamily="sans-serif" fontSize="6" fontWeight="bold" fill="#64748b">AI M.D.</text>
              </g>
            </g>

            {/* 3. DOCTOR STETHOSCOPE */}
            <g id="doctor-stethoscope" filter="url(#doctorGlow)">
              {/* Binaural Metal Tubes */}
              <path
                d="M 430 575 Q 425 640 445 680"
                fill="none"
                stroke="url(#stethMetal)"
                strokeWidth="9"
                strokeLinecap="round"
              />
              <path
                d="M 570 575 Q 575 640 555 680"
                fill="none"
                stroke="url(#stethMetal)"
                strokeWidth="9"
                strokeLinecap="round"
              />

              <circle cx="430" cy="570" r="7" fill="#0f172a" />
              <circle cx="570" cy="570" r="7" fill="#0f172a" />

              {/* Flexible Tubing draped around shoulders */}
              <path
                d="M 445 675 C 435 730, 440 770, 485 790"
                fill="none"
                stroke="url(#stethTubing)"
                strokeWidth="12"
                strokeLinecap="round"
              />
              <path
                d="M 555 675 C 565 730, 560 770, 515 790"
                fill="none"
                stroke="url(#stethTubing)"
                strokeWidth="12"
                strokeLinecap="round"
              />

              {/* Chrome Y-Connector */}
              <path
                d="M 485 788 Q 500 798 515 788 L 506 815 L 494 815 Z"
                fill="url(#stethMetal)"
                stroke="#64748b"
                strokeWidth="1"
              />
              <rect x="494" y="812" width="12" height="16" rx="2" fill="url(#stethMetal)" />

              <line x1="500" y1="826" x2="500" y2="850" stroke="url(#stethTubing)" strokeWidth="11" strokeLinecap="round" />

              {/* Stethoscope Chestpiece */}
              <circle cx="500" cy="862" r="32" fill="url(#stethMetal)" stroke="#64748b" strokeWidth="2" filter="url(#doctorGlow)" />
              <circle cx="500" cy="862" r="24" fill="#1e293b" />
              <circle cx="500" cy="862" r="17" fill="url(#stethMetal)" />
              <path
                d="M 500 852 L 500 872 M 490 862 L 510 862"
                stroke="#016c8f"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M 478 850 A 24 24 0 0 1 522 850"
                fill="none"
                stroke="#ffffff"
                strokeWidth="3"
                strokeLinecap="round"
                opacity="0.8"
              />
            </g>
          </svg>
        </div>

        {/* Floating Doctor Status Badge (Parallax Depth Layer 3 - Bottom Right) */}
        <div
          ref={badgeRightRef}
          style={{
            position: 'absolute',
            bottom: '4px',
            right: '-10px',
            background: 'linear-gradient(135deg, #016c8f 0%, #038cb8 100%)',
            color: '#ffffff',
            padding: '0.45rem 0.95rem',
            borderRadius: '9999px',
            boxShadow: '0 8px 24px rgba(1, 108, 143, 0.4)',
            border: '2px solid #ffffff',
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem',
            zIndex: 10,
            willChange: 'transform',
            transformStyle: 'preserve-3d',
            pointerEvents: 'none',
          }}
        >
          <Stethoscope size={15} color="#ffffff" />
          <span
            style={{
              fontFamily: 'var(--font-sans-bold)',
              fontSize: '0.74rem',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}
          >
            DR. MEDU VADA
          </span>
        </div>

        {/* Floating Heartbeat Vitals Badge (Parallax Depth Layer 3 - Top Left) */}
        <div
          ref={badgeLeftRef}
          style={{
            position: 'absolute',
            top: '8px',
            left: '-18px',
            background: 'rgba(255, 255, 255, 0.96)',
            color: '#35705b',
            border: '1.5px solid #35705b44',
            padding: '0.4rem 0.85rem',
            borderRadius: '9999px',
            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            zIndex: 10,
            backdropFilter: 'blur(8px)',
            willChange: 'transform',
            transformStyle: 'preserve-3d',
            pointerEvents: 'none',
          }}
        >
          <Heart size={14} fill="#ef4444" color="#ef4444" className="animate-pulse" />
          <span
            style={{
              fontFamily: 'var(--font-sans-bold)',
              fontSize: '0.7rem',
              color: '#1e293b',
              letterSpacing: '0.04em',
            }}
          >
            {isHovered ? '84 BPM • EXAMINING' : '72 BPM • ACTIVE AI'}
          </span>
        </div>
      </div>

      {/* Symmetrically Centered Sub-tag */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          marginTop: '1rem',
          color: '#016c8f',
          fontFamily: 'var(--font-sans-bold)',
          fontSize: '0.76rem',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
        }}
      >
        <ShieldCheck size={15} /> Physician Supervised • Clinical Triage
      </div>
    </div>
  );
}
