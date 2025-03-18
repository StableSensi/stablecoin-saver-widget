
import React, { useState, useEffect } from 'react';
import CountrySelector from './CountrySelector';
import CurrencyInput from './CurrencyInput';
import FrequencySelector from './FrequencySelector';
import SavingsResult from './SavingsResult';
import { Country, getCountryByCode } from '@/lib/countryData';
import { calculateSavings, SavingsCalculationResult } from '@/lib/calculatorUtils';
import { toast } from '@/components/ui/sonner';

const SavingsCalculator: React.FC = () => {
  // State for form inputs
  const [fromCountry, setFromCountry] = useState<string>('US');
  const [toCountry, setToCountry] = useState<string>('EU');
  const [amount, setAmount] = useState<number>(1000);
  const [currency, setCurrency] = useState<string>('USD');
  const [frequency, setFrequency] = useState<number>(12);
  
  // State for calculation results
  const [result, setResult] = useState<SavingsCalculationResult | null>(null);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);

  // Handle country selection
  const handleFromCountryChange = (country: Country) => {
    setFromCountry(country.code);
    setCurrency(country.currencyCode);
  };

  const handleToCountryChange = (country: Country) => {
    setToCountry(country.code);
  };

  // Calculate savings when inputs change
  useEffect(() => {
    if (amount > 0) {
      setIsCalculating(true);
      
      // Short timeout to show the loading state for visual feedback
      const timer = setTimeout(() => {
        try {
          const fromCountryObj = getCountryByCode(fromCountry);
          const toCountryObj = getCountryByCode(toCountry);
          
          if (fromCountryObj && toCountryObj) {
            const savingsResult = calculateSavings(
              amount,
              currency,
              toCountryObj.currencyCode,
              frequency
            );
            setResult(savingsResult);
          }
        } catch (error) {
          console.error('Error calculating savings:', error);
          toast.error('Something went wrong while calculating your savings');
        } finally {
          setIsCalculating(false);
        }
      }, 600);
      
      return () => clearTimeout(timer);
    } else {
      setResult(null);
    }
  }, [amount, currency, fromCountry, toCountry, frequency]);

  return (
    <div className="w-full max-w-4xl mx-auto glassmorphism-card rounded-2xl overflow-hidden">
      <div className="bg-black/30 p-6 border-b border-white/5">
        <h2 className="text-2xl font-semibold text-white">Calculate Your Cross-Border Savings</h2>
        <p className="text-widget-muted mt-1">
          Configure the details below to see how much you could save on international transfers.
        </p>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 animate-slide-up">
          <div>
            <h3 className="text-xl font-medium text-white mb-4">From Country & To Country</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <CountrySelector 
                label="From Country" 
                value={fromCountry}
                onChange={handleFromCountryChange}
              />
              <CountrySelector 
                label="To Country" 
                value={toCountry}
                onChange={handleToCountryChange}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 animate-slide-up" style={{ animationDelay: '100ms' }}>
          <div>
            <h3 className="text-xl font-medium text-white mb-4">Transfer Amount</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <CurrencyInput
                label="Amount to Send"
                amount={amount}
                currency={currency}
                onAmountChange={setAmount}
                onCurrencyChange={setCurrency}
              />
              <FrequencySelector
                label="Transfer Frequency"
                value={frequency}
                onChange={setFrequency}
              />
            </div>
          </div>
        </div>

        <div className="animate-slide-up" style={{ animationDelay: '200ms' }}>
          <SavingsResult 
            result={result} 
            currency={currency}
            isCalculating={isCalculating}
          />
        </div>
      </div>
    </div>
  );
};

export default SavingsCalculator;
