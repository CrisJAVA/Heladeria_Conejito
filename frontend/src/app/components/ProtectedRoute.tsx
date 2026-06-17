import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

export default function ProtectedRoute({ children, adminOnly }: ProtectedRouteProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fffbf7]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-[#ff7e9d] border-t-transparent rounded-full animate-spin" />
          <p className="text-[#564245] text-sm font-medium">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && user.rol !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
