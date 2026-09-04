import React from 'react';
import { AlertTriangle, Phone } from 'lucide-react';

export default function RedFlagBanner({ message }) {
  return (
    <div className="red-flag-banner">
      <AlertTriangle size={20} className="pulse-icon" />
      <span>
        ⚠️ URGENT: {message || 'Critical symptoms detected — this case has been flagged for immediate attention.'}
      </span>
      <Phone size={16} className="ml-2 opacity-70" />
    </div>
  );
}
