import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MessageSquare, Upload, ClipboardList, Check } from 'lucide-react';

const steps = [
  { path: '/chat', label: 'Health Assessment', icon: MessageSquare, number: '1' },
  { path: '/upload', label: 'Document Upload', icon: Upload, number: '2' },
  { path: '/summary', label: 'Physician Summary', icon: ClipboardList, number: '3' },
];

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();
  const navigate = useNavigate();

  const currentStepIndex = steps.findIndex(s => s.path === location.pathname);

  const getStepState = (index) => {
    if (index < currentStepIndex) return 'completed';
    if (index === currentStepIndex) return 'active';
    return 'pending';
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside className={`app-sidebar ${isOpen ? 'open' : ''} lg:transform-none`}>
        {/* Logo area */}
        <div className="mb-8 pb-6 border-b border-white/10">
          <h2 className="font-display font-bold text-xl gradient-text">MediKiosk</h2>
          <p className="text-xs text-white/30 mt-1">Pre-Consultation Workflow</p>
        </div>

        {/* Steps */}
        <div className="space-y-2">
          <p className="text-xs text-white/30 uppercase tracking-widest font-semibold mb-3 px-1">Steps</p>
          {steps.map((step, index) => {
            const state = getStepState(index);
            const Icon = step.icon;

            return (
              <div
                key={step.path}
                onClick={() => { navigate(step.path); onClose?.(); }}
                className={`step-item ${state}`}
              >
                <div className="step-circle">
                  {state === 'completed' ? <Check size={14} /> : step.number}
                </div>
                <div>
                  <span className="block text-sm font-medium">{step.label}</span>
                  {state === 'active' && (
                    <span className="block text-xs text-primary-400/60">In progress</span>
                  )}
                  {state === 'completed' && (
                    <span className="block text-xs text-success-400/60">Completed</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom section */}
        <div className="mt-auto pt-6 border-t border-white/10">
          <div className="px-3 py-2 rounded-lg bg-teal-500/5 border border-teal-500/10">
            <p className="text-xs text-teal-400/80 font-medium">Demo Mode Active</p>
            <p className="text-xs text-white/30 mt-0.5">Using simulated backend responses</p>
          </div>
        </div>
      </aside>
    </>
  );
}
