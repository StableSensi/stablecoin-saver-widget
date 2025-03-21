import React from 'react';
import { SavingsCalculationResult } from '@/lib/calculatorUtils';
import { formatCurrency } from '@/lib/calculatorUtils';

interface SavingsResultProps {
  result: SavingsCalculationResult | null;
  currency: string;
  isCalculating: boolean;
}

const SavingsResult: React.FC<SavingsResultProps> = ({ 
  result, 
  currency,
  isCalculating
}) => {
  if (isCalculating) {
    return (
      <div className="rounded-lg p-4 sm:p-6 animate-pulse">
        <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-4 flex items-center">
          <span className="inline-block w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-widget-accent/20 text-widget-accent mr-2 flex items-center justify-center text-xs sm:text-sm">4</span>
          <span className="text-sm sm:text-base md:text-xl">Calculating savings...</span>
        </h3>
        <div className="h-6 sm:h-8 bg-white/10 rounded animate-pulse"></div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="rounded-lg p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-semibold text-white mb-1 flex items-center">
          <span className="inline-block w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-widget-accent/20 text-widget-accent mr-2 flex items-center justify-center text-xs sm:text-sm">4</span>
          <span className="text-sm sm:text-base md:text-xl">Your Savings</span>
        </h3>
        <p className="text-widget-muted text-xs sm:text-sm mb-4 sm:mb-6">Enter your transfer details to calculate savings</p>
        <div className="flex flex-col items-center justify-center py-4 sm:py-6">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-widget-input to-widget-input/70 flex items-center justify-center mb-3 sm:mb-4 shadow-lg border border-white/5">
            <span className="text-widget-accent text-2xl sm:text-3xl font-bold">%</span>
          </div>
          <p className="text-white/70 text-center text-xs sm:text-sm">Configure your transfer details above<br/>to see your potential savings</p>
        </div>
      </div>
    );
  }

  const { 
    traditionalCost, 
    stablecoinCost, 
    savings, 
    savingsPercentage, 
    annualSavings 
  } = result;

  return (
    <div className="rounded-lg p-4 sm:p-6 animate-fade-in">
      <h3 className="text-lg sm:text-xl font-semibold text-white mb-1 flex items-center">
        <span className="inline-block w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-widget-accent/20 text-widget-accent mr-2 flex items-center justify-center text-xs sm:text-sm">4</span>
        <span className="text-sm sm:text-base md:text-xl">Your Savings</span>
      </h3>
      <p className="text-widget-muted text-xs sm:text-sm mb-4 sm:mb-6">Here's how much you'll save with our stablecoin solution</p>
      
      <div className="mb-4 sm:mb-6 bg-black/20 p-3 sm:p-5 rounded-lg border border-white/5">
        <div className="flex justify-between items-center mb-2 sm:mb-3 p-1 sm:p-2 hover:bg-black/10 rounded transition-colors">
          <span className="text-widget-muted flex items-center text-xs sm:text-sm">
            <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-white/20 mr-1 sm:mr-2"></span>
            Traditional Bank
          </span>
          <span className="text-white text-xs sm:text-sm">{formatCurrency(traditionalCost, currency)}</span>
        </div>
        <div className="flex justify-between items-center mb-2 sm:mb-3 p-1 sm:p-2 hover:bg-black/10 rounded transition-colors">
          <span className="text-widget-muted flex items-center text-xs sm:text-sm">
            <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-widget-success/50 mr-1 sm:mr-2"></span>
            Our Stablecoin Solution
          </span>
          <span className="text-widget-success font-medium text-xs sm:text-sm">{formatCurrency(stablecoinCost, currency)}</span>
        </div>
        <div className="h-px bg-white/10 my-3 sm:my-4"></div>
        <div className="flex justify-between items-center p-1 sm:p-2 bg-widget-accent/5 rounded">
          <span className="text-white font-medium text-xs sm:text-sm">You Save</span>
          <div className="flex items-center gap-1 sm:gap-2">
            <span className="text-widget-success font-bold text-sm sm:text-base md:text-xl">{formatCurrency(savings, currency)}</span>
            <span className="bg-widget-success/10 text-widget-success px-1 sm:px-2 py-0.5 sm:py-1 rounded text-[10px] sm:text-xs font-semibold">
              {savingsPercentage.toFixed(0)}%
            </span>
          </div>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-widget-accent/20 to-widget-accent/10 p-3 sm:p-5 rounded-lg border border-widget-accent/20 shadow-inner">
        <div className="flex justify-between items-center">
          <span className="text-white font-medium flex items-center text-xs sm:text-sm">
            <span className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-widget-accent/50 mr-1 sm:mr-2 flex items-center justify-center">
              <span className="text-[8px] sm:text-xs">💰</span>
            </span>
            Annual Savings
          </span>
          <span className="text-white font-bold text-sm sm:text-base md:text-xl">{formatCurrency(annualSavings, currency)}</span>
        </div>
      </div>
    </div>
  );
};

export default SavingsResult;
