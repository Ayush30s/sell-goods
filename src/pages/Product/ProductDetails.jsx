import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import {
  addToCartThunk,
  removeFromCartThunk,
} from "../../store/thunk/cart-management";
import { useLocation } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const CartData = useSelector((store) => store.cart);
  const loggedInUser = useSelector((store) => store.auth);
  const globalData = useSelector((store) => store.global);
  const { user } = loggedInUser;
  const isDarkMode = globalData.theme;
  const dispatch = useDispatch();

  // Dummy reviews
  const dummyReviews = [
    {
      id: 1,
      name: "Alice Johnson",
      rating: 5,
      comment: "Amazing quality! Highly recommend.",
    },
    {
      id: 2,
      name: "Bob Smith",
      rating: 4,
      comment: "Very good product, fast shipping.",
    },
  ];

  // Fetch product details
  const fetchProduct = async () => {
    try {
      setLoading(true);
      const res = await fetch(`https://dummyjson.com/products/${id}`);
      const data = await res.json();
      setProduct(data);
      setSelectedImage(data.thumbnail);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  // Check if product is in cart
  const alreadyAddedToCart = CartData.items.some(
    (item) => item.id === parseInt(id)
  );

  const handleAddToCart = () => {
    if (!user) {
      toast.error("You are not logged in.");
      return;
    }

    if (alreadyAddedToCart) {
      dispatch(removeFromCartThunk(parseInt(id)));
    } else {
      const payload = {
        id: product.id,
        title: product.title,
        image: product.thumbnail,
        price: product.price,
        quantity: quantity,
        route: location.pathname,
      };
      dispatch(addToCartThunk(payload));
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - fullStars;
    for (let i = 0; i < fullStars; i++)
      stars.push(
        <span key={i} className="text-yellow-400">
          &#9733;
        </span>
      );
    for (let i = 0; i < emptyStars; i++)
      stars.push(
        <span key={`empty-${i}`} className="text-gray-400 dark:text-gray-600">
          &#9733;
        </span>
      );
    return stars;
  };

  if (loading) return <Loader />;
  if (!product) return <p className="text-center mt-10">Product not found.</p>;

  return (
    <section
      className={`min-h-screen transition-colors duration-500 ${
        isDarkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 py-4 md:pt-2 pb-4">
        {/* Breadcrumb */}
        <nav
          className={`text-sm mb-6 transition-colors duration-500 ${
            isDarkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          <Link
            to="/"
            className={`hover:underline ${
              isDarkMode ? "hover:text-white" : "hover:text-gray-900"
            }`}
          >
            Home
          </Link>{" "}
          / <span className="capitalize mx-1">{product.category}</span> /{" "}
          <span className="font-medium">{product.title}</span>
        </nav>

        {/* Product section */}
        <div
          className={`flex flex-col lg:flex-row gap-8 md:gap-12 p-4 md:p-8 rounded-sm shadow-md transition-colors duration-500 ${
            isDarkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          {/* Images */}
          <div className="lg:w-1/2 flex flex-col">
            <img
              src={selectedImage}
              alt={product.title}
              className="w-full h-72 sm:h-96 object-contain rounded-sm mb-4"
            />
            <div className="flex gap-2 sm:gap-4 overflow-x-auto pb-2">
              {product?.images?.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`Thumbnail ${index}`}
                  className={`w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-sm cursor-pointer border-2 flex-shrink-0 ${
                    selectedImage === url
                      ? "border-green-600"
                      : isDarkMode
                      ? "border-gray-700"
                      : "border-gray-200"
                  }`}
                  onClick={() => setSelectedImage(url)}
                />
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="lg:w-1/2 flex flex-col justify-between gap-6">
            <div>
              <h1 className="text-2xl md:text-4xl font-extrabold">
                {product.title}
              </h1>
              <div className="flex items-center gap-4 mt-2">
                <div>
                  {renderStars(
                    dummyReviews.reduce((a, r) => a + r.rating, 0) /
                      dummyReviews.length
                  )}
                </div>
                <span
                  className={`text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  ({dummyReviews.length} reviews)
                </span>
              </div>
              <div className="flex items-center gap-4 mt-4">
                <span className="text-2xl md:text-3xl font-bold text-green-600">
                  ${product.price}
                </span>
                <span
                  className={`line-through ${
                    isDarkMode ? "text-gray-500" : "text-gray-400"
                  }`}
                >
                  ${(product.price * 1.2).toFixed(2)}
                </span>
              </div>
            </div>

            {/* Quantity selector */}
            <div className="flex items-center gap-4">
              <span className="font-medium">Quantity:</span>
              <div
                className={`flex items-center border rounded-sm overflow-hidden ${
                  isDarkMode ? "border-gray-600" : "border-gray-300"
                }`}
              >
                <button
                  className="px-3 py-1"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <span className="px-4 py-1">{quantity}</span>
                <button
                  className="px-3 py-1"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>

            {/* Add / Remove button */}
            <button
              onClick={handleAddToCart}
              className={`w-full py-3 sm:py-4 text-white font-semibold rounded-sm transition ${
                alreadyAddedToCart
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {alreadyAddedToCart ? "Remove from Cart" : "Add to Cart"}
            </button>

            {/* Description */}
            <div
              className={`p-4 rounded-sm transition-colors duration-500 ${
                isDarkMode ? "bg-gray-700" : "bg-gray-50"
              }`}
            >
              <h2 className="text-lg md:text-xl font-semibold mb-2">
                Product Description
              </h2>
              <p
                className={`leading-relaxed ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {product.description}
              </p>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div
          className={`mt-8 p-4 sm:p-8 shadow-lg rounded-sm transition-colors duration-500 ${
            isDarkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h2 className="text-lg md:text-xl font-bold mb-4">Reviews</h2>
          <div className="flex flex-col gap-4">
            {dummyReviews.map((review) => (
              <div
                key={review.id}
                className={`p-3 sm:p-4 rounded-sm ${
                  isDarkMode ? "bg-gray-700" : "bg-gray-50"
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-semibold">{review.name}</span>
                  <span>{renderStars(review.rating)}</span>
                </div>
                <p
                  className={`mt-2 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {review.comment}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
