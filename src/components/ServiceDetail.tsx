import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import img from '../assets/images/car_doctor (3).png'; 
import { useGetServiceByIdQuery } from '../redux/api/ProductsApi';
import { useGetAvailableSlotsQuery } from '../redux/api/slotApi';

const ServiceDetail = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
    const [dateOptions, setDateOptions] = useState<string[]>([]);

    // Fetch service details using the API hook
    const { data: serviceData, error: serviceError, isLoading: serviceLoading } = useGetServiceByIdQuery(id as string);

    // Fetch available slots for the service on the selected date
    const { data: slotsData, error: slotsError, isLoading: slotsLoading } = useGetAvailableSlotsQuery({ id, date: selectedDate }, { skip: !selectedDate });

    // Fetch available dates (this should be replaced with actual API if available)
    useEffect(() => {
        // Dummy dates for example purposes
        const fetchAvailableDates = async () => {
            // Fetch dates from an API if available
            const dates = ['2024-09-15', '2024-09-16', '2024-09-17'];
            setDateOptions(dates);
        };

        fetchAvailableDates();
    }, []);

    if (serviceLoading) {
        return <div>Loading...</div>;
    }

    if (serviceError) {
        return <div>Error: {serviceError?.message}</div>;
    }

    // Destructure service and slot data
    const service = serviceData?.data;
    const availableSlots = slotsData?.data || [];

    // Handle slot selection
    const handleSlotSelection = (slotId: string) => {
        setSelectedSlot(slotId);  // Set selected slot
    };

    // Handle date selection from dropdown
    const handleDateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedDate(event.target.value);
        setSelectedSlot(null); // Reset selected slot when date changes
    };

    return (
        <div className="relative p-8 flex bg-white rounded-md">
            {/* Service Details Section */}
            <div className='w-1/3'>
                <img 
                    src={service?.image || img} 
                    alt={service?.name} 
                    className="w-96 h-96 object-cover rounded-lg" 
                />
            </div>
            <div className='w-2/3 ml-16 mr-28'>
                <h1 className="text-2xl font-bold">{service?.name}</h1>
                <p>{service?.description}</p>
                <h1 className="text-xl font-bold">$ {service?.price}</h1>
                <button 
                    type="submit"  
                    className="border-2 border-gray-50 text-gray-50 font-bold bg-gray-900 rounded-md py-3 px-4 w-full flex items-center justify-center transition duration-500 ease-in-out transform hover:bg-gray-100 hover:text-gray-900 hover:border-gray-50"
                >
                    Add to cart
                    <i className="fi fi-rr-shopping-cart mt-1 ml-2"></i>
                </button>
            </div>

            {/* Time Slot and Booking Section */}
            <div className="mt-8 w-full">
                <h2 className="text-lg font-bold mb-4">Available Time Slots</h2>

                {/* Dropdown for Date Selection */}
                <div className="mb-6">
                    <label htmlFor="date-select" className="block text-sm font-medium text-gray-700">
                        Select Date
                    </label>
                    <select 
                        id="date-select" 
                        value={selectedDate} 
                        onChange={handleDateChange} 
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    >
                        <option value="">Select a date</option>
                        {dateOptions.map((date) => (
                            <option key={date} value={date}>{new Date(date).toLocaleDateString()}</option>
                        ))}
                    </select>
                </div>

                {/* Display Available and Booked Time Slots */}
                <div className="grid grid-cols-3 gap-4">
                    {availableSlots.map((slot: any) => (
                        <button 
                            key={slot._id}
                            disabled={slot.isBooked === "booked"}  // Disable booked slots
                            onClick={() => handleSlotSelection(slot._id)}  // Select available slot
                            className={`p-4 border rounded-md transition ${
                                slot.isBooked === "booked" 
                                    ? 'bg-gray-200 cursor-not-allowed' 
                                    : 'bg-green-500 hover:bg-green-600 cursor-pointer'
                            } ${selectedSlot === slot._id ? 'ring-2 ring-blue-500' : ''}`}  // Highlight selected slot
                        >
                            {slot.startTime} - {slot.endTime}
                        </button>
                    ))}
                </div>

                {/* Show "Book This Service" button after selecting a slot */}
                {selectedSlot && (
                    <button 
                        className="mt-6 py-3 px-6 bg-blue-500 text-white font-bold rounded-md"
                        onClick={() => alert(`Booked slot ID: ${selectedSlot}`)}  // Handle booking logic
                    >
                        Book This Service
                    </button>
                )}
            </div>

            <button 
                onClick={() => navigate(-1)} 
                className='absolute top-4 right-4 text-gray-500 hover:text-gray-900'
            >
                <i className="fi fi-rr-rectangle-xmark text-2xl"></i>
                <span className="sr-only">Close</span>
            </button>
        </div>
    );
};

export default ServiceDetail;
