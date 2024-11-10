import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { logout } from '../../redux/features/authSlice';
import { toast } from 'sonner';
import { useGetUserBookingsQuery } from '../../redux/api/bookingApi';
import { Service } from '../../types/serviceTypes';
import { Slot } from '../../types/slotTypes'; // Import Slot if defined in a separate file

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

const Navbar = () => {
  const user = useAppSelector((store) => store.auth.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { data: myBookingData, isLoading: bookingsLoading } = useGetUserBookingsQuery();
  const [nextBooking, setNextBooking] = useState<Booking | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining | null>(null);

  // State for mobile menu toggle
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle function for mobile menu
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLoginLogout = () => {
    if (user) {
      dispatch(logout());
      toast.success('Logged out successfully');
    } else {
      navigate('/login', { state: { from: location.pathname } });
    }
  };

  // Helper function to get time remaining
  const getTimeRemaining = (endTime: Date): TimeRemaining => {
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
    if (!bookingsLoading && myBookingData && myBookingData.data) {
      const booking = getNextBooking(myBookingData.data);
      setNextBooking(booking);

      if (booking) {
        const bookingDateTime = new Date(`${booking.slot.date}T${booking.slot.startTime}`);

        setTimeRemaining(getTimeRemaining(bookingDateTime));

        const interval = setInterval(() => {
          const remaining = getTimeRemaining(bookingDateTime);
          if (remaining.total <= 0) {
            clearInterval(interval);
            setTimeRemaining(null);
            setNextBooking(null);
          } else {
            setTimeRemaining(remaining);
          }
        }, 1000);

        return () => clearInterval(interval);
      } else {
        setTimeRemaining(null);
      }
    }
  }, [bookingsLoading, myBookingData]);


  return (
    <div>
      <nav className="bg-gray-900 text-gray-100 font-semibold px-3 rounded-sm">
        <div className="container mx-auto flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="text-xl md:text-2xl font-bold text-white">
            Car Doctor
          </Link>

          {/* Center Navigation Items */}
          <div className="hidden md:flex flex-grow items-center justify-center space-x-5">
            <ul className="flex items-center space-x-5">
              <li>
                <Link className="hover:text-blue-400 p-1 inline-block transition-colors" to="/services">
                  Services
                </Link>
              </li>
              <li>
                <Link className="hover:text-blue-400 p-1 inline-block transition-colors" to="/about">
                  About
                </Link>
              </li>
              {user && user.role === 'admin' && (
                <li>
                  <Link className="hover:text-blue-400 p-1 inline-block transition-colors" to="/admin">
                    Dashboard
                  </Link>
                </li>
              )}
              {user && user.role === 'user' && (
                <li>
                  <Link className="hover:text-blue-400 p-1 inline-block transition-colors" to="/dashboard/current-bookings">
                    Dashboard
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* Right Side Buttons */}
          <div className="hidden md:flex items-center space-x-5">
            {nextBooking && timeRemaining && timeRemaining.total > 0 && (
              <div className="text-gray-100">
                Next booking in: {timeRemaining.days}d {timeRemaining.hours}h {timeRemaining.minutes}m {timeRemaining.seconds}s
              </div>
            )}
            <button
              onClick={handleLoginLogout}
              className="text-gray-100 hover:bg-blue-500 py-2 px-4 rounded-md transition duration-300"
            >
              <i className={`fi ${user ? 'fi-rr-sign-out-alt' : 'fi-rr-circle-user'}`}></i>{' '}
              {user ? 'Logout' : 'Login'}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={handleMenuToggle} className="text-white focus:outline-none" aria-label="Toggle Menu">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-800">
            <ul className="flex flex-col items-center space-y-5 mt-4 text-gray-100">
              <li>
                <Link className="hover:text-blue-400 p-1 inline-block transition-colors" to="/services">
                  Services
                </Link>
              </li>
              <li>
                <Link className="hover:text-blue-400 p-1 inline-block transition-colors" to="/about">
                  About
                </Link>
              </li>
              {user && user.role === 'admin' && (
                <li>
                  <Link className="hover:text-blue-400 p-1 inline-block transition-colors" to="/admin">
                    Dashboard
                  </Link>
                </li>
              )}
              {user && (
                <li>
                  <Link className="hover:text-blue-400 p-1 inline-block transition-colors" to="/dashboard/current-bookings">
                    My Dashboard
                  </Link>
                </li>
              )}
              {nextBooking && timeRemaining && timeRemaining.total > 0 && (
                <li className="text-gray-100">
                  Next booking in: {timeRemaining.days}d {timeRemaining.hours}h {timeRemaining.minutes}m {timeRemaining.seconds}s
                </li>
              )}
              <li>
                <button className="hover:bg-blue-500 py-2 px-4 rounded-md transition duration-300" onClick={handleLoginLogout}>
                  <i className={`fi ${user ? 'fi-rr-sign-out-alt' : 'fi-rr-circle-user'}`}></i>{' '}
                  {user ? 'Logout' : 'Login'}
                </button>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
