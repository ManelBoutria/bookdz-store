import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [] },
  reducers: {
    addToCart(state, action) {
      const found = state.items.find((i) => i.id === action.payload.id);
      if (found) {
        found.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart(state, action) {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    increase(state, action) {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) item.quantity += 1;
    },
    decrease(state, action) {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) item.quantity -= 1;
      state.items = state.items.filter((i) => i.quantity > 0);
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, increase, decrease, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
