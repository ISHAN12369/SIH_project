import React, { useState } from 'react';

// 20 Hospital and Clinical Diagnostic Objects distributed across the full scrollable page
const HOSPITAL_OBJECTS = [
  // SECTION 1: HERO (0% - 18%)
  {
    id: 'steth-hero',
    name: 'Clinical Stethoscope',
    top: '4.5%',
    left: '3.5%',
    size: 70,
    color: '#016c8f',
    baseRotate: -15,
    svg: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
        <path d="M16 12 C16 28 26 36 32 40 C38 36 48 28 48 12" />
        <path d="M14 10 L18 10 M46 10 L50 10" strokeWidth="3" />
        <path d="M32 40 L32 50 C32 56 42 56 42 50 C42 46 40 44 38 44" />
        <circle cx="38" cy="44" r="5" fill="currentColor" fillOpacity="0.25" strokeWidth="2" />
      </svg>
    ),
  },
  {
    id: 'capsule-hero',
    name: 'Prescription Capsule',
    top: '6%',
    right: '3.5%',
    size: 56,
    color: '#ea580c',
    baseRotate: 32,
    svg: (
      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
        <rect x="18" y="10" width="28" height="44" rx="14" fill="#fed7aa" stroke="#ea580c" strokeWidth="2.5" />
        <path d="M18 32 L46 32" stroke="#ea580c" strokeWidth="2.5" />
        <path d="M18 10 C18 10 18 32 18 32 L46 32 C46 32 46 10 46 10 Z" fill="#ea580c" />
        <line x1="24" y1="18" x2="24" y2="24" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'ecg-hero',
    name: 'Cardiac Vitals Monitor',
    top: '12%',
    left: '3%',
    size: 74,
    color: '#be123c',
    baseRotate: 4,
    svg: (
      <svg viewBox="0 0 80 48" fill="none" stroke="#be123c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
        <rect x="2" y="2" width="76" height="44" rx="8" fill="#ffe4e6" stroke="#be123c" strokeWidth="2" />
        <path d="M8 24 L24 24 L28 14 L34 34 L40 18 L44 28 L48 24 L72 24" />
        <circle cx="70" cy="10" r="3" fill="#be123c" />
      </svg>
    ),
  },
  {
    id: 'syringe-hero',
    name: 'Diagnostic Syringe',
    top: '14%',
    right: '3%',
    size: 64,
    color: '#0284c7',
    baseRotate: -45,
    svg: (
      <svg viewBox="0 0 64 64" fill="none" stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
        <rect x="22" y="16" width="20" height="34" rx="2" fill="#e0f2fe" />
        <line x1="28" y1="24" x2="34" y2="24" />
        <line x1="28" y1="30" x2="36" y2="30" />
        <line x1="28" y1="36" x2="34" y2="36" />
        <line x1="28" y1="42" x2="36" y2="42" />
        <line x1="32" y1="50" x2="32" y2="60" strokeWidth="2" />
        <line x1="32" y1="16" x2="32" y2="6" strokeWidth="3" />
        <line x1="24" y1="6" x2="40" y2="6" strokeWidth="3" />
      </svg>
    ),
  },

  // SECTION 2: HEALTH ASSESSMENT (20% - 38%)
  {
    id: 'cross-assessment',
    name: 'Emergency Medical Kit',
    top: '22%',
    left: '3.5%',
    size: 62,
    color: '#11684c',
    baseRotate: 8,
    svg: (
      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
        <rect x="8" y="14" width="48" height="40" rx="8" fill="#ffffff" stroke="#11684c" strokeWidth="2.5" />
        <path d="M24 14 L24 10 C24 8 26 6 28 6 L36 6 C38 6 40 8 40 10 L40 14" stroke="#11684c" strokeWidth="2.5" />
        <path d="M32 24 L32 44 M22 34 L42 34" stroke="#11684c" strokeWidth="4.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'thermo-assessment',
    name: 'Clinical Thermometer (37.0°C)',
    top: '24%',
    right: '3.5%',
    size: 60,
    color: '#156149',
    baseRotate: 22,
    svg: (
      <svg viewBox="0 0 64 64" fill="none" stroke="#156149" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
        <rect x="27" y="6" width="10" height="42" rx="5" fill="#f0f9ff" strokeWidth="2.5" />
        <circle cx="32" cy="50" r="8" fill="#156149" stroke="#156149" strokeWidth="2.5" />
        <line x1="32" y1="18" x2="32" y2="46" stroke="#ffffff" strokeWidth="3" />
        <line x1="37" y1="20" x2="41" y2="20" />
        <line x1="37" y1="28" x2="41" y2="28" />
      </svg>
    ),
  },
  {
    id: 'microscope-assessment',
    name: 'Clinical Pathology Microscope',
    top: '32%',
    left: '3%',
    size: 68,
    color: '#11684c',
    baseRotate: -8,
    svg: (
      <svg viewBox="0 0 64 64" fill="none" stroke="#11684c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
        <rect x="14" y="52" width="36" height="6" rx="2" fill="#11684c" />
        <path d="M22 52 C22 36 28 30 38 28" strokeWidth="3" />
        <rect x="36" y="10" width="12" height="24" rx="3" fill="#dcfce7" strokeWidth="2" transform="rotate(25 42 22)" />
        <circle cx="48" cy="12" r="4" fill="#11684c" />
        <line x1="24" y1="36" x2="40" y2="36" strokeWidth="3" />
      </svg>
    ),
  },
  {
    id: 'bottle-assessment',
    name: 'Prescription Dropper',
    top: '34%',
    right: '3.5%',
    size: 58,
    color: '#156149',
    baseRotate: -15,
    svg: (
      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
        <rect x="18" y="18" width="28" height="38" rx="6" fill="#dcfce7" stroke="#156149" strokeWidth="2.5" />
        <rect x="22" y="8" width="20" height="10" rx="2" fill="#156149" />
        <rect x="22" y="28" width="20" height="20" rx="2" fill="#ffffff" stroke="#156149" strokeWidth="1.5" />
        <path d="M32 33 L32 43 M27 38 L37 38" stroke="#156149" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },

  // SECTION 3: CLINICAL RECORDS (40% - 58%)
  {
    id: 'chart-records',
    name: 'OCR Patient Document',
    top: '42%',
    left: '3.5%',
    size: 64,
    color: '#ea580c',
    baseRotate: -10,
    svg: (
      <svg viewBox="0 0 64 64" fill="none" stroke="#ea580c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
        <rect x="12" y="12" width="40" height="46" rx="6" fill="#ffedd5" />
        <rect x="22" y="6" width="20" height="10" rx="2" fill="#ea580c" />
        <line x1="20" y1="26" x2="44" y2="26" strokeWidth="2" />
        <line x1="20" y1="34" x2="38" y2="34" strokeWidth="2" />
        <line x1="20" y1="42" x2="42" y2="42" strokeWidth="2" />
      </svg>
    ),
  },
  {
    id: 'blister-records',
    name: 'Antibiotic Blister Pack',
    top: '44%',
    right: '3%',
    size: 58,
    color: '#c2410c',
    baseRotate: -22,
    svg: (
      <svg viewBox="0 0 64 64" fill="none" stroke="#c2410c" strokeWidth="2" className="w-full h-full">
        <rect x="12" y="12" width="40" height="40" rx="6" fill="#ffedd5" strokeWidth="2.5" />
        <circle cx="24" cy="24" r="5" fill="#c2410c" />
        <circle cx="40" cy="24" r="5" fill="#c2410c" />
        <circle cx="24" cy="40" r="5" fill="#c2410c" />
        <circle cx="40" cy="40" r="5" fill="#c2410c" />
      </svg>
    ),
  },
  {
    id: 'hammer-records',
    name: 'Neurology Reflex Hammer',
    top: '52%',
    left: '3%',
    size: 56,
    color: '#ea580c',
    baseRotate: 38,
    svg: (
      <svg viewBox="0 0 64 64" fill="none" stroke="#ea580c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
        <line x1="20" y1="48" x2="44" y2="16" stroke="#94a3b8" strokeWidth="3" />
        <rect x="40" y="8" width="18" height="14" rx="4" fill="#ea580c" stroke="#c2410c" />
        <circle cx="18" cy="50" r="4" fill="#94a3b8" />
      </svg>
    ),
  },
  {
    id: 'drip-records',
    name: 'Saline IV Infusion',
    top: '54%',
    right: '3.5%',
    size: 64,
    color: '#c2410c',
    baseRotate: -8,
    svg: (
      <svg viewBox="0 0 64 64" fill="none" stroke="#c2410c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
        <path d="M22 14 L42 14 L38 46 L26 46 Z" fill="#ffedd5" strokeWidth="2.5" />
        <path d="M30 6 L34 6 L34 14 L30 14 Z" fill="#c2410c" />
        <line x1="26" y1="22" x2="32" y2="22" />
        <line x1="26" y1="30" x2="34" y2="30" />
        <path d="M32 46 L32 56 C32 60 38 60 38 56" />
      </svg>
    ),
  },

  // SECTION 4: PHYSICIAN SUMMARY (60% - 78%)
  {
    id: 'dna-summary',
    name: 'Genomic Sequence',
    top: '62%',
    left: '3.5%',
    size: 68,
    color: '#026482',
    baseRotate: 16,
    svg: (
      <svg viewBox="0 0 64 64" fill="none" stroke="#026482" strokeWidth="2.5" strokeLinecap="round" className="w-full h-full">
        <path d="M18 8 C32 20 32 28 18 40 C4 52 4 60 18 64" />
        <path d="M46 8 C32 20 32 28 46 40 C60 52 60 60 46 64" />
        <line x1="22" y1="16" x2="42" y2="16" stroke="#0284c7" />
        <line x1="28" y1="24" x2="36" y2="24" stroke="#11684c" />
        <line x1="28" y1="32" x2="36" y2="32" stroke="#ea580c" />
        <line x1="22" y1="40" x2="42" y2="40" stroke="#7e22ce" />
      </svg>
    ),
  },
  {
    id: 'plaster-summary',
    name: 'Surgical Dressing',
    top: '64%',
    right: '3%',
    size: 58,
    color: '#0369a1',
    baseRotate: 28,
    svg: (
      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
        <rect x="10" y="24" width="44" height="16" rx="8" fill="#e0f2fe" stroke="#0369a1" strokeWidth="2" />
        <rect x="26" y="22" width="12" height="20" rx="2" fill="#ffffff" stroke="#0369a1" strokeWidth="1.5" />
        <circle cx="18" cy="32" r="1.5" fill="#0369a1" />
        <circle cx="46" cy="32" r="1.5" fill="#0369a1" />
      </svg>
    ),
  },
  {
    id: 'steth-summary',
    name: 'Acoustic Chestpiece',
    top: '72%',
    left: '3%',
    size: 66,
    color: '#026482',
    baseRotate: -12,
    svg: (
      <svg viewBox="0 0 64 64" fill="none" stroke="#026482" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
        <circle cx="32" cy="32" r="20" fill="#e0f2fe" />
        <circle cx="32" cy="32" r="14" fill="#ffffff" strokeWidth="1.5" />
        <circle cx="32" cy="32" r="6" fill="#026482" />
      </svg>
    ),
  },
  {
    id: 'caduceus-summary',
    name: 'Clinical Verification Emblem',
    top: '74%',
    right: '3.5%',
    size: 64,
    color: '#026482',
    baseRotate: 10,
    svg: (
      <svg viewBox="0 0 64 64" fill="none" stroke="#026482" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
        <line x1="32" y1="8" x2="32" y2="56" strokeWidth="3" />
        <path d="M22 20 C42 22 42 34 22 36 C42 38 42 50 22 52" />
        <circle cx="32" cy="8" r="4" fill="#026482" />
      </svg>
    ),
  },

  // SECTION 5: LONGITUDINAL VISITS & TIMELINE (80% - 98%)
  {
    id: 'ecg-visits',
    name: 'Continuous Holter ECG',
    top: '82%',
    left: '3.5%',
    size: 72,
    color: '#be123c',
    baseRotate: -6,
    svg: (
      <svg viewBox="0 0 80 48" fill="none" stroke="#be123c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
        <rect x="2" y="2" width="76" height="44" rx="8" fill="#ffe4e6" stroke="#be123c" strokeWidth="2" />
        <path d="M8 24 L24 24 L28 14 L34 34 L40 18 L44 28 L48 24 L72 24" />
      </svg>
    ),
  },
  {
    id: 'cross-visits',
    name: 'Longitudinal Health Vault',
    top: '84%',
    right: '3%',
    size: 60,
    color: '#9f1239',
    baseRotate: 12,
    svg: (
      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
        <rect x="8" y="14" width="48" height="40" rx="8" fill="#ffffff" stroke="#9f1239" strokeWidth="2.5" />
        <path d="M32 24 L32 44 M22 34 L42 34" stroke="#9f1239" strokeWidth="4.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'syringe-visits',
    name: 'Immunization Tracker',
    top: '92%',
    left: '3%',
    size: 62,
    color: '#be123c',
    baseRotate: 42,
    svg: (
      <svg viewBox="0 0 64 64" fill="none" stroke="#be123c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
        <rect x="22" y="16" width="20" height="34" rx="2" fill="#ffe4e6" />
        <line x1="28" y1="24" x2="34" y2="24" />
        <line x1="28" y1="30" x2="36" y2="30" />
        <line x1="32" y1="50" x2="32" y2="60" strokeWidth="2" />
        <line x1="32" y1="16" x2="32" y2="6" strokeWidth="3" />
      </svg>
    ),
  },
  {
    id: 'bottle-visits',
    name: 'Long-term Medication',
    top: '94%',
    right: '3.5%',
    size: 58,
    color: '#9f1239',
    baseRotate: -18,
    svg: (
      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
        <rect x="18" y="18" width="28" height="38" rx="6" fill="#ffe4e6" stroke="#9f1239" strokeWidth="2.5" />
        <rect x="22" y="8" width="20" height="10" rx="2" fill="#9f1239" />
        <rect x="22" y="28" width="20" height="20" rx="2" fill="#ffffff" stroke="#9f1239" strokeWidth="1.5" />
      </svg>
    ),
  },
];

export default function HospitalBackground() {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <div
      className="hospital-background-scattered"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 2,
      }}
    >
      {/* Subtle Clinical Dot Matrix Texture */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(rgba(1, 108, 143, 0.07) 1.2px, transparent 1.2px), radial-gradient(rgba(234, 88, 12, 0.04) 1.2px, transparent 1.2px)',
          backgroundSize: '48px 48px, 96px 96px',
          opacity: 0.9,
          pointerEvents: 'none',
        }}
      />

      {/* Scattered Hospital & Medical Objects (Distributed along actual vertical scroll height) */}
      {HOSPITAL_OBJECTS.map((obj) => {
        const isHovered = hoveredId === obj.id;

        return (
          <div
            key={obj.id}
            onMouseEnter={() => setHoveredId(obj.id)}
            onMouseLeave={() => setHoveredId(null)}
            className="hospital-scattered-item"
            style={{
              position: 'absolute',
              top: obj.top,
              left: obj.left || 'auto',
              right: obj.right || 'auto',
              width: `${obj.size}px`,
              height: `${obj.size}px`,
              transform: `rotate(${obj.baseRotate + (isHovered ? 12 : 0)}deg) scale(${isHovered ? 1.32 : 1})`,
              transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), filter 0.3s ease, opacity 0.3s ease',
              opacity: isHovered ? 1 : 0.72,
              cursor: 'pointer',
              filter: isHovered
                ? `drop-shadow(0 14px 28px ${obj.color}60) drop-shadow(0 0 16px ${obj.color}45)`
                : `drop-shadow(0 4px 12px rgba(0, 0, 0, 0.09))`,
              pointerEvents: 'auto',
              zIndex: isHovered ? 60 : 3,
            }}
          >
            {/* Soft Ambient Floating Aura */}
            <div
              style={{
                position: 'absolute',
                inset: '-8px',
                borderRadius: '50%',
                background: isHovered ? `${obj.color}25` : 'transparent',
                transition: 'background 0.3s ease',
                filter: 'blur(8px)',
              }}
            />

            {/* SVG Graphic */}
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              {obj.svg}
            </div>

            {/* Interactive Clinical Micro-Tooltip on Hover */}
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
                  border: `1.5px solid ${obj.color}`,
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
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: obj.color }} />
                <span>{obj.name}</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
