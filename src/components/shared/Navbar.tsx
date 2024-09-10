import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  // Placeholder for cart and user state
  const cartItems = []; // Placeholder for cart items
  const user = null; // Placeholder for user info

  // State for mobile menu toggle
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle function for mobile menu
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-900 text-white rounded-sm px-3">
      <div className="container mx-auto flex items-center justify-between py-4">
        {/* Logo */}
        <div className="flex items-center">
        <Link to="/home" className="flex items-center">
          <span>Car Doctor</span>
        </Link>
        </div>

        {/* Center Navigation Items */}
        <div className="hidden md:flex flex-grow items-center justify-center space-x-5">
          <ul className="flex items-center space-x-5">
            <li>
              <span className="rounded-lg backdrop-blur-[2px] p-1 inline-block">
                Products
              </span>
            </li>
            <li>
              <span className="rounded-lg backdrop-blur-[2px] p-1 inline-block">
                About
              </span>
            </li>
            {user && user.role === "admin" && (
              <li>
                <span className="rounded-lg backdrop-blur-[2px] p-1 inline-block">
                  Management
                </span>
              </li>
            )}
            {user && (
              <li>
                <span className="rounded-lg backdrop-blur-[2px] p-1 inline-block">
                  My Orders
                </span>
              </li>
            )}
          </ul>
        </div>

        {/* Right Side Buttons */}
        <div className="hidden md:flex items-center space-x-5">
          <button className="rounded-lg p-1 inline-block relative">
            <i className="fi fi-rr-dolly-flatbed"></i>
            <span className="rounded-full absolute top-[-10px] left-[20px] bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center">
              {cartItems.length}
            </span>
          </button>

          <button className="rounded-lg p-1 inline-block">
            <i
              className={`fi ${user ? "fi fi-rr-sign-out-alt" : "fi-rr-circle-user"}`}
            ></i>
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
                {cartItems.length}
              </span>
            </li>
            <li>
              <button className="rounded-lg p-1 inline-block">
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
