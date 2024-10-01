import { useState } from 'react';
import { useGetAllBookingsQuery } from '../../redux/api/bookingApi';

const RecentBookings = () => {
  const { data: bookings } = useGetAllBookingsQuery();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  if (!bookings || bookings.length === 0) {
    return <p className="text-white">No bookings found.</p>;
  }

  const indexOfLastBooking = currentPage * itemsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - itemsPerPage;
  const currentBookings = bookings.data.slice(indexOfFirstBooking, indexOfLastBooking);
  const totalPages = Math.ceil(bookings.data.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-white mb-4">Recent Bookings</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border-2 border-gray-700 rounded-md bg-gray-800">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-4 py-2 border-2 border-gray-700 font-semibold text-white">Customer Name</th>
              <th className="px-4 py-2 border-2 border-gray-700 font-semibold text-white">Service</th>
              <th className="px-4 py-2 border-2 border-gray-700 font-semibold text-white">Date</th>
              <th className="px-4 py-2 border-2 border-gray-700 font-semibold text-white">Start Time</th>
              <th className="px-4 py-2 border-2 border-gray-700 font-semibold text-white">End Time</th>
            </tr>
          </thead>
          <tbody>
            {currentBookings.map((booking: { _id: string; customer: { name: string }; service: { name: string }; slot: { date: string; startTime: string; endTime: string } }) => (
              <tr key={booking._id} className="hover:bg-gray-700">
                <td className="px-4 py-2 border-2 border-gray-700 text-white">{booking.customer?.name}</td>
                <td className="px-4 py-2 border-2 border-gray-700 text-white">{booking.service.name}</td>
                <td className="px-4 py-2 border-2 border-gray-700 text-white">{booking.slot.date}</td>
                <td className="px-4 py-2 border-2 border-gray-700 text-white">{booking.slot.startTime}</td>
                <td className="px-4 py-2 border-2 border-gray-700 text-white">{booking.slot.endTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-center space-x-2">
        <button
          className={`px-4 py-2 border-2 border-gray-700 rounded-md ${currentPage === 1 ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-500'}`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
          <button
            key={number}
            className={`px-4 py-2 border-2 border-gray-700 rounded-md ${number === currentPage ? 'bg-blue-600 text-white' : 'bg-gray-700 text-white hover:bg-gray-600'}`}
            onClick={() => handlePageChange(number)}
          >
            {number}
          </button>
        ))}
        <button
          className={`px-4 py-2 border-2 border-gray-700 rounded-md ${currentPage === totalPages ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-500'}`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default RecentBookings;
