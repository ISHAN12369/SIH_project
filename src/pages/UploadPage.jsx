import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import FileDropzone from '../components/upload/FileDropzone';
import UploadProgress from '../components/upload/UploadProgress';
import ExtractionTable from '../components/upload/ExtractionTable';
import MockUploadService from '../services/mockUploadService';
import Button from '../components/ui/Button';
import { ArrowRight, Plus, FileCheck } from 'lucide-react';

export default function UploadPage() {
  const uploadService = useMemo(() => new MockUploadService(), []);
  const [uploads, setUploads] = useState([]);
  const [currentUpload, setCurrentUpload] = useState(null);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState(null); // null | 'uploading' | 'processing' | 'done'
  const navigate = useNavigate();

  const handleFileSelect = async (file) => {
    setStatus('uploading');
    setProgress(0);

    uploadService.setProgressCallback((p) => setProgress(p));

    try {
      const result = await uploadService.uploadDocument(file);

      setStatus('processing');
      setProgress(100);

      const extraction = await uploadService.extractData(result.fileId);

      setUploads(prev => [...prev, {
        fileName: file.name,
        extraction,
      }]);

      setStatus('done');
      setCurrentUpload(null);
    } catch (err) {
      setStatus(null);
      console.error('Upload failed:', err);
    }
  };

  const handleAddAnother = () => {
    setStatus(null);
    setProgress(0);
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-3xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="font-display font-bold text-2xl mb-2">Upload Documents</h2>
          <p className="text-white/40 text-sm">
            Upload prescriptions, lab reports, or medical records. Our AI will extract key information automatically.
          </p>
        </div>

        {/* Dropzone or Progress */}
        {status === null && (
          <FileDropzone onFileSelect={handleFileSelect} />
        )}

        {(status === 'uploading' || status === 'processing') && (
          <div className="glass-card">
            <UploadProgress progress={progress} status={status} />
          </div>
        )}

        {status === 'done' && (
          <div className="glass-card text-center py-8 animate-fade-in">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-success-600/20 border border-success-500/30 mb-4">
              <FileCheck size={28} className="text-success-400" />
            </div>
            <h3 className="font-display font-bold text-lg mb-1">Document Processed</h3>
            <p className="text-sm text-white/40 mb-4">Extraction complete — see results below</p>
            <Button variant="ghost" size="sm" onClick={handleAddAnother}>
              <Plus size={16} /> Upload Another
            </Button>
          </div>
        )}

        {/* Extracted data */}
        {uploads.length > 0 && (
          <div className="mt-8 space-y-6">
            <h3 className="font-display font-semibold text-lg text-white/80">
              Extracted Data ({uploads.length} {uploads.length === 1 ? 'document' : 'documents'})
            </h3>
            {uploads.map((upload, i) => (
              <div key={i} className="glass-card animate-slide-up">
                <div className="flex items-center gap-2 mb-4">
                  <FileCheck size={16} className="text-teal-400" />
                  <span className="text-sm font-medium text-white/60">{upload.fileName}</span>
                </div>
                <ExtractionTable data={upload.extraction} />
              </div>
            ))}
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-10 pt-6 border-t border-white/10">
          <Button variant="ghost" onClick={() => navigate('/chat')}>
            ← Back to Chat
          </Button>
          <Button onClick={() => navigate('/summary')}>
            View Summary <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}
