
import React from 'react';
import { currencies } from '@/lib/countryData';

interface CurrencyInputProps {
  label: string;
  amount: number;
  currency: string;
  onAmountChange: (amount: number) => void;
  onCurrencyChange?: (currency: string) => void; // Make this optional
  className?: string;
  showCurrencySelect?: boolean; // New prop to control visibility of currency selector
}

const CurrencyInput: React.FC<CurrencyInputProps> = ({
  label,
  amount,
  currency,
  onAmountChange,
  onCurrencyChange,
  className = "",
  showCurrencySelect = true // Default to showing the selector
}) => {
  const selectedCurrency = currencies.find(c => c.code === currency) || currencies[0];
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow empty value for user to clear input
    if (value === "") {
      onAmountChange(0);
      return;
    }
    
    // Only allow numeric input with at most 2 decimal places
    const regex = /^\d+(\.\d{0,2})?$/;
    if (regex.test(value)) {
      onAmountChange(parseFloat(value));
    }
  };

  return (
    <div className={`relative ${className}`} style={{ height: '100%' }}>
      <label className="block text-widget-muted text-xs sm:text-sm font-medium mb-1 sm:mb-2">
        {label}
      </label>
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 sm:pl-4 pointer-events-none text-white/70 text-base sm:text-lg font-medium">
            <span className="w-5 sm:w-6 flex justify-center">
              {selectedCurrency.symbol}
            </span>
          </div>
          <input
            type="text"
            className="w-full p-2 sm:p-3 md:p-4 pl-9 sm:pl-11 pr-3 sm:pr-4 bg-widget-input text-white text-sm sm:text-base md:text-lg rounded-lg border border-white/10 hover:border-white/20 focus:ring-widget-accent focus:border-widget-accent focus:outline-none transition-all h-10 sm:h-12 shadow-sm"
            placeholder="0.00"
            value={amount > 0 ? amount.toString() : ""}
            onChange={handleAmountChange}
          />
        </div>
        
        {showCurrencySelect && onCurrencyChange && (
          <select
            className="bg-widget-input text-white rounded-lg border border-white/5 px-4 py-3 focus:outline-none focus:ring-1 focus:ring-widget-accent focus:border-widget-accent transition-all text-base h-12"
            value={currency}
            onChange={(e) => onCurrencyChange(e.target.value)}
          >
            {currencies.map((c) => (
              <option key={c.code} value={c.code}>
                {c.code}
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
};

export default CurrencyInput;
