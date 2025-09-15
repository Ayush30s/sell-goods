import { Link } from "lucide-react";
import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const Product = ({ product }) => {
  const rating = product.rating || 3.5;

  // Function to render stars
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(<FaStar key={i} className="text-green-500 text-sm" />);
      } else if (rating >= i - 0.5) {
        stars.push(
          <FaStarHalfAlt key={i} className="text-green-500 text-sm" />
        );
      } else {
        stars.push(<FaRegStar key={i} className="text-gray-300 text-sm" />);
      }
    }
    return stars;
  };

  return (
    <div className="transition w-[225px] h-[310px] flex flex-col justify-between my-4">
      {/* Product Image */}
      <div className="rounded-md bg-[#F5F5F5] h-[85%] flex justify-center shadow-sm">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="object-contain p-4 transform transition-transform duration-200 ease-in hover:scale-110"
        />
      </div>

      {/* Product Info */}
      <div className="mt-3 flex flex-col">
        <h3 className="text-sm font-medium text-gray-800 line-clamp-2">
          {product.title}
        </h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 mt-1">{renderStars()}</div>
          <p className="text-sm font-semibold text-gray-700">
            ${product.price}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Product;
