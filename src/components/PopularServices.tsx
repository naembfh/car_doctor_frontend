import { Link } from 'react-router-dom';
import { useGetServicesQuery } from '../redux/api/ProductsApi';
import { Service } from '../types/serviceTypes';
import img from '../assets/images/car_doctor (3).png';

const PopularServices = () => {
    const { data: servicesResponse, error, isLoading } = useGetServicesQuery();
    const services = servicesResponse?.data || [];
console.log(services)
    if (isLoading) return <div className="text-center text-gray-500">Loading...</div>;

    // Type guard for checking if error has 'data' and 'message' properties
    const isFetchBaseQueryError = (error: any): error is { data: { message: string } } => {
        return typeof error?.data === 'object' && 'message' in error.data;
    };

    if (error) {
        const errorMessage = isFetchBaseQueryError(error) 
            ? error.data.message 
            : 'An error occurred';
        return <div className="text-center text-red-500">Error: {errorMessage}</div>;
    }

    return (
        <div className="px-6 md:px-28 py-6 bg-gray-900 text-gray-100">
            {/* Popular Services Section Header */}
            <div className="mb-6">
                <h2 className="text-3xl font-bold text-center md:text-left">Popular Services</h2>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {services.slice(0, 5).map((service: Service) => (
                    <Link 
                        key={service.id} 
                        to={`/service/${service.id}`}
                        className="relative group rounded-lg overflow-hidden border-2 border-gray-700 bg-gray-800 transition-transform transform hover:scale-105 hover:border-blue-500"
                    >
                        <img
                            src={service.img || img}
                            alt={service.name}
                            className="w-full h-48 md:h-60 lg:h-80 rounded-t-lg object-cover transition-all duration-300 ease-in-out"
                        />
                        <div className="absolute bottom-0 w-full h-1/3 bg-gray-900 bg-opacity-80 text-gray-200 p-4 rounded-b-lg flex flex-col justify-center items-center group-hover:hidden transition-all duration-300 ease-in-out">
                            <p className="font-semibold text-lg">{service.name}</p>
                            <p className="text-xl italic text-gray-400">${service.price}</p>
                        </div>
                        <div className="absolute inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-lg flex items-center justify-center text-center text-white font-semibold text-lg group-hover:flex group-hover:items-center group-hover:justify-center group-hover:bg-opacity-80 hidden">
                            <span>Click for details</span>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Show All Button */}
            <div className="flex justify-center md:justify-end mt-6">
                <Link to="/services" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300">
                    Show All
                </Link>
            </div>
        </div>
    );
};

export default PopularServices;
