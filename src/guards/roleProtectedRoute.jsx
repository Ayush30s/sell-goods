import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AccessDenied from "../components/AccessDenied";

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useSelector((store) => store.auth); // example: { role: "admin" }
  console.log(user);

  // If user is not logged in
  if (!user) {
    return (
      <div className="flex items-center justify-center h-[80vh] px-4 bg-opacity-60 my-10">
        <div className="bg-white/80 shadow-xl rounded-sm p-8 max-w-md w-full text-center border border-gray-200 backdrop-blur-md">
          <h2 className="text-2xl font-bold text-gray-800">Access Denied</h2>
          <p className="text-gray-600 mt-3">
            You must be logged in to access this service. Please sign in to
            continue.
          </p>

          <a
            href="/login"
            className="mt-6 inline-block w-full px-6 py-3 bg-indigo-600 text-white font-medium rounded-sm hover:bg-indigo-700 transition shadow"
          >
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  // If user role is not allowed
  if (!allowedRoles.includes(user.role)) {
    return <AccessDenied />;
  }

  return children;
}
