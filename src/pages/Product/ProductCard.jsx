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
        stars.push(
          <FaStar key={i} className="text-green-500 text-xs sm:text-sm" />
        );
      } else if (rating >= i - 0.5) {
        stars.push(
          <FaStarHalfAlt
            key={i}
            className="text-green-500 text-xs sm:text-sm"
          />
        );
      } else {
        stars.push(
          <FaRegStar
            key={i}
            className={`text-xs sm:text-sm ${
              isDarkMode ? "text-gray-600" : "text-gray-300"
            }`}
          />
        );
      }
    }
    return stars;
  };

  console.log(product)

  return (
    <div
      className={`
        flex flex-col justify-between w-full h-full
        border  ${
          isDarkMode ? "border-gray-700" : "border-gray-200"
        } p-2 rounded-lg 
        transition transform hover:scale-[1.02]
      `}
    >
      {/* Product Image */}
      <div
        className={`relative rounded-md 
          h-40 sm:h-48 md:h-56 lg:h-64
          flex justify-center items-center shadow-sm
          ${isDarkMode ? "bg-gray-800" : "bg-[#F5F5F5]"}
        `}
      >
        <img
          src={product.thumbnail}
          alt={product.title}
          className="object-contain p-4 max-h-full w-auto transition-transform duration-200 ease-in hover:scale-105"
        />
        {discount > 0 && (
          <span className="absolute top-2 left-2 bg-red-600 text-white text-xs sm:text-sm font-bold px-2 py-0.5 rounded">
            -{discount}%
          </span>
        )}
      </div>

      {/* Product Info */}
      <div className="mt-3 flex flex-col gap-1 flex-grow">
        {/* Title & Stock */}
        <div className="flex flex-col gap-1">
          <h3
            className={`truncate font-medium ${
              isDarkMode ? "text-gray-100" : "text-gray-800"
            } text-sm sm:text-base`}
            title={product.title} // Tooltip shows full name on hover
          >
            {product.title}
          </h3>

          <p
            className={`text-xs sm:text-sm font-medium ${
              stock > 0 ? "text-green-600" : "text-red-500"
            }`}
          >
            {stock > 0 ? `In Stock: ${stock}` : "Out of Stock"}
          </p>
        </div>

        {/* Rating & Price */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-0.5 sm:gap-1">
            {renderStars()}
          </div>
          <p
            className={`text-sm sm:text-base font-semibold ${
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
