
export interface Country {
  code: string;
  name: string;
  flag: string;
  currencyCode: string;
  currencySymbol: string;
}

export interface Currency {
  code: string;
  name: string;
  symbol: string;
}

export const currencies: Currency[] = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$' },
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$' },
  { code: 'ZAR', name: 'South African Rand', symbol: 'R' },
  { code: 'MXN', name: 'Mexican Peso', symbol: 'Mex$' },
];

export const countries: Country[] = [
  { code: 'US', name: 'United States', flag: '🇺🇸', currencyCode: 'USD', currencySymbol: '$' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', currencyCode: 'GBP', currencySymbol: '£' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', currencyCode: 'CAD', currencySymbol: 'C$' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺', currencyCode: 'AUD', currencySymbol: 'A$' },
  { code: 'EU', name: 'European Union', flag: '🇪🇺', currencyCode: 'EUR', currencySymbol: '€' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', currencyCode: 'EUR', currencySymbol: '€' },
  { code: 'FR', name: 'France', flag: '🇫🇷', currencyCode: 'EUR', currencySymbol: '€' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸', currencyCode: 'EUR', currencySymbol: '€' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹', currencyCode: 'EUR', currencySymbol: '€' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵', currencyCode: 'JPY', currencySymbol: '¥' },
  { code: 'CH', name: 'Switzerland', flag: '🇨🇭', currencyCode: 'CHF', currencySymbol: 'CHF' },
  { code: 'CN', name: 'China', flag: '🇨🇳', currencyCode: 'CNY', currencySymbol: '¥' },
  { code: 'IN', name: 'India', flag: '🇮🇳', currencyCode: 'INR', currencySymbol: '₹' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬', currencyCode: 'SGD', currencySymbol: 'S$' },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷', currencyCode: 'BRL', currencySymbol: 'R$' },
  { code: 'ZA', name: 'South Africa', flag: '🇿🇦', currencyCode: 'ZAR', currencySymbol: 'R' },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽', currencyCode: 'MXN', currencySymbol: 'Mex$' },
];

export function getCurrencyByCode(code: string): Currency | undefined {
  return currencies.find(currency => currency.code === code);
}

export function getCountryByCurrencyCode(code: string): Country | undefined {
  return countries.find(country => country.currencyCode === code);
}

export function getCountryByCode(code: string): Country | undefined {
  return countries.find(country => country.code === code);
}
