import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AccessDenied from "../components/AccessDenied";

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useSelector((store) => store.auth); // example: { role: "admin" }
  console.log(user);

  // If user is not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If user role is not allowed
  if (!allowedRoles.includes(user.role)) {
    return <AccessDenied />;
  }

  return children;
}
