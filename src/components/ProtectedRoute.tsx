import { useAuth } from "@/components/AuthProvider";
import { Navigate } from "react-router-dom";
import { Skeleton } from "./ui/skeleton";

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
  redirectTo?: string;
}

export const ProtectedRoute = ({
  children,
  adminOnly = false,
  redirectTo = "/",
}: ProtectedRouteProps) => {
  const { user, loading, isAdmin } = useAuth();

  // Show loading skeleton while checking authentication
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-4">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

  // If not logged in, redirect to login
  if (!user) {
    return <Navigate to={redirectTo} replace />;
  }

  // If adminOnly and user is not admin, redirect
  if (adminOnly && !isAdmin) {
    return <Navigate to={redirectTo} replace />;
  }

  // Otherwise, render children
  return <>{children}</>;
};
