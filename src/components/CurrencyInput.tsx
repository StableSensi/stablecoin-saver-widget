
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
    <div className={`relative ${className}`}>
      <label className="block text-widget-muted text-sm font-medium mb-3">
        {label}
      </label>
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-white/70 text-lg">
            {selectedCurrency.symbol}
          </div>
          <input
            type="text"
            className="w-full p-4 pl-10 pr-4 bg-widget-input text-white text-lg rounded-lg border border-white/5 focus:outline-none focus:ring-1 focus:ring-widget-accent focus:border-widget-accent transition-all h-12"
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
