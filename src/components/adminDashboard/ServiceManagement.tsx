import React, { useState } from 'react';
import {
  useGetServicesQuery,
  useAddServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} from '../../redux/api/ProductsApi';

const ServiceManagement = () => {
  let { data: services, isLoading } = useGetServicesQuery();
  services = services.data
  const [addService] = useAddServiceMutation();
  const [updateService] = useUpdateServiceMutation();
  const [deleteService] = useDeleteServiceMutation();

  const [showModal, setShowModal] = useState(false);
  const [currentService, setCurrentService] = useState(null);

  // Handle adding a service
  const handleAddService = async (service) => {
    try {
      await addService(service).unwrap();
      setShowModal(false); // Close modal on success
    } catch (error) {
      console.error('Failed to add service:', error);
    }
  };

  // Handle editing a service
  const handleEditService = async (service) => {
    try {
      await updateService({ id: service._id, service }).unwrap();
      setShowModal(false); // Close modal on success
    } catch (error) {
      console.error('Failed to update service:', error);
    }
  };

  // Handle deleting a service
  const handleDeleteService = async (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await deleteService(id).unwrap();
      } catch (error) {
        console.error('Failed to delete service:', error);
      }
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Service Management</h2>

      {/* Add Service Button */}
      <button
        className="bg-green-500 text-white px-4 py-2 mb-4 rounded"
        onClick={() => {
          setCurrentService(null); // Reset service for new entry
          setShowModal(true); // Show modal for adding service
        }}
      >
        Add Service
      </button>

      {/* Service Table */}
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Service Name</th>
            <th className="px-4 py-2 border">Price</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service._id}>
              <td className="px-4 py-2 border">{service.name}</td>
              <td className="px-4 py-2 border">${service.price}</td>
              <td className="px-4 py-2 border">
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                  onClick={() => {
                    setCurrentService(service); // Set current service for editing
                    setShowModal(true); // Open modal for editing
                  }}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDeleteService(service._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add/Edit Service Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <h3 className="text-lg font-bold mb-4">
              {currentService ? 'Edit Service' : 'Add Service'}
            </h3>

            {/* Service Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = {
                  _id: currentService?._id || Date.now(),
                  name: e.target.name.value,
                  price: e.target.price.value,
                };

                if (currentService) {
                  handleEditService(formData);
                } else {
                  handleAddService(formData);
                }
              }}
            >
              <div className="mb-4">
                <label className="block text-gray-700">Service Name</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={currentService?.name || ''}
                  className="w-full px-4 py-2 border rounded"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Service Price</label>
                <input
                  type="number"
                  name="price"
                  defaultValue={currentService?.price || ''}
                  className="w-full px-4 py-2 border rounded"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  {currentService ? 'Update Service' : 'Add Service'}
                </button>
                <button
                  type="button"
                  className="ml-2 bg-gray-500 text-white px-4 py-2 rounded"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceManagement;
