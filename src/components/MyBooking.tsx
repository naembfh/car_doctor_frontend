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
  slot?: { // Optional slot field
    date: string;
    startTime: string;
    endTime: string;
  };
  createdAt: string;
  isPaid: boolean;
}

const MyBooking = () => {
    let { data: myBooking, isLoading: bookingsLoading } = useGetUserBookingsQuery();
    myBooking = myBooking?.data || [];

    const currentUser = useSelector(selectCurrentUser);
    const [createCheckoutSession] = useCreateCheckoutSessionMutation();
    const [isLoading, setIsLoading] = useState(false);

    // State to toggle between current and past bookings
    const [showCurrentBookings, setShowCurrentBookings] = useState(true);

    const calculateTimeLeft = (serviceDate: string): string => {
        const now = new Date();
        const serviceDateTime = new Date(serviceDate);
        const timeDifference = serviceDateTime.getTime() - now.getTime();
        const daysLeft = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

        return daysLeft > 0 ? `${daysLeft} days left` : 'Date has passed';
    };

    // Filter Current Bookings: isPaid === false and date >= today
    const filterCurrentBookings = () => {
        const now = new Date();
        return myBooking.filter((booking: Booking) => booking.slot && !booking.isPaid && new Date(booking.slot.date) >= now);
    };

    // Filter Past Bookings: isPaid === true
    const filterPastBookings = () => {
        return myBooking.filter((booking: Booking) => booking.isPaid);
    };

    

    const handleCheckout = async () => {
        setIsLoading(true);
        const stripe = await stripePromise;
    
        // Check if Stripe is available
        if (!stripe) {
            console.error('Stripe failed to load');
            setIsLoading(false);
            return;
        }
    
        // Filter only unpaid bookings with a future date
        const unpaidFutureBookings = myBooking.filter((booking: Booking) => {
            const now = new Date();
            const serviceDate = booking.slot ? new Date(booking.slot.date) : now;
            return !booking.isPaid && serviceDate >= now; 
        });
    
        if (unpaidFutureBookings.length === 0) {
            alert('No unpaid future bookings to checkout.');
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
                bookings: unpaidFutureBookings,
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

    const displayedBookings = showCurrentBookings ? filterCurrentBookings() : filterPastBookings();
console.log(displayedBookings)
    return (
        <div className="p-4">
            {/* Toggle Buttons for Current and Past Bookings */}
            <div className="mb-4 flex justify-center space-x-4">
                <button
                    className={`px-4 py-2 ${showCurrentBookings ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => setShowCurrentBookings(true)}
                >
                    Current Bookings
                </button>
                <button
                    className={`px-4 py-2 ${!showCurrentBookings ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => setShowCurrentBookings(false)}
                >
                    Paid Bookings
                </button>
            </div>

            {/* Display Bookings */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4">
                {/* Bookings List */}
                <div className="col-span-1 lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-y-auto max-h-full">
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
                                            <span className="font-semibold">Service Date:</span> {new Date(booking?.slot?.date).toLocaleDateString()}
                                        </p>
                                        <p className="text-gray-700">
                                            <span className="font-semibold">Time Slot:</span> {booking.slot.startTime} - {booking.slot.endTime}
                                        </p>
                                    </div>
                                )}
                                
                                {/* Only show 'days left' for unpaid bookings */}
                                {!booking.isPaid && booking.slot && (
                                    <div className="px-4 py-2">
                                        <p className="text-red-500 font-semibold">
                                            {calculateTimeLeft(booking.slot.date)}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">No bookings available.</p>
                    )}
                </div>

                {/* Checkout and User Details for Current Bookings */}
                {showCurrentBookings && (
                    <div className="col-span-1 flex justify-center items-center">
                        <div className="bg-white shadow-lg rounded-lg p-6 w-full">
                            {currentUser ? (
                                <div className="text-center">
                                    <h2 className="font-bold text-xl mb-2">{currentUser.name}</h2>
                                    <p className="text-gray-700">Email: {currentUser.email}</p>
                                    <p className="text-gray-700">Address: {currentUser.address || 'N/A'}</p>

                                    <button
                                        className={`mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        onClick={handleCheckout}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? 'Processing...' : 'Proceed to Checkout'}
                                    </button>
                                </div>
                            ) : (
                                <p className="text-gray-700">Please log in to see your details.</p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyBooking;
