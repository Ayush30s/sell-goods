import React, { useState } from "react";
import { categories as rawCategories } from "../../utils/Rawdata";

const FilterBar = ({ applyFilters }) => {
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

  return (
    <div className="bg-[#F5F5F5] rounded-sm p-6 mb-8 mx-auto">
      <form onSubmit={handleApply} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Category */}
          <div>
            <label
              htmlFor="category"
              className="block text-base font-medium text-gray-700 mb-2"
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
              className="w-full text-base px-4 py-2 rounded-sm border border-gray-300 bg-white text-gray-800 focus:ring-2 focus:ring-green-400 focus:border-green-400"
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
              className="block text-base font-medium text-gray-700 mb-2"
            >
              Subcategory
            </label>
            <select
              id="subcategory"
              name="subcategory"
              value={selectedSubcategory}
              onChange={(e) => setSelectedSubcategory(e.target.value)}
              disabled={!selectedCategory}
              className="w-full text-base px-4 py-2 rounded-sm border border-gray-300 bg-white text-gray-800 focus:ring-2 focus:ring-green-400 focus:border-green-400"
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
              className="block text-base font-medium text-gray-700 mb-2"
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
              className="w-full text-base px-4 py-2 rounded-sm border border-gray-300 bg-white text-gray-800 focus:ring-2 focus:ring-green-400 focus:border-green-400"
              placeholder="0"
            />
          </div>

          {/* Max Price */}
          <div>
            <label
              htmlFor="maxPrice"
              className="block text-base font-medium text-gray-700 mb-2"
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
              className="w-full text-base px-4 py-2 rounded-sm border border-gray-300 bg-white text-gray-800 focus:ring-2 focus:ring-green-400 focus:border-green-400"
              placeholder="1000"
            />
          </div>

          {/* Discount */}
          <div>
            <label
              htmlFor="discount"
              className="block text-base font-medium text-gray-700 mb-2"
            >
              Discount
            </label>
            <select
              id="discount"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              className="w-full text-base px-4 py-2 rounded-sm border border-gray-300 bg-white text-gray-800 focus:ring-2 focus:ring-green-400 focus:border-green-400"
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
              className="block text-base font-medium text-gray-700 mb-2"
            >
              Rating
            </label>
            <select
              id="rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="w-full text-base px-4 py-2 rounded-sm border border-gray-300 bg-white text-gray-800 focus:ring-2 focus:ring-green-400 focus:border-green-400"
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
            <label htmlFor="freeShipping" className="text-gray-700 text-base">
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
            <label htmlFor="returnable" className="text-gray-700 text-base">
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
            className="px-6 py-3 text-base bg-gray-200 text-gray-800 rounded-sm hover:bg-gray-300 transition duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Reset Filters
          </button>
        </div>
      </form>
    </div>
  );
};

export default FilterBar;
