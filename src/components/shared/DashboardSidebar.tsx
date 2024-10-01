import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { selectCurrentUser, logout } from '../../redux/features/authSlice';
import { FaBars, FaTimes } from 'react-icons/fa'; 

const DashboardSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const user = useSelector(selectCurrentUser, (prev, next) => prev === next);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle logout action
  const handleLogout = () => {
    dispatch(logout()); 
    localStorage.removeItem('token'); 
    navigate('/login');
  };

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
  <li>
    <Link
      className="font-semibold hover:text-blue-400 transition-colors"
      to="/dashboard/current-bookings"
    >
      <i className="fi fi-rr-shopping-cart p-2 m-2 text-xl"></i>
      Current Booking
    </Link>
  </li>
)}
{(user?.role === 'user' || user?.role === 'admin') && (
  <li>
    <Link
      className="font-semibold hover:text-blue-400 transition-colors"
      to="/dashboard/past-bookings"
    >
      <i className="fi fi-rr-shopping-cart p-2 m-2 text-xl"></i>
      Past Booking
    </Link>
  </li>
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
              <i className={`fi ${user ? 'fi-rr-sign-out-alt' : 'fi-rr-circle-user'}`}></i>{" "}
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
