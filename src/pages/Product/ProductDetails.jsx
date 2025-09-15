import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import {
  addToCartThunk,
  removeFromCartThunk,
} from "../../store/thunk/cart-management";
import Navbar from "../../components/Navbar";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const CartData = useSelector((store) => store.cart);
  const loggedInUser = useSelector((store) => store.auth);
  const { user } = loggedInUser;
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
      console.log(user);
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
        <span key={`empty-${i}`} className="text-gray-300">
          &#9733;
        </span>
      );
    return stars;
  };

  if (loading) return <Loader />;
  if (!product) return <p className="text-center mt-10">Product not found.</p>;

  return (
    <>
      <section className="min-h-screen bg-gray-100 mt-10">
        <div className="container mx-auto px-4 md:px-8 py-12">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-500 mb-6">
            <Link to="/" className="hover:text-gray-900">
              Home
            </Link>{" "}
            / <span className="capitalize mx-1">{product.category}</span> /{" "}
            <span className="font-medium">{product.title}</span>
          </nav>

          {/* Product section */}
          <div className="flex flex-col lg:flex-row gap-12 bg-white p-6 md:p-8 rounded-sm shadow-md">
            {/* Images */}
            <div className="lg:w-1/2">
              <img
                src={selectedImage}
                alt={product.title}
                className="w-full h-96 object-contain rounded-2xl mb-4"
              />
              <div className="flex gap-4">
                {product?.images?.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`Thumbnail ${index}`}
                    className={`w-20 h-20 object-contain rounded-sm cursor-pointer border-2 ${
                      selectedImage === url
                        ? "border-green-600"
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
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
                  {product.title}
                </h1>
                <div className="flex items-center gap-4 mt-2">
                  <div>
                    {renderStars(
                      dummyReviews.reduce((a, r) => a + r.rating, 0) /
                        dummyReviews.length
                    )}
                  </div>
                  <span className="text-gray-500 text-sm">
                    ({dummyReviews.length} reviews)
                  </span>
                </div>
                <div className="flex items-center gap-4 mt-4">
                  <span className="text-3xl font-bold text-green-600">
                    ${product.price}
                  </span>
                  <span className="text-gray-400 line-through">
                    ${(product.price * 1.2).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Quantity selector */}
              <div className="flex items-center gap-4">
                <span className="font-medium">Quantity:</span>
                <div className="flex items-center border rounded-sm overflow-hidden">
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
                className={`w-full py-4  text-white font-semibold rounded-sm transition ${
                  alreadyAddedToCart
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {alreadyAddedToCart ? "Remove from Cart" : "Add to Cart"}
              </button>

              {/* Description */}
              <div className="p-4 rounded-sm bg-gray-50">
                <h2 className="text-xl font-semibold mb-2">
                  Product Description
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {product.description}
                </p>
              </div>
            </div>
          </div>

          {/* Reviews */}
          <div className="mt-8 bg-white p-8">
            <h2 className="text-xl font-bold mb-4">Reviews</h2>
            <div className="flex flex-col gap-4">
              {dummyReviews.map((review) => (
                <div key={review.id} className="p-4 rounded-sm bg-gray-50">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">{review.name}</span>
                    <span>{renderStars(review.rating)}</span>
                  </div>
                  <p className="mt-2 text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetails;
