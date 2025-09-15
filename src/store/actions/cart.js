export const ADD_TO_CART_SUCCEED = "ADD_TO_CART_SUCCEED";
export const ADD_TO_CART_REQUESTED = "ADD_TO_CART_REQUESTED";
export const ADD_TO_CART_FAILED = "ADD_TO_CART_FAILED";
export const UPDATE_CART_ITEM_SUCCEED = "UPDATE_CART_ITEM_SUCCEED";
export const UPDATE_CART_ITEM_REQUESTED = "UPDATE_CART_ITEM_REQUESTED";
export const UPDATE_CART_ITEM_FAILED = "UPDATE_CART_ITEM_FAILED";
export const REMOVE_FROM_CART_SUCCEED = "REMOVE_FROM_CART_SUCCEED";
export const REMOVE_FROM_CART_REQUESTED = "REMOVE_FROM_CART_REQUESTED";
export const REMOVE_FROM_CART_FAILED = "REMOVE_FROM_CART_FAILED";
export const CLEAR_CART = "CLEAR_CART";
export const DECREMENT_ITEM_QUANTITY = "DECREMENT_ITEM_QUANTITY";
export const INCREMENT_ITEM_QUANTITY = "INCREMENT_ITEM_QUANTITY";

const addToCartRequest = () => ({
  type: ADD_TO_CART_REQUESTED,
  payload: {},
});

const addToCartSucceed = (productData) => ({
  type: ADD_TO_CART_SUCCEED,
  payload: productData,
});

const addToCartFailed = (error) => ({
  type: ADD_TO_CART_FAILED,
  payload: error,
});

const removeFromCartSucceed = (productId) => ({
  type: REMOVE_FROM_CART_SUCCEED,
  payload: productId,
});

const removeFromCartRequest = () => ({
  type: REMOVE_FROM_CART_REQUESTED,
  payload: {},
});

const removeFromCartFailed = (error) => ({
  type: REMOVE_FROM_CART_FAILED,
  payload: error,
});

const clearCart = () => ({
  type: CLEAR_CART,
  payload: {},
});

const incrementItemQuantity = (productId) => ({
  type: INCREMENT_ITEM_QUANTITY,
  payload: productId,
});

const decrementItemQuantity = (productId) => ({
  type: DECREMENT_ITEM_QUANTITY,
  payload: productId,
});

export {
  addToCartFailed,
  addToCartRequest,
  addToCartSucceed,
  removeFromCartFailed,
  removeFromCartRequest,
  removeFromCartSucceed,
  clearCart,
  incrementItemQuantity,
  decrementItemQuantity,
};
