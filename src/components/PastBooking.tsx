import { useGetUserBookingsQuery } from '../redux/api/bookingApi';
import BookingCard from './BookingCard';

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

const PastBooking = () => {
  const { data: myBooking, isLoading: bookingsLoading } = useGetUserBookingsQuery();

  const filterPastBookings = () => {
    const now = new Date();

    return (
      myBooking?.data.filter((booking: Booking) => {
        const slotEndDateTime = booking.slot
          ? new Date(`${booking.slot.date}T${booking.slot.endTime}`)
          : null;
        // Include bookings that are paid, regardless of time, and unpaid bookings whose slot time has passed
        return booking.isPaid || (slotEndDateTime && slotEndDateTime < now);
      }) || []
    );
  };

  if (bookingsLoading) return <p>Loading bookings...</p>;

  const displayedBookings = filterPastBookings();

  return (
    <div className="p-4">
      <h1 className="text-2xl text-gray-100 font-bold mb-6">Past Bookings</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {displayedBookings.length > 0 ? (
          displayedBookings.map((booking: Booking) => (
            <BookingCard
              key={booking._id}
              booking={booking}
              showTimeRemaining={true} // Show time remaining
            />
          ))
        ) : (
          <p className="text-gray-100">No past bookings available.</p>
        )}
      </div>
    </div>
  );
};

export default PastBooking;


