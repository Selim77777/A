import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;

  return isAuthenticated ? children : <Navigate to="/login" />;
}