import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // sử dụng localStorage
import cartReducer from "../utils/cartSlice";

const persistConfig = {
  key: "root",
  storage,
};

// Tạo persisted reducer cho cart
const persistedCartReducer = persistReducer(persistConfig, cartReducer);

const store = configureStore({
  reducer: {
    cart: persistedCartReducer,
  },
});

const persistor = persistStore(store);

export { store, persistor };
