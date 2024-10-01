import { useGetUserBookingsQuery, useCreateCheckoutSessionMutation } from '../redux/api/bookingApi';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../redux/features/authSlice';
import { loadStripe } from '@stripe/stripe-js';
import { useState } from 'react';

const stripePromise = loadStripe("pk_test_51L0YqPIFPHmtypU8Dw9vs6Mt8mOttFAvCqhuo6VEUzNXq9hUe6NQDT5NF5hCrJtg40phCRLRaMDZG4tTHJGsyUWs00QTV58MlD");

interface Booking {
  _id: string;
  service: {
    price: number;
    name: string;
    img: string;
  };
  vehicleBrand: string;
  vehicleModel: string;
  registrationPlate: string;
  slot?: {
    date: string;
    startTime: string;
    endTime: string;
  };
  createdAt: string;
  isPaid: boolean;
}

const CurrentBooking = () => {
  const { data: myBookingData, isLoading: bookingsLoading } = useGetUserBookingsQuery();
  const currentUser = useSelector(selectCurrentUser);
  const [createCheckoutSession] = useCreateCheckoutSessionMutation();
  const [isLoading, setIsLoading] = useState(false);

  const filterCurrentBookings = () => {
    const now = new Date();

    return (
      myBookingData?.data.filter((booking: Booking) => {
        if (!booking.slot) return false;

        const slotDate = new Date(booking.slot.date);
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const bookingDate = new Date(slotDate.getFullYear(), slotDate.getMonth(), slotDate.getDate());

        return !booking.isPaid && bookingDate >= today;
      }) || []
    );
  };

  const handleCheckout = async () => {
    setIsLoading(true);
    const stripe = await stripePromise;

    if (!stripe) {
      console.error('Stripe failed to load');
      setIsLoading(false);
      return;
    }

    const unpaidCurrentBookings = filterCurrentBookings();

    if (unpaidCurrentBookings.length === 0) {
      alert('No unpaid current bookings to checkout.');
      setIsLoading(false);
      return;
    }

    try {
      if (!currentUser) {
        alert('User is not logged in');
        setIsLoading(false);
        return;
      }

      const { sessionId } = await createCheckoutSession({
        bookings: unpaidCurrentBookings,
        customerEmail: currentUser.email,
      }).unwrap();

      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        console.error('Stripe error:', error.message);
      }
    } catch (error) {
      console.error('Checkout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (bookingsLoading) return <p>Loading bookings...</p>;

  const displayedBookings = filterCurrentBookings();

  return (
    <div className="p-4">
      <h1 className="text-2xl text-gray-100 font-bold mb-6">Current Bookings</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Bookings List */}
        <div className="col-span-1 lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {displayedBookings.length > 0 ? (
            displayedBookings.map((booking: Booking) => (
              <div key={booking._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="flex flex-col sm:flex-row">
                  <div className="w-full sm:w-1/3 flex justify-center items-center p-4">
                    <img
                      src={booking.service?.img}
                      alt="Service"
                      className="w-20 h-20 object-cover rounded-md"
                    />
                  </div>
                  <div className="p-4 w-full sm:w-2/3">
                    <h2 className="font-bold text-lg">{booking.service?.name}</h2>
                    <p className="text-gray-600 font-semibold">${booking.service?.price.toFixed(2)}</p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Car:</span> {booking.vehicleBrand} {booking.vehicleModel}
                    </p>
                    <p className="text-gray-600">Plate: {booking.registrationPlate}</p>
                  </div>
                </div>
                {booking.slot && (
                  <div className="px-4 py-2">
                    <p className="text-gray-700">
                      <span className="font-semibold">Service Date:</span>{' '}
                      {new Date(booking.slot.date).toLocaleDateString()}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold">Time Slot:</span> {booking.slot.startTime} - {booking.slot.endTime}
                    </p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-100">No current bookings available.</p>
          )}
        </div>

        {/* Checkout and User Details */}
        {displayedBookings.length > 0 && (
          <div className="col-span-1 flex justify-center items-center">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full">
              {currentUser ? (
                <div className="text-center">
                  <h2 className="font-bold text-xl mb-2">{currentUser.name}</h2>
                  <p className="text-gray-700">Email: {currentUser.email}</p>
                  <p className="text-gray-700">Address: {currentUser.address || 'N/A'}</p>

                  <button
                    className={`mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg ${
                      isLoading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    onClick={handleCheckout}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Processing...' : 'Proceed to Checkout'}
                  </button>
                </div>
              ) : (
                <p className="text-gray-100">Please log in to see your details.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrentBooking;
