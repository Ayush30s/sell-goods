import { useDispatch } from "react-redux";
import { Trash } from "lucide-react";
import { useMemo } from "react";
import debounce from "lodash/debounce";
import {
  removeFromCartThunk,
  incrementItemQuantityThunk,
  decrementItemQuantityThunk,
} from "../../store/thunk/cart-management";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  // Debounced functions
  const debouncedIncrement = useMemo(
    () =>
      debounce((id) => {
        dispatch(incrementItemQuantityThunk(id));
      }, 500),
    [dispatch]
  );

  const debouncedDecrement = useMemo(
    () =>
      debounce((id) => {
        dispatch(decrementItemQuantityThunk(id));
      }, 500),
    [dispatch]
  );

  const debouncedRemove = useMemo(
    () =>
      debounce((id) => {
        dispatch(removeFromCartThunk(id));
      }, 500),
    [dispatch]
  );

  // Handlers
  const handleIncrement = () => debouncedIncrement(item.id);

  const handleDecrement = () => {
    if (item.quantity > 1) debouncedDecrement(item.id);
  };

  const handleRemove = () => debouncedRemove(item.id);

  return (
    <div className="flex justify-between py-4 border-b">
      {/* Product Info */}
      <div className="w-[45%] flex items-center gap-4 col-span-2">
        <img
          src={item.image}
          alt={item.title}
          className="w-16 h-16 object-contain rounded-md"
        />
        <div>
          <h4 className="font-semibold text-gray-800">{item.title}</h4>
          <p className="text-sm text-gray-500">${item.price}</p>
        </div>
      </div>

      <div className="w-[55%] flex items-center justify-between">
        {/* Quantity Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleDecrement}
            className="w-8 h-8 flex items-center justify-center"
          >
            -
          </button>
          <span className="font-medium">{item.quantity}</span>
          <button
            onClick={handleIncrement}
            className="w-8 h-8 flex items-center justify-center"
          >
            +
          </button>
        </div>

        {/* Total Price */}
        <div className="text-gray-800 font-semibold">
          ${Math.floor(item.price * item.quantity)}
        </div>

        {/* Remove Button */}
        <div className="text-center">
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
