import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { useSelector } from "react-redux";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const globalData = useSelector((store) => store.global);
  const isDarkMode = globalData.theme;

  // 🔥 Live search: call onSearch whenever query changes
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      onSearch(query.trim());
    }, 300); // debounce for smoother typing

    return () => clearTimeout(delayDebounce);
  }, [query, onSearch]);

  return (
    <div
      className={`flex items-center w-full sm:w-80 md:w-96 rounded-md shadow-md px-3 py-2 transition-colors duration-300
        ${isDarkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800"}
      `}
    >
      <FiSearch className="w-5 h-5 text-green-600 flex-shrink-0" />
      <input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={`flex-1 bg-transparent outline-none px-2 text-sm sm:text-base placeholder-gray-400
          ${isDarkMode ? "text-gray-200" : "text-gray-800"}
        `}
      />
    </div>
  );
};

export default SearchBar;
