import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Footer from "../../components/Footer";
import EmptyCart from "./EmptyCart";
import CartItem from "./CartItemCard";
import toast from "react-hot-toast";
import {
  removeFromCartThunk,
  incrementItemQuantityThunk,
  decrementItemQuantityThunk,
} from "../../store/thunk/cart-management";

const Cart = () => {
  const user = useSelector((store) => store.auth);
  const cartItem = useSelector((store) => store.cart);
  console.log(cartItem);
  
  const globalData = useSelector((store) => store.global);
  const isDarkMode = globalData.theme; // true = dark, false = light
  const { items } = cartItem;
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const orderNow = async () => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:3000/api/cart/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ items }),
      });
      const data = await res.json();
      if (data.success) {
        window.location.href = data.url;
      } else {
        toast.error("Order failed: " + data.message);
      }
    } catch (error) {
      toast.error("Order failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = (id) => dispatch(removeFromCartThunk(id));
  const handleIncrement = (id) => dispatch(incrementItemQuantityThunk(id));
  const handleDecrement = (id) => dispatch(decrementItemQuantityThunk(id));

  // Authentication check
  if (!user) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          isDarkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
        }`}
      >
        <div
          className={`p-8 rounded-2xl shadow-xl text-center max-w-md ${
            isDarkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
              isDarkMode ? "bg-blue-900" : "bg-blue-100"
            }`}
          >
            <svg
              className={`w-8 h-8 ${
                isDarkMode ? "text-blue-300" : "text-blue-600"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">
            Authentication Required
          </h3>
          <p>Please log in to view your cart.</p>
        </div>
      </div>
    );
  }

  // Empty cart check
  if (items.length === 0) return <EmptyCart />;

  return (
    <>
      <div
        className={`min-h-screen ${
          isDarkMode ? "bg-gray-900 text-gray-100" : " text-gray-900"
        }`}
      >
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-5 mt-2 text-start">
            Your Cart ({items.length})
          </h1>

          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Cart Items Table */}
            <div
              className={`flex-1 rounded-sm overflow-x-auto ${
                isDarkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <div
                className={`md:visible hidden md:flex justify-between text-sm font-semibold border-b pb-2 px-4 py-4 ${
                  isDarkMode ? "border-gray-700" : "border-gray-200"
                }`}
              >
                <div className="w-[45%]">Product</div>
                <div className="w-[55%] flex justify-between">
                  <div>Quantity</div>
                  <div className="text-center">Total Price</div>
                  <div className="text-center">Remove</div>
                </div>
              </div>

              {items.map((item, index) => (
                <CartItem
                  key={index}
                  item={item}
                  isDarkMode={isDarkMode}
                  onRemove={handleRemove}
                  onIncrement={handleIncrement}
                  onDecrement={handleDecrement}
                />
              ))}
            </div>

            {/* Payment Summary */}
            <div className="w-full lg:w-96">
              <div
                className={`rounded-sm shadow-md p-6 sticky top-8 space-y-6 ${
                  isDarkMode
                    ? "bg-gray-800 text-gray-100"
                    : "bg-white text-gray-900"
                }`}
              >
                <h2 className="text-xl font-bold">Payment Summary</h2>

                {/* Payment Method */}
                <div>
                  <p className="text-sm mb-2">Payment Method</p>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="payment"
                        defaultChecked
                        className="accent-blue-600"
                      />
                      <span>Cash on Delivery (COD)</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="payment"
                        className="accent-blue-600"
                      />
                      <span>Stripe Payment</span>
                    </label>
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm mb-2">Address</label>
                  <select
                    className={`w-full rounded-md px-2 py-1 border ${
                      isDarkMode
                        ? "border-gray-600 bg-gray-700 text-white"
                        : "border-gray-300 bg-white text-gray-900"
                    }`}
                  >
                    <option>Select Address</option>
                  </select>
                  <button className="text-blue-600 mt-2 text-sm flex items-center gap-1 hover:underline">
                    <span className="text-xl leading-none">+</span> Add Address
                  </button>
                </div>

                {/* Pricing Summary */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>${Math.floor(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping:</span>
                    <span>$5</span>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Coupon Code"
                      className={`flex-1 px-3 py-1 rounded-md border ${
                        isDarkMode
                          ? "border-gray-600 bg-gray-700 text-white"
                          : "border-gray-300 bg-white text-gray-900"
                      }`}
                    />
                    <button
                      className={`px-4 py-1 rounded-md ${
                        isDarkMode
                          ? "bg-gray-700 text-white hover:bg-gray-600"
                          : "bg-gray-800 text-white hover:bg-gray-900"
                      }`}
                    >
                      Apply
                    </button>
                  </div>
                  <div
                    className={`flex justify-between font-semibold text-lg pt-2 border-t ${
                      isDarkMode ? "border-gray-700" : "border-gray-300"
                    }`}
                  >
                    <span>Total:</span>
                    <span>${Math.floor(totalPrice + 5)}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={orderNow}
                  disabled={loading}
                  className={`w-full py-3 rounded-lg font-bold text-white text-lg transition ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 shadow-md"
                  }`}
                >
                  {loading ? "Processing..." : "Place Order"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
