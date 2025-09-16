import { useEffect, useState } from "react";

export default function LandscapeOnly({ children }) {
  const [isLandscape, setIsLandscape] = useState(true);

  useEffect(() => {
    const checkOrientation = () => {
      const isSmallScreen = window.innerWidth < 1024; // "small desktop or below"
      const isLandscapeNow = window.matchMedia(
        "(orientation: landscape)"
      ).matches;
      setIsLandscape(!isSmallScreen || isLandscapeNow); // true if large screen OR landscape
    };

    checkOrientation();
    window.addEventListener("resize", checkOrientation);
    window.addEventListener("orientationchange", checkOrientation);

    return () => {
      window.removeEventListener("resize", checkOrientation);
      window.removeEventListener("orientationchange", checkOrientation);
    };
  }, []);

  if (!isLandscape) {
    return (
      <div className="fixed inset-0 flex flex-col justify-center items-center bg-gradient-to-br from-purple-50 to-white z-50 px-4">
        {/* Card */}
        <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-sm text-center border border-gray-200">
          {/* Icon */}
          <div className="mb-6 flex justify-center">
            <div className="bg-purple-100 p-4 rounded-full animate-bounce shadow-md">
              <svg
                className="w-12 h-12 text-purple-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 4v5h.582M20 20v-5h-.581M4.582 9A8.001 8.001 0 0112 4c1.954 0 3.73.707 5.1 1.88l1.42-1.42A10 10 0 002 14h2a8 8 0 01.582-5z"
                />
              </svg>
            </div>
          </div>

          {/* Text */}
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Please Rotate Your Device
          </h1>
          <p className="text-gray-600 mb-6">
            For the best dashboard experience, switch to{" "}
            <span className="font-semibold text-purple-700">
              landscape mode
            </span>
            .
          </p>

          {/* Back Button */}
          <button
            onClick={() => (window.location.href = "/")}
            className="px-5 py-2 bg-purple-600 text-white font-medium rounded-full shadow hover:bg-purple-700 transition"
          >
            ⬅ Back to Home
          </button>
        </div>

        {/* Optional Small Note */}
        <p className="mt-6 text-xs text-gray-500">
          Tip: Rotate your phone to see the full dashboard.
        </p>
      </div>
    );
  }

  return children;
}
