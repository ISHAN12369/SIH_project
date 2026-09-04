import React, { useState } from 'react';
import { CheckCircle, Shield } from 'lucide-react';
import Button from '../ui/Button';

export default function ConfirmButton({ onConfirm }) {
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    // Simulate save
    await new Promise(resolve => setTimeout(resolve, 1500));
    setConfirmed(true);
    setLoading(false);
    if (onConfirm) onConfirm();
  };

  if (confirmed) {
    return (
      <div className="flex items-center gap-3 px-6 py-4 rounded-xl bg-success-600/10 border border-success-500/20 animate-fade-in">
        <CheckCircle size={24} className="text-success-400" />
        <div>
          <p className="font-display font-bold text-success-400">Summary Confirmed</p>
          <p className="text-sm text-white/40">This summary has been reviewed and signed off by the physician.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <Button onClick={handleConfirm} loading={loading} variant="success" size="lg" className="w-full">
        <Shield size={20} />
        Confirm & Sign Off Summary
      </Button>
      <p className="text-xs text-white/30 text-center">
        By confirming, you verify that you have reviewed all AI-generated content and made necessary corrections.
      </p>
    </div>
  );
}
