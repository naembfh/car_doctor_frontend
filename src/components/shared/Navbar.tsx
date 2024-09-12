import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom"; // Import useNavigate and useLocation
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { logout } from "../../redux/features/authSlice";
import { toast } from "sonner";
// For displaying success messages

const Navbar = () => {
  const user = useAppSelector((store) => store.auth.user); // Access user directly from state
  const dispatch = useAppDispatch();
  const navigate = useNavigate(); // Initialize navigate
  const location = useLocation(); // To get the current location

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
    <nav className="bg-gray-100 text-gray-900 rounded-sm px-3">
      <div className="container mx-auto flex items-center justify-between py-4">
        {/* Logo */}
        <div className="flex items-center ">
          <Link to="/home" className="flex items-center">
            <span>Car Doctor</span>
          </Link>
        </div>

        {/* Center Navigation Items */}
        <div className="hidden md:flex flex-grow items-center justify-center space-x-5">
          <ul className="flex items-center space-x-5">
            <li>
              <Link
                className="rounded-lg backdrop-blur-[2px] p-1 inline-block"
                to={"/services"}
              >
                Services
              </Link>
            </li>
            <li>
              <span className="rounded-lg backdrop-blur-[2px] p-1 inline-block">
                About
              </span>
            </li>
          </ul>
        </div>

        {/* Right Side Buttons */}
        <div className="hidden md:flex items-center space-x-5">
          <button onClick={handleLoginLogout} className="rounded-lg p-1 inline-block">
            <i
              className={`fi ${user ? "fi fi-rr-sign-out-alt" : "fi-rr-circle-user"}`}
            ></i> {user ? "Logout" : "Login"}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={handleMenuToggle}
            className="text-white focus:outline-none"
            aria-label="Toggle Menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <ul className="flex flex-col items-center space-y-5 mt-4">
            <li>
              <span className="rounded-lg p-1 inline-block">Products</span>
            </li>
            <li>
              <span className="rounded-lg p-1 inline-block">About</span>
            </li>
            {user && user.role === "admin" && (
              <li>
                <span className="rounded-lg p-1 inline-block">Management</span>
              </li>
            )}
            {user && (
              <li>
                <span className="rounded-lg p-1 inline-block">My Orders</span>
              </li>
            )}
            <li className="relative">
              <button className="rounded-lg p-1 inline-block">
                <i className="fi fi-rr-dolly-flatbed"></i>
              </button>
              <span className="rounded-full absolute top-[-10px] left-[20px] bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center">
                0 {/* Replace with cartItems.length */}
              </span>
            </li>
            <li>
              <button className="rounded-lg p-1 inline-block" onClick={handleLoginLogout}>
                <i
                  className={`fi ${user ? "fi fi-rr-sign-out-alt" : "fi-rr-circle-user"}`}
                ></i>
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
