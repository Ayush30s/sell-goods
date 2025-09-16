import { categoriesAnimation } from "../../utils/Rawdata";
import { useSelector } from "react-redux";

const CategoriesMarquee = () => {
  const globalData = useSelector((store) => store.global);
  const isDarkMode = globalData.theme;

  return (
    <div
      className={`w-full overflow-hidden relative container mx-auto max-w-7xl py-3 sm:py-4 transition-colors duration-500 ${
        isDarkMode ? "bg-gray-900" : "bg-white"
      }`}
    >
      <div className="flex gap-3 sm:gap-4 animate-marquee whitespace-nowrap">
        {/* repeat multiple times for smooth infinite loop */}
        {[
          ...categoriesAnimation,
          ...categoriesAnimation,
          ...categoriesAnimation,
        ].map((cat, i) => (
          <span
            key={i}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-md font-medium cursor-pointer transition text-sm sm:text-base ${
              isDarkMode
                ? "bg-gray-800 text-gray-200 hover:bg-green-700 hover:text-white"
                : "bg-gray-100 text-gray-700 hover:bg-green-100 hover:text-green-600"
            }`}
          >
            {cat}
          </span>
        ))}
      </div>

      {/* Left blur */}
      <div
        className={`absolute top-0 left-0 w-12 sm:w-16 h-full pointer-events-none transition-colors duration-500 ${
          isDarkMode
            ? "bg-gradient-to-r from-gray-900 to-transparent"
            : "bg-gradient-to-r from-white to-transparent"
        }`}
      />

      {/* Right blur */}
      <div
        className={`absolute top-0 right-0 w-12 sm:w-16 h-full pointer-events-none transition-colors duration-500 ${
          isDarkMode
            ? "bg-gradient-to-l from-gray-900 to-transparent"
            : "bg-gradient-to-l from-white to-transparent"
        }`}
      />

      {/* Tailwind custom animation */}
      <style>
        {`
          @keyframes marquee {
            0%   { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            display: inline-flex;
            animation: marquee 50s linear infinite;
            will-change: transform;
          }
        `}
      </style>
    </div>
  );
};

export default CategoriesMarquee;
