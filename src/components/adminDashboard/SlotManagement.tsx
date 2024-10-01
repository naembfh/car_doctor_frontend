import React, { useState } from 'react';
import { Slot } from '../../types/slotTypes';
import { Service } from '../../types/serviceTypes';
import { useGetServicesQuery } from '../../redux/api/ProductsApi';
import { useAddSlotMutation, useGetAvailableSlotsQuery, useUpdateSlotStatusMutation } from '../../redux/api/slotApi';
import { toast } from 'sonner';

const PAGE_SIZE = 5;

const SlotManagement: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSlot, setNewSlot] = useState<Partial<Slot>>({
    service: '',
    date: '',
    startTime: '',
    endTime: '',
    isBooked: 'available',
  });
  const [currentPage, setCurrentPage] = useState(1);

  const { data: services, isLoading: isServicesLoading } = useGetServicesQuery();
  const servicesList = services?.data || [];

  const { data: slotResponse, isLoading: isSlotsLoading, error } = useGetAvailableSlotsQuery(undefined);
  let slots = Array.isArray(slotResponse?.data) ? slotResponse.data : [];

  const [updateSlotStatus] = useUpdateSlotStatusMutation();
  const [addSlot] = useAddSlotMutation();

  const validateSlotTime = () => {
    const start = new Date(`1970-01-01T${newSlot.startTime}`);
    const end = new Date(`1970-01-01T${newSlot.endTime}`);
    const minTime = new Date('1970-01-01T10:00:00');
    const maxTime = new Date('1970-01-02T00:00:00'); 

    if (start < minTime || end > maxTime || start >= end) {
      toast.error("Time must be between 10:00 AM and 12:00 AM, and start time should be earlier than end time.");
      return false;
    }
    return true;
  };

  const handleAddSlot = async () => {
    if (!newSlot.service || !newSlot.date || !newSlot.startTime || !newSlot.endTime) {
      toast.error("Please fill out all fields.");
      return;
    }

    if (!validateSlotTime()) {
      return;
    }

    try {
      await addSlot(newSlot as Slot).unwrap();
      toast.success("Slot added successfully!");
      setNewSlot({ service: '', date: '', startTime: '', endTime: '', isBooked: 'available' });
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Failed to add slot.");
    }
  };

  const handleUpdateSlotStatus = async (slotId: string, newStatus: 'available' | 'canceled') => {
    const slot = slots?.find((slot: Slot) => slot._id === slotId); 

    if (!slot) {
      toast.error("Slot not found.");
      return;
    }

    try {
      await updateSlotStatus({ slotId, status: newStatus }).unwrap();
      toast.success("Slot status updated successfully.");
    } catch (error) {
      toast.error("Failed to update slot status.");
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getMinDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  if (isServicesLoading || isSlotsLoading) return <div className="text-center py-4 text-white">Loading...</div>;
  if (error) return <div className="text-center py-4 text-white">Error loading slots</div>;

  const sortedSlots = [...slots].sort((a: Slot, b: Slot) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const paginatedSlots = sortedSlots.slice(startIndex, endIndex);
  const totalPages = Math.ceil(sortedSlots.length / PAGE_SIZE);

  const pageNumbers = [];
  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    pageNumbers.push(1);
    if (currentPage > 3) pageNumbers.push('...');
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pageNumbers.push(i);
    }
    if (currentPage < totalPages - 2) pageNumbers.push('...');
    pageNumbers.push(totalPages);
  }

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-6">Slot Management</h1>

      {/* Button to Open Modal */}
      <button
        className="bg-slate-500 text-white py-2 px-4 rounded-md mb-6 shadow-lg hover:bg-slate-600 transition duration-300"
        onClick={() => setIsModalOpen(true)}
      >
        Add New Slot
      </button>

      {/* Modal for Adding Slot */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-80 flex justify-center items-center">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md sm:max-w-xl">
            <h2 className="text-xl font-bold mb-4">Add New Slot</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Service:</label>
                <select
                  className="mt-1 block w-full p-2 border border-gray-700 rounded-md bg-gray-700 text-white"
                  value={typeof newSlot.service === 'string' ? newSlot.service : ''} 
                  onChange={(e) => setNewSlot({ ...newSlot, service: e.target.value })}
                >
                  <option value="">Select a service</option>
                  {servicesList.map((service: Service) => (
                    <option key={service._id} value={service._id}>{service.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium">Date:</label>
                <input
                  type="date"
                  min={getMinDate()} 
                  className="mt-1 block w-full p-2 border border-gray-700 rounded-md bg-gray-700 text-white"
                  value={newSlot.date}
                  onChange={(e) => setNewSlot({ ...newSlot, date: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">Start Time:</label>
                  <input
                    type="time"
                    className="mt-1 block w-full p-2 border border-gray-700 rounded-md bg-gray-700 text-white"
                    value={newSlot.startTime}
                    onChange={(e) => setNewSlot({ ...newSlot, startTime: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">End Time:</label>
                  <input
                    type="time"
                    className="mt-1 block w-full p-2 border border-gray-700 rounded-md bg-gray-700 text-white"
                    value={newSlot.endTime}
                    onChange={(e) => setNewSlot({ ...newSlot, endTime: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-4 mt-4">
                <button
                  className="bg-slate-500 text-white py-2 px-4 rounded-md shadow-lg hover:bg-slate-600 transition duration-300"
                  onClick={handleAddSlot}
                >
                  Add Slot
                </button>
                <button
                  className="bg-gray-500 text-white py-2 px-4 rounded-md shadow-lg hover:bg-gray-600 transition duration-300"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Slot Table */}
      <div className="mt-6 overflow-x-auto">
        <h2 className="text-xl font-bold mb-4">Manage Slots</h2>
        <table className="min-w-full bg-gray-800 border border-gray-700 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-700 text-white">
              <th className="py-2 px-4">Service</th>
              <th className="py-2 px-4">Date</th>
              <th className="py-2 px-4">Start Time</th>
              <th className="py-2 px-4">End Time</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
  {paginatedSlots.map((slot: Slot) => {
    // Handle case where service is an ID (string) or an object
    const serviceName = typeof slot.service === 'string'
      ? servicesList.find((service: Service) => service._id === slot.service)?.name || 'Unknown'
      : slot.service?.name || 'Unknown';

    return (
      <tr key={slot._id}>
        <td className="py-2 px-4 border border-gray-700 text-white">
          {/* Display the service name */}
          {serviceName}
        </td>
        <td className="py-2 px-4 border border-gray-700 text-white">{slot.date}</td>
        <td className="py-2 px-4 border border-gray-700 text-white">{slot.startTime}</td>
        <td className="py-2 px-4 border border-gray-700 text-white">{slot.endTime}</td>
        <td className="py-2 px-4 border border-gray-700 text-white">{slot.isBooked}</td>
        <td className="py-2 px-4 border border-gray-700 space-x-2">
          {slot.isBooked === 'available' && (
            <button
              className="bg-red-500 text-white py-1 px-2 rounded-md shadow-lg hover:bg-red-600 transition duration-300"
              onClick={() => handleUpdateSlotStatus(slot._id, 'canceled')}
            >
              Cancel
            </button>
          )}
          {slot.isBooked === 'canceled' && (
            <button
              className="bg-slate-500 text-white py-1 px-2 rounded-md shadow-lg hover:bg-slate-600 transition duration-300"
              onClick={() => handleUpdateSlotStatus(slot._id, 'available')}
            >
              Available
            </button>
          )}
        </td>
      </tr>
    );
  })}
</tbody>



        </table>

        {/* Pagination Controls */}
        <div className="mt-4 flex justify-center space-x-2">
          <button
            className={`px-4 py-2 border-2 border-gray-700 rounded-md ${currentPage === 1 ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-500'}`}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {pageNumbers.map((number, index) => (
            <button
              key={index}
              className={`px-4 py-2 border-2 border-gray-700 rounded-md ${number === currentPage ? 'bg-blue-600 text-white' : 'bg-gray-700 text-white hover:bg-gray-600'}`}
              onClick={() => handlePageChange(number as number)}
            >
              {number}
            </button>
          ))}
          <button
            className={`px-4 py-2 border-2 border-gray-700 rounded-md ${currentPage === totalPages ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-500'}`}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default SlotManagement;
