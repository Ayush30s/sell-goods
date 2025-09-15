import {
  addToCartFailed,
  addToCartRequest,
  addToCartSucceed,
  clearCart,
  removeFromCartFailed,
  removeFromCartRequest,
  removeFromCartSucceed,
  decrementItemQuantity,
  incrementItemQuantity,
} from "../actions/cart";
import toast from "react-hot-toast";

const addToCartThunk = (productData) => async (dispatch) => {
  dispatch(addToCartRequest());
  try {
    //make call to backend to add item
    dispatch(addToCartSucceed(productData));
    toast.success("Item added to cart");
  } catch (error) {
    dispatch(addToCartFailed(error.message));
    toast.error("Failed to add item to cart");
  }
};

const removeFromCartThunk = (productId) => async (dispatch) => {
  dispatch(removeFromCartRequest());
  try {
    //make call to backend to remove item
    dispatch(removeFromCartSucceed(productId));
    toast.success("Item removed from cart");
  } catch (error) {
    dispatch(removeFromCartFailed(error.message));
    toast.error("Failed to remove item from cart");
  }
};

const incrementItemQuantityThunk = (productId) => async (dispatch) => {
  // Optionally, you can dispatch a request action here if needed
  try {
    //make call to backend to increment item quantity
    dispatch(incrementItemQuantity(productId));
  } catch (error) {
    // Optionally, handle error if needed
    console.error("Failed to increment item quantity:", error);
  }
};

const decrementItemQuantityThunk = (productId) => async (dispatch) => {
  // Optionally, you can dispatch a request action here if needed
  try {
    //make call to backend to decrement item quantity
    console.log("Thunk productId:", productId);
    dispatch(decrementItemQuantity(productId));
  } catch (error) {
    // Optionally, handle error if needed
    console.error("Failed to decrement item quantity:", error);
  }
};

const clearCartThunk = () => async (dispatch) => {
  // Optionally, you can dispatch a request action here if needed
  try {
    //make call to backend to clear the cart
    dispatch(clearCart());
    toast.success("Cart cleared");
  } catch (error) {
    // Optionally, handle error if needed
    console.error("Failed to clear the cart:", error);
  }
};

export {
  clearCartThunk,
  addToCartThunk,
  removeFromCartThunk,
  incrementItemQuantityThunk,
  decrementItemQuantityThunk,
};
