import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Trash } from "lucide-react";
import {
  removeFromCartThunk,
  incrementItemQuantityThunk,
  decrementItemQuantityThunk,
} from "../../store/thunk/cart-management";
import { useDispatch } from "react-redux";
import CartItem from "./CartItemCard";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import EmptyCart from "./EmptyCart";

const Cart = () => {
  const user = useSelector((store) => store.auth);
  const cartItem = useSelector((store) => store.cart);
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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="p-8 rounded-2xl shadow-xl text-center max-w-md bg-white">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-blue-600"
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
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Authentication Required
          </h3>
          <p className="text-gray-600">Please log in to view your cart.</p>
        </div>
      </div>
    );
  }

  // Empty cart check
  if (items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-20 pb-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mt-5 mb-10 text-start text-gray-900">
            Your Cart ({items.length})
          </h1>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items Table */}
            <div className="flex-1 bg-white rounded-xl">
              <div className="flex justify-between text-sm font-semibold text-gray-600 border-b pb-2">
                <div className="w-[45%]">Product</div>
                <div className="w-[55%] flex justify-between">
                  <div>Quantity</div>
                  <div className="text-center">Total Price</div>
                  <div className="text-center">Remove</div>
                </div>
              </div>

              {/* Items */}
              {items.map((item, index) => (
                <CartItem key={index} item={item} />
              ))}
            </div>

            {/* Payment Summary */}
            <div className="w-full lg:w-96">
              <div className="bg-white rounded-xl shadow-md p-6 sticky top-8 space-y-6">
                <h2 className="text-xl font-bold text-gray-800">
                  Payment Summary
                </h2>

                {/* Payment Method */}
                <div>
                  <p className="text-sm text-gray-600 mb-2">Payment Method</p>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-gray-700">
                      <input type="radio" name="payment" defaultChecked />
                      COD
                    </label>
                    <label className="flex items-center gap-2 text-gray-700">
                      <input type="radio" name="payment" />
                      Stripe Payment
                    </label>
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm text-gray-600 mb-2">
                    Address
                  </label>
                  <select className="w-full border-gray-300 rounded-md">
                    <option>Select Address</option>
                  </select>
                  <button className="text-blue-600 mt-2 text-sm flex items-center gap-1">
                    <span className="text-xl leading-none">+</span> Add Address
                  </button>
                </div>

                {/* Pricing Summary */}
                <div className="space-y-2 text-sm text-gray-700">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>${Math.floor(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping:</span>
                    <span>$5</span>
                  </div>

                  {/* Coupon Input */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Coupon Code"
                      className="flex-1 border border-gray-300 rounded-md px-3 py-1"
                    />
                    <button className="px-4 py-1 bg-gray-800 text-white rounded-md">
                      Apply
                    </button>
                  </div>

                  {/* Total */}
                  <div className="flex justify-between font-semibold text-gray-900 text-lg">
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
                      : "bg-gray-800 hover:bg-gray-900 shadow-md"
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
