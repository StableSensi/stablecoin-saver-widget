
import React from 'react';

interface FrequencySelectorProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  className?: string;
}

const FrequencySelector: React.FC<FrequencySelectorProps> = ({
  label,
  value,
  onChange,
  className = ""
}) => {
  const frequencies = [
    { value: 1, label: '1 time per year' },
    { value: 2, label: '2 times per year' },
    { value: 4, label: '4 times per year' },
    { value: 12, label: 'Monthly' },
    { value: 24, label: 'Twice a month' },
    { value: 52, label: 'Weekly' }
  ];

  return (
    <div className={`relative ${className}`}>
      <label className="block text-widget-muted text-sm font-medium mb-3">
        {label}
      </label>
      <select
        className="w-full p-4 bg-widget-input text-white rounded-lg border border-white/5 appearance-none focus:outline-none focus:ring-1 focus:ring-widget-accent focus:border-widget-accent transition-all text-base h-12"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
      >
        {frequencies.map((freq) => (
          <option key={freq.value} value={freq.value}>
            {freq.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FrequencySelector;
