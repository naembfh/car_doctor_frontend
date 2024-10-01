import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom"; 
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { logout } from "../../redux/features/authSlice";
import { toast } from "sonner"; 

const Navbar = () => {
  const user = useAppSelector((store) => store.auth.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate(); 
  const location = useLocation();

  // State for mobile menu toggle
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle function for mobile menu
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLoginLogout = () => {
    if (user) {
      dispatch(logout());
      toast.success("Logged out successfully");
    } else {
      // Navigate to login page and pass the current location for redirect after login
      navigate("/login", { state: { from: location.pathname } });
    }
  };

  return (
    <div>
      <nav className="bg-gray-900 text-gray-100 font-semibold px-3 rounded-sm">
        <div className="container mx-auto flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-xl md:text-2xl font-bold text-white">Car Doctor</span>
            </Link>
          </div>

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
              {user && user.role === "admin" && (
                <li>
                  <Link className="hover:text-blue-400 p-1 inline-block transition-colors" to="/admin">
                    Dashboard
                  </Link>
                </li>
              )}
              {user && user.role === "user" && (
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
            <button
              onClick={handleLoginLogout}
              className="text-gray-100 hover:bg-blue-500 py-2 px-4 rounded-md transition duration-300"
            >
              <i className={`fi ${user ? "fi-rr-sign-out-alt" : "fi-rr-circle-user"}`}></i>{" "}
              {user ? "Logout" : "Login"}
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
              {user && user.role === "admin" && (
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
              <li>
                <button className="hover:bg-blue-500 py-2 px-4 rounded-md transition duration-300" onClick={handleLoginLogout}>
                  <i className={`fi ${user ? "fi-rr-sign-out-alt" : "fi-rr-circle-user"}`}></i>{" "}
                  {user ? "Logout" : "Login"}
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
