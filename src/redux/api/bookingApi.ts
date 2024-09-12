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
      transformResponse: (response: { data: Booking }) => {
        console.log('Booking created:', response.data);
        return response.data; 
      },
    }),
    
    // Fetch all bookings (Admin only)
    getAllBookings: builder.query<BookingsResponse, void>({
      query: () => "bookings",
      transformResponse: (response: { data: BookingsResponse }) => {
        console.log('All Bookings:', response.data);
        return response.data; 
      },
    }),
    
    // Fetch current user's bookings
    getUserBookings: builder.query<BookingsResponse, void>({
      query: () => "my-bookings",
      transformResponse: (response: { data: BookingsResponse }) => {
        console.log('User Bookings:', response.data);
        return response.data;
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateBookingMutation,
  useGetAllBookingsQuery,
  useGetUserBookingsQuery,
} = bookingApi;
