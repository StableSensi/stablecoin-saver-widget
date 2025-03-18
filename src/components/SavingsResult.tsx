
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
      <div className="bg-widget-card rounded-lg p-6 border border-white/5 animate-pulse">
        <h3 className="text-xl font-medium text-white mb-4">Calculating savings...</h3>
        <div className="h-8 bg-white/10 rounded animate-pulse"></div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="bg-widget-card rounded-lg p-6 border border-white/5">
        <h3 className="text-xl font-medium text-white mb-1">Your Savings</h3>
        <p className="text-widget-muted text-sm mb-6">Enter your transfer details to calculate savings</p>
        <div className="flex flex-col items-center justify-center py-6">
          <div className="w-16 h-16 rounded-full bg-widget-input flex items-center justify-center mb-4">
            <span className="text-widget-muted text-2xl">%</span>
          </div>
          <p className="text-white/70">Configure your transfer details above</p>
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
    <div className="bg-widget-card rounded-lg p-6 border border-white/5 animate-fade-in">
      <h3 className="text-xl font-medium text-white mb-1">Your Savings</h3>
      <p className="text-widget-muted text-sm mb-6">Here's how much you'll save with our stablecoin solution</p>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-widget-muted">Traditional Bank</span>
          <span className="text-white">{formatCurrency(traditionalCost, currency)}</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-widget-muted">Our Stablecoin Solution</span>
          <span className="text-widget-success font-medium">{formatCurrency(stablecoinCost, currency)}</span>
        </div>
        <div className="h-px bg-white/10 my-4"></div>
        <div className="flex justify-between items-center">
          <span className="text-white font-medium">You Save</span>
          <div className="flex items-center gap-2">
            <span className="text-widget-success font-bold text-xl">{formatCurrency(savings, currency)}</span>
            <span className="bg-widget-success/10 text-widget-success px-2 py-1 rounded text-xs">
              {savingsPercentage.toFixed(0)}%
            </span>
          </div>
        </div>
      </div>
      
      <div className="bg-widget-input p-4 rounded-lg">
        <div className="flex justify-between items-center">
          <span className="text-widget-muted">Annual Savings</span>
          <span className="text-white font-bold">{formatCurrency(annualSavings, currency)}</span>
        </div>
      </div>
    </div>
  );
};

export default SavingsResult;
