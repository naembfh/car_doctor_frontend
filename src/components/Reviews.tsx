import { useState } from 'react';
import { useCreateReviewMutation, useGetAllReviewsQuery } from '../redux/api/reviewApi';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 
import { toast } from 'sonner'; 
import { selectCurrentUser } from '../redux/features/authSlice';

const Reviews = () => {
  const { data: reviews = [], isLoading, isError } = useGetAllReviewsQuery();
  const currentUser = useSelector(selectCurrentUser); 
  const navigate = useNavigate(); 
  const [showAll, setShowAll] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [newReview, setNewReview] = useState({ comment: '', rating: 5 });
  const [createReview] = useCreateReviewMutation();

  // Function to handle review creation
  const handleCreateReview = async () => {
    if (!currentUser) {
      toast.error('You must be logged in to write a review.');
      navigate('/login');
      return;
    }

    const reviewData = {
      user: {
        id: currentUser.id,
        username: currentUser.username,
        img: currentUser.img,
      },
      comment: newReview.comment,
      rating: newReview.rating,
    };

    try {
      await createReview(reviewData).unwrap();
      toast.success('Review created successfully!');
      setIsModalOpen(false); 
    } catch (error) {
      toast.error('Error creating review.');
      console.error('Error creating review:', error);
    }
  };

  // Sort reviews by createdAt in descending order
  const sortedReviews = [...reviews].sort((a, b) =>
    new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime()
  );

  // Show the last three reviews unless 'showAll' is true
  const reviewsToShow = showAll ? sortedReviews : sortedReviews.slice(0, 3);

  if (isLoading) return <p>Loading reviews...</p>;
  if (isError) return <p>Error loading reviews. Please try again later.</p>;

  return (
    <div className="p-6 bg-slate-800">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl text-slate-100 font-bold">Customer Reviews</h2>
        {/* Button to create review or login */}
        {!currentUser ? (
          <button
            className="bg-yellow-500 text-white px-4 py-2 rounded-md shadow-lg hover:bg-yellow-400"
            onClick={() => navigate('/login')}
          >
            Login to Create Review
          </button>
        ) : (
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-lg hover:bg-blue-500"
            onClick={() => setIsModalOpen(true)}
          >
            Create Review
          </button>
        )}
      </div>

      <ul className="grid gap-8 lg:grid-cols-3 sm:grid-cols-2">
        {reviewsToShow.length > 0 ? (
          reviewsToShow.map((review) => (
            <li
              key={review._id}
              className="bg-slate-800 p-4 rounded-lg shadow-2xl transform hover:scale-105 transition duration-300 ease-in-out"
            >
              <p className="mb-2 text-slate-300">"{review.comment}"</p>
              <p className="font-semibold text-white">Rating: {review.rating} ⭐</p>
              <p className="text-slate-400 text-sm">
                By {review.user?.username ?? 'Unknown'} on {new Date(review.createdAt ?? 0).toLocaleDateString()}
              </p>
            </li>
          ))
        ) : (
          <p>No reviews available</p>
        )}
      </ul>

      {/* Show All button */}
      {!showAll && sortedReviews.length > 3 && (
        <div className="flex justify-center mt-6">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-lg hover:bg-blue-500"
            onClick={() => setShowAll(true)}
          >
            Show All Reviews
          </button>
        </div>
      )}

      {/* Modal for creating a new review */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-slate-800 p-6 rounded-lg shadow-2xl max-w-md w-full">
            <h3 className="text-xl font-bold mb-4 text-white">Write a Review</h3>
            <textarea
              className="w-full p-2 mb-4 border border-slate-700 rounded-md bg-slate-700 text-white"
              placeholder="Enter your review"
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
            />
            <label className="block mb-2 text-slate-300">Rating</label>
            <select
              className="w-full p-2 mb-4 border border-slate-700 rounded-md bg-slate-700 text-white"
              value={newReview.rating}
              onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
            >
              {[5, 4, 3, 2, 1].map((rating) => (
                <option key={rating} value={rating}>
                  {rating} ⭐
                </option>
              ))}
            </select>

            <div className="flex justify-end space-x-4">
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-lg hover:bg-blue-500"
                onClick={handleCreateReview}
              >
                Submit Review
              </button>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded-md shadow-lg hover:bg-red-500"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reviews;
