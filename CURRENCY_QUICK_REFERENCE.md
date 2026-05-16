# Currency Conversion - Quick Reference

## 🎯 What Changed?

Course prices now automatically convert from USD to local currencies using **live exchange rates**.

## 💰 Supported Currencies

| Currency | Code | Payment Method | Symbol |
|----------|------|----------------|--------|
| US Dollar | USD | Credit/Debit Card | $ |
| Kenyan Shilling | KES | M-Pesa | KES |
| Ghanaian Cedi | GHS | Airtel/MTN | GH₵ |

## 📊 Current Exchange Rates (Approximate)

| USD | KES | GHS |
|-----|-----|-----|
| $50 | KES 6,475 | GH₵ 790 |
| $100 | KES 12,950 | GH₵ 1,580 |
| $1,500 | KES 194,250 | GH₵ 23,700 |

*Rates update hourly from live API*

## 🔧 For Developers

### Import the utility
```typescript
import { getExchangeRates, convertFromUSD, getPaymentAmount } from '@/lib/currencyConverter';
```

### Get current rates
```typescript
const rates = await getExchangeRates();
// { USD: 1, KES: 129.5, GHS: 15.8, ... }
```

### Convert a price
```typescript
const converted = await convertFromUSD(50, 'KES');
// { amount: 6475, currency: 'KES', usdEquivalent: 50, exchangeRate: 129.5 }
```

### Get Paystack amount
```typescript
const amount = await getPaymentAmount(50, 'KES');
// 647500 (in kobo - smallest unit)
```

## 🧪 Testing

### Quick Test
1. Open `test_currency_conversion.html` in browser
2. Click "Fetch Current Rates"
3. Verify all conversions work

### Manual Test
1. Go to Academy page
2. Click "Enroll Now" on any course
3. Check all currency options show correct amounts

## 🚨 Troubleshooting

### Prices not showing?
- Check browser console for errors
- Verify internet connection
- System will use fallback rates if API fails

### Wrong amounts?
- Rates update every hour
- Check `FALLBACK_RATES` in `currencyConverter.ts`
- Verify Paystack currency support

## 📝 Key Files

- `src/lib/currencyConverter.ts` - Main utility
- `src/pages/Academy.tsx` - Payment integration
- `CURRENCY_CONVERSION_GUIDE.md` - Full documentation
- `test_currency_conversion.html` - Test page

## 🎓 How It Works

1. Student clicks "Enroll Now"
2. System fetches latest exchange rates (cached 1hr)
3. USD price converted to all currencies
4. Student selects payment method
5. Paystack processes payment in chosen currency

## 📈 API Usage

- **Provider**: exchangerate-api.com
- **Free Tier**: 1,500 requests/month
- **Cache**: 1 hour
- **Expected Usage**: ~720 requests/month

## ✅ Production Checklist

- [x] Currency converter created
- [x] Academy.tsx updated
- [x] Build tested successfully
- [x] Documentation complete
- [ ] Deploy to staging
- [ ] Test real payments
- [ ] Monitor API usage
- [ ] Deploy to production

## 🔮 Coming Soon

- Auto-detect user's currency
- More African currencies (NGN, ZAR)
- Admin dashboard for rates
- Historical rate tracking

---

**Questions?** Check `CURRENCY_CONVERSION_GUIDE.md` for detailed documentation.
