import { useState, useEffect } from 'react';

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

const getTimeRemaining = (endTime: Date) => {
  const total = endTime.getTime() - Date.now();
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / (1000 * 60)) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return {
    total,
    days,
    hours,
    minutes,
    seconds,
  };
};

interface BookingCardProps {
  booking: Booking;
  showTimeRemaining?: boolean;
}

const BookingCard = ({ booking, showTimeRemaining = true }: BookingCardProps) => {
  const bookingDateTime = booking.slot
    ? new Date(`${booking.slot.date}T${booking.slot.startTime}`)
    : null;
  const [timeRemaining, setTimeRemaining] = useState(
    bookingDateTime ? getTimeRemaining(bookingDateTime) : null
  );

  useEffect(() => {
    if (bookingDateTime && showTimeRemaining) {
      const interval = setInterval(() => {
        setTimeRemaining(getTimeRemaining(bookingDateTime));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [bookingDateTime, showTimeRemaining]);

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden relative">
      {/* Paid Badge */}
      {booking.isPaid && (
        <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold py-1 px-2 rounded">
          Paid
        </span>
      )}
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
          <p className="text-gray-600 font-semibold">
            ${booking.service?.price.toFixed(2)}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Car:</span> {booking.vehicleBrand}{' '}
            {booking.vehicleModel}
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
            <span className="font-semibold">Time Slot:</span>{' '}
            {booking.slot.startTime} - {booking.slot.endTime}
          </p>
          {/* Conditionally display time remaining */}
          {showTimeRemaining && timeRemaining && timeRemaining.total > 0 ? (
            <p className="text-gray-700">
              <span className="font-semibold">Time Remaining:</span>{' '}
              {timeRemaining.days}d {timeRemaining.hours}h {timeRemaining.minutes}m{' '}
              {timeRemaining.seconds}s
            </p>
          ) : showTimeRemaining && timeRemaining ? (
            <p className="text-red-500 font-semibold">Slot time has passed</p>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default BookingCard;


