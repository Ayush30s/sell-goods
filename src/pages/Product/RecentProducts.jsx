import React, { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import Product from "./ProductCard";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useSelector } from "react-redux";

const LatestProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch theme from Redux
  const globalData = useSelector((store) => store.global);
  const isDarkMode = globalData.theme;

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://dummyjson.com/products?limit=8&sortBy=createdAt&order=desc`
      );
      const data = await res.json();
      // Fallback: if API doesn’t support sorting, sort by ID
      const sorted = data.products.sort((a, b) => b.id - a.id);
      setProducts(sorted.slice(0, 10));
    } catch (error) {
      console.error("Error fetching recent products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <Loader />;

  if (products.length === 0) {
    return (
      <p
        className={`text-center py-10 ${
          isDarkMode ? "text-gray-300" : "text-gray-600"
        }`}
      >
        No recent products found. Please connect to the internet.
      </p>
    );
  }

  return (
    <section
      className={`relative container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 my-20 transition-colors duration-500 ${
        isDarkMode ? "text-gray-200" : "text-gray-800"
      }`}
    >
      {/* Section Title */}
      <div className="text-center mb-10">
        <h2 className={`text-3xl font-bold`}>
          Most <span className="text-green-600">Recent</span> Products
        </h2>
        <p className={`mt-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
          Check out the latest arrivals in our store
        </p>
      </div>

      {/* "View More" button */}
      <div className="flex justify-end">
        <Link
          to="/products"
          state={{ from: "homepage", promo: true, tab: "Latest" }}
        >
          <button
            className={`flex items-center text-sm px-2 py-1 rounded hover:underline transition ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            View More <ArrowRight size={14} className="ml-1" />
          </button>
        </Link>
      </div>

      {/* Products Grid */}
      <div className="flex flex-row justify-between overflow-auto gap-12">
        {products.map((product) => (
          <Link key={product.id} to={`/products/${product.id}`}>
            <Product product={product} />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default LatestProducts;
