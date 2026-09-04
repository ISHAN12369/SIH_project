import React, { useEffect, useState } from 'react';
import { X, CheckCircle, AlertTriangle, Info } from 'lucide-react';

const icons = {
  success: CheckCircle,
  error: AlertTriangle,
  info: Info,
};

const colors = {
  success: 'border-success-500/30 bg-success-500/10 text-success-400',
  error: 'border-danger-500/30 bg-danger-500/10 text-danger-400',
  info: 'border-primary-500/30 bg-primary-500/10 text-primary-400',
};

export default function Toast({ message, type = 'info', onClose, duration = 4000 }) {
  const [visible, setVisible] = useState(true);
  const Icon = icons[type];

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300);
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      className={`
        fixed bottom-6 right-6 z-[200]
        flex items-center gap-3
        px-5 py-3
        rounded-xl border
        backdrop-blur-md
        transition-all duration-300
        ${colors[type]}
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
      `}
    >
      <Icon size={20} />
      <span className="text-sm font-medium text-white">{message}</span>
      <button
        onClick={() => { setVisible(false); setTimeout(onClose, 300); }}
        className="ml-2 opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
      >
        <X size={16} />
      </button>
    </div>
  );
}
