import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import img from '../assets/images/car_doctor (3).png';
import { useGetServicesQuery } from '../redux/api/ProductsApi';
import { Service } from '../types/serviceTypes';
import Select from 'react-select';

// Helper function to check if the error is of type FetchBaseQueryError
const isFetchBaseQueryError = (error: any): error is { data: { message: string } } => {
    return typeof error?.data === 'object' && 'message' in error.data;
};

const Services = () => {
    const { data: servicesResponse, error, isLoading } = useGetServicesQuery();
    const services = servicesResponse?.data || [];
   
    const [priceRange, setPriceRange] = useState<string>('all');
    const [sortOrder, setSortOrder] = useState<string>('asc');
    const [dynamicPriceRanges, setDynamicPriceRanges] = useState<{ min: number, max: number }[]>([]);

    useEffect(() => {
        if (services.length > 0) {
            const prices = services.map((service: Service) => service.price);
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
        return <div className="text-center text-lg">Loading...</div>;
    }

    if (error) {
        const errorMessage = isFetchBaseQueryError(error)
            ? error.data.message
            : 'An error occurred';
        return <div className="text-center text-red-500">Error: {errorMessage}</div>;
    }

    const filterServicesByPrice = (service: Service) => {
        if (priceRange === 'all') return true;
        const [min, max] = priceRange.split('-').map(Number);
        return service.price >= min && service.price <= max;
    };

    const filteredServices = services
        .filter(filterServicesByPrice)
        .sort((a: Service, b: Service) => sortOrder === 'asc' ? a.price - b.price : b.price - a.price);

    const priceOptions = dynamicPriceRanges.map((range) => ({
        value: `${range.min}-${range.max}`,
        label: `$${range.min} - $${range.max}`,
    }));

    const sortOptions = [
        { value: 'asc', label: 'Ascending' },
        { value: 'desc', label: 'Descending' },
    ];

    return (
        <div className="p-8 bg-gray-900 text-gray-100">
            {/* Filter Options */}
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row mb-8">
                <div className="w-full md:w-1/4 mb-5 md:mb-0 md:mr-5">
                    <Select
                        options={priceOptions}
                        onChange={(option) => setPriceRange(option?.value || 'all')}
                        placeholder="Filter by Price"
                        isClearable
                        styles={{
                            control: (provided) => ({
                                ...provided,
                                borderColor: 'gray',
                                '&:hover': { borderColor: 'gray' },
                                borderRadius: '0.375rem',
                                boxShadow: 'none',
                            }),
                        }}
                    />
                    <Select
                        options={sortOptions}
                        onChange={(option) => setSortOrder(option?.value || 'asc')}
                        placeholder="Sort by Price"
                        styles={{
                            control: (provided) => ({
                                ...provided,
                                borderColor: 'gray',
                                '&:hover': { borderColor: 'gray' },
                                borderRadius: '0.375rem',
                                boxShadow: 'none',
                                marginTop: '1rem',
                            }),
                        }}
                    />
                </div>
            </div>

            {/* Display Services */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredServices.length > 0 ? (
                    filteredServices.map((service: Service) => (
                        <Link 
                            key={service.id} 
                            to={`/service/${service.id}`}
                            className="relative w-full h-80 group rounded-lg border-2 border-gray-600 bg-white bg-opacity-10 hover:bg-opacity-20 transition-all duration-300"
                        >
                            <img
                                src={service.img || img}
                                alt={service.name}
                                className="w-full h-full object-cover rounded-lg transition-all duration-300 ease-in-out"
                            />
                            <div className="absolute bottom-0 w-full h-1/3 bg-gray-800 bg-opacity-60 text-white p-4 rounded-b-lg flex flex-col justify-center items-center group-hover:bg-opacity-80 transition-all duration-300 ease-in-out">
                                <p className="font-semibold text-lg">{service.name}</p>
                                <p className="text-xl italic">${service.price}</p>
                            </div>
                            <div className="absolute inset-0 bg-gray-900 bg-opacity-30 backdrop-blur-lg flex items-center justify-center text-white font-semibold text-lg group-hover:flex group-hover:items-center group-hover:justify-center group-hover:bg-opacity-80 hidden">
                                <span>Click for details</span>
                            </div>
                            <i className="fi fi-rr-heart text-red-500 absolute top-2 right-2 text-2xl"></i>
                        </Link>
                    ))
                ) : (
                    <div className="text-center col-span-full text-lg text-red-500">No services found</div>
                )}
            </div>
        </div>
    );
};

export default Services;
