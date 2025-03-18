
import React, { useState, useEffect } from 'react';
import CountrySelector from './CountrySelector';
import CurrencyInput from './CurrencyInput';
import FrequencySelector from './FrequencySelector';
import SavingsResult from './SavingsResult';
import { Currency, Country, getCountryByCode, getCurrencyByCode, currencies } from '@/lib/countryData';
import { calculateSavings, SavingsCalculationResult } from '@/lib/calculatorUtils';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { CalendarClock } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SavingsCalculator: React.FC = () => {
  // State for form inputs
  const [fromCountry, setFromCountry] = useState<string>('US');
  const [toCountry, setToCountry] = useState<string>('EU');
  const [amount, setAmount] = useState<number>(1000);
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('EUR');
  const [frequency, setFrequency] = useState<number>(12);
  
  // State for calculation results
  const [result, setResult] = useState<SavingsCalculationResult | null>(null);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);

  // Handle country selection
  const handleFromCountryChange = (country: Country) => {
    setFromCountry(country.code);
    setFromCurrency(country.currencyCode);
  };

  const handleToCountryChange = (country: Country) => {
    setToCountry(country.code);
    setToCurrency(country.currencyCode);
  };

  // Handle currency selection
  const handleFromCurrencyChange = (value: string) => {
    setFromCurrency(value);
  };

  const handleToCurrencyChange = (value: string) => {
    setToCurrency(value);
  };

  const handleBookCall = () => {
    toast.success("Thank you! Our team will contact you soon to schedule a call.");
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
              fromCurrency,
              toCurrency,
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
  }, [amount, fromCurrency, toCurrency, fromCountry, toCountry, frequency]);

  return (
    <div className="w-full max-w-4xl mx-auto glassmorphism-card rounded-2xl overflow-hidden">
      <div className="bg-black/30 p-6 border-b border-white/5">
        <h2 className="text-2xl font-semibold text-white">Calculate Your Cross-Border Savings</h2>
        <p className="text-widget-muted mt-1">
          Configure the details below to see how much you could save on international transfers.
        </p>
      </div>

      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 animate-slide-up">
          <div>
            <h3 className="text-xl font-medium text-white mb-4">From Country & To Country</h3>
            <div className="grid grid-cols-1 gap-6">
              <CountrySelector 
                label="From Country" 
                value={fromCountry}
                onChange={handleFromCountryChange}
                className="w-full"
              />
              <CountrySelector 
                label="To Country" 
                value={toCountry}
                onChange={handleToCountryChange}
                className="w-full"
              />
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-medium text-white mb-4">Currency Selection</h3>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-widget-muted text-sm font-medium mb-2">
                  From Currency
                </label>
                <Select
                  value={fromCurrency}
                  onValueChange={handleFromCurrencyChange}
                >
                  <SelectTrigger className="w-full h-12 bg-widget-input text-white border-white/5 focus:ring-widget-accent focus:border-widget-accent text-base">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent className="bg-widget-card text-white border-white/5">
                    {currencies.map((currency) => (
                      <SelectItem key={currency.code} value={currency.code}>
                        <span className="flex items-center gap-2">
                          <span className="text-white/90">{currency.symbol}</span>
                          <span>{currency.code} - {currency.name}</span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-widget-muted text-sm font-medium mb-2">
                  To Currency
                </label>
                <Select
                  value={toCurrency}
                  onValueChange={handleToCurrencyChange}
                >
                  <SelectTrigger className="w-full h-12 bg-widget-input text-white border-white/5 focus:ring-widget-accent focus:border-widget-accent text-base">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent className="bg-widget-card text-white border-white/5">
                    {currencies.map((currency) => (
                      <SelectItem key={currency.code} value={currency.code}>
                        <span className="flex items-center gap-2">
                          <span className="text-white/90">{currency.symbol}</span>
                          <span>{currency.code} - {currency.name}</span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 animate-slide-up" style={{ animationDelay: '100ms' }}>
          <div>
            <h3 className="text-xl font-medium text-white mb-4">Transfer Amount</h3>
            <div className="grid grid-cols-1 gap-6">
              <CurrencyInput
                label="Amount to Send"
                amount={amount}
                currency={fromCurrency}
                onAmountChange={setAmount}
                showCurrencySelect={false}
                className="w-full"
              />
              <FrequencySelector
                label="Transfer Frequency"
                value={frequency}
                onChange={setFrequency}
                className="w-full"
              />
            </div>
          </div>
        </div>

        <div className="animate-slide-up" style={{ animationDelay: '200ms' }}>
          <SavingsResult 
            result={result} 
            currency={fromCurrency}
            isCalculating={isCalculating}
          />
        </div>

        <div className="mt-10 flex justify-center animate-slide-up" style={{ animationDelay: '300ms' }}>
          <Button 
            onClick={handleBookCall}
            className="bg-widget-accent hover:bg-widget-accent/90 text-white font-semibold py-6 px-8 rounded-xl text-lg flex items-center gap-2 shadow-glow transition-all duration-300 hover:scale-105"
          >
            <CalendarClock className="h-5 w-5" />
            Book a Call with Our Team
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SavingsCalculator;
