# Enrollment Flow Guide

## Overview
This document explains how students enroll in courses, particularly the "AI for Freelancers" course, and how they are redirected to the course dashboard after successful signup and payment.

## Course Information

### AI for Freelancers Course
- **Course ID**: `00000000-0000-0000-0000-000000000001`
- **Title**: AI for Freelancers
- **Price**: $50 USD
- **Duration**: 4 Weeks
- **Category**: AI & Automation

## Enrollment Flow

### For New Users (Not Logged In)

1. **User clicks "Enroll Now"** on the AI for Freelancers course card
   - Location: Academy page (`/academy`)
   - Triggers: `handleEnroll(courseId)` function

2. **Redirect to Signup Page**
   - User is redirected to `/auth?tab=register`
   - Course ID is passed via navigation state: `{ courseId, from: '/academy' }`

3. **User Fills Registration Form**
   - Required fields:
     - Surname
     - Other Names
     - Email
     - Password
     - Phone Number
     - Role selection (defaults to 'student')
   - Optional: Referral code
   - Course selection is pre-filled from navigation state

4. **Payment Modal Opens**
   - Shows course details
   - Displays price in multiple currencies (USD, KES, GHS)
   - Uses live exchange rates for conversion
   - User selects preferred payment method

5. **Payment Processing**
   - Paystack payment gateway opens
   - User completes payment
   - Payment is verified via Supabase Edge Function

6. **Account Creation**
   - User account is created in Supabase Auth
   - Profile is created in `profiles` table
   - Enrollment record is created in `user_enrollments` table
   - If referral code provided, referral is tracked

7. **Redirect to Course Dashboard**
   - After successful enrollment, user is redirected to:
   - `/academy/course/00000000-0000-0000-0000-000000000001`
   - Success message: "🎉 You're enrolled! Redirecting to your course..."

### For Existing Users (Already Logged In)

1. **User clicks "Enroll Now"** on a course they're not enrolled in
   - Triggers: `handleEnroll(courseId)` function

2. **Payment Modal Opens Directly**
   - No redirect to auth page
   - Shows course details and pricing
   - User selects payment method

3. **Payment Processing**
   - Paystack payment gateway opens
   - User completes payment

4. **Enrollment Created**
   - Enrollment record is created in `user_enrollments` table
   - Cache is invalidated to refresh data

5. **Redirect to Course Dashboard**
   - User is redirected to: `/academy/course/{courseId}`
   - Success message: "🎉 Enrolled! Redirecting to your course..."

## Code Implementation

### Auth.tsx - Signup Flow

```typescript
const executeSignup = async () => {
  // ... account creation logic ...
  
  // Add user enrollment for students purchasing a course
  if (selectedCourse && selectedRole === 'student') {
    const { error: enrollError } = await supabase
      .from('user_enrollments')
      .insert({
        user_id: data.user.id,
        course_id: selectedCourse,
        progress: 0
      });
    
    if (enrollError) throw new Error("Enrollment failed: " + enrollError.message);
  }
  
  // Redirect to course dashboard if enrolled
  if (selectedCourse && selectedRole === 'student') {
    setTimeout(() => navigate(`/academy/course/${selectedCourse}`), 1800);
  } else {
    setTimeout(() => navigate("/academy"), 1800);
  }
};
```

### Academy.tsx - Enrollment for Logged-in Users

```typescript
const handleEnroll = (courseId: string) => {
  if (!user) {
    // Redirect to signup
    navigate('/auth?tab=register', { state: { courseId, from: '/academy' } });
    return;
  }
  // Open payment modal for logged-in users
  setEnrolling(courseId);
  setPaymentModalOpen(true);
};

const initializePaystackPayment = (paystackKey, amount, currency, courseId) => {
  const handler = PaystackPop.setup({
    // ... payment config ...
    callback: async () => {
      // Create enrollment record
      await supabase.from('user_enrollments').insert({
        user_id: user?.id,
        course_id: courseId,
        progress: 0
      });
      
      // Redirect to course dashboard
      setTimeout(() => {
        invalidateAll();
        navigate(`/academy/course/${courseId}`);
      }, 1500);
    }
  });
};
```

## Database Schema

### user_enrollments Table
```sql
CREATE TABLE user_enrollments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id UUID REFERENCES academy_courses(id) ON DELETE CASCADE,
  progress INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, course_id)
);
```

### academy_courses Table
```sql
CREATE TABLE academy_courses (
  id UUID PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  category TEXT,
  price INTEGER DEFAULT 0,
  status TEXT DEFAULT 'draft',
  -- ... other fields ...
);
```

## Testing the Flow

### Test Case 1: New User Enrollment
1. Go to `/academy` (not logged in)
2. Click "Enroll Now" on AI for Freelancers course
3. Fill registration form
4. Complete payment
5. Verify redirect to `/academy/course/00000000-0000-0000-0000-000000000001`
6. Verify enrollment exists in database

### Test Case 2: Existing User Enrollment
1. Log in to account
2. Go to `/academy`
3. Click "Enroll Now" on a course you're not enrolled in
4. Complete payment
5. Verify redirect to course dashboard
6. Verify enrollment exists in database

### SQL Verification Queries

```sql
-- Check if course exists
SELECT * FROM academy_courses 
WHERE id = '00000000-0000-0000-0000-000000000001';

-- Check user enrollments
SELECT 
  e.id,
  e.user_id,
  e.course_id,
  e.progress,
  c.title as course_title,
  p.full_name as student_name,
  e.created_at
FROM user_enrollments e
JOIN academy_courses c ON e.course_id = c.id
JOIN profiles p ON e.user_id = p.id
WHERE e.course_id = '00000000-0000-0000-0000-000000000001'
ORDER BY e.created_at DESC;

-- Check enrollment count
SELECT 
  c.title,
  COUNT(e.id) as enrollment_count
FROM academy_courses c
LEFT JOIN user_enrollments e ON c.id = e.course_id
WHERE c.id = '00000000-0000-0000-0000-000000000001'
GROUP BY c.id, c.title;
```

## Troubleshooting

### Issue: User not redirected to course dashboard
**Solution**: Check browser console for navigation errors. Verify course ID matches in database.

### Issue: Enrollment not created
**Solution**: Check Supabase logs for insert errors. Verify user_enrollments table exists and has correct permissions.

### Issue: Payment successful but enrollment failed
**Solution**: Check payment callback function. Verify Supabase connection. Check for duplicate enrollment constraints.

### Issue: Wrong course ID
**Solution**: Run `update_ai_course_id.sql` to ensure course has correct ID `00000000-0000-0000-0000-000000000001`.

## Security Considerations

1. **Payment Verification**: Always verify payment on server-side before creating enrollment
2. **Duplicate Enrollments**: Database constraint prevents duplicate enrollments (UNIQUE on user_id, course_id)
3. **Authorization**: Course dashboard checks if user is enrolled before showing content
4. **Session Management**: User must be authenticated to access course content

## Future Enhancements

1. **Email Confirmation**: Send enrollment confirmation email
2. **Welcome Email**: Send course welcome email with getting started guide
3. **Progress Tracking**: Track lesson completion and quiz scores
4. **Certificate Generation**: Auto-generate certificate upon course completion
5. **Refund Handling**: Implement refund flow and enrollment cancellation

## Related Files

- `src/pages/Auth.tsx` - Signup and authentication
- `src/pages/Academy.tsx` - Course catalog and enrollment
- `src/pages/CourseDashboard.tsx` - Course content and progress
- `src/hooks/useAcademyData.ts` - Course data and curriculum
- `quick_seed_courses.sql` - Course database seeding
- `update_ai_course_id.sql` - Course ID update script

## Support

For issues with enrollment flow:
1. Check browser console for errors
2. Verify Supabase connection
3. Check payment gateway configuration
4. Review database logs
5. Test with different browsers/devices
