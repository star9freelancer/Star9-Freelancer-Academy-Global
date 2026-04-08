import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Loader2, ShieldCheck } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute = ({ children, requireAdmin = false }: ProtectedRouteProps) => {
  const { user, profile, loading, isAdmin } = useAuth();
  const location = useLocation();

  const isProfileLoading = !loading && user && !profile;

  if (loading || isProfileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="flex flex-col items-center gap-6 relative z-10 text-center px-4">
          <div className="relative">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
            <ShieldCheck className="w-3 h-3 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          <div className="space-y-2">

            <p className="text-[8px] text-muted-foreground uppercase tracking-widest opacity-40">
              Star9 Infrastructure Fast-Track
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    // Redirect to login but save the current location
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  if (requireAdmin && !isAdmin) {
    // Redirect to dashboard if not an admin
    return <Navigate to="/academy" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
