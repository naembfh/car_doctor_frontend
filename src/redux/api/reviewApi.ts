import { baseApi } from './baseApi';
import { TReview } from '../../types/reviewTypes';

// Ensure the correct type for Review is used
export const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch all reviews
    getAllReviews: builder.query<TReview[], void>({
      query: () => 'review/show', 
      transformResponse: (response: { data: TReview[] }) => {
        console.log('All Reviews:', response);
        return response.data; 
      },
      providesTags: ['Review'],
    }),

    // Create a new review
    createReview: builder.mutation<TReview, Partial<TReview>>({
      query: (review) => ({
        url: 'review/create', 
        method: 'POST',
        body: review,
      }),
      transformResponse: (response: { data: TReview }) => {
        console.log('Review created:', response);
        return response.data;
      },
      invalidatesTags: ['Review'], 
    }),
  }),
  overrideExisting: false,
});

// Export hooks to use in components
export const {
  useGetAllReviewsQuery,
  useCreateReviewMutation,
} = reviewApi;
