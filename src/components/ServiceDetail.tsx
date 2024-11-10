import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';  
import img from '../assets/images/car_doctor (3).png';
import { useGetAvailableSlotsQuery } from '../redux/api/slotApi';
import BookingModal from './BookingModal';
import { Slot } from '../types/slotTypes';
import { useCreateBookingMutation } from '../redux/api/bookingApi';
import { useGetServiceByIdQuery } from '../redux/api/ProductsApi';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format, isSameDay } from 'date-fns';
import { selectCurrentUser } from '../redux/features/authSlice'; 

const ServiceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [serviceId, setServiceId] = useState<string | null>(null);
  const [displayedSlots, setDisplayedSlots] = useState<Slot[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentUser = useSelector(selectCurrentUser);  

  const { data: serviceData, error: serviceError, isLoading: serviceLoading } = useGetServiceByIdQuery(id ?? '');
  const { data: slotsApiResponse, error: slotsError, isLoading: slotsLoading, refetch: refetchSlots } = useGetAvailableSlotsQuery(serviceId || '', {
    skip: !serviceId,
  });

  const [createBooking, { isSuccess: isBookingSuccess }] = useCreateBookingMutation();

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
        .sort((a: Slot, b: Slot) =>
          new Date(a.date).getTime() - new Date(b.date).getTime() ||
          new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
        );
      setDisplayedSlots(filteredSlots);
    } else {
      // If there's an error or no data, reset displayedSlots
      setDisplayedSlots([]);
    }
  }, [slotsApiResponse, slotsError]);

  useEffect(() => {
    if (selectedDate) {
      const selectedDateString = format(selectedDate, 'yyyy-MM-dd');
      const filteredSlots = slotsApiResponse?.data
        ?.filter((slot: Slot) =>
          slot.isBooked === 'available' &&
          isSameDay(new Date(slot.date), new Date(selectedDateString))
        )
        .sort((a: Slot, b: Slot) =>
          new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
        );
      setDisplayedSlots(filteredSlots || []);
    }
  }, [selectedDate, slotsApiResponse]);

  const handleSlotChange = (slotId: string) => {
    setSelectedSlot(slotId ?? null);
  };

  const handleBookService = () => {
    setIsModalOpen(true);
  };

  const handleBooking = async () => {
    if (serviceId && selectedSlot) {
      try {
        await createBooking({
          serviceId: serviceId,
          slotId: selectedSlot,
        }).unwrap();

        setIsModalOpen(false);
        refetchSlots();
      } catch (error) {
        console.error('Booking failed:', error);
      }
    } else {
      alert('Please select a slot.');
    }
  };

  useEffect(() => {
    if (isBookingSuccess) {
      console.log('Booking was successful');
    }
  }, [isBookingSuccess]);

  // Keep early returns for service loading and error
  if (serviceLoading) return <div>Loading service...</div>;
  if (serviceError) return <div>Error loading service.</div>;

  return (
    <div className="relative bg-slate-800 p-4 md:p-8 flex flex-col md:flex-row border-2 shadow-md rounded-md">
      <div className="w-full md:w-1/3 mb-4 md:mb-0">
        <img
          src={serviceData?.data.img || img}
          alt={serviceData?.data.name}
          className="w-full h-64 md:h-96 object-cover rounded-lg"
        />
      </div>
      <div className="w-full md:w-1/3 ml-0 md:ml-16 mr-0 md:mr-28 mb-4 md:mb-0">
        <h1 className="text-2xl font-bold text-gray-200">{serviceData?.data.name}</h1>
        <p className="text-gray-200">{serviceData?.data.description}</p>
        <h1 className="text-xl font-bold text-blue-600">$ {serviceData?.data.price}</h1>
      </div>
      <div className="w-full md:w-1/3">
        <div className="mb-5 text-center">
          <h2 className="text-lg font-semibold text-gray-100">Select Your Date</h2>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => {
              setSelectedDate(date);
              setSelectedSlot(null);  
            }}
            minDate={new Date()} 
            className="border border-gray-300 rounded-lg p-2 w-full mt-2"
            dateFormat="yyyy-MM-dd"
            popperPlacement="bottom"  
            inline  
          />
        </div>

        <div className="relative mb-5">
          {/* Handle slots loading and error states */}
          {slotsLoading ? (
            <div className="text-gray-500">Loading slots...</div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {displayedSlots.length > 0 ? (
                displayedSlots.map(slot => (
                  <button
                    key={slot._id}
                    onClick={() => handleSlotChange(slot._id)}
                    className={`w-36 md:w-40 h-8 rounded-lg ${selectedSlot === slot._id ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                  >
                    {`${slot.startTime} - ${slot.endTime}`}
                  </button>
                ))
              ) : (
                <div className="text-gray-500">No slot data</div>
              )}
            </div>
          )}
        </div>

        {selectedSlot && (
          <>
            {currentUser ? (
              <button
                onClick={handleBookService}
                className="w-full h-12 mt-4 bg-blue-500 text-white hover:bg-blue-600 rounded-lg"
                disabled={!selectedSlot}
              >
                Book Service
              </button>
            ) : (
              <div className="text-center mt-4 text-red-500">
                Please log in to book a service.
              </div>
            )}
          </>
        )}
      </div>

      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        serviceId={serviceId || ''}
        slotId={selectedSlot || ''}
        onSuccess={() => {
          handleBooking();
          setIsModalOpen(false);
        }}
      />
    </div>
  );
};

export default ServiceDetail;

