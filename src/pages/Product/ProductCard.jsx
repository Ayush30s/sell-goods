import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { useSelector } from "react-redux";

const Product = ({ product }) => {
  const rating = product.rating || 3.5;
  const stock = product.stock || 0;
  const discount = product.discountPercentage || 0;

  // Fetch theme mode from store
  const globalData = useSelector((store) => store.global);
  const isDarkMode = globalData.theme;

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
        stars.push(
          <FaRegStar
            key={i}
            className={
              isDarkMode ? "text-gray-600 text-sm" : "text-gray-300 text-sm"
            }
          />
        );
      }
    }
    return stars;
  };

  return (
    <div
      className={`transition flex flex-col justify-between mb-10 w-[250px]`}
    >
      {/* Product Image */}
      <div
        className={`relative rounded-md h-60 sm:h-64 md:h-72 flex justify-center items-center shadow-sm
          ${isDarkMode ? "bg-gray-800" : "bg-[#F5F5F5]"}`}
      >
        <img
          src={product.thumbnail}
          alt={product.title}
          className="object-contain p-4 max-h-full transform transition-transform duration-200 ease-in hover:scale-105"
        />
        {discount > 0 && (
          <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded">
            -{discount}%
          </span>
        )}
      </div>

      {/* Product Info */}
      <div className="mt-3 flex flex-col gap-1">
        {/* Name and Stock Row */}
        <div className="flex flex-col sm:flex-col md:flex-col lg:flex-col gap-1">
          <div className="flex justify-between items-center">
            <h3
              className={`text-sm font-medium line-clamp-2 ${
                isDarkMode ? "text-gray-100" : "text-gray-800"
              }`}
            >
              {product.title}
            </h3>
            {/* Stock on mobile: flex-row */}
            <p
              className={`text-xs font-medium ${
                stock > 0 ? "text-green-600" : "text-red-500"
              } sm:hidden`}
            >
              {stock > 0 ? `In Stock: ${stock}` : "Out of Stock"}
            </p>
          </div>

          {/* Stock for larger screens */}
          <p
            className={`text-xs font-medium ${
              stock > 0 ? "text-green-600" : "text-red-500"
            } hidden sm:block`}
          >
            {stock > 0 ? `In Stock: ${stock}` : "Out of Stock"}
          </p>
        </div>

        {/* Rating & Price */}
        <div className="flex items-center justify-between mt-1">
          <div className="flex items-center gap-1">{renderStars()}</div>
          <p
            className={`text-sm font-semibold ${
              isDarkMode ? "text-gray-200" : "text-gray-700"
            }`}
          >
            ${product.price}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Product;
