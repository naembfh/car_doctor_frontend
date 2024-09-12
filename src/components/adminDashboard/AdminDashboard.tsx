import React, { useState } from 'react';
import RecentBookings from './RecentBookings'; 
import UserManagement from './UserManagement'; 
import SlotManagement from './SlotManagement'; 
import ServiceManagement from './ServiceManagement'; 

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('recentBookings'); 

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

            {/* Tabs */}
            <div className="flex space-x-4 mb-4">
                <button 
                    className={`px-4 py-2 ${activeTab === 'recentBookings' ? 'bg-gray-600 text-white' : 'bg-gray-200'}`} 
                    onClick={() => setActiveTab('recentBookings')}
                >
                    Recent Bookings
                </button>
                <button 
                    className={`px-4 py-2 ${activeTab === 'userManagement' ? 'bg-gray-600 text-white' : 'bg-gray-200'}`} 
                    onClick={() => setActiveTab('userManagement')}
                >
                    User Management
                </button>
                <button 
                    className={`px-4 py-2 ${activeTab === 'slotManagement' ? 'bg-gray-600 text-white' : 'bg-gray-200'}`} 
                    onClick={() => setActiveTab('slotManagement')}
                >
                    Slot Management
                </button>
                <button 
                    className={`px-4 py-2 ${activeTab === 'serviceManagement' ? 'bg-gray-600 text-white' : 'bg-gray-200'}`} 
                    onClick={() => setActiveTab('serviceManagement')}
                >
                    Service Management
                </button>
            </div>

            {/* Content */}
            {activeTab === 'recentBookings' && <RecentBookings />}
            {activeTab === 'userManagement' && <UserManagement />}
            {activeTab === 'slotManagement' && <SlotManagement />}
            {activeTab === 'serviceManagement' && <ServiceManagement />}
        </div>
    );
};

export default AdminDashboard;
