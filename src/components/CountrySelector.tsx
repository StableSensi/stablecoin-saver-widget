
import React, { useState } from 'react';
import { countries, Country } from '@/lib/countryData';
import { ChevronDown } from 'lucide-react';

interface CountrySelectorProps {
  label: string;
  value: string;
  onChange: (country: Country) => void;
  className?: string;
}

const CountrySelector: React.FC<CountrySelectorProps> = ({ 
  label, 
  value, 
  onChange,
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedCountry = countries.find(c => c.code === value) || countries[0];

  return (
    <div className={`relative ${className}`}>
      <label className="block text-widget-muted text-xs sm:text-sm font-medium mb-1 sm:mb-2">
        {label}
      </label>
      <div
        className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 bg-widget-input rounded-lg border border-white/10 cursor-pointer transition-all hover:border-white/20 h-10 sm:h-12 shadow-sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3">
          <span className="text-xl" aria-hidden="true">
            {selectedCountry.flag}
          </span>
          <span className="text-white text-base">
            {selectedCountry.name}
          </span>
        </div>
        <ChevronDown className="h-5 w-5 text-white/70" />
      </div>
      
      {isOpen && (
        <div className="absolute mt-1 w-full bg-widget-card border border-white/10 rounded-lg shadow-lg z-50 max-h-60 overflow-auto animate-fade-in">
          <ul className="py-1 text-base">
            {countries.map((country) => (
              <li 
                key={country.code}
                className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 cursor-pointer transition-colors"
                onClick={() => {
                  onChange(country);
                  setIsOpen(false);
                }}
              >
                <span className="text-xl" aria-hidden="true">
                  {country.flag}
                </span>
                <span className="text-white">
                  {country.name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CountrySelector;
