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

import ProtectedRoute from "./components/auth/ProtectedRoute.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          
          {/* Protected Student Routes */}
          <Route path="/academy" element={<ProtectedRoute><Academy /></ProtectedRoute>} />
          <Route path="/global" element={<ProtectedRoute><Global /></ProtectedRoute>} />
          <Route path="/academy/course/:courseId" element={<ProtectedRoute><CoursePlayer /></ProtectedRoute>} />
          
          {/* Protected Admin Routes */}
          <Route path="/admin" element={<ProtectedRoute requireAdmin><Admin /></ProtectedRoute>} />
          
          {/* Public Verification Route */}
          <Route path="/verify/:credentialId" element={<Verify />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
