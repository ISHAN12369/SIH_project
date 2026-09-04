import React, { useState, useRef, useEffect } from 'react';
import { Pencil, Check } from 'lucide-react';

export default function EditableField({ value, onChange }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const textareaRef = useRef(null);

  useEffect(() => {
    setEditValue(value);
  }, [value]);

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      // Auto-resize
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [isEditing]);

  const handleSave = () => {
    setIsEditing(false);
    if (onChange) onChange(editValue);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setEditValue(value);
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <div className="editable-field" style={{ borderColor: 'var(--color-primary)' }}>
        <textarea
          ref={textareaRef}
          value={editValue}
          onChange={(e) => {
            setEditValue(e.target.value);
            e.target.style.height = 'auto';
            e.target.style.height = e.target.scrollHeight + 'px';
          }}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          rows={1}
        />
        <button
          onMouseDown={(e) => { e.preventDefault(); handleSave(); }}
          className="absolute top-2 right-2 p-1.5 rounded-md bg-primary-600/20 text-primary-400 hover:bg-primary-600/30 transition-colors cursor-pointer"
        >
          <Check size={14} />
        </button>
      </div>
    );
  }

  return (
    <div
      className="editable-field group cursor-text"
      onClick={() => setIsEditing(true)}
    >
      <p className="text-white/80 text-sm leading-relaxed whitespace-pre-wrap pr-8">
        {value || <span className="text-white/30 italic">Click to add content...</span>}
      </p>
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="p-1.5 rounded-md bg-white/5 text-white/40 inline-flex">
          <Pencil size={14} />
        </span>
      </div>
    </div>
  );
}
