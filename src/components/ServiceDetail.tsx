import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import img from '../assets/images/car_doctor (3).png';
import { useGetServiceByIdQuery } from '../redux/api/ProductsApi';
import { useGetAvailableSlotsQuery } from '../redux/api/slotApi';
import { selectCurrentUser } from '../redux/features/authSlice';
import { useSelector } from 'react-redux';

import { Slot } from '../types/slotTypes';

const ServiceDetail: React.FC = () => {
  const user = useSelector(selectCurrentUser);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isLoggedIn = !!user; // Check if user is logged in

  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [serviceId, setServiceId] = useState<string | null>(null);
  const [displayedSlots, setDisplayedSlots] = useState<Slot[]>([]);

  // Fetch service details
  const { data: serviceData, error: serviceError, isLoading: serviceLoading } = useGetServiceByIdQuery(id ? parseInt(id) : 0);
console.log(serviceData)
  // Fetch available slots
  const { data: slotsApiResponse, error: slotsError, isLoading: slotsLoading } = useGetAvailableSlotsQuery(serviceId || '', {
    skip: serviceId === null,
  });

  useEffect(() => {
    if (serviceData) {
      setServiceId(serviceData.data._id);
    }
  }, [serviceData]);

  useEffect(() => {
    if (slotsApiResponse?.data) { 
      const today = new Date().toISOString().split('T')[0];

      const filteredSlots = slotsApiResponse.data
        .filter((slot: Slot) => slot.isBooked === 'available' && slot.date >= today)
        .sort(
          (a: Slot, b: Slot) =>
            new Date(a.date).getTime() - new Date(b.date).getTime() ||
            new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
        );

      setDisplayedSlots(filteredSlots.slice(0, 4));
    }
  }, [slotsApiResponse]);

  useEffect(() => {
    if (slotsApiResponse?.data) { 
      const today = new Date().toISOString().split('T')[0];

      const filteredSlots = slotsApiResponse.data
        .filter(
          (slot: Slot) =>
            slot.isBooked === 'available' &&
            (selectedDates.length === 0 || selectedDates.includes(slot.date))
        )
        .filter((slot: Slot) => slot.date >= today)
        .sort(
          (a: Slot, b: Slot) =>
            new Date(a.date).getTime() - new Date(b.date).getTime() ||
            new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
        );

      setDisplayedSlots(filteredSlots.slice(0, 4));
    }
  }, [selectedDates, slotsApiResponse]);

  const handleDateChange = (date: string) => {
    setSelectedDates(prevDates =>
      prevDates.includes(date)
        ? prevDates.filter(d => d !== date)
        : [...prevDates, date]
    );
  };

  const handleSlotChange = (slotId: string) => {
    setSelectedSlot(slotId ?? null); 
  };

  const handleBookService = () => {
    if (isLoggedIn) {
      console.log('Service booked with slot ID:', selectedSlot);
    } else {
      alert('Please log in to book this service.');
      navigate('/login');
    }
  };

  if (serviceLoading) return <div>Loading service...</div>;
  if (serviceError) return <div>Error loading service: {serviceError instanceof Error ? serviceError.message : 'Unknown error'}</div>;

  if (slotsLoading) return <div>Loading slots...</div>;
  if (slotsError) return <div>Error loading slots: {slotsError instanceof Error ? slotsError.message : 'Unknown error'}</div>;

  return (
    <div className="relative p-8 flex bg-white rounded-md">
      <div className="w-1/3">
        <img
          src={serviceData?.data.img || img}
          alt={serviceData?.data.name}
          className="w-96 h-96 object-cover rounded-lg"
        />
      </div>
      <div className="w-1/3 ml-16 mr-28">
        <h1 className="text-2xl font-bold">{serviceData?.data.name}</h1>
        <p>{serviceData?.data.description}</p>
        <h1 className="text-xl font-bold">$ {serviceData?.data.price}</h1>
      </div>
      <div className="w-1/3">
        <div className="relative mb-5">
          <button
            id="datesButton"
            className="w-full h-8 flex items-center justify-center bg-gray-500 shadow-lg py-1 hover:text-gray-500 border-2 text-gray-50 bg-gray-500 rounded-lg hover:bg-gray-100 hover:border-gray-50 px-4 transition duration-500 ease-in-out"
            onClick={() => document.getElementById('datesDropdown')?.classList.toggle('hidden')}
          >
            Select Dates
          </button>
          <div
            id="datesDropdown"
            className="w-full px-5 pb-5 absolute top-9 left-0 border-2 border-gray-50 z-50 bg-gray-50 rounded-lg shadow-lg hidden"
          >
            <div className="flex flex-col mt-2">
              {['2024-10-15', '2024-10-16'].map(date => (
                <div key={date} className="mt-2 flex items-center">
                  <input
                    type="checkbox"
                    id={date}
                    checked={selectedDates.includes(date)}
                    onChange={() => handleDateChange(date)}
                    className="appearance-none rounded-md border-2 w-4 h-4 cursor-pointer transition duration-300 bg-white border-gray-300 checked:bg-purple-500 checked:border-transparent checked:ring-2 checked:ring-purple-500"
                  />
                  <label htmlFor={date} className="ml-2 cursor-pointer hover:text-purple-500">
                    {date}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative mb-5">
          <div className="flex flex-wrap gap-2">
            {displayedSlots.length > 0 ? (
              displayedSlots.map(slot => (
                <button
                  key={slot._id}
                  onClick={() => handleSlotChange(slot._id)}
                  className={`w-20 h-8 rounded-lg ${selectedSlot === slot._id ? 'bg-purple-500 text-white' : 'bg-gray-200'}`}
                >
                  {`${slot.date} ${slot.startTime} - ${slot.endTime}`}
                </button>
              ))
            ) : (
              <div>No available slots</div>
            )}
          </div>
        </div>

        {selectedSlot && (
          <button
            onClick={handleBookService}
            className={`w-full h-12 mt-4 ${isLoggedIn ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600 cursor-not-allowed'} rounded-lg`}
            disabled={!isLoggedIn || !selectedSlot}
          >
            {isLoggedIn ? 'Book this Service' : 'Please log in to book this service'}
          </button>
        )}
      </div>

      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-900"
      >
        <i className="fi fi-rr-rectangle-xmark text-2xl"></i>
        <span className="sr-only">Close</span>
      </button>
    </div>
  );
};

export default ServiceDetail;
