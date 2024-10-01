import { baseApi } from './baseApi';
import { Booking } from '../../types/bookingTypes';

export const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create a booking
    createBooking: builder.mutation<Booking, Partial<Booking>>({
      query: (booking) => ({
        url: 'bookings',
        method: 'POST',
        body: booking,
      }),
      transformResponse: (response: any) => {
        console.log('Booking created:', response);
        return response;
      },
      invalidatesTags: ['Booking'],
    }),

    // Create Stripe Checkout Session
    createCheckoutSession: builder.mutation<{ sessionId: string }, { bookings: Booking[], customerEmail: string }>({
      query: ({ bookings, customerEmail }) => ({
        url: 'create-checkout-session',
        method: 'POST',
        body: { bookings, customerEmail },
      }),
      transformResponse: (response: any) => {
        console.log('Stripe Checkout Session:', response);
        return response.data.session;
      },
    }),

        // Fetch Stripe Checkout Session to Confirm Payment by Session ID
        confirmCheckoutSession: builder.mutation<{ message: string }, { sessionId: string }>({
          query: ({ sessionId }) => ({
            url: `success?session_id=${sessionId}`, 
            method: 'GET', 
          }),
          transformResponse: (response: any) => {
            console.log('Payment Confirmation:', response);
            return response;
          },
        }),

    // Fetch all bookings (Admin only)
    getAllBookings: builder.query<any, void>({
      query: () => 'bookings',
      transformResponse: (response: any) => {
        console.log('All Bookings:', response);
        return response;
      },
      providesTags: ['Booking'],
    }),

    // Fetch current user's bookings
    getUserBookings: builder.query<any, void>({
      query: () => 'my-bookings',
      transformResponse: (response: any) => {
        console.log('User Bookings:', response);
        return response;
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
  useCreateCheckoutSessionMutation,
  useConfirmCheckoutSessionMutation,
} = bookingApi;
