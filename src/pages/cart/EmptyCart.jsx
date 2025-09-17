import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useSelector } from "react-redux";

const EmptyCart = () => {
  const globalData = useSelector((store) => store.global);
  const isDarkMode = globalData.theme;

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <div
        className={`rounded-2xl shadow-xl p-8 sm:p-10 w-full max-w-md text-center transition-colors duration-300 ${
          isDarkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
        }`}
      >
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <ShoppingCart
            className={`w-16 h-16 sm:w-20 sm:h-20 animate-bounce ${
              isDarkMode ? "text-gray-400" : "text-gray-500"
            }`}
          />
        </div>

        {/* Heading */}
        <h3 className="text-2xl sm:text-3xl font-extrabold mb-4">
          Your Cart is Empty
        </h3>

        {/* Subtext */}
        <p
          className={`mb-6 text-base sm:text-lg ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          You haven’t added any products to your cart yet. Start shopping to
          find your favorites!
        </p>

        {/* Call to Action */}
        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-full font-semibold shadow-md hover:from-purple-600 hover:to-blue-600 transition-all transform hover:scale-105"
        >
          <ShoppingCart className="w-5 h-5" />
          Start Shopping
        </Link>

        {/* Optional Note */}
        <p
          className={`text-xs mt-6 ${
            isDarkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          Explore our categories to find products that you love.
        </p>
      </div>
    </div>
  );
};

export default EmptyCart;
