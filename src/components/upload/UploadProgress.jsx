import React from 'react';
import { Loader } from 'lucide-react';

export default function UploadProgress({ progress, status }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Loader size={16} className="text-primary-400 animate-spin" />
          <span className="text-sm text-white/60">
            {status === 'uploading' ? 'Uploading document...' : 'Processing & extracting data...'}
          </span>
        </div>
        <span className="text-sm font-mono text-primary-400">{Math.round(progress)}%</span>
      </div>
      <div className="upload-progress-bar">
        <div
          className="upload-progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
