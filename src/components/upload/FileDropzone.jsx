import React, { useState, useRef } from 'react';
import { Upload, FileImage, FileText, X } from 'lucide-react';

export default function FileDropzone({ onFileSelect, disabled }) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const inputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    if (!disabled) setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (disabled) return;

    const file = e.dataTransfer.files[0];
    if (file && isValidFile(file)) {
      setSelectedFile(file);
      onFileSelect(file);
    }
  };

  const handleClick = () => {
    if (!disabled) inputRef.current?.click();
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file && isValidFile(file)) {
      setSelectedFile(file);
      onFileSelect(file);
    }
  };

  const isValidFile = (file) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
    return validTypes.includes(file.type);
  };

  const removeFile = () => {
    setSelectedFile(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  const getFileIcon = (type) => {
    if (type?.startsWith('image/')) return FileImage;
    return FileText;
  };

  const formatSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  if (selectedFile) {
    const FileIcon = getFileIcon(selectedFile.type);
    return (
      <div className="rounded-xl border border-white/10 bg-[var(--color-bg-card)] p-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-primary-600/20 border border-primary-500/30 flex items-center justify-center">
            <FileIcon size={24} className="text-primary-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{selectedFile.name}</p>
            <p className="text-xs text-white/40">{formatSize(selectedFile.size)}</p>
          </div>
          <button
            onClick={removeFile}
            className="p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
          >
            <X size={18} className="text-white/40" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        className={`dropzone ${isDragging ? 'drag-over' : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-primary-600/10 border border-primary-500/20 flex items-center justify-center">
            <Upload size={28} className="text-primary-400" />
          </div>
          <div>
            <p className="text-white/80 font-medium mb-1">
              Drop your file here, or <span className="text-primary-400">browse</span>
            </p>
            <p className="text-sm text-white/30">
              Supports JPG, PNG, PDF — prescriptions, lab reports, or medical records
            </p>
          </div>
        </div>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept=".jpg,.jpeg,.png,.pdf"
        onChange={handleChange}
        className="hidden"
      />
    </>
  );
}
