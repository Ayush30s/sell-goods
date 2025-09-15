import React, { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import Product from "./ProductCard";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const LatestProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://dummyjson.com/products?limit=8&sortBy=createdAt&order=desc`
      );
      const data = await res.json();
      // Fallback: if API doesn’t support sorting, just take latest by ID
      const sorted = data.products.sort((a, b) => b.id - a.id);
      setProducts(sorted.slice(0, 8));
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
      <p className="text-center text-gray-600 py-10">
        No recent products found. Please connect to the internet.
      </p>
    );
  }

  return (
    <section className="relative container mx-auto max-w-7xl px-5 my-20">
      {/* Section Title */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold">
          Most <span className="text-green-600">Recent</span> Products
        </h2>
        <p className="text-gray-600 mt-2">
          Check out the latest arrivals in our store
        </p>
      </div>

      <Link
        to="/products"
        state={{ from: "homepage", promo: true, tab: "Latest" }}
      >
        <button className="absolute right-16 top-24 text-gray-600 flex flex-row justify-center align-middle items-center">
          <span className="px-1 text-xs hover:font-bold">View More</span>{" "}
          <ArrowRight size={12} />
        </button>
      </Link>

      {/* Products Grid */}
      <div className="flex justify-evenly flex-wrap gap-6 mt-6">
        {products.slice(0, 4).map((product) => (
          <Link key={product.id} to={`/products/${product.id}`}>
            <Product product={product} />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default LatestProducts;
