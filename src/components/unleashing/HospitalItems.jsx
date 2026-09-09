import React from 'react';

export const StethoscopeIcon = ({ color = '#016c8f' }) => (
  <svg viewBox="0 0 64 64" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
    <path d="M16 12 C16 28 26 36 32 40 C38 36 48 28 48 12" />
    <path d="M14 10 L18 10 M46 10 L50 10" strokeWidth="3" />
    <path d="M32 40 L32 50 C32 56 42 56 42 50 C42 46 40 44 38 44" />
    <circle cx="38" cy="44" r="5" fill={color} fillOpacity="0.25" strokeWidth="2" />
  </svg>
);

export const CapsuleIcon = ({ color = '#ea580c' }) => (
  <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
    <rect x="18" y="10" width="28" height="44" rx="14" fill="#fed7aa" stroke={color} strokeWidth="2.5" />
    <path d="M18 32 L46 32" stroke={color} strokeWidth="2.5" />
    <path d="M18 10 C18 10 18 32 18 32 L46 32 C46 32 46 10 46 10 Z" fill={color} />
    <line x1="24" y1="18" x2="24" y2="24" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

export const EcgIcon = ({ color = '#be123c' }) => (
  <svg viewBox="0 0 80 48" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
    <rect x="2" y="2" width="76" height="44" rx="8" fill="#ffe4e6" stroke={color} strokeWidth="2" />
    <path d="M8 24 L24 24 L28 14 L34 34 L40 18 L44 28 L48 24 L72 24" />
    <circle cx="70" cy="10" r="3" fill={color} />
  </svg>
);

export const SyringeIcon = ({ color = '#0284c7' }) => (
  <svg viewBox="0 0 64 64" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
    <rect x="22" y="16" width="20" height="34" rx="2" fill="#e0f2fe" />
    <line x1="28" y1="24" x2="34" y2="24" />
    <line x1="28" y1="30" x2="36" y2="30" />
    <line x1="28" y1="36" x2="34" y2="36" />
    <line x1="28" y1="42" x2="36" y2="42" />
    <line x1="32" y1="50" x2="32" y2="60" strokeWidth="2" />
    <line x1="32" y1="16" x2="32" y2="6" strokeWidth="3" />
    <line x1="24" y1="6" x2="40" y2="6" strokeWidth="3" />
  </svg>
);

export const FirstAidKitIcon = ({ color = '#11684c' }) => (
  <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
    <rect x="8" y="14" width="48" height="40" rx="8" fill="#ffffff" stroke={color} strokeWidth="2.5" />
    <path d="M24 14 L24 10 C24 8 26 6 28 6 L36 6 C38 6 40 8 40 10 L40 14" stroke={color} strokeWidth="2.5" />
    <path d="M32 24 L32 44 M22 34 L42 34" stroke={color} strokeWidth="4.5" strokeLinecap="round" />
  </svg>
);

export const ThermometerIcon = ({ color = '#156149' }) => (
  <svg viewBox="0 0 64 64" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
    <rect x="27" y="6" width="10" height="42" rx="5" fill="#f0f9ff" strokeWidth="2.5" />
    <circle cx="32" cy="50" r="8" fill={color} stroke={color} strokeWidth="2.5" />
    <line x1="32" y1="18" x2="32" y2="46" stroke="#ffffff" strokeWidth="3" />
    <line x1="37" y1="20" x2="41" y2="20" />
    <line x1="37" y1="28" x2="41" y2="28" />
  </svg>
);

export const MicroscopeIcon = ({ color = '#11684c' }) => (
  <svg viewBox="0 0 64 64" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
    <rect x="14" y="52" width="36" height="6" rx="2" fill={color} />
    <path d="M22 52 C22 36 28 30 38 28" strokeWidth="3" />
    <rect x="36" y="10" width="12" height="24" rx="3" fill="#dcfce7" strokeWidth="2" transform="rotate(25 42 22)" />
    <circle cx="48" cy="12" r="4" fill={color} />
    <line x1="24" y1="36" x2="40" y2="36" strokeWidth="3" />
  </svg>
);

export const MedicineBottleIcon = ({ color = '#156149' }) => (
  <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
    <rect x="18" y="18" width="28" height="38" rx="6" fill="#dcfce7" stroke={color} strokeWidth="2.5" />
    <rect x="22" y="8" width="20" height="10" rx="2" fill={color} />
    <rect x="22" y="28" width="20" height="20" rx="2" fill="#ffffff" stroke={color} strokeWidth="1.5" />
    <path d="M32 33 L32 43 M27 38 L37 38" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const ChartIcon = ({ color = '#ea580c' }) => (
  <svg viewBox="0 0 64 64" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
    <rect x="12" y="12" width="40" height="46" rx="6" fill="#ffedd5" />
    <rect x="22" y="6" width="20" height="10" rx="2" fill={color} />
    <line x1="20" y1="26" x2="44" y2="26" strokeWidth="2" />
    <line x1="20" y1="34" x2="38" y2="34" strokeWidth="2" />
    <line x1="20" y1="42" x2="42" y2="42" strokeWidth="2" />
  </svg>
);

export const BlisterPackIcon = ({ color = '#c2410c' }) => (
  <svg viewBox="0 0 64 64" fill="none" stroke={color} strokeWidth="2" className="w-full h-full">
    <rect x="12" y="12" width="40" height="40" rx="6" fill="#ffedd5" strokeWidth="2.5" />
    <circle cx="24" cy="24" r="5" fill={color} />
    <circle cx="40" cy="24" r="5" fill={color} />
    <circle cx="24" cy="40" r="5" fill={color} />
    <circle cx="40" cy="40" r="5" fill={color} />
  </svg>
);

export const DripIcon = ({ color = '#c2410c' }) => (
  <svg viewBox="0 0 64 64" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
    <path d="M22 14 L42 14 L38 46 L26 46 Z" fill="#ffedd5" strokeWidth="2.5" />
    <path d="M30 6 L34 6 L34 14 L30 14 Z" fill={color} />
    <line x1="26" y1="22" x2="32" y2="22" />
    <line x1="26" y1="30" x2="34" y2="30" />
    <path d="M32 46 L32 56 C32 60 38 60 38 56" />
  </svg>
);

export const DnaIcon = ({ color = '#026482' }) => (
  <svg viewBox="0 0 64 64" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" className="w-full h-full">
    <path d="M18 8 C32 20 32 28 18 40 C4 52 4 60 18 64" />
    <path d="M46 8 C32 20 32 28 46 40 C60 52 60 60 46 64" />
    <line x1="22" y1="16" x2="42" y2="16" stroke="#0284c7" />
    <line x1="28" y1="24" x2="36" y2="24" stroke="#11684c" />
    <line x1="28" y1="32" x2="36" y2="32" stroke="#ea580c" />
    <line x1="22" y1="40" x2="42" y2="40" stroke="#7e22ce" />
  </svg>
);

export const CaduceusIcon = ({ color = '#026482' }) => (
  <svg viewBox="0 0 64 64" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
    <line x1="32" y1="8" x2="32" y2="56" strokeWidth="3" />
    <path d="M22 20 C42 22 42 34 22 36 C42 38 42 50 22 52" />
    <circle cx="32" cy="8" r="4" fill={color} />
  </svg>
);

export const PlasterIcon = ({ color = '#ca8a04' }) => (
  <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
    <rect x="10" y="24" width="44" height="16" rx="8" fill="#fef08a" stroke={color} strokeWidth="2" />
    <rect x="26" y="22" width="12" height="20" rx="2" fill="#ffffff" stroke={color} strokeWidth="1.5" />
    <circle cx="18" cy="32" r="1.5" fill={color} />
    <circle cx="46" cy="32" r="1.5" fill={color} />
  </svg>
);
