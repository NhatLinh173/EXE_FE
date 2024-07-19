import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.productId === action.payload.productId
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quality;
      } else {
        state.items.push({
          ...action.payload,
          quantity: action.payload.quality || 1, 
        });
      }
    },
    setCartItems: (state, action) => {
      state.items = action.payload.map((item) => ({
        ...item,
        quantity: item.quantity || 1, 
      }));
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter((item) => item.productId !== productId);
    },
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const product = state.items.find((item) => item.productId === productId);
      if (product) {
        product.quantity = quantity;
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  setCartItems,
  removeFromCart,
  updateQuantity,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
