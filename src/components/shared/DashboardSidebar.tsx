import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectCurrentUser } from '../../redux/features/authSlice';

const DashboardSidebar = () => {
  const user = useSelector(selectCurrentUser, (prev, next) => prev === next);
  console.log(user);
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`${
          isMenuOpen ? 'block' : 'hidden'
        } md:block md:w-1/6 bg-white fixed top-0 left-0 h-screen z-30`}
      >
        <div className="flex flex-col h-full justify-between">
          {/* Logo */}
          <div className="bg-gray-50 rounded-2xl m-5 p-2">
            <Link to="/">Car Doctor</Link>
          </div>

          {/* Navigation */}
          <nav className="mt-20 flex-grow">
            <ul className="ml-4 space-y-8">
              <li>
                <Link
                  className="check-state text-gray-500 hover:text-gray-900"
                  to="/dashboard"
                >
                  <i className="fi fi-rr-time-twenty-four p-2 m-2 text-xl text-gray-500"></i>
                  Dashboard
                </Link>
              </li>
              
              {/* Show the 'Management' link only if the user is an admin */}
              {user.role === 'admin' && (
                <>
                  <li>
                    <Link
                      className="check-state text-gray-500 hover:text-gray-900"
                      to="/management"
                    >
                      <i className="fi fi-rr-settings p-2 m-2 text-xl text-gray-500"></i>
                      Management
                    </Link>
                  </li>
                </>
              )}

              {/* Show the 'My Booking' link for regular users */}
              {user.role === 'user' && (
                <li>
                  <Link
                    className="check-state text-gray-500 hover:text-gray-900"
                    to="/booking"
                  >
                    <i className="fi fi-rr-shopping-cart p-2 m-2 text-xl text-gray-500"></i>
                    My Booking
                  </Link>
                </li>
              )}

              <li>
                <Link
                  className="check-state text-gray-500 hover:text-gray-900"
                  to="/services"
                >
                  <i className="fi fi-rr-settings p-2 m-2 text-xl text-gray-500"></i>
                  Services
                </Link>
              </li>
            </ul>
          </nav>

          {/* User Section */}
          <div className="flex flex-col items-center justify-center text-gray-50 mb-10 w-full">
            <button className="flex items-center justify-center w-40 h-10 bg-gray-600 border-2 border-gray-50 rounded-2xl py-2">
              <Link to="/account_logout">
                <i className="fi fi-br-power p-2 text-base"></i>
                <span>Logout</span>
              </Link>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden fixed w-full z-50">
        <button
          className="p-2 w-full bg-gray-600 text-white"
          onClick={handleMenuToggle}
        >
          {isMenuOpen ? 'Close Menu' : 'Open Menu'}
        </button>
      </div>
    </>
  );
};

export default DashboardSidebar;
