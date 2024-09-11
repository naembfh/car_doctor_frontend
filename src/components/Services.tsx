import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import img from '../assets/images/car_doctor (3).png'; 
import { useGetServicesQuery } from '../redux/api/ProductsApi';

const Services = () => {
    const { data: services, error, isLoading } = useGetServicesQuery();
    const [priceRange, setPriceRange] = useState('all');
    const [sortOrder, setSortOrder] = useState('asc');

    // Toggle visibility of dropdowns
    const toggleDropdown = (id) => {
        const dropdown = document.getElementById(id);
        dropdown.style.display = (dropdown.style.display === 'none' || dropdown.style.display === '') ? 'flex' : 'none';
    };

    // Handle price range selection
    const handlePriceRangeChange = (range) => {
        setPriceRange(range);
    };

    // Handle sorting order selection
    const handleSortOrderChange = (order) => {
        setSortOrder(order);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        console.log(error);
        return <div>Error: {error.message}</div>;
    }

    // Filtering based on price range
    const filterServicesByPrice = (service) => {
        switch (priceRange) {
            case '10-20':
                return service.price >= 10 && service.price <= 20;
            case '20-50':
                return service.price > 20 && service.price <= 50;
            case '50-100':
                return service.price > 50 && service.price <= 100;
            default:
                return true; // Show all services if no range selected
        }
    };

    // Filter and sort services
    const filteredServices = services?.data
        .filter(filterServicesByPrice)
        .sort((a, b) => sortOrder === 'asc' ? a.price - b.price : b.price - a.price);

    return (
        <div className="p-5">
            {/* Filter Options */}
            <div className="relative mb-5">
                {/* Price Range Filter */}
                <button
                    id="filterButton"
                    className="w-full md:w-40 h-8 flex items-center justify-center bg-gray-500 shadow-lg py-1 hover:text-gray-500 border-2 text-gray-50 bg-gray-500 rounded-lg hover:bg-gray-100 hover:border-gray-50 px-4 transition duration-500 ease-in-out"
                    onClick={() => toggleDropdown('filterDropdown')}
                >
                    Filter by Price
                </button>
                <div id="filterDropdown" className="w-full md:w-40 px-5 pb-5 absolute top-9 left-0 border-2 border-gray-50 z-50 bg-gray-50 rounded-lg shadow-lg hidden">
                    <div className="flex flex-col mt-2">
                        {['10-20', '20-50', '50-100'].map(range => (
                            <div key={range} className="mt-2">
                                <input
                                    type="radio"
                                    name="priceRange"
                                    value={range}
                                    checked={priceRange === range}
                                    onChange={() => handlePriceRangeChange(range)}
                                    className="mr-2"
                                />
                                <label>{range}</label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Sort Options */}
            <div className="relative mb-5">
                <button
                    id="sortButton"
                    className="w-full md:w-40 h-8 flex items-center justify-center bg-gray-500 shadow-lg py-1 hover:text-gray-500 border-2 text-gray-50 bg-gray-500 rounded-lg hover:bg-gray-100 hover:border-gray-50 px-4 transition duration-500 ease-in-out"
                    onClick={() => toggleDropdown('sortDropdown')}
                >
                    Sort by Price
                </button>
                <div id="sortDropdown" className="w-full md:w-40 px-5 pb-5 absolute top-9 left-0 border-2 border-gray-50 z-50 bg-gray-50 rounded-lg shadow-lg hidden">
                    <div className="flex flex-col mt-2">
                        {['asc', 'desc'].map(order => (
                            <div key={order} className="mt-2">
                                <input
                                    type="radio"
                                    name="sortOrder"
                                    value={order}
                                    checked={sortOrder === order}
                                    onChange={() => handleSortOrderChange(order)}
                                    className="mr-2"
                                />
                                <label>{order === 'asc' ? 'Ascending' : 'Descending'}</label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Display Services */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5'>
                {filteredServices.map(service => (
                    <Link 
                        key={service?.id} 
                        to={`/service/${service?.id}`}
                        className="relative w-48 h-64"
                    >
                        <img
                            src={service?.image || img}
                            alt={service?.name}
                            className="w-full h-full rounded-lg object-cover"
                        />
                        <div className="absolute bottom-0 w-full h-1/3 bg-gray-100 bg-opacity-60 text-gray-900 p-4 rounded-b-lg flex flex-col justify-center items-center">
                            <p className="font-bold text-lg">{service?.name}</p>
                            <p className="text-xl italic text-gray-500">${service?.price}</p>
                        </div>
                        <i className="fi fi-rr-heart text-red-500 absolute top-2 right-2 text-2xl"></i>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Services;
