import React, { useState, useEffect } from "react";
import CountrySelector from "./CountrySelector";
import CurrencyInput from "./CurrencyInput";
import FrequencySelector from "./FrequencySelector";
import SavingsResult from "./SavingsResult";
import { Currency, Country, getCountryByCode, getCurrencyByCode, currencies } from "@/lib/countryData";
import { calculateSavings, SavingsCalculationResult } from "@/lib/calculatorUtils";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { CalendarClock } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SavingsCalculator: React.FC = () => {
  // State for form inputs
  const [fromCountry, setFromCountry] = useState<string>("US");
  const [toCountry, setToCountry] = useState<string>("EU");
  const [amount, setAmount] = useState<number>(1000);
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("EUR");
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

  // Handle frequency change
  const handleFrequencyChange = (value: number) => {
    setFrequency(value);
  };

  const handleBookCall = () => {
    // Open Cal.com booking link in a new window
    window.open("https://cal.com/team/stablecoinsservices/stablecoin-demo", "_blank", "noopener,noreferrer");
    toast.success("Opening booking calendar in a new window");
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
          console.error("Error calculating savings:", error);
          toast.error("Something went wrong while calculating your savings");
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
    <div className="w-full max-w-full mx-auto glassmorphism-card rounded-2xl overflow-hidden shadow-2xl border border-white/10 backdrop-blur-sm">
      <div className="bg-gradient-to-r from-black/40 to-black/30 p-4 sm:p-6 border-b border-white/10">
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Calculate Your Cross-Border Savings</h2>
        <p className="text-widget-muted mt-2 text-xs sm:text-sm">
          Configure the details below to see how much you could save on international transfers.
        </p>
      </div>

      <div className="p-4 sm:p-6 md:p-8 bg-gradient-to-b from-black/20 to-black/10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8 md:mb-10 animate-slide-up">
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-4 flex items-center">
              <span className="inline-block w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-widget-accent/20 text-widget-accent mr-2 flex items-center justify-center text-xs sm:text-sm">1</span>
              <span className="text-sm sm:text-base md:text-xl">From Country & To Country</span>
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:gap-6">
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
          
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-4 flex items-center">
              <span className="inline-block w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-widget-accent/20 text-widget-accent mr-2 flex items-center justify-center text-xs sm:text-sm">2</span>
              <span className="text-sm sm:text-base md:text-xl">Currency Selection</span>
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:gap-6">
              <div>
                <label className="block text-widget-muted text-xs sm:text-sm font-medium mb-1 sm:mb-2">
                  From Currency
                </label>
                <Select
                  value={fromCurrency}
                  onValueChange={handleFromCurrencyChange}
                >
                  <SelectTrigger className="w-full h-10 sm:h-12 bg-widget-input text-white border-white/10 hover:border-white/20 focus:ring-widget-accent focus:border-widget-accent text-sm sm:text-base transition-all duration-200">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent className="bg-widget-card text-white border-white/10">
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
                <label className="block text-widget-muted text-xs sm:text-sm font-medium mb-1 sm:mb-2">
                  To Currency
                </label>
                <Select
                  value={toCurrency}
                  onValueChange={handleToCurrencyChange}
                >
                  <SelectTrigger className="w-full h-10 sm:h-12 bg-widget-input text-white border-white/10 hover:border-white/20 focus:ring-widget-accent focus:border-widget-accent text-sm sm:text-base transition-all duration-200">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent className="bg-widget-card text-white border-white/10">
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

        <div className="mb-6 sm:mb-8 md:mb-10 animate-slide-up" style={{ animationDelay: "100ms" }}>
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-4 flex items-center">
              <span className="inline-block w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-widget-accent/20 text-widget-accent mr-2 flex items-center justify-center text-xs sm:text-sm">3</span>
              <span className="text-sm sm:text-base md:text-xl">Transfer Details</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <CurrencyInput
                  label="Amount to Send"
                  amount={amount}
                  currency={fromCurrency}
                  onAmountChange={setAmount}
                  showCurrencySelect={false}
                />
              </div>
              <div>
                <FrequencySelector
                  label="Transfer Frequency"
                  value={frequency}
                  onChange={handleFrequencyChange}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="animate-slide-up bg-black/20 rounded-xl p-4 sm:p-6 border border-white/5" style={{ animationDelay: "200ms" }}>
          <SavingsResult
            result={result}
            currency={fromCurrency}
            isCalculating={isCalculating}
          />
        </div>

        <div className="mt-6 sm:mt-8 md:mt-10 flex justify-center animate-slide-up" style={{ animationDelay: "300ms" }}>
          <Button
            onClick={handleBookCall}
            className="bg-gradient-to-r from-widget-accent to-widget-accent/90 hover:from-widget-accent/90 hover:to-widget-accent text-white font-semibold py-3 sm:py-4 md:py-6 px-4 sm:px-6 md:px-8 rounded-xl text-sm sm:text-base md:text-lg flex items-center gap-2 shadow-glow transition-all duration-300 hover:scale-105 border border-white/10"
          >
            <CalendarClock className="h-4 w-4 sm:h-5 sm:w-5" />
            Book a Call with Our Team
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SavingsCalculator;
