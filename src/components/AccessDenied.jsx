import React from "react";
import { Link } from "react-router-dom";
import { XCircle, Home, Info } from "lucide-react";

export default function AccessDenied() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white rounded-sm shadow-xl p-10 text-center max-w-lg w-full">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <XCircle className="w-20 h-20 text-red-500 animate-pulse" />
        </div>

        {/* Title */}
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
          Access Denied
        </h1>

        {/* Message */}
        <p className="text-gray-600 mb-6 text-lg">
          You do not have permission to access this page. Only authorized users
          can view it.
        </p>

        {/* Actions */}
        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            to="/"
            className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white font-semibold rounded-sm hover:bg-purple-700 transition"
          >
            <Home className="w-5 h-5" />
            Go to Homepage
          </Link>

          <Link
            to="/contact-support"
            className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-800 font-semibold rounded-sm hover:bg-gray-200 transition"
          >
            <Info className="w-5 h-5" />
            Contact Support
          </Link>
        </div>

        {/* Optional Footer Note */}
        <p className="text-xs text-gray-400 mt-6">
          If you believe this is an error, please reach out to support.
        </p>
      </div>
    </div>
  );
}
