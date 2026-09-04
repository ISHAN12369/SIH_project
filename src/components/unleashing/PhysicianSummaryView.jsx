import React, { useState } from 'react';
import {
  CheckCircle,
  Pencil,
  FileText,
  Calendar,
  AlertTriangle,
  History,
  Pill,
  Users,
  User,
  Activity,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
} from 'lucide-react';

const initialSummary = {
  chiefComplaint: 'Persistent headaches and dizziness for approximately 1 week, progressively worsening.',
  hpi: 'Patient is a 45-year-old male presenting with a chief complaint of headaches and dizziness for the past 7 days. The headaches are described as moderate in severity, bilateral, throbbing in nature, predominantly frontal. Associated with episodic dizziness, especially on standing. No visual disturbances, no aura. No recent trauma. Symptoms worse in the morning and after prolonged screen time. Partially relieved by paracetamol. No nausea/vomiting. Sleep has been disturbed due to headaches.',
  pmh: 'Type 2 Diabetes Mellitus — diagnosed 3 years ago, currently on Metformin 500mg BD.\nHypertension — recently diagnosed, started on Amlodipine 5mg OD.\nNo prior surgeries.\nNo hospitalizations.',
  drugAllergy: 'Medications: Metformin 500mg BD, Amlodipine 5mg OD, Atorvastatin 10mg HS.\nAllergies: No known drug allergies (NKDA).',
  familyHistory: 'Father — Type 2 DM, Hypertension\nMother — Hypothyroidism\nNo family history of malignancy, stroke, or cardiac events.',
  personalHistory: 'Diet: Mixed, predominantly vegetarian. High salt intake reported.\nSmoking: Non-smoker.\nAlcohol: Occasional social drinking (1–2 drinks/month).\nExercise: Sedentary lifestyle, no regular physical activity.\nSleep: 5–6 hours/night (reduced due to headaches).',
  ros: 'General: Fatigue present.\nCardiovascular: No chest pain, palpitations, or syncope.\nRespiratory: No cough, dyspnea, or wheezing.\nGI: Appetite slightly reduced. No nausea/vomiting/diarrhea.\nMusculoskeletal: Mild body aches.\nNeurological: Headaches as described. Dizziness on standing. No weakness/numbness/tingling.\nPsychiatric: Mild anxiety about symptoms. No mood disturbances.',
};

const mockPreviousVisits = [
  {
    date: '2024-07-10',
    chiefComplaint: 'Fever and body aches for 3 days',
    summary: 'Diagnosed with viral URI. Prescribed paracetamol and rest. Resolved uneventfully.',
    physician: 'Dr. Sharma (Internal Medicine)',
  },
  {
    date: '2024-03-22',
    chiefComplaint: 'Routine diabetes check-up',
    summary: 'HbA1c was 7.2%. Metformin maintained at 500mg BD. Advised dietary modifications.',
    physician: 'Dr. Priya Mehta (Endocrinology)',
  },
  {
    date: '2023-11-05',
    chiefComplaint: 'Mild lower back pain post lifting',
    summary: 'Lumbar muscle strain. Short course of muscle relaxants and physiotherapy advised.',
    physician: 'Dr. R. Verma (Orthopedics)',
  },
];

export default function PhysicianSummaryView() {
  const [summary, setSummary] = useState(initialSummary);
  const [editingField, setEditingField] = useState(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [showPreviousVisits, setShowPreviousVisits] = useState(false);

  const sections = [
    { key: 'chiefComplaint', title: '1. Chief Complaint', icon: AlertTriangle },
    { key: 'hpi', title: '2. History of Present Illness (HPI)', icon: FileText },
    { key: 'pmh', title: '3. Past Medical & Surgical History', icon: History },
    { key: 'drugAllergy', title: '4. Drug & Allergy History', icon: Pill },
    { key: 'familyHistory', title: '5. Family History', icon: Users },
    { key: 'personalHistory', title: '6. Personal & Social History', icon: User },
    { key: 'ros', title: '7. Review of Systems (ROS)', icon: Activity },
  ];

  const handleFieldChange = (key, val) => {
    setSummary((prev) => ({ ...prev, [key]: val }));
  };

  return (
    <div className="ub-clinical-shell" style={{ '--theme-bg': '#cce1e8', '--theme-color': '#016c8f' }}>
      {/* Top Banner Verification Notice */}
      <div style={{ maxWidth: '78rem', width: '100%', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.25rem', color: '#111', lineHeight: 1 }}>
            Physician Clinical Summary
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#555', marginTop: '0.4rem' }}>
            AI Drafts • Physician Verifies • Never Autonomous — Every field is inline editable
          </p>
        </div>

        <div>
          {isConfirmed ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#e6f4ea', color: '#137333', padding: '0.6rem 1.25rem', borderRadius: '9999px', fontFamily: 'var(--font-sans-bold)', fontSize: '0.8rem' }}>
              <ShieldCheck size={18} />
              Verified & Signed Off by Physician
            </div>
          ) : (
            <button
              className="ub-see-chap-btn"
              style={{ background: '#016c8f', color: '#ffffff', borderColor: '#016c8f' }}
              onClick={() => setIsConfirmed(true)}
            >
              Sign Off & Verify Record
            </button>
          )}
        </div>
      </div>

      {/* Main Grid Layout: 7 Sections on Left, Cross-reference on Right */}
      <div className="ub-summary-layout">
        {/* Left Column: 7 Editable Clinical Sections */}
        <div>
          {sections.map((sec) => {
            const Icon = sec.icon;
            const isEditing = editingField === sec.key;

            return (
              <div key={sec.key} className="ub-summary-section">
                <div className="ub-summary-section-title">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <Icon size={16} color="#016c8f" />
                    <span>{sec.title}</span>
                  </div>
                  <button
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#888' }}
                    onClick={() => setEditingField(isEditing ? null : sec.key)}
                    title="Click to edit field"
                  >
                    <Pencil size={14} />
                  </button>
                </div>

                {isEditing ? (
                  <div>
                    <textarea
                      className="ub-editable-textarea"
                      value={summary[sec.key]}
                      onChange={(e) => handleFieldChange(sec.key, e.target.value)}
                      onBlur={() => setEditingField(null)}
                      autoFocus
                    />
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.4rem' }}>
                      <button
                        className="ub-see-chap-btn"
                        style={{ padding: '0.25rem 0.85rem', fontSize: '0.65rem' }}
                        onClick={() => setEditingField(null)}
                      >
                        Done Editing
                      </button>
                    </div>
                  </div>
                ) : (
                  <p
                    className="ub-editable-text"
                    onClick={() => setEditingField(sec.key)}
                    title="Click to edit directly"
                  >
                    {summary[sec.key]}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Right Column: Uploaded Documents Panel & Collapsible Previous Visits */}
        <div>
          {/* Uploaded Document Reference Card */}
          <div className="ub-summary-section" style={{ background: '#ffffff' }}>
            <div className="ub-summary-section-title">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <FileText size={16} color="#016c8f" />
                <span>Uploaded Document OCR</span>
              </div>
            </div>

            <div style={{ fontSize: '0.85rem', color: '#444', lineHeight: 1.5 }}>
              <div style={{ marginBottom: '0.75rem', paddingBottom: '0.75rem', borderBottom: '1px solid #eee' }}>
                <strong style={{ color: '#111' }}>CBC & Metabolic Panel</strong>
                <p style={{ fontSize: '0.75rem', color: '#888' }}>PathCare Labs • Ref #92841</p>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Fasting Blood Sugar:</span>
                  <strong style={{ color: '#c5221f' }}>142 mg/dL (High)</strong>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>HbA1c:</span>
                  <strong style={{ color: '#c5221f' }}>7.4% (Elevated)</strong>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Blood Pressure:</span>
                  <strong style={{ color: '#b06000' }}>138/88 mmHg</strong>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Hemoglobin:</span>
                  <strong style={{ color: '#137333' }}>14.8 g/dL (Normal)</strong>
                </li>
              </ul>
            </div>
          </div>

          {/* Collapsible Previous Visits Accordion (Longitudinal Patient Timeline) */}
          <div className="ub-summary-section">
            <div
              className="ub-summary-section-title"
              style={{ cursor: 'pointer', marginBottom: showPreviousVisits ? '1rem' : 0 }}
              onClick={() => setShowPreviousVisits(!showPreviousVisits)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Calendar size={16} color="#016c8f" />
                <span>Previous Visits (3)</span>
              </div>
              {showPreviousVisits ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>

            {showPreviousVisits && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {mockPreviousVisits.map((v, i) => (
                  <div
                    key={i}
                    style={{
                      background: '#f8fafc',
                      padding: '0.85rem',
                      borderRadius: '0.75rem',
                      border: '1px solid #edf2f7',
                      fontSize: '0.825rem',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#777', fontSize: '0.7rem', marginBottom: '0.25rem' }}>
                      <span>{v.date}</span>
                      <span>{v.physician}</span>
                    </div>
                    <strong style={{ color: '#111', display: 'block', marginBottom: '0.2rem' }}>
                      {v.chiefComplaint}
                    </strong>
                    <p style={{ color: '#555', margin: 0 }}>{v.summary}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
