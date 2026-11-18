import { createSlice } from "@reduxjs/toolkit";

// Read the saved login (if any) so the user stays logged in after a refresh
function load() {
  try {
    return JSON.parse(localStorage.getItem("bookdz-auth")) || { token: null, user: null };
  } catch {
    return { token: null, user: null };
  }
}

const authSlice = createSlice({
  name: "auth",
  initialState: load(),
  reducers: {
    loginSuccess(state, action) {
      state.token = action.payload.token;
      state.user = action.payload.user;
      localStorage.setItem("bookdz-auth", JSON.stringify(state));
    },
    logout(state) {
      state.token = null;
      state.user = null;
      localStorage.removeItem("bookdz-auth");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
