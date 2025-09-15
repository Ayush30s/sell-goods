import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FilterBar from "../Home/Filters";
import Product from "./ProductCard";
import { categories } from "../../utils/Rawdata";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const AllProducts = () => {
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
  const [showFilters, setShowFilters] = useState(false); // Toggle filter panel
  console.log(filters);

  // Fetch products and add default fields
  const fetchProducts = async () => {
    try {
      const res = await fetch(`https://dummyjson.com/products?limit=100`);
      const data = await res.json();
      // Map products to include fields for filtering
      const products = data.products.map((p) => ({
        ...p,
        discount: Math.floor(Math.random() * 50), // random discount 0-50%
        freeShipping: Math.random() > 0.5, // random true/false
        returnable: Math.random() > 0.5, // random true/false
        category: p.category || "Miscellaneous",
        subcategory: p.brand || "General",
        rating: p.rating || Math.floor(Math.random() * 5) + 1,
      }));
      console.log(products);
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

    // Filter by category
    if (filters.category) {
      tempProducts = tempProducts.filter(
        (p) => p.category === filters.category
      );
    }

    // Filter by subcategory
    if (filters.subcategory) {
      tempProducts = tempProducts.filter(
        (p) => p.subcategory === filters.subcategory
      );
    }

    // Filter by price
    tempProducts = tempProducts?.filter(
      (p) =>
        p.price >= filters?.priceRange[0] && p.price <= filters?.priceRange[1]
    );

    // Filter by discount
    if (filters.discount) {
      tempProducts = tempProducts.filter(
        (p) => p.discount >= Number(filters.discount)
      );
    }

    // Filter by rating
    if (filters.rating) {
      tempProducts = tempProducts.filter(
        (p) => p.rating >= Number(filters.rating)
      );
    }

    // Filter by free shipping
    if (filters.freeShipping) {
      tempProducts = tempProducts.filter((p) => p.freeShipping);
    }

    // Filter by returnable
    if (filters.returnable) {
      tempProducts = tempProducts.filter((p) => p.returnable);
    }

    setFilteredProducts(tempProducts);
  }, [filters, allProducts]);

  return (
    <>
      <Navbar />
      <section className="container mx-auto mt-24 px-5">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">All Products</h1>
          {/* Toggle Filter Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-3 py-2 bg-green-600 text-white rounded-sm hover:bg-green-700 transition focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>
        </div>

        {/* Filter Bar */}
        {showFilters && <FilterBar applyFilters={applyFilters} />}

        {/* Product Grid */}
        <div className="flex flex-wrap gap-6 mt-6">
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
      </section>
      <Footer />
    </>
  );
};

export default AllProducts;
