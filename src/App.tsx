import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Academy from "./pages/Academy.tsx";
import Global from "./pages/Global.tsx";
import NotFound from "./pages/NotFound.tsx";
import Auth from "./pages/Auth.tsx";
import Admin from "./pages/Admin.tsx";
import CoursePlayer from "./pages/CoursePlayer.tsx";
import Verify from "./pages/Verify.tsx";
import About from "./pages/About.tsx";
import Onboarding from "./pages/Onboarding.tsx";
import Terms from "./pages/Terms.tsx";
import Privacy from "./pages/Privacy.tsx";
import Contact from "./pages/Contact.tsx";

import ProtectedRoute from "./components/auth/ProtectedRoute.tsx";
import { AuthProvider, useAuth } from "./context/AuthContext.tsx";
import { Navigate } from "react-router-dom";

// A wrapper to enforce onboarding completion
const OnboardingGate = ({ children }: { children: React.ReactNode }) => {
  const { user, profile, loading, isOnboardingNeeded } = useAuth();
  
  if (loading) return null;
  if (!user) return <>{children}</>;
  
  if (isOnboardingNeeded) {
    return <Navigate to="/onboarding" replace />;
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
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            
            {/* Public Browse Routes - Gated by Onboarding for logged in users */}
            <Route path="/academy" element={<OnboardingGate><Academy /></OnboardingGate>} />
            <Route path="/global" element={<OnboardingGate><Global /></OnboardingGate>} />
            <Route path="/onboarding" element={<ProtectedRoute><Onboarding /></ProtectedRoute>} />
            
            {/* Protected — requires login */}
            <Route path="/academy/course/:courseId" element={<ProtectedRoute><CoursePlayer /></ProtectedRoute>} />
            
            {/* Protected Admin Routes */}
            <Route path="/admin" element={<ProtectedRoute requireAdmin><Admin /></ProtectedRoute>} />
            
            {/* Public Verification Route */}
            <Route path="/verify/:credentialId" element={<Verify />} />
            
            {/* Static Pages */}
            <Route path="/about" element={<About />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/contact" element={<Contact />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
