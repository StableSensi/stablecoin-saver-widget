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

  // Handle the change directly in this component
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = parseInt(e.target.value, 10);
    onChange(newValue);
  };

  return (
    <div className={`relative ${className}`} style={{ height: '100%' }}>
      <label className="block text-widget-muted text-xs sm:text-sm font-medium mb-1 sm:mb-2">
        {label}
      </label>
      <select
        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-widget-input text-white rounded-lg border border-white/10 hover:border-white/20 focus:ring-widget-accent focus:border-widget-accent focus:outline-none appearance-none transition-all text-sm sm:text-base h-10 sm:h-12 pr-8 sm:pr-10 shadow-sm"
        value={value}
        onChange={handleChange}
      >
        {frequencies.map((freq) => (
          <option 
            key={freq.value} 
            value={freq.value}
            className="bg-widget-input text-white py-2"
          >
            {freq.label}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none mt-8">
        <svg
          className="h-5 w-5 text-white/70"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
};

export default FrequencySelector;
