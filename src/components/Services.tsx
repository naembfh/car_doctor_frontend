import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import img from '../assets/images/car_doctor (3).png';
import { useGetServicesQuery } from '../redux/api/ProductsApi';
import { Service } from '../types/serviceTypes';

const Services = () => {
    const { data: servicesResponse, error, isLoading } = useGetServicesQuery();
    const services = servicesResponse?.data || [];  
    const [priceRange, setPriceRange] = useState<string>('all');
    const [sortOrder, setSortOrder] = useState<string>('asc');
    const [dynamicPriceRanges, setDynamicPriceRanges] = useState<{ min: number, max: number }[]>([]);

    // Toggle visibility of dropdowns
    const toggleDropdown = (id: string) => {
        const dropdown = document.getElementById(id);
        if (dropdown) {
            dropdown.classList.toggle('hidden');
        }
    };

    // Handle price range selection
    const handlePriceRangeChange = (range: string) => {
        setPriceRange(range);
    };

    // Handle sorting order selection
    const handleSortOrderChange = (order: string) => {
        setSortOrder(order);
    };

    useEffect(() => {
        if (services.length > 0) {
            const prices = services.map(service => service.price);
            const minPrice = Math.min(...prices);
            const maxPrice = Math.max(...prices);

            const rangeStep = (maxPrice - minPrice) / 5;
            const ranges = Array.from({ length: 5 }, (_, i) => {
                const start = minPrice + i * rangeStep;
                const end = i === 4 ? maxPrice : start + rangeStep;
                return {
                    min: Math.round(start),
                    max: Math.round(end),
                };
            });

            setDynamicPriceRanges(ranges);
        }
    }, [services]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        console.error(error);
        const errorMessage = ('status' in error && error.data && 'message' in error.data)
            ? error.data.message
            : 'An error occurred';
        return <div>Error: {errorMessage}</div>;
    }

    // Filtering based on price range
    const filterServicesByPrice = (service: Service) => {
        if (priceRange === 'all') return true;
        const [min, max] = priceRange.split('-').map(Number);
        return service.price >= min && service.price <= max;
    };

    // Filter and sort services
    const filteredServices = services
        .filter(filterServicesByPrice)
        .sort((a: Service, b: Service) => sortOrder === 'asc' ? a.price - b.price : b.price - a.price);

    return (
        <div className="p-5 flex">
            {/* Filter Options */}
            <div className='w-1/6 ml-2'>
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
                            {dynamicPriceRanges.map((range, index) => (
                                <div key={index} className="mt-2 flex items-center">
                                    <input
                                        type="radio"
                                        name="priceRange"
                                        value={`${range.min}-${range.max}`}
                                        checked={priceRange === `${range.min}-${range.max}`}
                                        onChange={() => handlePriceRangeChange(`${range.min}-${range.max}`)}
                                        className="appearance-none rounded-md border-2 w-4 h-4 cursor-pointer transition duration-300 bg-white border-gray-300 checked:bg-purple-500 checked:border-transparent checked:ring-2 checked:ring-purple-500"
                                    />
                                    <label className="ml-2 cursor-pointer hover:text-purple-500">{`$${range.min} - $${range.max}`}</label>
                                </div>
                            ))}
                            <div className="mt-2 flex items-center">
                                <input
                                    type="radio"
                                    name="priceRange"
                                    value="all"
                                    checked={priceRange === 'all'}
                                    onChange={() => handlePriceRangeChange('all')}
                                    className="appearance-none rounded-md border-2 w-4 h-4 cursor-pointer transition duration-300 bg-white border-gray-300 checked:bg-purple-500 checked:border-transparent checked:ring-2 checked:ring-purple-500"
                                />
                                <label className="ml-2 cursor-pointer hover:text-purple-500">All</label>
                            </div>
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
                                <div key={order} className="mt-2 flex items-center">
                                    <input
                                        type="radio"
                                        name="sortOrder"
                                        value={order}
                                        checked={sortOrder === order}
                                        onChange={() => handleSortOrderChange(order)}
                                        className="appearance-none rounded-md border-2 w-4 h-4 cursor-pointer transition duration-300 bg-white border-gray-300 checked:bg-purple-500 checked:border-transparent checked:ring-2 checked:ring-purple-500"
                                    />
                                    <label className="ml-2 cursor-pointer hover:text-purple-500">{order === 'asc' ? 'Ascending' : 'Descending'}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Display Services */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5'>
                {filteredServices.length > 0 ? (
                    filteredServices.map((service: Service) => (
                        <Link 
                            key={service.id} 
                            to={`/service/${service.id}`}
                            className="relative w-48 h-64"
                        >
                            <img
                                src={service.img || img}
                                alt={service.name}
                                className="w-full h-full rounded-lg object-cover"
                            />
                            <div className="absolute bottom-0 w-full h-1/3 bg-gray-100 bg-opacity-60 text-gray-900 p-4 rounded-b-lg flex flex-col justify-center items-center">
                                <p className="font-bold text-lg">{service.name}</p>
                                <p className="text-xl italic text-gray-500">${service.price}</p>
                            </div>
                            <i className="fi fi-rr-heart text-red-500 absolute top-2 right-2 text-2xl"></i>
                        </Link>
                    ))
                ) : (
                    <div>No services found</div>
                )}
            </div>
        </div>
    );
};

export default Services;
