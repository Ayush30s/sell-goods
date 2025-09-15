import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

const EmptyCart = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-sm shadow-xl p-10 max-w-md w-full text-center">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <ShoppingCart className="w-20 h-20 text-gray-400 animate-bounce" />
        </div>

        {/* Heading */}
        <h3 className="text-3xl font-extrabold text-gray-800 mb-4">
          Your Cart is Empty
        </h3>

        {/* Subtext */}
        <p className="text-gray-600 mb-6 text-lg">
          You haven’t added any products to your cart yet. Start shopping to
          find your favorites!
        </p>

        {/* Call to Action */}
        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-all shadow-md"
        >
          <ShoppingCart className="w-5 h-5" />
          Start Shopping
        </Link>

        {/* Optional Note */}
        <p className="text-xs text-gray-400 mt-6">
          Explore our categories to find products that you love.
        </p>
      </div>
    </div>
  );
};

export default EmptyCart;
