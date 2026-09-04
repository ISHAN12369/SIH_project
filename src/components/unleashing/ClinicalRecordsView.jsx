import React, { useState, useMemo } from 'react';
import MockUploadService from '../../services/mockUploadService';
import { Upload, FileText, CheckCircle, ArrowRight, RefreshCw, FileCheck } from 'lucide-react';

export default function ClinicalRecordsView({ onNavigateToSummary }) {
  const uploadService = useMemo(() => new MockUploadService(), []);
  const [uploads, setUploads] = useState([]);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState(null); // null | 'uploading' | 'processing' | 'done'
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = async (file) => {
    setStatus('uploading');
    setProgress(0);
    uploadService.setProgressCallback((p) => setProgress(p));

    try {
      const result = await uploadService.uploadDocument(file);
      setStatus('processing');
      setProgress(100);

      const extraction = await uploadService.extractData(result.fileId);
      setUploads((prev) => [
        ...prev,
        {
          fileName: file.name,
          extraction,
        },
      ]);
      setStatus('done');
    } catch (e) {
      setStatus(null);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  return (
    <div className="ub-clinical-shell" style={{ '--theme-bg': '#fde3d5', '--theme-color': '#f57431' }}>
      <div className="ub-clinical-card">
        {/* Card Header */}
        <div className="ub-clinical-header">
          <div>
            <h2 className="ub-clinical-header-title">Clinical Document OCR & Extraction</h2>
            <p className="ub-clinical-header-subtitle">
              Upload lab reports, prescriptions, or discharge summaries for automated structuring
            </p>
          </div>
          <span className="ub-status-pill normal" style={{ background: '#f5743115', color: '#f57431' }}>
            Module B Active
          </span>
        </div>

        {/* Dropzone or Progress */}
        {status === null && (
          <div
            className={`ub-dropzone ${isDragging ? 'dragging' : ''}`}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => {
              const input = document.createElement('input');
              input.type = 'file';
              input.accept = '.pdf,.jpg,.jpeg,.png';
              input.onchange = (e) => {
                const f = e.target.files[0];
                if (f) handleFile(f);
              };
              input.click();
            }}
          >
            <Upload size={36} color="#f57431" style={{ marginBottom: '1rem' }} />
            <p style={{ fontFamily: 'var(--font-sans-bold)', fontSize: '1rem', marginBottom: '0.4rem', color: '#111' }}>
              Drag & Drop Medical Report or Prescription
            </p>
            <p style={{ fontSize: '0.8rem', color: '#777', marginBottom: '1.25rem' }}>
              Supports PDF, PNG, JPG scans up to 15MB
            </p>
            <button
              className="ub-see-chap-btn"
              style={{ borderColor: '#f57431', color: '#f57431', padding: '0.5rem 1.75rem' }}
            >
              Browse Local File
            </button>
          </div>
        )}

        {/* Upload & OCR Progress */}
        {(status === 'uploading' || status === 'processing') && (
          <div style={{ padding: '3rem 2rem', textAlign: 'center' }}>
            <RefreshCw
              size={32}
              color="#f57431"
              style={{ animation: 'spin 1s linear infinite', margin: '0 auto 1.25rem' }}
            />
            <p style={{ fontFamily: 'var(--font-sans-bold)', fontSize: '1.1rem', marginBottom: '0.5rem', color: '#111' }}>
              {status === 'uploading' ? `Uploading Document (${progress}%)` : 'Running OCR & Clinical Entity Extraction...'}
            </p>
            <div style={{ width: '18rem', height: '6px', background: '#eee', borderRadius: '9999px', margin: '1rem auto', overflow: 'hidden' }}>
              <div
                style={{
                  width: `${progress}%`,
                  height: '100%',
                  background: '#f57431',
                  transition: 'width 0.2s linear',
                }}
              />
            </div>
            <p style={{ fontSize: '0.8rem', color: '#888' }}>
              Parsing diagnoses, active medicines, dosages, and diagnostic lab ranges
            </p>
          </div>
        )}

        {/* Extraction Results Table */}
        {uploads.length > 0 && status === 'done' && (
          <div>
            <div style={{ padding: '1.5rem 2rem 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FileCheck size={18} color="#137333" />
                <span style={{ fontFamily: 'var(--font-sans-bold)', fontSize: '0.9rem', color: '#111' }}>
                  {uploads[0].fileName} — Extracted Clinical Entities
                </span>
              </div>
              <button
                className="ub-see-chap-btn"
                style={{ padding: '0.4rem 1.25rem', fontSize: '0.7rem' }}
                onClick={() => setStatus(null)}
              >
                Upload Another
              </button>
            </div>

            <div className="ub-table-container">
              <table className="ub-extraction-table">
                <thead>
                  <tr>
                    <th>Metric / Clinical Entity</th>
                    <th>Extracted Value</th>
                    <th>Reference Range</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {uploads[0].extraction?.labResults?.map((row, i) => (
                    <tr key={i}>
                      <td style={{ fontWeight: 600 }}>{row.test}</td>
                      <td>{row.value}</td>
                      <td style={{ color: '#666' }}>{row.referenceRange}</td>
                      <td>
                        <span className={`ub-status-pill ${row.status.toLowerCase()}`}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Prescriptions and Diagnosis Pills */}
            <div style={{ padding: '0 2rem 2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ background: '#f8f9fa', padding: '1rem 1.25rem', borderRadius: '0.75rem' }}>
                <span style={{ fontFamily: 'var(--font-sans-bold)', fontSize: '0.75rem', color: '#f57431', textTransform: 'uppercase' }}>
                  Detected Prescriptions:
                </span>
                <p style={{ fontSize: '0.9rem', color: '#222', marginTop: '0.35rem' }}>
                  {uploads[0].extraction?.medications?.join(' • ') || 'Metformin 500mg BD • Amlodipine 5mg OD • Atorvastatin 10mg HS'}
                </p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                <button
                  className="ub-see-chap-btn"
                  style={{ background: '#f57431', color: '#fff', borderColor: '#f57431' }}
                  onClick={onNavigateToSummary}
                >
                  Proceed to Physician Summary <ArrowRight size={14} style={{ marginLeft: '4px', verticalAlign: 'middle' }} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
