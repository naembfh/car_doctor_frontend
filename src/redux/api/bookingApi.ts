import { Booking, BookingsResponse } from "../../types/BookingTypes";
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
    }),
    // Fetch all bookings (Admin only)
    getAllBookings: builder.query<BookingsResponse, void>({
      query: () => "bookings",
    }),
    // Fetch current user's bookings
    getUserBookings: builder.query<BookingsResponse, void>({
      query: () => "my-bookings",
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateBookingMutation,
  useGetAllBookingsQuery,
  useGetUserBookingsQuery,
} = bookingApi;
