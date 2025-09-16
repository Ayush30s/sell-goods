import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FilterBar from "../Home/Filters";
import Product from "./ProductCard";
import Footer from "../../components/Footer";
import { useSelector } from "react-redux";

const AllProducts = () => {
  const globalData = useSelector((store) => store.global);
  const isDarkMode = globalData.theme;

  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: "",
    subcategory: "",
    priceRange: [0, 1000],
    discount: "",
    rating: "",
    freeShipping: false,
    returnable: false,
  });
  const [showFilters, setShowFilters] = useState(false);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`https://dummyjson.com/products?limit=100`);
      const data = await res.json();

      const products = data.products.map((p) => ({
        ...p,
        discount: Math.floor(Math.random() * 50),
        freeShipping: Math.random() > 0.5,
        returnable: Math.random() > 0.5,
        category: p.category || "Miscellaneous",
        subcategory: p.brand || "General",
        rating: p.rating || Math.floor(Math.random() * 5) + 1,
      }));

      setAllProducts(products);
      setFilteredProducts(products);
    } catch (error) {
      console.log(error);
    }
  };

  const applyFilters = (appliedFilters) => {
    setFilters(appliedFilters);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    let tempProducts = [...allProducts];

    if (filters.category) {
      tempProducts = tempProducts.filter(
        (p) => p.category === filters.category
      );
    }

    if (filters.subcategory) {
      tempProducts = tempProducts.filter(
        (p) => p.subcategory === filters.subcategory
      );
    }

    tempProducts = tempProducts.filter(
      (p) =>
        p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    if (filters.discount) {
      tempProducts = tempProducts.filter(
        (p) => p.discount >= Number(filters.discount)
      );
    }

    if (filters.rating) {
      tempProducts = tempProducts.filter(
        (p) => p.rating >= Number(filters.rating)
      );
    }

    if (filters.freeShipping) {
      tempProducts = tempProducts.filter((p) => p.freeShipping);
    }

    if (filters.returnable) {
      tempProducts = tempProducts.filter((p) => p.returnable);
    }

    setFilteredProducts(tempProducts);
  }, [filters, allProducts]);

  return (
    <>
      <section
        className={`transition-colors duration-300 p-5 min-h-screen ${
          isDarkMode ? "bg-gray-900 text-gray-200" : "bg-white text-gray-800"
        }`}
      >
        <div className="container mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
            <h1 className="text-2xl sm:text-3xl font-bold">All Products</h1>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-4 py-2 rounded-md font-medium transition ${
                isDarkMode
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
            >
              {showFilters ? "Hide Filters" : "Show Filters"}
            </button>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="mb-10">
              <FilterBar applyFilters={applyFilters} />
            </div>
          )}

          {/* Product Grid */}
          <div
            className="
    grid
    grid-cols-1
    sm:grid-cols-2
    md:grid-cols-3
    lg:grid-cols-4
    xl:grid-cols-5
    gap-6
    place-items-center
  "
          >
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <Link key={product.id} to={`/products/${product.id}`}>
                  <Product product={product} />
                </Link>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500 mt-12">
                No products match the selected filters.
              </p>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default AllProducts;
