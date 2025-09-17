import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import Product from "./ProductCard";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useSelector } from "react-redux";

const BestSellingProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const globalData = useSelector((store) => store.global);
  const isDarkMode = globalData.theme;

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch(`https://dummyjson.com/products?limit=100`);
      const data = await res.json();

      // Sort by rating to simulate "best-selling"
      const sorted = data.products.sort((a, b) => b.rating - a.rating);
      setProducts(sorted.slice(0, 10));
    } catch (error) {
      console.error("Error fetching best-selling products:", error);
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
        No best-selling products found. Please connect to the internet.
      </p>
    );
  }

  return (
    <section
      className={`relative container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 my-16 transition-colors duration-500`}
    >
      {/* Section Title */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold">
          Best <span className="text-green-600">Selling</span> Products
        </h2>
        <p className={`mt-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
          Our most popular products customers love
        </p>
      </div>

      {/* View More Button */}
      <div className="flex justify-end mb-4">
        <Link
          to="/products"
          state={{ from: "homepage", promo: true, tab: "BestSelling" }}
        >
          <button
            className={`flex items-center gap-1 text-sm font-medium px-3 py-2 rounded transition ${
              isDarkMode
                ? "text-gray-300 hover:text-white"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <span>View More</span>
            <ArrowRight size={14} />
          </button>
        </Link>
      </div>

      {/* Products Horizontal Scroll */}
      <div
        className="flex gap-6 overflow-x-auto pb-4 scroll-smooth"
        style={{ scrollbarWidth: "thin" }}
      >
        {products.map((product) => (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            className="min-w-[220px] sm:min-w-[250px] md:min-w-[280px] flex-shrink-0"
          >
            <Product product={product} />
          </Link>
        ))}
      </div>

      {/* Scroll Hint */}
      <p
        className={`text-xs mt-3 text-center ${
          isDarkMode ? "text-gray-500" : "text-gray-400"
        }`}
      >
        👉 Scroll left & right to see more products
      </p>
    </section>
  );
};

export default BestSellingProducts;
