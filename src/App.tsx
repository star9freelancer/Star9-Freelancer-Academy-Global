import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import CookieConsent from "@/components/CookieConsent";
import Index from "./pages/Index.tsx";
import Academy from "./pages/Academy.tsx";
import Global from "./pages/Global.tsx";
import NotFound from "./pages/NotFound.tsx";
import Auth from "./pages/Auth.tsx";
import Admin from "./pages/Admin.tsx";
import CoursePlayer from "./pages/CoursePlayer.tsx";
import CourseDashboard from "./pages/CourseDashboard.tsx";
import Verify from "./pages/Verify.tsx";
import ResetPassword from "./pages/ResetPassword.tsx";
import About from "./pages/About.tsx";
import Onboarding from "./pages/Onboarding.tsx";
import Terms from "./pages/Terms.tsx";
import Privacy from "./pages/Privacy.tsx";
import Contact from "./pages/Contact.tsx";
import Support from "./pages/Support.tsx";
import Referrals from "./pages/Referrals.tsx";
import ReferrerAuth from "./pages/ReferrerAuth.tsx";
import ReferrerDashboard from "./pages/ReferrerDashboard.tsx";

import ProtectedRoute from "./components/auth/ProtectedRoute.tsx";
import { AuthProvider, useAuth } from "./context/AuthContext.tsx";
import { Navigate, useLocation } from "react-router-dom";
import { supabase } from "./lib/supabase";

// A wrapper to enforce onboarding completion
const OnboardingGate = ({ children }: { children: React.ReactNode }) => {
  const { user, loading, isOnboardingNeeded } = useAuth();

  if (loading) return null;
  if (!user) return <>{children}</>;

  if (isOnboardingNeeded) {
    return <Navigate to="/onboarding" replace />;
  }

  return <>{children}</>;
};

// A wrapper to redirect enrolled students to their course dashboard
const EnrollmentGate = ({ children }: { children: React.ReactNode }) => {
  const { user, loading, profile } = useAuth();
  const location = useLocation();
  const [enrolledCourseId, setEnrolledCourseId] = React.useState<string | null>(null);
  const [checkingEnrollment, setCheckingEnrollment] = React.useState(true);

  React.useEffect(() => {
    const checkEnrollment = async () => {
      if (!user || loading) {
        setCheckingEnrollment(false);
        return;
      }

      // Skip enrollment check for admin users
      if (profile?.role === 'admin') {
        setCheckingEnrollment(false);
        return;
      }

      try {
        // Check if user has any active enrollments
        const { data: enrollments, error } = await supabase
          .from('academy_enrollments')
          .select('course_id, status')
          .eq('user_id', user.id)
          .eq('status', 'active')
          .limit(1)
          .single();

        if (!error && enrollments) {
          setEnrolledCourseId(enrollments.course_id);
        }
      } catch (err) {
        console.error('Error checking enrollment:', err);
      } finally {
        setCheckingEnrollment(false);
      }
    };

    checkEnrollment();
  }, [user, loading, profile]);

  if (loading || checkingEnrollment) return null;

  // Admin users have unrestricted access
  if (profile?.role === 'admin') {
    return <>{children}</>;
  }

  // Allowed paths for enrolled students
  const allowedPaths = [
    '/auth',
    '/reset-password',
    '/onboarding',
    '/verify',
    '/terms',
    '/privacy',
    '/contact',
    '/support',
    '/about',
    '/referrals'
  ];

  const isAllowedPath = allowedPaths.some(path => location.pathname.startsWith(path)) ||
    location.pathname.startsWith('/academy/course/');

  // If user is enrolled and trying to access restricted pages, redirect to their course
  if (user && enrolledCourseId && !isAllowedPath) {
    return <Navigate to={`/academy/course/${enrolledCourseId}`} replace />;
  }

  return <>{children}</>;
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <CookieConsent />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<EnrollmentGate><Index /></EnrollmentGate>} />
            <Route path="/auth" element={<EnrollmentGate><Auth /></EnrollmentGate>} />
            <Route path="/reset-password" element={<EnrollmentGate><ResetPassword /></EnrollmentGate>} />

            {/* Public Browse Routes - Gated by Onboarding for logged in users */}
            <Route path="/academy" element={<EnrollmentGate><OnboardingGate><Academy /></OnboardingGate></EnrollmentGate>} />
            <Route path="/global" element={<EnrollmentGate><OnboardingGate><Global /></OnboardingGate></EnrollmentGate>} />
            <Route path="/onboarding" element={<EnrollmentGate><ProtectedRoute><Onboarding /></ProtectedRoute></EnrollmentGate>} />

            {/* Protected — requires login */}
            <Route path="/academy/course/:courseId" element={<ProtectedRoute><CourseDashboard /></ProtectedRoute>} />
            <Route path="/academy/course/:courseId/lesson/:lessonId" element={<ProtectedRoute><CoursePlayer /></ProtectedRoute>} />

            {/* Protected Admin Routes */}
            <Route path="/admin" element={<EnrollmentGate><ProtectedRoute requireAdmin><Admin /></ProtectedRoute></EnrollmentGate>} />

            {/* Public Verification Route */}
            <Route path="/verify/:credentialId" element={<EnrollmentGate><Verify /></EnrollmentGate>} />

            {/* Static Pages */}
            <Route path="/about" element={<EnrollmentGate><About /></EnrollmentGate>} />
            <Route path="/terms" element={<EnrollmentGate><Terms /></EnrollmentGate>} />
            <Route path="/privacy" element={<EnrollmentGate><Privacy /></EnrollmentGate>} />
            <Route path="/contact" element={<EnrollmentGate><Contact /></EnrollmentGate>} />
            <Route path="/support" element={<EnrollmentGate><Support /></EnrollmentGate>} />
            <Route path="/referrals" element={<EnrollmentGate><Referrals /></EnrollmentGate>} />

            {/* Referrer Routes - Separate Authentication */}
            <Route path="/referrer/auth" element={<ReferrerAuth />} />
            <Route path="/referrer/dashboard" element={<ReferrerDashboard />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
