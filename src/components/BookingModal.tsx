import React, { useState } from 'react';
import { useCreateBookingMutation } from '../redux/api/bookingApi';
import { toast } from 'sonner';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceId: string;
  slotId: string;
  onSuccess: ()=> void;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, serviceId, slotId, onSuccess }) => {
  const [vehicleType, setVehicleType] = useState('');
  const [vehicleBrand, setVehicleBrand] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [manufacturingYear, setManufacturingYear] = useState('');
  const [registrationPlate, setRegistrationPlate] = useState('');
  const [createBooking, { isLoading }] = useCreateBookingMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createBooking({
        serviceId,
        slotId: slotId,
        vehicleType,
        vehicleBrand,
        vehicleModel,
        manufacturingYear,
        registrationPlate
      }).unwrap();
      toast.success('Booking confirmed!');
      onSuccess()
      onClose(); // Close the modal on successful booking
    } catch (error) {
      console.error('Booking failed:', error);
      toast.error('Failed to book the service.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Booking Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Vehicle Type</label>
            <input
              type="text"
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              className="mt-1 block w-full border rounded-md px-3 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Vehicle Brand</label>
            <input
              type="text"
              value={vehicleBrand}
              onChange={(e) => setVehicleBrand(e.target.value)}
              className="mt-1 block w-full border rounded-md px-3 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Vehicle Model</label>
            <input
              type="text"
              value={vehicleModel}
              onChange={(e) => setVehicleModel(e.target.value)}
              className="mt-1 block w-full border rounded-md px-3 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Manufacturing Year</label>
            <input
              type="number"
              value={manufacturingYear}
              onChange={(e) => setManufacturingYear(e.target.value)}
              className="mt-1 block w-full border rounded-md px-3 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Registration Plate</label>
            <input
              type="text"
              value={registrationPlate}
              onChange={(e) => setRegistrationPlate(e.target.value)}
              className="mt-1 block w-full border rounded-md px-3 py-2"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`bg-blue-500 text-white px-4 py-2 rounded-md ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? 'Booking...' : 'Confirm Booking'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
