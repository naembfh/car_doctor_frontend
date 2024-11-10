import { useNavigate } from 'react-router-dom';
import { useGetAllReviewsQuery } from '../redux/api/reviewApi';
import { FaStar } from 'react-icons/fa';

const HomeReviews = () => {
  const { data: reviews = [], isLoading, isError } = useGetAllReviewsQuery();
  const navigate = useNavigate();

  // Sort reviews by createdAt in descending order
  const sortedReviews = [...reviews].sort((a, b) =>
    new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime()
  );

  // Show the last two reviews
  const reviewsToShow = sortedReviews.slice(0, 2);

  const renderStars = (rating:number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar
          key={i}
          className={`text-xl ${
            i <= rating ? 'text-yellow-500' : 'text-gray-400'
          }`}
        />
      );
    }
    return <div className="flex">{stars}</div>;
  };

  if (isLoading) return <p>Loading reviews...</p>;
  if (isError) return <p>Error loading reviews. Please try again later.</p>;

  return (
    <div className="p-6 bg-gradient-to-b from-slate-800 via-slate-900 to-black text-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center">Customer Reviews</h2>

      <div className="grid gap-8 sm:grid-cols-2">
        {reviewsToShow.length > 0 ? (
          reviewsToShow.map((review) => (
            <div
              key={review._id}
              className="bg-slate-700 p-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300"
            >
              <p className="italic mb-4">"{review.comment}"</p>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-yellow-500">Rating:</span>
                {renderStars(review.rating)}
              </div>
              <p className="text-sm text-slate-400 mt-3">
                By {review.user?.username ?? 'Anonymous'} on{' '}
                {new Date(review.createdAt ?? 0).toLocaleDateString()}
              </p>
            </div>
          ))
        ) : (
          <p>No reviews available</p>
        )}
      </div>

      {sortedReviews.length >= 2 && (
        <div className="text-center mt-6">
          <button
            onClick={() => navigate('/reviews')}
            className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-lg hover:bg-blue-500 transition duration-300"
          >
            See All Reviews
          </button>
        </div>
      )}
    </div>
  );
};

export default HomeReviews;
