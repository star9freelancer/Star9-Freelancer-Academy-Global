# Currency Conversion System

## Overview
The Star9 Academy platform now features automatic currency conversion for course subscriptions. When students pay in their local currency (e.g., Kenyan Shilling, Ghanaian Cedi), the price is automatically converted from the base USD price using live exchange rates.

## Features

### 1. Live Exchange Rates
- Fetches real-time exchange rates from exchangerate-api.com
- Updates rates every hour (cached for performance)
- Falls back to reliable default rates if API is unavailable

### 2. Supported Currencies
- **USD** - US Dollar (base currency)
- **KES** - Kenyan Shilling (M-Pesa)
- **GHS** - Ghanaian Cedi (Airtel/MTN Mobile Money)
- **NGN** - Nigerian Naira (ready for future integration)
- **ZAR** - South African Rand (ready for future integration)

### 3. Automatic Conversion
- All course prices are stored in USD
- Prices are converted in real-time when the payment modal opens
- Conversion happens automatically based on selected payment method

## How It Works

### For Students
1. Click "Enroll Now" on any course
2. Payment modal opens showing all available payment methods
3. Prices are displayed in each currency with live conversion rates
4. Select your preferred payment method
5. Complete payment through Paystack

### For Developers

#### Currency Converter Utility (`src/lib/currencyConverter.ts`)

```typescript
// Get current exchange rates
const rates = await getExchangeRates();

// Convert USD to another currency
const conversion = await convertFromUSD(50, 'KES');
// Returns: { amount: 6475, currency: 'KES', usdEquivalent: 50, exchangeRate: 129.5 }

// Get payment amount in smallest unit (for Paystack)
const amount = await getPaymentAmount(50, 'KES');
// Returns: 647500 (in kobo/cents)

// Format currency for display
const formatted = formatCurrency(6475, 'KES');
// Returns: "KES 6,475"
```

#### Integration in Academy.tsx

```typescript
// Fetch rates when payment modal opens
useEffect(() => {
  if (paymentModalOpen && !exchangeRates) {
    setLoadingRates(true);
    getExchangeRates().then(rates => {
      setExchangeRates(rates);
      setLoadingRates(false);
    });
  }
}, [paymentModalOpen, exchangeRates]);

// Use dynamic conversion in payment
const initiatePayment = async (currency: 'USD' | 'KES' | 'GHS') => {
  const basePrice = 50; // USD
  const amount = await getPaymentAmount(basePrice, currency);
  // Proceed with Paystack payment
};
```

## Course Pricing

### Current Pricing Structure (USD)
- **Standard Courses**: $50
- **Mastering Freelancing**: $100
- **Teacher Preparation Program**: $1,500

### Example Conversions (approximate)
| Course | USD | KES | GHS |
|--------|-----|-----|-----|
| Standard | $50 | KES 6,475 | GH₵ 790 |
| Freelancing | $100 | KES 12,950 | GH₵ 1,580 |
| Teacher Prep | $1,500 | KES 194,250 | GH₵ 23,700 |

*Note: Actual amounts vary based on live exchange rates*

## Technical Details

### Exchange Rate API
- **Provider**: exchangerate-api.com
- **Free Tier**: 1,500 requests/month
- **Update Frequency**: Hourly cache
- **Fallback**: Hardcoded rates if API fails

### Caching Strategy
- Exchange rates are cached for 1 hour
- Reduces API calls and improves performance
- Ensures consistent pricing during checkout

### Error Handling
- Graceful fallback to default rates if API fails
- Loading states while fetching rates
- User-friendly error messages

## Adding New Currencies

To add support for a new currency:

1. **Update the currency converter** (`src/lib/currencyConverter.ts`):
```typescript
const FALLBACK_RATES: ExchangeRates = {
  USD: 1,
  KES: 129.50,
  GHS: 15.80,
  NGN: 1650,    // Add new currency
  // ...
};
```

2. **Add payment button** in `Academy.tsx`:
```typescript
<Button onClick={() => initiatePayment('NGN')} variant="outline">
  <span>Pay with Naira (NGN)</span>
  <span>₦ {Math.round(basePrice * exchangeRates.NGN).toLocaleString()}</span>
</Button>
```

3. **Update Paystack configuration** to support the new currency

## Testing

### Manual Testing
1. Open the Academy page
2. Click "Enroll Now" on any course
3. Verify all currency options display correct converted amounts
4. Check that amounts update when exchange rates refresh
5. Test payment flow with each currency option

### API Testing
```typescript
// Test exchange rate fetching
const rates = await getExchangeRates();
console.log('Current rates:', rates);

// Test conversion
const converted = await convertFromUSD(100, 'KES');
console.log('100 USD =', converted.amount, converted.currency);
```

## Monitoring

### What to Monitor
- Exchange rate API availability
- Conversion accuracy
- Payment success rates by currency
- Cache hit rates

### Logs
The system logs warnings when:
- Exchange rate API fails (falls back to defaults)
- Conversion errors occur
- Invalid currency codes are used

## Future Enhancements

1. **Auto-detect user currency** based on IP geolocation
2. **Multi-currency pricing** - Store prices in multiple currencies
3. **Historical rate tracking** - Track exchange rate changes over time
4. **Admin dashboard** - View conversion rates and payment analytics
5. **Currency preferences** - Let users save preferred payment method

## Support

For issues or questions about currency conversion:
- Check the browser console for error messages
- Verify Paystack configuration
- Ensure exchange rate API is accessible
- Review fallback rates in `currencyConverter.ts`

## Security Considerations

- Exchange rates are fetched client-side (no sensitive data)
- Payment processing handled securely by Paystack
- No currency conversion happens server-side (Paystack handles final amounts)
- All amounts are validated before payment initiation
