// Mock upload service — simulates OCR + extraction from prescriptions/lab reports.
// Replace with real API call when Module B backend is ready.

const MOCK_EXTRACTIONS = {
  prescription: {
    type: 'Prescription',
    date: '2024-08-15',
    doctor: 'Dr. Anjali Sharma, MD (Internal Medicine)',
    hospital: 'City General Hospital, New Delhi',
    fields: [
      { field: 'Diagnosis', value: 'Type 2 Diabetes Mellitus, Hypertension Stage I' },
      { field: 'Medication 1', value: 'Metformin 500mg — 1 tablet BD (after meals)' },
      { field: 'Medication 2', value: 'Amlodipine 5mg — 1 tablet OD (morning)' },
      { field: 'Medication 3', value: 'Atorvastatin 10mg — 1 tablet HS (at bedtime)' },
      { field: 'Advice', value: 'Low-salt diet, 30 min daily walking, follow up in 4 weeks' },
    ],
  },
  labReport: {
    type: 'Lab Report',
    date: '2024-08-12',
    lab: 'PathCare Diagnostics',
    fields: [
      { field: 'HbA1c', value: '7.2%', reference: '< 5.7% (Normal)', status: 'high' },
      { field: 'Fasting Blood Sugar', value: '142 mg/dL', reference: '70–100 mg/dL', status: 'high' },
      { field: 'Post-Prandial Blood Sugar', value: '210 mg/dL', reference: '< 140 mg/dL', status: 'high' },
      { field: 'Serum Creatinine', value: '0.9 mg/dL', reference: '0.7–1.3 mg/dL', status: 'normal' },
      { field: 'Total Cholesterol', value: '215 mg/dL', reference: '< 200 mg/dL', status: 'high' },
      { field: 'HDL Cholesterol', value: '42 mg/dL', reference: '> 40 mg/dL', status: 'normal' },
      { field: 'LDL Cholesterol', value: '138 mg/dL', reference: '< 100 mg/dL', status: 'high' },
      { field: 'Triglycerides', value: '175 mg/dL', reference: '< 150 mg/dL', status: 'high' },
      { field: 'TSH', value: '3.8 mIU/L', reference: '0.4–4.0 mIU/L', status: 'normal' },
      { field: 'Hemoglobin', value: '13.2 g/dL', reference: '12–16 g/dL', status: 'normal' },
    ],
  },
};

class MockUploadService {
  async uploadDocument(file) {
    // Simulate upload progress
    return new Promise((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 25 + 10;
        if (progress >= 100) {
          clearInterval(interval);
          progress = 100;
        }
        if (this.onProgress) {
          this.onProgress(Math.min(progress, 100));
        }
        if (progress >= 100) {
          // Simulate processing time after upload
          setTimeout(() => {
            resolve({ success: true, fileId: 'mock-file-' + Date.now() });
          }, 1000);
        }
      }, 300);
    });
  }

  async extractData(fileId) {
    // Simulate extraction delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Randomly return prescription or lab report
    const type = Math.random() > 0.5 ? 'prescription' : 'labReport';
    return MOCK_EXTRACTIONS[type];
  }

  setProgressCallback(callback) {
    this.onProgress = callback;
  }
}

export default MockUploadService;
