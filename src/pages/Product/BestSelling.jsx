import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import Product from "./ProductCard";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const BestSellingProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch(`https://dummyjson.com/products?limit=100`);
      const data = await res.json();

      // Sort by rating (or stock as fallback) to simulate "best selling"
      const sorted = data.products.sort((a, b) => b.rating - a.rating);

      setProducts(sorted.slice(0, 8)); // take top 8 best-selling
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
      <p className="text-center text-gray-600 py-10">
        No best-selling products found. Please connect to the internet.
      </p>
    );
  }

  return (
    <section className="relative container mx-auto px-5 my-16 max-w-7xl">
      {/* Section Title */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold">
          Best <span className="text-green-600">Selling</span> Products
        </h2>
        <p className="text-gray-600 mt-2">
          Our most popular products customers love
        </p>
      </div>

      <Link
        to="/products"
        state={{ from: "homepage", promo: true, tab: "BestSelling" }}
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

export default BestSellingProducts;
