import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {jwtDecode} from "jwt-decode";

import { RootState } from "../store";

// Type for user information extracted from JWT
export type TUser = {
  id: string;
  username: string;
  phone: string;
  name: string;
  email: string;
  role: string;
  address?: string;
  img?: string;
  iat: number;
  exp: number;
};

type TAuthState = {
  user: null | TUser;
  token: null | string;
};

// Initial state for the auth slice
const initialState: TAuthState = {
  user: null,
  token: localStorage.getItem('token') || null, 
};

// Auth slice creation
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ token: string }>) => {
      const { token } = action.payload;

      // Check if token exists and is a valid string before decoding
      if (token && typeof token === "string") {
        state.token = token;

        // Store token in localStorage
        localStorage.setItem('token', token);

        // Decode JWT to extract user details
        try {
          const decoded = jwtDecode<TUser>(token);
          state.user = {
            id: decoded?.id,
            phone: decoded?.phone,
            username: decoded.username,
            name: decoded.name,
            email: decoded.email,
            role: decoded.role,
            address: decoded?.address,
            img: decoded?.img,
            iat: decoded.iat,
            exp: decoded.exp,
          };
        } catch (error) {
          console.error("Invalid token format or decoding error:", error);
          state.token = null;
          state.user = null;
          localStorage.removeItem('token');
        }
      } else {
        console.error("Invalid token format");
        state.token = null;
        state.user = null;
        localStorage.removeItem('token');
      }
    },

    logout: (state) => {
      state.user = null;
      state.token = null;

      // Remove token from localStorage
      localStorage.removeItem('token');
    },
  },
});

// Export actions and reducer
export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;

// Selectors to access the auth state
export const useCurrentToken = (state: RootState) => state.auth.token;
export const selectCurrentUser = (state: RootState) => state.auth.user;
