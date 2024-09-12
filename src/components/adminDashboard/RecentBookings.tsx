import React from 'react';
import { useGetAllBookingsQuery } from '../../redux/api/bookingApi';

const RecentBookings = () => {
  const { data: bookings } = useGetAllBookingsQuery();
console.log(bookings)
  if (!bookings || bookings.length === 0) {
    return <p>No bookings found.</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Recent Bookings</h2>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Customer Name</th>
            <th className="px-4 py-2 border">Service</th>
            <th className="px-4 py-2 border">Date</th>
            <th className="px-4 py-2 border">Start Time</th>
            <th className="px-4 py-2 border">End Time</th>
          </tr>
        </thead>
        <tbody>
          {bookings.data.map((booking) => (
            <tr key={booking._id}>
              <td className="px-4 py-2 border">{booking.customer.name}</td>
              <td className="px-4 py-2 border">{booking.service.name}</td>
              <td className="px-4 py-2 border">{booking.slot.date}</td>
              <td className="px-4 py-2 border">{booking.slot.startTime}</td>
              <td className="px-4 py-2 border">{booking.slot.endTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentBookings;
