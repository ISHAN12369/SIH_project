import React from 'react';
import { FileText, FileImage } from 'lucide-react';
import ExtractionTable from '../upload/ExtractionTable';

const mockDocumentData = {
  type: 'Lab Report',
  date: '2024-08-12',
  lab: 'PathCare Diagnostics',
  fields: [
    { field: 'HbA1c', value: '7.2%', reference: '< 5.7%', status: 'high' },
    { field: 'Fasting Blood Sugar', value: '142 mg/dL', reference: '70–100 mg/dL', status: 'high' },
    { field: 'Serum Creatinine', value: '0.9 mg/dL', reference: '0.7–1.3 mg/dL', status: 'normal' },
    { field: 'Total Cholesterol', value: '215 mg/dL', reference: '< 200 mg/dL', status: 'high' },
    { field: 'Hemoglobin', value: '13.2 g/dL', reference: '12–16 g/dL', status: 'normal' },
  ],
};

export default function DocumentPanel() {
  return (
    <div className="space-y-4">
      <h3 className="font-display font-semibold text-sm uppercase tracking-wider text-white/40">
        Uploaded Documents
      </h3>

      {/* Document card */}
      <div className="glass-card">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-teal-600/20 border border-teal-500/30 flex items-center justify-center">
            <FileImage size={20} className="text-teal-400" />
          </div>
          <div>
            <p className="text-sm font-medium">lab_report_aug2024.pdf</p>
            <p className="text-xs text-white/40">Uploaded during consultation</p>
          </div>
        </div>
        <ExtractionTable data={mockDocumentData} />
      </div>

      {/* Conversation log reference */}
      <div className="glass-card">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-lg bg-primary-600/20 border border-primary-500/30 flex items-center justify-center">
            <FileText size={20} className="text-primary-400" />
          </div>
          <div>
            <p className="text-sm font-medium">Conversation Transcript</p>
            <p className="text-xs text-white/40">10 questions answered</p>
          </div>
        </div>
        <div className="text-xs text-white/30 space-y-1 max-h-40 overflow-y-auto">
          <p><span className="text-white/50">Q:</span> What brings you in today?</p>
          <p><span className="text-teal-400/70">A:</span> I've been having persistent headaches and dizziness for about a week</p>
          <p><span className="text-white/50">Q:</span> How long have you been experiencing this?</p>
          <p><span className="text-teal-400/70">A:</span> About 7 days now, getting worse</p>
          <p><span className="text-white/50">Q:</span> How would you rate the severity?</p>
          <p><span className="text-teal-400/70">A:</span> Moderate</p>
          <p className="text-white/20 italic">... full transcript available</p>
        </div>
      </div>
    </div>
  );
}
