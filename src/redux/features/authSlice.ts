import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

import { RootState } from "../store";

export type TUser = {
  //   userId: string;
  username: string;
  name: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
};

type TAuthState = {
  user: null | TUser;
  token: null | string;
};

// Initial state for auth slice
const initialState: TAuthState = {
  user: null,
  token: null,
};

// Auth slice creation
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Set the user and token in the state
    setUser: (state, action: PayloadAction<{ token: string }>) => {
      const { token } = action.payload;
      state.token = token;

      // Decode JWT to extract user details
      const decoded = jwtDecode<TUser>(token);
      state.user = {
        // userId: decoded.userId,
        username: decoded.username,
        name: decoded.name,
        email: decoded.email,
        role: decoded.role,
        iat: decoded.iat,
        exp: decoded.exp,
      };
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

// Export actions and reducer
export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;

// Selectors to access the auth state
export const useCurrentToken = (state: RootState) => state.auth.token;
export const selectCurrentUser = (state: RootState) => state.auth.user;
