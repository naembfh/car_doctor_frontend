import React from 'react';
import { useGetUserBookingsQuery } from '../redux/api/bookingApi';

const MyBooking = () => {
    const { data: myBooking } = useGetUserBookingsQuery();

    const calculateTimeLeft = (serviceDate, createdAt) => {
        const now = new Date();
        const serviceDateTime = new Date(`${serviceDate}T${createdAt.split('T')[1]}`);

        const timeDifference = serviceDateTime - now;
        const daysLeft = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        return `${daysLeft} days left`;
    };

    return (
        <div className="flex flex-wrap gap-4">
            {myBooking?.map((booking) => (
                <div key={booking._id} className="max-w-sm w-full bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="flex">
                        {/* Left Side: Service Info */}
                        <div className="p-4 w-3/5">
                            <h2 className="font-bold text-lg">{booking.service.name}</h2>
                            <p className="text-gray-600">Time Zone: Local</p>
                            <div className="mt-2">
                                <p className="text-gray-600 font-semibold">Car: {booking.vehicleBrand} {booking.vehicleModel}</p>
                                <p className="text-gray-600">Plate: {booking.registrationPlate}</p>
                            </div>
                        </div>

                        {/* Right Side: Service Image */}
                        <div className="w-2/5 flex justify-center items-center p-4">
                            <img 
                                src="service-img-url.jpg" 
                                alt="Service" 
                                className="w-16 h-16 object-cover rounded-md"
                            />
                        </div>
                    </div>

                    {/* Service Time Slot */}
                    <div className="px-4 py-2 bg-gray-100">
                        <p className="text-gray-700">
                            <span className="font-semibold">Service Date:</span> {new Date(booking.slot.date).toLocaleDateString()}
                        </p>
                        <p className="text-gray-700">
                            <span className="font-semibold">Time Slot:</span> {booking.slot.startTime} - {booking.slot.endTime}
                        </p>
                    </div>

                    {/* Time Left for Service */}
                    <div className="px-4 py-2">
                        <p className="text-red-500 font-semibold">
                            Time Left for Service: {calculateTimeLeft(booking.slot.date, booking.createdAt)}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MyBooking;
