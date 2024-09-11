import React from 'react';
import DashboardSidebar from '../shared/DashboardSidebar';
import CdForm from '../form/CdForm';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
    return (
        <div className="flex min-h-screen">
            <DashboardSidebar></DashboardSidebar>
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
        </div>
    );
};

export default DashboardLayout;