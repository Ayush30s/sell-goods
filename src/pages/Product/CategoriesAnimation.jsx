import { categoriesAnimation } from "../../utils/Rawdata";

const CategoriesMarquee = () => {
  return (
    <div className="w-full overflow-hidden bg-white py-4 relative container mx-auto max-w-7xl">
      <div className="flex gap-4 animate-marquee whitespace-nowrap">
        {/* repeat multiple times for smooth infinite loop */}
        {[
          ...categoriesAnimation,
          ...categoriesAnimation,
          ...categoriesAnimation,
        ].map((cat, i) => (
          <span
            key={i}
            className="px-4 py-2 bg-gray-100 rounded-md font-medium text-gray-700 hover:bg-green-100 hover:text-green-600 cursor-pointer transition"
          >
            {cat}
          </span>
        ))}
      </div>

      {/* Left blur */}
      <div className="absolute top-0 left-0 w-16 h-full bg-gradient-to-r from-white to-transparent pointer-events-none" />

      {/* Right blur */}
      <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-white to-transparent pointer-events-none" />

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
