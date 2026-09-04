import React from 'react';
import EditableField from './EditableField';

export default function SummarySection({ title, icon: Icon, children, fieldValue, onFieldChange }) {
  return (
    <div className="summary-section">
      <div className="summary-section-header">
        <div className="flex items-center gap-2">
          {Icon && <Icon size={16} />}
          <span>{title}</span>
        </div>
      </div>
      <div className="summary-section-body">
        {fieldValue !== undefined ? (
          <EditableField value={fieldValue} onChange={onFieldChange} />
        ) : (
          children
        )}
      </div>
    </div>
  );
}
