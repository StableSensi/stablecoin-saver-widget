export interface SavingsCalculationResult {
  traditionalCost: number;
  stablecoinCost: number;
  savings: number;
  savingsPercentage: number;
  annualSavings: number;
}

// Hard-coded mid-market exchange rates for several currencies.
// These values are approximate. Add more currencies or update values as needed.
const EXCHANGE_RATES: { [base: string]: { [target: string]: number } } = {
  USD: { USD: 1,   EUR: 0.90, GBP: 0.80, CAD: 1.35, JPY: 134 },
  EUR: { EUR: 1,   USD: 1.11, GBP: 0.88, CAD: 1.50, JPY: 149 },
  GBP: { GBP: 1,   USD: 1.25, EUR: 1.14, CAD: 1.70, JPY: 169 },
  CAD: { CAD: 1,   USD: 0.74, EUR: 0.66, GBP: 0.59, JPY: 99 },
  JPY: { JPY: 1,   USD: 0.0075, EUR: 0.0067, GBP: 0.0059, CAD: 0.0101 },
  // Additional currencies can be added here
};

export const calculateSavings = (
  amount: number,
  fromCurrency: string,
  toCurrency: string,
  frequency: number // Number of transfers per year
): SavingsCalculationResult => {
  // Fixed average fee percentages for simplicity
  const traditionalFeePercentage = 0.06; // 6% fee for traditional bank transfers
  const stablecoinFeePercentage = 0.01;  // 1% fee for stablecoin network costs
  const reForgeFeePercentage = 0.003;    // 0.3% fee for ReForge currency conversion

  // Optional exchange rate lookup (if transferring between different currencies)
  let exchangeRate = 1;
  if (fromCurrency !== toCurrency && 
      EXCHANGE_RATES[fromCurrency] && 
      EXCHANGE_RATES[fromCurrency][toCurrency]) {
    exchangeRate = EXCHANGE_RATES[fromCurrency][toCurrency];
  }

  // Calculate fees on the sender's amount
  const traditionalCost = amount * traditionalFeePercentage;
  
  // The stablecoin route includes both network and ReForge fees
  const stablecoinCost = amount * (stablecoinFeePercentage + reForgeFeePercentage);
  
  // Savings per transfer in sender's currency
  const savings = traditionalCost - stablecoinCost;
  
  // Savings percentage relative to the traditional fee
  const savingsPercentage = traditionalCost > 0 ? (savings / traditionalCost) * 100 : 0;
  
  // Annual savings based on the number of transfers per year
  const annualSavings = savings * frequency;
  
  return {
    traditionalCost,
    stablecoinCost,
    savings,
    savingsPercentage,
    annualSavings,
  };
};

// Helper function to format currency values 
export const formatCurrency = (value: number, currency: string): string => {
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      maximumFractionDigits: 2,
    }).format(value);
  } catch (error) {
    return `${currency} ${value.toFixed(2)}`;
  }
};
