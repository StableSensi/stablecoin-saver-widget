
// Define the typical bank fee structures (these are example values)
interface BankFee {
  fixedFee: number;    // Fixed fee in the currency
  percentageFee: number; // Percentage fee (e.g., 0.03 for 3%)
  hiddenFxMarkup: number; // Hidden FX markup (e.g., 0.02 for 2% worse exchange rate)
}

// Fee structure by currency for traditional banks
const bankFeesByCurrency: Record<string, BankFee> = {
  'USD': { fixedFee: 25, percentageFee: 0.01, hiddenFxMarkup: 0.04 },
  'EUR': { fixedFee: 20, percentageFee: 0.01, hiddenFxMarkup: 0.04 },
  'GBP': { fixedFee: 15, percentageFee: 0.01, hiddenFxMarkup: 0.035 },
  'JPY': { fixedFee: 2500, percentageFee: 0.01, hiddenFxMarkup: 0.04 },
  'CAD': { fixedFee: 30, percentageFee: 0.01, hiddenFxMarkup: 0.04 },
  'AUD': { fixedFee: 30, percentageFee: 0.01, hiddenFxMarkup: 0.04 },
  'CHF': { fixedFee: 25, percentageFee: 0.01, hiddenFxMarkup: 0.035 },
  'CNY': { fixedFee: 150, percentageFee: 0.01, hiddenFxMarkup: 0.045 },
  'INR': { fixedFee: 1500, percentageFee: 0.01, hiddenFxMarkup: 0.045 },
  'SGD': { fixedFee: 30, percentageFee: 0.01, hiddenFxMarkup: 0.04 },
  'BRL': { fixedFee: 100, percentageFee: 0.02, hiddenFxMarkup: 0.045 },
  'ZAR': { fixedFee: 300, percentageFee: 0.02, hiddenFxMarkup: 0.045 },
  'MXN': { fixedFee: 400, percentageFee: 0.015, hiddenFxMarkup: 0.045 },
  // Default for any currency not listed
  'default': { fixedFee: 25, percentageFee: 0.015, hiddenFxMarkup: 0.04 }
};

// Fee structure for stablecoin transfers (much lower)
const stablecoinFee = {
  fixedFee: 1, // Lower fixed fee
  percentageFee: 0.001, // 0.1%
  hiddenFxMarkup: 0 // No hidden markup
};

export interface SavingsCalculationResult {
  traditionalCost: number;
  stablecoinCost: number;
  savings: number;
  savingsPercentage: number;
  annualSavings: number;
  details: {
    traditionalFixedFee: number;
    traditionalPercentageFee: number;
    traditionalFxMarkup: number;
    stablecoinFixedFee: number;
    stablecoinPercentageFee: number;
  };
}

export function calculateSavings(
  amount: number,
  fromCurrency: string,
  toCurrency: string,
  frequency: number
): SavingsCalculationResult {
  // Get bank fee structure for the source currency
  const bankFee = bankFeesByCurrency[fromCurrency] || bankFeesByCurrency.default;

  // Calculate traditional bank transfer costs
  const traditionalFixedFee = bankFee.fixedFee;
  const traditionalPercentageFee = amount * bankFee.percentageFee;
  const traditionalFxMarkup = amount * bankFee.hiddenFxMarkup;
  const traditionalCost = traditionalFixedFee + traditionalPercentageFee + traditionalFxMarkup;

  // Calculate stablecoin transfer costs
  const stablecoinFixedFee = stablecoinFee.fixedFee;
  const stablecoinPercentageFee = amount * stablecoinFee.percentageFee;
  const stablecoinCost = stablecoinFixedFee + stablecoinPercentageFee;

  // Calculate savings
  const savings = traditionalCost - stablecoinCost;
  const savingsPercentage = (savings / traditionalCost) * 100;
  const annualSavings = savings * frequency; // Annual savings based on frequency

  return {
    traditionalCost,
    stablecoinCost,
    savings,
    savingsPercentage,
    annualSavings,
    details: {
      traditionalFixedFee,
      traditionalPercentageFee,
      traditionalFxMarkup,
      stablecoinFixedFee,
      stablecoinPercentageFee
    }
  };
}

export function formatCurrency(amount: number, currencyCode: string): string {
  // Get currency symbol based on currency code
  const currencies: Record<string, string> = {
    'USD': '$', 'EUR': '€', 'GBP': '£', 'JPY': '¥',
    'CAD': 'C$', 'AUD': 'A$', 'CHF': 'CHF', 'CNY': '¥',
    'INR': '₹', 'SGD': 'S$', 'BRL': 'R$', 'ZAR': 'R', 'MXN': 'Mex$'
  };

  const symbol = currencies[currencyCode] || currencyCode;
  
  // Format number based on currency
  const options: Intl.NumberFormatOptions = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  };
  
  // Handle JPY specifically which typically doesn't show decimal places
  if (currencyCode === 'JPY') {
    options.minimumFractionDigits = 0;
    options.maximumFractionDigits = 0;
  }
  
  const formattedNumber = new Intl.NumberFormat('en-US', options).format(amount);
  return `${symbol} ${formattedNumber}`;
}
