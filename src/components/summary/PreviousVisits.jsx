import React, { useState } from 'react';
import { ChevronDown, Calendar, AlertCircle } from 'lucide-react';

const mockPreviousVisits = [
  {
    id: 1,
    date: '2024-07-10',
    chiefComplaint: 'Fever and body aches for 3 days',
    summary: 'Patient presented with high-grade intermittent fever (102°F) with myalgia. No cough/cold symptoms. Dengue NS1 antigen negative. CBC showed mild leukopenia. Diagnosed as viral pyrexia. Prescribed paracetamol 650mg TDS, advised oral rehydration and rest. Follow-up in 5 days if fever persists.',
    doctor: 'Dr. Rajesh Kumar',
  },
  {
    id: 2,
    date: '2024-05-22',
    chiefComplaint: 'Routine diabetes follow-up',
    summary: 'Scheduled follow-up for Type 2 DM. HbA1c improved from 8.1% to 7.2%. FBS 142 mg/dL. BP 138/88 mmHg — slightly elevated. Continued Metformin 500mg BD, added Amlodipine 5mg OD for borderline hypertension. Advised dietary modifications and regular walking. Next follow-up in 8 weeks with repeat HbA1c.',
    doctor: 'Dr. Anjali Sharma',
  },
  {
    id: 3,
    date: '2024-02-14',
    chiefComplaint: 'Skin rash on both forearms',
    summary: 'Patient developed itchy, erythematous papular rash on bilateral forearms × 5 days. No new medications or detergents. No fever or systemic symptoms. Diagnosed as contact dermatitis. Prescribed Cetirizine 10mg OD and Fluticasone propionate cream BD for 7 days. Patch testing recommended if recurrence.',
    doctor: 'Dr. Priya Mehta',
  },
];

export default function PreviousVisits() {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="space-y-4">
      <h3 className="font-display font-semibold text-sm uppercase tracking-wider text-white/40 flex items-center gap-2">
        <Calendar size={14} />
        Previous Visits ({mockPreviousVisits.length})
      </h3>

      <div className="space-y-3">
        {mockPreviousVisits.map((visit) => (
          <div key={visit.id} className="visit-card">
            <div className="visit-header" onClick={() => toggleExpand(visit.id)}>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary-500/50" />
                <div>
                  <p className="text-sm font-medium text-white/80">{visit.chiefComplaint}</p>
                  <p className="text-xs text-white/30">{visit.date} · {visit.doctor}</p>
                </div>
              </div>
              <ChevronDown
                size={18}
                className={`text-white/30 transition-transform duration-300 ${expandedId === visit.id ? 'rotate-180' : ''}`}
              />
            </div>
            <div className={`visit-body ${expandedId === visit.id ? 'expanded' : ''}`}>
              <p className="text-sm text-white/60 leading-relaxed">{visit.summary}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pattern note */}
      <div className="flex items-start gap-2 px-3 py-2 rounded-lg bg-primary-600/5 border border-primary-500/10">
        <AlertCircle size={14} className="text-primary-400 mt-0.5 flex-shrink-0" />
        <p className="text-xs text-white/40">
          Patient shows recurring DM management pattern. Last HbA1c trending down (8.1→7.2%). 
          Consider this visit's labs for longitudinal comparison.
        </p>
      </div>
    </div>
  );
}
