import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token"); // or use context/redux
  if (!token) {
    return <Navigate to="/sign" replace />;
  }
  return children;
}
