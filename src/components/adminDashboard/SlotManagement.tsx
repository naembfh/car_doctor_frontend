import React from 'react';
import { useGetAvailableSlotsQuery, useUpdateSlotStatusMutation } from '../../redux/api/slotApi';


const SlotManagement = () => {
    let { data: slots, isLoading, error } = useGetAvailableSlotsQuery(); // Fetch all slots
    slots = slots.data
    const [updateSlotStatus] = useUpdateSlotStatusMutation();

    const makeSlotAvailable = (slot) => {
        if (slot.isBooked !== 'booked') {
            return; // No need to handle if the slot is not booked
        }

        // Make the slot available by updating the status to 'AVAILABLE'
        updateSlotStatus({ slotId: slot._id, status: 'AVAILABLE' })
            .then(() => {
                console.log('Slot status updated to AVAILABLE successfully');
            })
            .catch((error) => {
                console.error('Error updating slot status:', error);
            });
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading slots.</div>;

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Slot Management</h2>
            <table className="min-w-full bg-white border">
                <thead>
                    <tr>
                        <th className="px-4 py-2 border">Date</th>
                        <th className="px-4 py-2 border">Start Time</th>
                        <th className="px-4 py-2 border">End Time</th>
                        <th className="px-4 py-2 border">Status</th>
                        <th className="px-4 py-2 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {slots.map((slot) => (
                        <tr key={slot._id}>
                            <td className="px-4 py-2 border">{slot.date}</td>
                            <td className="px-4 py-2 border">{slot.startTime}</td>
                            <td className="px-4 py-2 border">{slot.endTime}</td>
                            <td className="px-4 py-2 border">{slot.isBooked === 'booked' ? 'Booked' : 'Available'}</td>
                            <td className="px-4 py-2 border">
                                {slot.isBooked === 'booked' && (
                                    <button 
                                        className="px-2 py-1 bg-green-500 text-white rounded"
                                        onClick={() => makeSlotAvailable(slot)}
                                    >
                                        Make Available
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SlotManagement;
