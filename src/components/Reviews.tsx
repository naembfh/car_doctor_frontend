import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaStar } from 'react-icons/fa';
import {
  useCreateReviewMutation,
  useGetAllReviewsQuery,
} from '../redux/api/reviewApi';
import { toast } from 'sonner';
import { selectCurrentUser } from '../redux/features/authSlice';
import Footer from './Footer';

const Reviews = () => {
  const { data: reviewsData, isLoading, isError } = useGetAllReviewsQuery();
  const reviews = reviewsData || [];
  const [createReview] = useCreateReviewMutation();
  const currentUser = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const location = useLocation();

  const [newReview, setNewReview] = useState({ comment: '', rating: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [averageRating, setAverageRating] = useState(0);
  const [showAll, setShowAll] = useState(false); // Toggle between showing all reviews or top two

  useEffect(() => {
    if (reviews && reviews.length > 0) {
      const avg =
        reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
      setAverageRating(parseFloat(avg.toFixed(1)));
    } else {
      setAverageRating(0);
    }
  }, [reviews]);

  const handleCreateReview = async () => {
    if (!currentUser) {
      toast.error('You must be logged in to leave a review.');
      navigate('/login', { state: { from: location.pathname } });
      return;
    }

    if (newReview.rating === 0 || newReview.comment.trim() === '') {
      toast.error('Please provide a rating and comment.');
      return;
    }

    try {
      await createReview({ ...newReview, user: currentUser }).unwrap();
      toast.success('Review submitted successfully!');
      setIsModalOpen(false);
      setNewReview({ comment: '', rating: 0 });
    } catch (error) {
      toast.error('Failed to submit review.');
    }
  };

  const StarRating = ({
    rating,
    setRating,
  }: {
    rating: number;
    setRating: (rating: number) => void;
  }) => (
    <div className="flex space-x-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          className={`cursor-pointer text-2xl ${
            rating >= star ? 'text-yellow-500' : 'text-gray-400'
          }`}
          onClick={() => setRating(star)}
        />
      ))}
    </div>
  );

  // Sort reviews by createdAt
  const sortedReviews = reviews
    ? [...reviews].sort(
        (a, b) =>
          new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime()
      )
    : [];

  // Show top two reviews or all reviews based on `showAll`
  const reviewsToShow = showAll ? sortedReviews : sortedReviews.slice(0, 2);

  return (
    <>
      <div className="relative bg-gradient-to-b from-gray-800 via-gray-900 to-black p-6 text-white">
        {/* Black Overlay for Unauthenticated Users */}
        {!currentUser && (
          <div className="absolute inset-0 bg-black bg-opacity-100 flex justify-center items-center z-10">
            <button
              className="bg-yellow-500 px-6 py-2 rounded-lg shadow-lg hover:bg-yellow-400"
              onClick={() =>
                navigate(
                  `/login?redirect=${encodeURIComponent(location.pathname)}`
                )
              }
            >
              Login to Leave a Review
            </button>
          </div>
        )}

        {/* Review Section */}
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">Customer Reviews</h2>
          <p className="text-xl">Average Rating: {averageRating} ⭐</p>
        </div>

        {/* Conditionally render content based on loading and error states */}
        {isLoading ? (
          <p className="text-center mt-6">Loading reviews...</p>
        ) : isError ? (
          <p className="text-center mt-6 text-red-500">
            Error loading reviews. Please try again later.
          </p>
        ) : reviews.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {reviewsToShow.map((review) => (
                <div
                  key={review._id}
                  className="bg-gray-800 p-4 rounded-lg shadow-lg transform hover:scale-105 transition duration-300"
                >
                  <p className="italic mb-2">"{review.comment}"</p>
                  <div className="flex gap-2">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={
                          i < review.rating ? 'text-yellow-500' : 'text-gray-400'
                        }
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-400 mt-2">
                    By {review?.username ?? 'Anonymous'} on{' '}
                    {new Date(review.createdAt ?? 0).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>

            {/* Show All Reviews Button */}
            {sortedReviews.length > 2 && (
              <div className="text-center mt-6">
                {!showAll ? (
                  <button
                    className="bg-blue-600 px-4 py-2 rounded-lg shadow-lg hover:bg-blue-500"
                    onClick={() => setShowAll(true)}
                  >
                    See All Reviews
                  </button>
                ) : (
                  <button
                    className="bg-blue-600 px-4 py-2 rounded-lg shadow-lg hover:bg-blue-500"
                    onClick={() => setShowAll(false)}
                  >
                    Show Less
                  </button>
                )}
              </div>
            )}
          </>
        ) : (
          <p className="text-center mt-6">No reviews yet. Be the first to leave a review!</p>
        )}

        {/* Leave a Review Button */}
        {currentUser && (
          <div className="text-center mt-6">
            <button
              className="bg-green-600 px-4 py-2 rounded-lg shadow-lg hover:bg-green-500"
              onClick={() => setIsModalOpen(true)}
            >
              Leave a Review
            </button>
          </div>
        )}

        {/* Modal for Writing a Review */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-20">
            <div className="bg-gray-900 p-6 rounded-lg shadow-lg max-w-md w-full">
              <h3 className="text-xl font-bold mb-4">Write a Review</h3>
              <textarea
                className="w-full p-2 mb-4 bg-gray-800 rounded-lg text-white"
                placeholder="Enter your feedback"
                value={newReview.comment}
                onChange={(e) =>
                  setNewReview({ ...newReview, comment: e.target.value })
                }
              />
              <StarRating
                rating={newReview.rating}
                setRating={(rating: number) =>
                  setNewReview({ ...newReview, rating })
                }
              />
              <div className="flex justify-end space-x-4 mt-4">
                <button
                  className="bg-blue-600 px-4 py-2 rounded-lg shadow-lg hover:bg-blue-500"
                  onClick={handleCreateReview}
                >
                  Submit
                </button>
                <button
                  className="bg-red-600 px-4 py-2 rounded-lg shadow-lg hover:bg-red-500"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Reviews;


