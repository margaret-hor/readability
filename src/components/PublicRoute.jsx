import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export function PublicRoute({ children }) {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (currentUser) {
    return <Navigate to="/dashboard" />;
  }

  return children;
}