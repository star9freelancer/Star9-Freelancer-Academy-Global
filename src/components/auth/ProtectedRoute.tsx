import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute = ({ children, requireAdmin = false }: ProtectedRouteProps) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let mounted = true;

    const checkAuth = async () => {
      try {
        // Direct object retrieval is safer than nested destructuring
        const { data, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError || !data?.session) {
          if (mounted) {
            setAuthenticated(false);
            setLoading(false);
          }
          return;
        }

        if (mounted) setAuthenticated(true);

        if (requireAdmin) {
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', data.session.user.id)
            .maybeSingle(); // maybeSingle() is safer than single() for non-existent profiles
          
          if (mounted) {
            setIsAdmin(profile?.role === 'admin');
          }
        }
      } catch (error) {
        console.error("Critical Auth Error:", error);
        if (mounted) setAuthenticated(false);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    checkAuth();
    
    // Safety timeout: Never hang longer than 10 seconds
    const timer = setTimeout(() => {
      if (loading && mounted) {
        console.warn("Auth check timed out - forcing clearance.");
        setLoading(false);
      }
    }, 10000);

    return () => {
      mounted = false;
      clearTimeout(timer);
    };
  }, [requireAdmin]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground animate-pulse">
            Verifying Credentials...
          </p>
        </div>
      </div>
    );
  }

  if (!authenticated) {
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
