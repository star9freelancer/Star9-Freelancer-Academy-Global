/**
 * Currency Converter Utility
 * Handles automatic currency conversion for course payments
 */

export interface ExchangeRates {
    USD: number;
    KES: number;
    GHS: number;
    NGN: number;
    ZAR: number;
    [key: string]: number;
}

interface CurrencyConversionResult {
    amount: number;
    currency: string;
    usdEquivalent: number;
    exchangeRate: number;
}

// Fallback exchange rates (updated periodically)
const FALLBACK_RATES: ExchangeRates = {
    USD: 1,
    KES: 129.50,  // Kenyan Shilling
    GHS: 15.80,   // Ghanaian Cedi
    NGN: 1650,    // Nigerian Naira
    ZAR: 18.50,   // South African Rand
};

// Cache for exchange rates
let cachedRates: ExchangeRates | null = null;
let lastFetchTime: number = 0;
const CACHE_DURATION = 3600000; // 1 hour in milliseconds

/**
 * Fetch live exchange rates from API
 */
async function fetchExchangeRates(): Promise<ExchangeRates> {
    try {
        // Using exchangerate-api.com (free tier: 1,500 requests/month)
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');

        if (!response.ok) {
            throw new Error('Failed to fetch exchange rates');
        }

        const data = await response.json();

        return {
            USD: 1,
            KES: data.rates.KES || FALLBACK_RATES.KES,
            GHS: data.rates.GHS || FALLBACK_RATES.GHS,
            NGN: data.rates.NGN || FALLBACK_RATES.NGN,
            ZAR: data.rates.ZAR || FALLBACK_RATES.ZAR,
        };
    } catch (error) {
        console.warn('Failed to fetch live exchange rates, using fallback:', error);
        return FALLBACK_RATES;
    }
}

/**
 * Get current exchange rates (with caching)
 */
export async function getExchangeRates(): Promise<ExchangeRates> {
    const now = Date.now();

    // Return cached rates if still valid
    if (cachedRates && (now - lastFetchTime) < CACHE_DURATION) {
        return cachedRates;
    }

    // Fetch new rates
    cachedRates = await fetchExchangeRates();
    lastFetchTime = now;

    return cachedRates;
}

/**
 * Convert USD price to target currency
 */
export async function convertFromUSD(
    usdAmount: number,
    targetCurrency: string
): Promise<CurrencyConversionResult> {
    const rates = await getExchangeRates();
    const exchangeRate = rates[targetCurrency] || 1;
    const convertedAmount = Math.round(usdAmount * exchangeRate * 100) / 100;

    return {
        amount: convertedAmount,
        currency: targetCurrency,
        usdEquivalent: usdAmount,
        exchangeRate,
    };
}

/**
 * Convert any currency to USD
 */
export async function convertToUSD(
    amount: number,
    sourceCurrency: string
): Promise<number> {
    if (sourceCurrency === 'USD') {
        return amount;
    }

    const rates = await getExchangeRates();
    const exchangeRate = rates[sourceCurrency] || 1;

    return Math.round((amount / exchangeRate) * 100) / 100;
}

/**
 * Get payment amount in smallest currency unit (for Paystack)
 * Paystack requires amounts in kobo/pesewas/cents
 */
export async function getPaymentAmount(
    usdPrice: number,
    currency: string
): Promise<number> {
    const conversion = await convertFromUSD(usdPrice, currency);

    // Return amount in smallest unit (multiply by 100 for cents/kobo/pesewas)
    return Math.round(conversion.amount * 100);
}

/**
 * Format currency for display
 */
export function formatCurrency(amount: number, currency: string): string {
    const symbols: { [key: string]: string } = {
        USD: '$',
        KES: 'KES',
        GHS: 'GH₵',
        NGN: '₦',
        ZAR: 'R',
    };

    const symbol = symbols[currency] || currency;
    const formattedAmount = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    }).format(amount);

    return currency === 'USD' ? `${symbol}${formattedAmount}` : `${symbol} ${formattedAmount}`;
}

/**
 * Get user's currency based on location (optional enhancement)
 */
export async function detectUserCurrency(): Promise<string> {
    try {
        // Try to detect from browser/IP geolocation
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();

        const currencyMap: { [key: string]: string } = {
            KE: 'KES',
            GH: 'GHS',
            NG: 'NGN',
            ZA: 'ZAR',
        };

        return currencyMap[data.country_code] || 'USD';
    } catch (error) {
        return 'USD'; // Default to USD
    }
}
