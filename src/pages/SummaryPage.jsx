import React, { useState } from 'react';
import SummarySection from '../components/summary/SummarySection';
import DocumentPanel from '../components/summary/DocumentPanel';
import PreviousVisits from '../components/summary/PreviousVisits';
import ConfirmButton from '../components/summary/ConfirmButton';
import Toast from '../components/ui/Toast';
import {
  Stethoscope,
  FileText,
  History,
  Pill,
  Users,
  User,
  Activity,
  AlertTriangle,
} from 'lucide-react';

// Mock AI-generated summary
const initialSummary = {
  chiefComplaint: 'Persistent headaches and dizziness for approximately 1 week, progressively worsening.',
  hpi: 'Patient is a 45-year-old male presenting with a chief complaint of headaches and dizziness for the past 7 days. The headaches are described as moderate in severity, bilateral, throbbing in nature, predominantly frontal. Associated with episodic dizziness, especially on standing. No visual disturbances, no aura. No recent trauma. Symptoms worse in the morning and after prolonged screen time. Partially relieved by paracetamol. No nausea/vomiting. Sleep has been disturbed due to headaches.',
  pmh: 'Type 2 Diabetes Mellitus — diagnosed 3 years ago, currently on Metformin 500mg BD.\nHypertension — recently diagnosed, started on Amlodipine 5mg OD.\nNo prior surgeries.\nNo hospitalizations.',
  drugAllergy: 'Medications: Metformin 500mg BD, Amlodipine 5mg OD, Atorvastatin 10mg HS.\nAllergies: No known drug allergies (NKDA).',
  familyHistory: 'Father — Type 2 DM, Hypertension\nMother — Hypothyroidism\nNo family history of malignancy, stroke, or cardiac events.',
  personalHistory: 'Diet: Mixed, predominantly vegetarian. High salt intake reported.\nSmoking: Non-smoker.\nAlcohol: Occasional social drinking (1–2 drinks/month).\nExercise: Sedentary lifestyle, no regular physical activity.\nSleep: 5–6 hours/night (reduced due to headaches).',
  ros: 'General: Fatigue present.\nCardiovascular: No chest pain, palpitations, or syncope.\nRespiratory: No cough, dyspnea, or wheezing.\nGI: Appetite slightly reduced. No nausea/vomiting/diarrhea.\nMusculoskeletal: Mild body aches.\nNeurological: Headaches as described. Dizziness on standing. No weakness/numbness/tingling.\nPsychiatric: Mild anxiety about symptoms. No mood disturbances.',
};

export default function SummaryPage() {
  const [summary, setSummary] = useState(initialSummary);
  const [showToast, setShowToast] = useState(false);

  const updateField = (field) => (value) => {
    setSummary(prev => ({ ...prev, [field]: value }));
  };

  const handleConfirm = () => {
    setShowToast(true);
  };

  const sections = [
    { key: 'chiefComplaint', title: 'Chief Complaint', icon: AlertTriangle },
    { key: 'hpi', title: 'History of Present Illness', icon: FileText },
    { key: 'pmh', title: 'Past Medical / Surgical History', icon: History },
    { key: 'drugAllergy', title: 'Drug & Allergy History', icon: Pill },
    { key: 'familyHistory', title: 'Family History', icon: Users },
    { key: 'personalHistory', title: 'Personal History', icon: User },
    { key: 'ros', title: 'Review of Systems', icon: Activity },
  ];

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Stethoscope size={24} className="text-teal-400" />
              <h2 className="font-display font-bold text-2xl">Clinical Summary</h2>
            </div>
            <p className="text-white/40 text-sm">
              AI-generated summary — review and edit all fields before confirming. Click any field to modify.
            </p>
          </div>
          <div className="px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20">
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Draft — Pending Review</span>
          </div>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Clinical summary */}
          <div className="lg:col-span-2 space-y-1">
            {sections.map(({ key, title, icon }) => (
              <SummarySection
                key={key}
                title={title}
                icon={icon}
                fieldValue={summary[key]}
                onFieldChange={updateField(key)}
              />
            ))}

            {/* Confirm button */}
            <div className="mt-6">
              <ConfirmButton onConfirm={handleConfirm} />
            </div>
          </div>

          {/* Right: Documents + Previous visits */}
          <div className="space-y-8">
            <DocumentPanel />
            <PreviousVisits />
          </div>
        </div>
      </div>

      {/* Toast */}
      {showToast && (
        <Toast
          message="Summary confirmed and saved successfully!"
          type="success"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
}
