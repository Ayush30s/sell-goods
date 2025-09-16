import { useDispatch } from "react-redux";
import { Trash } from "lucide-react";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import debounce from "lodash/debounce";
import {
  removeFromCartThunk,
  incrementItemQuantityThunk,
  decrementItemQuantityThunk,
} from "../../store/thunk/cart-management";

const CartItem = ({ item, isDarkMode }) => {
  const dispatch = useDispatch();

  // Debounced functions
  const debouncedIncrement = useMemo(
    () =>
      debounce((id) => {
        dispatch(incrementItemQuantityThunk(id));
      }, 400),
    [dispatch]
  );

  const debouncedDecrement = useMemo(
    () =>
      debounce((id) => {
        dispatch(decrementItemQuantityThunk(id));
      }, 400),
    [dispatch]
  );

  const debouncedRemove = useMemo(
    () =>
      debounce((id) => {
        dispatch(removeFromCartThunk(id));
      }, 400),
    [dispatch]
  );

  const handleIncrement = () => debouncedIncrement(item.id);
  const handleDecrement = () => {
    if (item.quantity > 1) debouncedDecrement(item.id);
  };
  const handleRemove = () => debouncedRemove(item.id);

  return (
    <div
      className={`flex flex-col sm:flex-row justify-between py-4 border-b px-4 gap-4 ${
        isDarkMode ? "border-gray-700" : "border-gray-200"
      }`}
    >
      {/* --------- Mobile Layout --------- */}
      <div className="flex sm:hidden gap-4 relative">
        {/* Image (left, bigger for mobile) */}
        <img
          src={item.image}
          alt={item.title}
          className="w-24 h-24 object-contain rounded-md flex-shrink-0"
        />

        {/* Details (right) */}
        <div className="flex flex-col flex-1">
          <div className="flex justify-between items-start">
            <Link to={item.route}>
              <button
                className={`font-semibold  text-sm ${
                  isDarkMode
                    ? "text-gray-100 hover:text-blue-700"
                    : "text-gray-800 hover:text-blue-500"
                }`}
              >
                {item.title}
              </button>
            </Link>
            {/* Trash button (top-right on mobile) */}
            <button
              onClick={handleRemove}
              className="text-red-500 hover:text-red-700 ml-2"
            >
              <Trash size={18} />
            </button>
          </div>

          <p
            className={`text-sm mb-2 ${
              isDarkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            ${item.price}
          </p>

          {/* Quantity + Total */}
          <div className="flex items-center justify-between">
            {/* Quantity Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleDecrement}
                className={`w-8 h-8 flex items-center justify-center rounded-md font-semibold border ${
                  isDarkMode
                    ? "text-white border-gray-600 hover:bg-gray-700"
                    : "text-gray-800 border-gray-300 hover:bg-gray-100"
                }`}
              >
                -
              </button>
              <span className="font-medium">{item.quantity}</span>
              <button
                onClick={handleIncrement}
                className={`w-8 h-8 flex items-center justify-center rounded-md font-semibold border ${
                  isDarkMode
                    ? "text-white border-gray-600 hover:bg-gray-700"
                    : "text-gray-800 border-gray-300 hover:bg-gray-100"
                }`}
              >
                +
              </button>
            </div>

            {/* Total Price */}
            <div
              className={`font-semibold ${
                isDarkMode ? "text-gray-100" : "text-gray-800"
              }`}
            >
              ${Math.round(item.price * item.quantity)}
            </div>
          </div>
        </div>
      </div>

      {/* --------- Desktop Layout --------- */}
      <div className="hidden sm:flex justify-between items-center w-full">
        {/* Product Info */}
        <div className="flex items-center gap-4 w-[45%]">
          <img
            src={item.image}
            alt={item.title}
            className="w-16 h-16 object-contain rounded-md"
          />
          <div>
            <Link to={item?.route}>
              <button
                className={`font-semibold ${
                  isDarkMode
                    ? "text-gray-100 hover:text-blue-700"
                    : "text-gray-800 hover:text-blue-500"
                }`}
              >
                {item.title}
              </button>
            </Link>
            <p
              className={`text-sm ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              ${item.price}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between w-[55%]">
          {/* Quantity */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleDecrement}
              className={`w-8 h-8 flex items-center justify-center rounded-md font-semibold border ${
                isDarkMode
                  ? "text-white border-gray-600 hover:bg-gray-700"
                  : "text-gray-800 border-gray-300 hover:bg-gray-100"
              }`}
            >
              -
            </button>
            <span className="font-medium">{item.quantity}</span>
            <button
              onClick={handleIncrement}
              className={`w-8 h-8 flex items-center justify-center rounded-md font-semibold border ${
                isDarkMode
                  ? "text-white border-gray-600 hover:bg-gray-700"
                  : "text-gray-800 border-gray-300 hover:bg-gray-100"
              }`}
            >
              +
            </button>
          </div>

          {/* Total */}
          <div
            className={`font-semibold ${
              isDarkMode ? "text-gray-100" : "text-gray-800"
            }`}
          >
            ${Math.round(item.price * item.quantity)}
          </div>

          {/* Trash button */}
          <button
            onClick={handleRemove}
            className="text-red-500 hover:text-red-700"
          >
            <Trash size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
