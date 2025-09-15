import { persistReducer, persistStore } from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";

import authReducer, {
  initialState as authInitialState,
} from "../store/reducer/authReducer";

import cartReducer, {
  initialState as cartInitialState,
} from "../store/reducer/cartReducer";

import globalReducer, {
  initialState as globalInitialState,
} from "./reducer/globalReducer";

export const initialState = {
  auth: authInitialState,
  cart: cartInitialState,
  global: globalInitialState,
};

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  global: globalReducer,
});

const persistConfig = {
  key: "persistData",
  storage,
  whiteList: ["auth", "cart", "global"],
};

//persist the root reducer
const persistedRootReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedRootReducer,
  preloadedState: initialState,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export const persistedStore = persistStore(store);
export default store;
