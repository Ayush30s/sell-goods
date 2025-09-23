import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { XCircle, Home, Info } from "lucide-react";

export default function AccessDenied() {
  const globalData = useSelector((store) => store.global);
  const isDarkMode = globalData.theme; // true = dark, false = light

  return (
    <div
      className={`flex items-center justify-center min-h-screen px-4 transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <div
        className={`rounded-sm shadow-xl p-10 text-center max-w-lg w-full transition-colors duration-300 ${
          isDarkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"
        }`}
      >
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <XCircle
            className={`w-20 h-20 animate-pulse ${
              isDarkMode ? "text-red-400" : "text-red-500"
            }`}
          />
        </div>

        {/* Title */}
        <h1 className="text-4xl font-extrabold mb-4">Access Denied</h1>

        {/* Message */}
        <p
          className={`mb-6 text-lg ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
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
            className={`flex items-center gap-2 px-6 py-3 font-semibold rounded-sm transition ${
              isDarkMode
                ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
          >
            <Info className="w-5 h-5" />
            Contact Support
          </Link>
        </div>

        {/* Optional Footer Note */}
        <p
          className={`text-xs mt-6 ${
            isDarkMode ? "text-gray-500" : "text-gray-400"
          }`}
        >
          If you believe this is an error, please reach out to support.
        </p>
      </div>
    </div>
  );
}
