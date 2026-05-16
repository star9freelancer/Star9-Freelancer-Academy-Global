# Visual Enrollment Flow

## Complete User Journey

```
┌─────────────────────────────────────────────────────────────────┐
│                    1. COURSE DISCOVERY                          │
│                    /academy (Catalog Tab)                       │
│                                                                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐      │
│  │ Course 1 │  │ Course 2 │  │ Course 3 │  │ Course 4 │      │
│  │          │  │          │  │          │  │          │      │
│  │ [Enroll] │  │ [Enroll] │  │ [Enroll] │  │ [Enroll] │      │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘      │
└─────────────────────────────────────────────────────────────────┘
                            │
                            │ User clicks "Enroll Now"
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                    2. AUTHENTICATION CHECK                      │
│                                                                 │
│              Is user logged in?                                 │
│                                                                 │
│         NO ◄──────────┬──────────► YES                         │
│          │            │             │                           │
└──────────┼────────────┴─────────────┼───────────────────────────┘
           │                          │
           │                          │ Open payment modal
           │                          │ (existing users)
           ▼                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                    3. SIGN UP PAGE                              │
│                    /auth?tab=register                           │
│                                                                 │
│  ┌───────────────────────────────────────────────────────┐    │
│  │ Selected Course: AI Mastery Course                    │    │
│  │ Price: $50 USD / KES 6,500 / GH₵ 725                 │    │
│  └───────────────────────────────────────────────────────┘    │
│                                                                 │
│  Role: ● Student  ○ Expert  ○ Employer  ○ Referrer            │
│                                                                 │
│  Surname: ________________    Other Names: ________________    │
│  Phone: __________________    Email: ______________________    │
│  Password: _______________                                      │
│  Referral Code (Optional): ________________________________    │
│                                                                 │
│  Currency: [USD ▼] [KES] [GHS]                                 │
│                                                                 │
│  [Verify ID with Persona]  ✓ ID Verified                      │
│                                                                 │
│  [Pay & Create Account]                                        │
└─────────────────────────────────────────────────────────────────┘
                            │
                            │ User submits form
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                    4. PAYMENT PROCESSING                        │
│                    Paystack Payment Gateway                     │
│                                                                 │
│  ┌───────────────────────────────────────────────────────┐    │
│  │                                                         │    │
│  │         [Paystack Payment Interface]                   │    │
│  │                                                         │    │
│  │  Enter Card Details / M-Pesa / Mobile Money           │    │
│  │                                                         │    │
│  │  Amount: $50.00 USD                                    │    │
│  │                                                         │    │
│  │  [Complete Payment]                                    │    │
│  │                                                         │    │
│  └───────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
                            │
                            │ Payment successful
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                    5. PAYMENT VERIFICATION                      │
│                    Supabase Edge Function                       │
│                                                                 │
│  1. Verify payment with Paystack API                           │
│  2. Generate receipt data                                      │
│  3. Return verification status                                 │
└─────────────────────────────────────────────────────────────────┘
                            │
                            │ Verification successful
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                    6. ACCOUNT CREATION                          │
│                                                                 │
│  1. Create Supabase auth user                                  │
│  2. Create profile in database                                 │
│  3. Create enrollment record                                   │
│  4. Track referral (if code provided)                          │
│  5. Auto sign-in user                                          │
└─────────────────────────────────────────────────────────────────┘
                            │
                            │ Account created
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                    7. PAYMENT RECEIPT                           │
│                    Modal Overlay                                │
│                                                                 │
│  ┌───────────────────────────────────────────────────────┐    │
│  │  ✓ Payment Successful!                                │    │
│  │                                                         │    │
│  │  Receipt #: ST9-1234567890                            │    │
│  │  Date: May 16, 2026                                   │    │
│  │                                                         │    │
│  │  Student: John Doe                                     │    │
│  │  Email: john@example.com                              │    │
│  │                                                         │    │
│  │  Course: AI Mastery Course                            │    │
│  │                                                         │    │
│  │  Payment Method: Card Payment                         │    │
│  │  Transaction ID: ST9_123456789                        │    │
│  │                                                         │    │
│  │  Total Paid: $50.00 USD                               │    │
│  │                                                         │    │
│  │  [Download Receipt (PDF)]                             │    │
│  │  [Continue to Course Dashboard →]                     │    │
│  └───────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
                            │
                            │ User clicks "Continue"
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                    8. SUCCESS ANIMATION                         │
│                                                                 │
│              ✓ You're enrolled!                                │
│              Lessons begin Tuesday, 12th May                   │
│                                                                 │
│              Taking you to your course dashboard...            │
│                                                                 │
│              [Progress Bar Animation]                          │
└─────────────────────────────────────────────────────────────────┘
                            │
                            │ After 1.8 seconds
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                    9. COURSE DASHBOARD                          │
│                    /academy/course/{courseId}                   │
│                                                                 │
│  AI Mastery Course                              Progress: 0%   │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                                                 │
│  📅 Course starts: Tuesday, May 12th, 2026                     │
│                                                                 │
│  Week 1: Introduction to AI                                    │
│    ▶ Module 1: What is AI?                                     │
│    ▶ Module 2: AI Applications                                 │
│                                                                 │
│  Week 2: Machine Learning Basics                               │
│    🔒 Unlocks on May 12th                                      │
│                                                                 │
│  [Start Learning] (Available May 12th)                         │
└─────────────────────────────────────────────────────────────────┘
```

## Key Features at Each Step

### 1. Course Discovery
- Browse all available courses
- Filter by category
- Search functionality
- Clear pricing display

### 2. Authentication Check
- Seamless redirect for new users
- Direct payment for existing users
- Course ID preserved in navigation state

### 3. Sign Up Page
- Pre-selected course displayed prominently
- Multi-currency support (USD, KES, GHS)
- Live exchange rate conversion
- ID verification integration (Persona)
- Optional referral code tracking

### 4. Payment Processing
- Secure Paystack integration
- Multiple payment methods:
  - Global card payments (USD)
  - M-Pesa (KES)
  - Mobile Money (GHS)
- Real-time payment status

### 5. Payment Verification
- Server-side verification
- Prevents duplicate enrollments
- Generates unique receipt number
- Tracks transaction details

### 6. Account Creation
- Atomic operation (all or nothing)
- Profile creation
- Enrollment record
- Referral tracking
- Automatic sign-in

### 7. Payment Receipt
- Professional receipt design
- Downloadable PDF
- Complete transaction details
- Clear next action button

### 8. Success Animation
- Smooth transition
- Clear messaging
- Progress indicator
- Builds anticipation

### 9. Course Dashboard
- Immediate access to course
- Progress tracking
- Cohort launch gate (May 12th)
- Week-by-week curriculum

## Error Handling

```
Payment Failed
     │
     ▼
┌─────────────────┐
│ Error Message   │
│ [Try Again]     │
└─────────────────┘
     │
     └──► Return to payment form
```

```
Account Creation Failed
     │
     ▼
┌─────────────────────────┐
│ Error Message           │
│ Contact Support         │
│ support@star9...        │
└─────────────────────────┘
```

## Mobile Responsive Flow

All screens are fully responsive:
- Touch-friendly buttons
- Optimized form layouts
- Mobile payment methods prioritized
- Smooth animations on all devices

## Security Measures

1. **Payment**: PCI-compliant via Paystack
2. **ID Verification**: Persona integration
3. **Server-side Validation**: All critical operations
4. **Session Management**: Secure token handling
5. **Email Verification**: Prevents enumeration attacks
