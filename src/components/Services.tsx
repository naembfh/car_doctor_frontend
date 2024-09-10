import React from 'react';
import { Link } from 'react-router-dom'; 
import img from '../assets/images/car_doctor (3).png'; 
import { useGetServicesQuery } from '../redux/api/ProductsApi';

const Services = () => {
    const { data: services, error, isLoading } = useGetServicesQuery();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5'>
                {services?.data.map(service => (
                    <Link 
                        key={service?.id} 
                        to={`/dashboard/service/${service?.id}`}
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
