import { createSlice } from "@reduxjs/toolkit";

// TODO: Define the inital states required for authentication

const initialState = {
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  // TODO: Create a action creators
  reducers: {
    setIsAuthenticated(state, action) {
      state.isAuthenticated = action.payload;
    },
    setLogout(state) {
      state.isAuthenticated = false;
    },
  },
});

export const { setIsAuthenticated, setLogout } = authSlice.actions;
export default authSlice.reducer;
