import React, { useState } from 'react';
import { Check } from 'lucide-react';

export default function ChipSelector({ chips, multiSelect = false, onSelect, disabled }) {
  const [selected, setSelected] = useState(multiSelect ? [] : null);

  const handleChipClick = (chip) => {
    if (disabled) return;

    if (multiSelect) {
      setSelected(prev => {
        const newSelected = prev.includes(chip)
          ? prev.filter(c => c !== chip)
          : [...prev, chip];
        return newSelected;
      });
    } else {
      setSelected(chip);
      // Auto-send on single select
      onSelect(chip);
    }
  };

  const handleSubmit = () => {
    if (multiSelect && selected.length > 0) {
      onSelect(selected);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {chips.map((chip, i) => {
          const isSelected = multiSelect
            ? selected.includes(chip)
            : selected === chip;

          return (
            <button
              key={i}
              onClick={() => handleChipClick(chip)}
              disabled={disabled}
              className={`chip ${isSelected ? 'selected' : ''}`}
            >
              {isSelected && multiSelect && <Check size={14} />}
              {chip}
            </button>
          );
        })}
      </div>

      {multiSelect && selected.length > 0 && (
        <button
          onClick={handleSubmit}
          className="
            inline-flex items-center gap-2
            px-5 py-2.5 rounded-full
            bg-primary-600 text-white text-sm font-medium
            hover:bg-primary-500
            transition-all duration-200 cursor-pointer
            animate-slide-up
          "
        >
          Confirm Selection ({selected.length})
        </button>
      )}
    </div>
  );
}
