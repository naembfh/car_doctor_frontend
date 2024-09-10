import React, { useState, useEffect } from 'react';
import img from '../assets/images/car_doctor (3).png'; // Default image if needed

const Services = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/services');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setServices(data.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5'>
                {services.map(service => (
                    <div key={service?.id} className="relative w-48 h-64">
                        <img
                            src={service?.image || img} // Use service image or default image
                            alt={service?.name}
                            className="w-full h-full rounded-lg object-cover"
                        />
                        <div className="absolute bottom-0 w-full h-1/3 bg-gray-100 bg-opacity-60 text-gray-900 p-4 rounded-b-lg flex flex-col justify-center items-center">
                            <p className="font-bold text-lg">{service?.name}</p>
                            <p className="text-xl italic text-gray-500">${service?.price}</p>
                        </div>
                        <i className="fi fi-rr-heart text-red-500 absolute top-2 right-2 text-2xl"></i> {/* Adjust the position and size */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Services;
