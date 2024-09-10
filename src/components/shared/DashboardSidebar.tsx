import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import CdForm from '../form/CdForm';

const DashboardSidebar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex min-h-screen">
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
                  dashboard
                </Link>
              </li>
              <li>
                <Link
                  className="check-state text-gray-500 hover:text-gray-900"
                  to="/dashboard/services"
                >
                  <i className="fi fi-rr-time-twenty-four p-2 m-2 text-xl text-gray-500"></i>
                  Service
                </Link>
              </li>
              <li>
                <Link
                  className="check-state text-gray-500 hover:text-gray-900"
                  to=""
                >
                  <i className="fi fi-rr-shopping-cart p-2 m-2 text-xl text-gray-500"></i>
                  Cart
                </Link>
              </li>
              {/* Add other links as needed */}
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

      {/* Main Content */}
      <div className="flex flex-col w-full md:w-5/6 ml-auto">
        {/* Fixed Search Form */}
        <div className="w-full bg-white p-3 fixed top-0 right-0 md:w-5/6 md:ml-1/6 z-10">
          <CdForm>
            <div className="flex items-center space-x-3">
              <i className="fi fi-rr-search text-gray-500"></i>
              <input
                type="text"
                placeholder="Search"
                className="w-full p-2 border-b-2 border-gray-300 focus:outline-none focus:border-gray-500"
              />
            </div>
          </CdForm>
          {/* Horizontal line */}
          <hr className="border-gray-300 mt-4 w-full" />
        </div>

        {/* Main Content Area */}
        <div className="pt-16 mt-10 bg-gray-300 px-10 py-5 flex-grow overflow-y-auto">
          <Outlet />
        </div>
      </div>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden fixed w-full z-50">
        <button
          className="p-2 w-full bg-gray-600 text-white"
          onClick={handleMenuToggle}
        >
          {isMenuOpen ? 'Close Menu' : 'Open Menu'}
        </button>
      </div>
    </div>
  );
};

export default DashboardSidebar;
