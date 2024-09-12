// api/authApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setUser } from "../features/authSlice";

export const authApi = createApi({
  reducerPath: "authApi", 
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/",
    credentials: "include", // This will include cookies if necessary
  }),
  endpoints: (builder) => ({
    // Login endpoint
    login: builder.mutation({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { token } = data;
          dispatch(setUser({ token: token }));
        } catch (error) {
          console.error("Login error: ", error);
        }
      },
    }),
    // Sign Up endpoint
    signUp: builder.mutation({
      query: (userData) => ({
        url: "auth/signup",
        method: "POST",
        body: userData,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { accessToken } = data;
          dispatch(setUser({ token: accessToken }));
        } catch (error) {
          console.error("Sign-up error: ", error);
        }
      },
    }),
    // Fetch all users, no token needed
    allUser: builder.query({
      query: () => ({
        url: "auth/all-users",
        method: "GET",
      }),
    }),
    // Refresh token endpoint
    refreshToken: builder.mutation({
      query: () => ({
        url: "auth/refresh-token",
        method: "POST",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { accessToken } = data;
          dispatch(setUser({ token: accessToken }));
        } catch (error) {
          console.error("Refresh token error: ", error);
        }
      },
    }),
  }),
});

export const { useLoginMutation, useSignUpMutation, useAllUserQuery, useRefreshTokenMutation } = authApi;
