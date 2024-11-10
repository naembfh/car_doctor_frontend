import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { selectCurrentUser, logout } from '../../redux/features/authSlice';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useGetUserBookingsQuery } from '../../redux/api/bookingApi';
import { Slot } from '../../types/slotTypes'; // Import Slot if defined in a separate file
import { Service } from '../../types/serviceTypes';

export interface Booking {
  _id: string;
  serviceId: Service | string;
  slotId: string;
  slot: Slot; // Ensure this is included
  vehicleType: string;
  vehicleBrand: string;
  vehicleModel: string;
  manufacturingYear: string;
  registrationPlate: string;
}

interface TimeRemaining {
  total: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const DashboardSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser, (prev, next) => prev === next);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: myBookingData, isLoading: bookingsLoading } = useGetUserBookingsQuery();
  const [nextBooking, setNextBooking] = useState<Booking | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining | null>(null);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Helper function to calculate time remaining
  const getTimeRemaining = (endTime: Date): TimeRemaining => {
    const total = endTime.getTime() - Date.now();
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / (1000 * 60)) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));

    return { total, days, hours, minutes, seconds };
  };

  // Helper function to get the next booking
  const getNextBooking = (bookings: Booking[]): Booking | null => {
    const now = new Date();

    const upcomingBookings = bookings
      .filter((booking) => {
        if (!booking.slot) return false;
        const bookingDateTime = new Date(`${booking.slot.date}T${booking.slot.startTime}`);
        return bookingDateTime > now;
      })
      .sort((a, b) => {
        const aDateTime = new Date(`${a.slot.date}T${a.slot.startTime}`).getTime();
        const bDateTime = new Date(`${b.slot.date}T${b.slot.startTime}`).getTime();
        return aDateTime - bDateTime;
      });

    return upcomingBookings[0] || null;
  };

  useEffect(() => {
    if (!bookingsLoading && myBookingData?.data?.length) {
      const booking = getNextBooking(myBookingData.data);
      setNextBooking(booking);

      if (booking) {
        const bookingDateTime = new Date(`${booking.slot.date}T${booking.slot.startTime}`);

        setTimeRemaining(getTimeRemaining(bookingDateTime));

        const interval = setInterval(() => {
          const remaining = getTimeRemaining(bookingDateTime);
          if (remaining.total <= 0) {
            clearInterval(interval);
          }
          setTimeRemaining(remaining);
        }, 1000);

        return () => clearInterval(interval);
      }
    }
  }, [bookingsLoading, myBookingData]);

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`${
          isMenuOpen ? 'block' : 'hidden'
        } md:block md:w-1/6 bg-gray-900 text-white fixed top-0 left-0 h-screen z-30 transition-transform duration-300`}
      >
        <div className="flex flex-col h-full justify-between">
          {/* Logo */}
          <div className="text-2xl m-5 p-2 font-bold text-center">
            <Link to="/">Car Doctor</Link>
          </div>

          {/* Countdown Timer */}
          {nextBooking && timeRemaining && timeRemaining.total > 0 && (
            <div className="text-center text-white mb-4">
              Next booking in:
              <div className="text-lg font-semibold">
                {timeRemaining.days}d {timeRemaining.hours}h {timeRemaining.minutes}m {timeRemaining.seconds}s
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="mt-10 flex-grow">
            <ul className="ml-4 space-y-8">
              {user?.role === 'admin' && (
                <li>
                  <Link
                    className="font-semibold hover:text-blue-400 transition-colors"
                    to="/admin"
                  >
                    <i className="fi fi-rr-settings p-2 m-2 text-xl"></i>
                    Management
                  </Link>
                </li>
              )}

              {(user?.role === 'user' || user?.role === 'admin') && (
                <>
                  <li>
                    <Link
                      className="font-semibold hover:text-blue-400 transition-colors"
                      to="/dashboard/current-bookings"
                    >
                      <i className="fi fi-rr-shopping-cart p-2 m-2 text-xl"></i>
                      Current Booking
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="font-semibold hover:text-blue-400 transition-colors"
                      to="/dashboard/paid-bookings"
                    >
                      <i className="fi fi-rr-shopping-cart p-2 m-2 text-xl"></i>
                      Paid Booking
                    </Link>
                  </li>
                </>
              )}

              <li>
                <Link
                  className="font-semibold hover:text-blue-400 transition-colors"
                  to="/services"
                >
                  <i className="fi fi-rr-settings p-2 m-2 text-xl"></i>
                  Services
                </Link>
              </li>

              <li>
                <Link
                  className="font-semibold hover:text-blue-400 transition-colors"
                  to="/profile"
                >
                  <i className="fi fi-rr-settings p-2 m-2 text-xl"></i>
                  Profile
                </Link>
              </li>
            </ul>
          </nav>

          {/* User Section with Logout Button */}
          <div className="flex flex-col items-center justify-center text-white mb-10 w-full">
            <button
              onClick={handleLogout}
              className="bg-blue-500 text-white hover:bg-blue-600 py-2 px-4 rounded-md transition duration-300"
            >
              <i className={`fi ${user ? 'fi-rr-sign-out-alt' : 'fi-rr-circle-user'}`}></i>{' '}
              {user ? 'Logout' : 'Login'}
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden fixed w-full z-50 p-4 bg-gray-900 text-white">
        <button onClick={handleMenuToggle}>
          {isMenuOpen ? (
            <FaTimes className="text-2xl" />
          ) : (
            <FaBars className="text-2xl" />
          )}
        </button>
      </div>
    </>
  );
};

export default DashboardSidebar;

