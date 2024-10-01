import  { useState } from 'react';
import RecentBookings from './RecentBookings'; 
import UserManagement from './UserManagement'; 
import SlotManagement from './SlotManagement'; 
import ServiceManagement from './ServiceManagement'; 

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('recentBookings'); 

    return (
        <div className="container mx-auto p-4 bg-gray-900 text-gray-100 min-h-screen rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-gray-100 mb-6 text-center">Admin Dashboard</h1>

            {/* Tabs */}
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mb-6">
                <button 
                    className={`px-4 py-2 font-semibold rounded-md transition duration-300 ${activeTab === 'recentBookings' ? 'bg-blue-600 text-white' : 'bg-gray-700 hover:bg-gray-600 text-gray-300'}`} 
                    onClick={() => setActiveTab('recentBookings')}
                >
                    Recent Bookings
                </button>
                <button 
                    className={`px-4 py-2 font-semibold rounded-md transition duration-300 ${activeTab === 'userManagement' ? 'bg-blue-600 text-white' : 'bg-gray-700 hover:bg-gray-600 text-gray-300'}`} 
                    onClick={() => setActiveTab('userManagement')}
                >
                    User Management
                </button>
                <button 
                    className={`px-4 py-2 font-semibold rounded-md transition duration-300 ${activeTab === 'slotManagement' ? 'bg-blue-600 text-white' : 'bg-gray-700 hover:bg-gray-600 text-gray-300'}`} 
                    onClick={() => setActiveTab('slotManagement')}
                >
                    Slot Management
                </button>
                <button 
                    className={`px-4 py-2 font-semibold rounded-md transition duration-300 ${activeTab === 'serviceManagement' ? 'bg-blue-600 text-white' : 'bg-gray-700 hover:bg-gray-600 text-gray-300'}`} 
                    onClick={() => setActiveTab('serviceManagement')}
                >
                    Service Management
                </button>
            </div>

            {/* Content */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                {activeTab === 'recentBookings' && <RecentBookings />}
                {activeTab === 'userManagement' && <UserManagement />}
                {activeTab === 'slotManagement' && <SlotManagement />}
                {activeTab === 'serviceManagement' && <ServiceManagement />}
            </div>
        </div>
    );
};

export default AdminDashboard;
