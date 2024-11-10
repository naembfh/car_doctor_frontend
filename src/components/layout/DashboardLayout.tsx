import React from 'react';
import DashboardSidebar from '../shared/DashboardSidebar';
import { Outlet } from 'react-router-dom';
import defaultAvatar from '../../assets/images/765-default-avatar.png';
import { selectCurrentUser } from '../../redux/features/authSlice';
import { useSelector } from 'react-redux';
import ScrollToTop from '../ScrollToTop';


interface DashboardLayoutProps {
  children?: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const currentUser = useSelector(selectCurrentUser);
  return (
    <div className="flex min-h-screen bg-gray-100">
      <DashboardSidebar />

      {/* Main Content */}
      <div className="relative flex flex-col w-full md:w-5/6 ml-auto bg-white">
        {/* Fixed Search Form */}
        <div className="w-full p-4 fixed top-0 right-0 md:w-5/6 md:ml-1/6 z-10 bg-gray-900 flex justify-between items-center border-b border-gray-300">
          {children || (
            <div className="flex items-center space-x-3 w-full max-w-md">
              <i className="fi fi-rr-search text-slate-300"></i>
              <input
                type="text"
                placeholder="Search"
                className="w-full p-2 bg-transparent  focus:outline-none focus:border-gray-500 placeholder:text-slate-500"
              />
            </div>
          )}
          {/* Right Corner Top Image */}
          <div className="absolute top-0 right-0 mr-4">
            <img
               src={currentUser?.img || defaultAvatar}
              alt="Top Right"
              className="w-14 h-14 rounded-full shadow-lg"
            />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="pt-20 px-2 py-5 flex-grow bg-gray-50 overflow-y-auto md:px-10">
          <div className="bg-gray-900 md:p-6 shadow-md rounded-lg">
            <Outlet />
            <ScrollToTop></ScrollToTop>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
