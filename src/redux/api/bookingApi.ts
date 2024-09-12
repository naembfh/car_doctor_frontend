import { Booking, BookingsResponse } from "../../types/bookingTypes";
import { baseApi } from "./baseApi";

export const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create a booking
    createBooking: builder.mutation<Booking, Partial<Booking>>({
      query: (booking) => ({
        url: "bookings",
        method: "POST",
        body: booking,
      }),
      transformResponse: (response: any) => {
        console.log('Booking created:', response);
        return response; // Send the entire response, not just response.data
      },
      invalidatesTags: ['Booking'],
    }),

    // Fetch all bookings (Admin only)
    getAllBookings: builder.query<any, void>({
      query: () => "bookings",
      transformResponse: (response: any) => {
        console.log('All Bookings:', response);
        return response; // Send the entire response
      },
      providesTags: ['Booking'],
    }),

    // Fetch current user's bookings
    getUserBookings: builder.query<any, void>({
      query: () => "my-bookings",
      transformResponse: (response: any) => {
        console.log('User Bookings:', response);
        return response; // Send the entire response
      },
      providesTags: ['Booking'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateBookingMutation,
  useGetAllBookingsQuery,
  useGetUserBookingsQuery,
} = bookingApi;
