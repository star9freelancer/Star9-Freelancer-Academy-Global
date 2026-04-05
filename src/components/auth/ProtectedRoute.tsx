import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Loader2, ShieldCheck } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute = ({ children, requireAdmin = false }: ProtectedRouteProps) => {
  const { user, loading, isAdmin } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="flex flex-col items-center gap-6 relative z-10 text-center px-4">
          <div className="relative">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
            <ShieldCheck className="w-4 h-4 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          <div className="space-y-2">
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-primary font-bold animate-pulse">
              Personnel Verification
            </p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest opacity-60">
              Star9 Infrastructure Secure Access
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
