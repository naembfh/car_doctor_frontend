import { createApi, fetchBaseQuery, BaseQueryFn, FetchBaseQueryError, FetchArgs } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import { setUser, logout } from '../features/authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: ' https://car-doctor-service-center.vercel.app/api',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401 && (result.error.data as { message: string })?.message === 'jwt expired') {
    const refreshResult = await api.dispatch(authApi.endpoints.refreshToken.initiate({}));

    if (refreshResult.data) {
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User'],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { accessToken } = data.data;
          if (accessToken) {
            dispatch(setUser({ token: accessToken }));
          }
        } catch (error) {
          console.error('Login error:', error);
        }
      },
    }),
    signUp: builder.mutation({
      query: (userData) => ({
        url: 'auth/signup',
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: [{ type: 'User' }],
    }),
    allUser: builder.query({
      query: () => 'auth/all-users',
      providesTags: [{ type: 'User' }],
    }),
    refreshToken: builder.mutation({
      query: () => ({
        url: 'auth/refresh-token',
        method: 'POST',
      }),
      invalidatesTags: [{ type: 'User' }],
    }),
    updateUserRole: builder.mutation({
      query: ({ userId, newRole }) => ({
        url: 'auth/update-role/',
        method: 'PATCH',
        body: { newRole, userId },
      }),
      invalidatesTags: [{ type: 'User' }],
    }),
       
        updateUserProfile: builder.mutation({
          query: ({ updatedData }) => ({
            url: `auth/update-profile`,
            method: 'PATCH',
            body: updatedData,
          }),
          invalidatesTags: [{ type: 'User' }],
        }),
  }),
});

export const {
  useLoginMutation,
  useSignUpMutation,
  useAllUserQuery,
  useRefreshTokenMutation,
  useUpdateUserRoleMutation,
  useUpdateUserProfileMutation,
} = authApi;
