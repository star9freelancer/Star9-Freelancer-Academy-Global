# Complete Enrollment Flow Documentation

## Overview
This document describes the complete enrollment flow for new students in the Star9 Academy platform.

## Flow Steps

### 1. Course Discovery (Academy Page)
- **Location**: `/academy` (Academy.tsx)
- **Action**: User browses the course catalog
- **Components**: 
  - `CourseCard` displays each course with "Enroll Now" button
  - Courses are fetched from `useAcademyData` hook

### 2. Enrollment Initiation
- **Trigger**: User clicks "Enroll Now" on a course card
- **Logic** (in Academy.tsx):
  ```typescript
  const handleEnroll = (courseId: string) => {
    if (!user) {
      // Redirect to signup tab with course ID
      navigate('/auth?tab=register', { state: { courseId, from: '/academy' } });
      return;
    }
    // If user is already logged in, open payment modal
    setEnrolling(courseId);
    setPaymentModalOpen(true);
  };
  ```
- **Result**: 
  - **New users**: Redirected to `/auth?tab=register` with course ID in state
  - **Existing users**: Payment modal opens directly

### 3. Sign Up Page (Auth.tsx)
- **Location**: `/auth?tab=register`
- **State Received**: `{ courseId, from: '/academy' }`
- **Form Fields**:
  - Role selection (Student, Expert, Employer, Referrer)
  - Personal info: Surname, Other Names, Phone, Email
  - Password
  - Optional: Referral Code
  - **Course Display**: Shows selected course in a highlighted card
  - **Currency Selection**: USD, KES (M-Pesa), or GHS (Mobile Money)
  - **ID Verification**: Persona verification (for students)

### 4. Payment Processing
- **Trigger**: User clicks "Pay & Create Account"
- **Function**: `initiateRegistrationPayment()`
- **Payment Gateway**: Paystack
- **Process**:
  1. Validates all required fields
  2. Checks ID verification status
  3. Calculates amount based on currency and exchange rates
  4. Opens Paystack payment iframe
  5. User completes payment

### 5. Payment Verification
- **Callback**: After successful payment
- **Function**: Calls Supabase Edge Function `verify-payment`
- **Actions**:
  1. Verifies payment with Paystack
  2. Generates receipt data:
     ```typescript
     {
       receiptNumber: `ST9-${Date.now()}`,
       date: new Date().toLocaleDateString(),
       studentName: fullName,
       email: email,
       courseName: courseTitle,
       amount: basePrice,
       currency: 'USD' | 'KES' | 'GHS',
       paymentMethod: 'Card Payment' | 'M-Pesa' | 'Mobile Money',
       transactionId: reference
     }
     ```
  3. Shows receipt modal
  4. Calls `executeSignup()`

### 6. Account Creation
- **Function**: `executeSignup()`
- **Process**:
  1. Creates Supabase auth user with `signUp()`
  2. Creates profile in `profiles` table
  3. Creates enrollment in `user_enrollments` table
  4. Tracks referral if referral code provided
  5. Confirms referral commission
  6. Signs in the user automatically

### 7. Receipt Display
- **Component**: `PaymentReceipt`
- **Features**:
  - Shows complete payment details
  - Displays receipt number, date, student info
  - Shows course enrolled and payment breakdown
  - **Download PDF**: User can download receipt as PDF
  - **Close Button**: Proceeds to next step

### 8. Redirect to Course Dashboard
- **Trigger**: User closes receipt modal
- **Function**: `handleReceiptClose()`
- **Actions**:
  1. Shows success toast: "🎉 You're enrolled! Lessons begin Tuesday, 12th May."
  2. Sets clearing animation
  3. Redirects to `/academy/course/{courseId}` after 1.8 seconds

### 9. Course Dashboard (CourseDashboard.tsx)
- **Location**: `/academy/course/{courseId}`
- **Features**:
  - Course overview and progress tracking
  - Week-by-week curriculum
  - Lesson content and quizzes
  - Certificate generation upon completion

## Key Components

### CourseCard.tsx
- Displays course information
- Shows enrollment status
- Handles "Enroll Now" vs "Continue Learning" states
- Implements cohort launch gate (May 12th, 2026)

### Auth.tsx
- Handles both login and registration
- Integrates Paystack payment
- Shows PaymentReceipt modal
- Manages enrollment flow for new students

### PaymentReceipt.tsx
- Displays payment confirmation
- Generates downloadable PDF receipt
- Provides clear call-to-action to proceed

### CourseDashboard.tsx
- Main learning interface
- Tracks lesson progress
- Manages quiz submissions
- Generates certificates

## Payment Integration

### Supported Currencies
- **USD**: Global card payments
- **KES**: M-Pesa (Kenya)
- **GHS**: Airtel/MTN Mobile Money (Ghana)

### Exchange Rates
- Fetched from `https://api.exchangerate-api.com/v4/latest/USD`
- Cached in state to avoid repeated API calls
- Updated when payment modal opens

### Course Pricing
- **AI Mastery Course**: $50 USD
- **Mastering Freelancing**: $100 USD
- **Teacher Preparation**: $1,500 USD (includes placement package)

## Security Features

1. **ID Verification**: Persona integration for identity verification
2. **Payment Verification**: Server-side verification via Supabase Edge Function
3. **Email Enumeration Protection**: Handles existing email gracefully
4. **Secure Session Management**: Automatic sign-in after registration

## Error Handling

- Payment cancellation: Shows error toast, keeps user on registration page
- Payment verification failure: Shows error, prevents account creation
- Enrollment failure: Shows error with support contact info
- Network errors: Graceful fallback with retry options

## User Experience Enhancements

1. **Progress Indicators**: Loading states during payment and account creation
2. **Success Animations**: Clearing animation before redirect
3. **Toast Notifications**: Clear feedback at each step
4. **Receipt Download**: Permanent record of payment
5. **Cohort Launch Gate**: Clear messaging about course start date

## Testing Checklist

- [ ] New user can browse courses without login
- [ ] Clicking "Enroll" redirects to signup with course pre-selected
- [ ] Payment modal shows correct currency conversions
- [ ] Paystack payment completes successfully
- [ ] Receipt displays with correct information
- [ ] Receipt PDF downloads properly
- [ ] Account is created after payment
- [ ] Enrollment is recorded in database
- [ ] User is redirected to course dashboard
- [ ] Course dashboard shows enrolled course
- [ ] Referral tracking works if code provided

## Future Enhancements

1. **Email Confirmation**: Send receipt via email
2. **Payment Plans**: Installment payment options
3. **Discount Codes**: Promotional pricing
4. **Group Enrollments**: Bulk enrollment for organizations
5. **Refund Processing**: Automated refund workflow
