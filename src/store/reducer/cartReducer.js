import {
  ADD_TO_CART_FAILED,
  ADD_TO_CART_REQUESTED,
  ADD_TO_CART_SUCCEED,
  REMOVE_FROM_CART_FAILED,
  REMOVE_FROM_CART_REQUESTED,
  REMOVE_FROM_CART_SUCCEED,
  CLEAR_CART,
  DECREMENT_ITEM_QUANTITY,
  INCREMENT_ITEM_QUANTITY,
} from "../actions/cart";

export const initialState = {
  items: [], // array of {id, name, price, quantity, ...}
  loading: false,
  error: null,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART_REQUESTED:
      return {
        ...state,
        loading: true,
      };

    case ADD_TO_CART_SUCCEED: {
      const product = action.payload;

      // check if product already exists in cart
      const existing = state.items.find((item) => item.id === product.id);

      let updatedItems;
      if (existing) {
        updatedItems = state.items.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + (product.quantity || 1) }
            : item
        );
      } else {
        updatedItems = [
          ...state.items,
          { ...product, quantity: product.quantity || 1 },
        ];
      }

      return {
        ...state,
        items: updatedItems,
        loading: false,
        error: null,
      };
    }

    case ADD_TO_CART_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case REMOVE_FROM_CART_REQUESTED:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case REMOVE_FROM_CART_SUCCEED: {
      const productId = action.payload; // id of product to remove
      return {
        ...state,
        items: state.items.filter((item) => item.id !== productId),
        loading: false,
        error: null,
      };
    }

    case REMOVE_FROM_CART_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_CART:
      return {
        ...state,
        items: [],
        loading: false,
        error: null,
      };

    case INCREMENT_ITEM_QUANTITY:
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
        loading: false,
        error: null,
      };

    case DECREMENT_ITEM_QUANTITY:
      console.log(action.payload);
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
        loading: false,
        error: null,
      };

    default:
      return state;
  }
};

export default cartReducer;
