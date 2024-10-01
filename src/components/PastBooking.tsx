import { useGetUserBookingsQuery } from '../redux/api/bookingApi';
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

    return myBooking?.data.filter((booking: Booking) => {
      const slotDate = booking.slot ? new Date(booking.slot.date) : null; 
      return booking.isPaid || (slotDate && slotDate < now);
    }) || [];
  };

  if (bookingsLoading) return <p>Loading bookings...</p>;

  const displayedBookings = filterPastBookings();

  return (
    <div className="p-4">
      <h1 className="text-2xl text-gray-100 font-bold mb-6">Past Bookings</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {displayedBookings.length > 0 ? (
          displayedBookings.map((booking: Booking) => (
            <div key={booking._id} className="bg-white shadow-lg rounded-lg p-4 relative">
              {/* Paid Badge */}
              {booking.isPaid && (
                <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold py-1 px-2 rounded">
                  Paid
                </span>
              )}
              <h2 className="font-bold text-lg">{booking.service.name}</h2>
              <p>${booking.service.price}</p>
              <p>{booking.vehicleBrand} {booking.vehicleModel}</p>
              {/* Check if booking.slot exists before accessing date */}
              {booking.slot && (
                <p>Service Date: {new Date(booking.slot.date).toLocaleDateString()}</p>
              )}
            </div>
          ))
        ) : (
          <p>No past bookings available.</p>
        )}
      </div>
    </div>
  );
};

export default PastBooking;
