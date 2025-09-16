import React, { useState } from "react";
import { categories as rawCategories } from "../../utils/Rawdata";
import { useSelector } from "react-redux";

const FilterBar = ({ applyFilters }) => {
  const globalData = useSelector((store) => store.global);
  const isDarkMode = globalData.theme;

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [discount, setDiscount] = useState("");
  const [rating, setRating] = useState("");
  const [freeShipping, setFreeShipping] = useState(false);
  const [returnable, setReturnable] = useState(false);

  const handleApply = (e) => {
    e.preventDefault();
    applyFilters({
      category: selectedCategory,
      subcategory: selectedSubcategory,
      priceRange,
      discount,
      rating,
      freeShipping,
      returnable,
    });
  };

  const handleReset = () => {
    setSelectedCategory("");
    setSelectedSubcategory("");
    setPriceRange([0, 1000]);
    setDiscount("");
    setRating("");
    setFreeShipping(false);
    setReturnable(false);
    applyFilters({});
  };

  const baseInputClasses = `w-full text-base px-4 py-2 rounded-sm border focus:ring-2 focus:ring-green-400 focus:border-green-400 transition`;
  const themedInputClasses = isDarkMode
    ? "bg-gray-800 border-gray-600 text-gray-200 placeholder-gray-400"
    : "bg-white border-gray-300 text-gray-800 placeholder-gray-500";

  return (
    <div
      className={`shadow-lg rounded-sm p-6 mb-8 mx-auto transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900 text-gray-200" : "bg-white text-gray-800"
      }`}
    >
      <form onSubmit={handleApply} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Category */}
          <div>
            <label
              htmlFor="category"
              className="block text-base font-medium mb-2"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setSelectedSubcategory("");
              }}
              className={`${baseInputClasses} ${themedInputClasses}`}
            >
              <option value="">Select Category</option>
              {rawCategories.map((cat) => (
                <option key={cat.name} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Subcategory */}
          <div>
            <label
              htmlFor="subcategory"
              className="block text-base font-medium mb-2"
            >
              Subcategory
            </label>
            <select
              id="subcategory"
              name="subcategory"
              value={selectedSubcategory}
              onChange={(e) => setSelectedSubcategory(e.target.value)}
              disabled={!selectedCategory}
              className={`${baseInputClasses} ${themedInputClasses}`}
            >
              <option value="">Select Subcategory</option>
              {selectedCategory &&
                rawCategories
                  .find((cat) => cat.name === selectedCategory)
                  .subcategories.map((sub) => (
                    <option key={sub} value={sub}>
                      {sub}
                    </option>
                  ))}
            </select>
          </div>

          {/* Min Price */}
          <div>
            <label
              htmlFor="minPrice"
              className="block text-base font-medium mb-2"
            >
              Min Price ($)
            </label>
            <input
              type="number"
              id="minPrice"
              value={priceRange[0]}
              onChange={(e) =>
                setPriceRange([Number(e.target.value), priceRange[1]])
              }
              min="0"
              className={`${baseInputClasses} ${themedInputClasses}`}
              placeholder="0"
            />
          </div>

          {/* Max Price */}
          <div>
            <label
              htmlFor="maxPrice"
              className="block text-base font-medium mb-2"
            >
              Max Price ($)
            </label>
            <input
              type="number"
              id="maxPrice"
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([priceRange[0], Number(e.target.value)])
              }
              min="0"
              className={`${baseInputClasses} ${themedInputClasses}`}
              placeholder="1000"
            />
          </div>

          {/* Discount */}
          <div>
            <label
              htmlFor="discount"
              className="block text-base font-medium mb-2"
            >
              Discount
            </label>
            <select
              id="discount"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              className={`${baseInputClasses} ${themedInputClasses}`}
            >
              <option value="">Any</option>
              <option value="10">10%+</option>
              <option value="20">20%+</option>
              <option value="30">30%+</option>
              <option value="50">50%+</option>
            </select>
          </div>

          {/* Rating */}
          <div>
            <label
              htmlFor="rating"
              className="block text-base font-medium mb-2"
            >
              Rating
            </label>
            <select
              id="rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className={`${baseInputClasses} ${themedInputClasses}`}
            >
              <option value="">Any</option>
              <option value="1">1⭐+</option>
              <option value="2">2⭐+</option>
              <option value="3">3⭐+</option>
              <option value="4">4⭐+</option>
              <option value="5">5⭐</option>
            </select>
          </div>

          {/* Free Shipping */}
          <div className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              checked={freeShipping}
              onChange={(e) => setFreeShipping(e.target.checked)}
              className="accent-green-500 h-4 w-4"
              id="freeShipping"
            />
            <label htmlFor="freeShipping" className="text-base">
              Free Shipping
            </label>
          </div>

          {/* Returnable */}
          <div className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              checked={returnable}
              onChange={(e) => setReturnable(e.target.checked)}
              className="accent-green-500 h-4 w-4"
              id="returnable"
            />
            <label htmlFor="returnable" className="text-base">
              Returnable
            </label>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-4 pt-4">
          <button
            type="submit"
            className="px-6 py-3 text-base bg-green-600 text-white rounded-sm hover:bg-green-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            Apply Filters
          </button>
          <button
            type="button"
            onClick={handleReset}
            className={`px-6 py-3 text-base rounded-sm transition duration-300 focus:outline-none focus:ring-2 ${
              isDarkMode
                ? "bg-gray-700 text-gray-200 hover:bg-gray-600 focus:ring-gray-500"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400"
            }`}
          >
            Reset Filters
          </button>
        </div>
      </form>
    </div>
  );
};

export default FilterBar;
