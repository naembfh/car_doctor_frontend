import { useState } from 'react';
import {
  useGetServicesQuery,
  useAddServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} from '../../redux/api/ProductsApi';
import { toast } from 'sonner';

// Define a type for Service
interface Service {
  _id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  img?: string;
  isDeleted?: boolean;
}

const ServiceManagement = () => {
  const { data: servicesData, isLoading, refetch } = useGetServicesQuery();
  const [addService] = useAddServiceMutation();
  const [updateService] = useUpdateServiceMutation();
  const [deleteService] = useDeleteServiceMutation();

  const [showModal, setShowModal] = useState(false);
  const [currentService, setCurrentService] = useState<Service | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false); // Track image upload status

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter out deleted services
  const services = servicesData?.data.filter((service: Service) => !service.isDeleted) || [];

  // Handle image upload to imgbb
  const handleImageUpload = async (file: File) => {
    setIsUploading(true);
    toast('Uploading image, please wait...'); // Show toast for upload wait

    const formData = new FormData();
    formData.append('image', file);
    formData.append('key', '74eece6b4d2ce0e3df2e46a4bda9b8d1');

    try {
      const response = await fetch('https://api.imgbb.com/1/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setIsUploading(false);
      return data.data.url;
    } catch (error) {
      console.log(error);
      toast.error('Failed to upload image');
      setIsUploading(false);
      return '';
    }
  };

  // Handle adding a service
  const handleAddService = async (service: Service) => {
    try {
      await addService(service).unwrap();
      setShowModal(false);
      refetch();
      toast.success('Service added successfully!');
    } catch (error) {
      toast.error('Failed to add service');
    }
  };

  // Handle editing a service
  const handleEditService = async (service: Service) => {
    try {
      await updateService({ id: service._id, service }).unwrap();
      setShowModal(false);
      refetch();
      toast.success('Service updated successfully!');
    } catch (error) {
      toast.error('Failed to update service');
    }
  };

  // Handle deleting a service
  const handleDeleteService = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await deleteService(id).unwrap();
        refetch();
        toast.success('Service deleted successfully!');
      } catch (error) {
        toast.error('Failed to delete service');
      }
    }
  };

  if (isLoading) return <div className="text-white">Loading...</div>;

  // Pagination Logic
  const indexOfLastService = currentPage * itemsPerPage;
  const indexOfFirstService = indexOfLastService - itemsPerPage;
  const currentServices = services.slice(indexOfFirstService, indexOfLastService);

  const totalPages = Math.ceil(services.length / itemsPerPage);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="px-4 py-6 text-white">
      <h2 className="text-xl font-semibold mb-4">Service Management</h2>

      {/* Add Service Button */}
      <button
        className="bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 mb-4 rounded w-full md:w-auto"
        onClick={() => {
          setCurrentService(null);
          setImageUrl('');
          setShowModal(true);
        }}
      >
        Add Service
      </button>

      {/* Service Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-slate-700 rounded-md bg-gray-900">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-4 py-2 border-slate-700">Service Name</th>
              <th className="px-4 py-2 border-slate-700">Price</th>
              <th className="px-4 py-2 border-slate-700">Image</th>
              <th className="px-4 py-2 border-slate-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentServices.map((service: Service) => (
              <tr key={service._id} className="hover:bg-gray-700">
                <td className="px-4 py-2 border-slate-700">{service.name}</td>
                <td className="px-4 py-2 border-slate-700">${service.price}</td>
                <td className="px-4 py-2 border-slate-700">
                  {service.img && <img src={service.img} alt={service.name} className="w-20 h-20 object-cover" />}
                </td>
                <td className="px-4 py-2 border-slate-700">
                  <button
                    className="bg-slate-500 text-white px-2 py-1 rounded mr-2 hover:bg-slate-600"
                    onClick={() => {
                      setCurrentService(service);
                      setImageUrl(service.img || '');
                      setShowModal(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    onClick={() => handleDeleteService(service._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="mt-4 flex flex-wrap justify-center space-x-2">
        <button
          className={`px-4 py-2 border rounded-md ${currentPage === 1 ? 'bg-gray-500 cursor-not-allowed' : 'bg-slate-500 text-white hover:bg-slate-600'}`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
          <button
            key={number}
            className={`px-4 py-2 border rounded-md ${number === currentPage ? 'bg-slate-500 text-white' : 'bg-gray-700 text-white hover:bg-gray-600'}`}
            onClick={() => handlePageChange(number)}
          >
            {number}
          </button>
        ))}
        <button
          className={`px-4 py-2 border rounded-md ${currentPage === totalPages ? 'bg-gray-500 cursor-not-allowed' : 'bg-slate-500 text-white hover:bg-slate-600'}`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {/* Add/Edit Service Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center">
          <div className="bg-gray-800 p-6 rounded-md shadow-lg w-full max-w-lg mx-4">
            <h3 className="text-lg font-semibold mb-4">
              {currentService ? 'Edit Service' : 'Add Service'}
            </h3>

            {/* Service Form */}
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const target = e.target as HTMLFormElement;

                const formData: Partial<Service> = {
                  name: (target.elements.namedItem('name') as HTMLInputElement).value,
                  description: (target.elements.namedItem('description') as HTMLInputElement).value,
                  price: parseFloat((target.elements.namedItem('price') as HTMLInputElement).value),
                  duration: parseInt((target.elements.namedItem('duration') as HTMLInputElement).value, 10),
                  img: imageUrl,
                };
                
                if (currentService) {
                  formData._id = currentService._id; // Include _id for updating
                  handleEditService(formData as Service);
                } else {
                  handleAddService(formData as Service);
                }
              }}
            >
              <div className="mb-4">
                <label className="block text-white font-semibold">Service Name</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={currentService?.name || ''}
                  className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-white font-semibold">Description</label>
                <textarea
                  name="description"
                  defaultValue={currentService?.description || ''}
                  className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-white font-semibold">Price</label>
                <input
                  type="number"
                  name="price"
                  defaultValue={currentService?.price || ''}
                  className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-white font-semibold">Duration (in minutes)</label>
                <input
                  type="number"
                  name="duration"
                  defaultValue={currentService?.duration || ''}
                  className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-white font-semibold">Image Upload</label>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full"
                  onChange={async (e) => {
                    const file = (e.target as HTMLInputElement).files?.[0];
                    if (file) {
                      setIsUploading(true); // Start uploading state
                      const uploadedImageUrl = await handleImageUpload(file);
                      setImageUrl(uploadedImageUrl);
                    }
                  }}
                />
                {/* Show the current image or the uploaded one */}
                {(imageUrl || currentService?.img) && (
                  <img
                    src={imageUrl || currentService?.img}
                    alt="Service Thumbnail"
                    className="w-20 h-20 mt-2 object-cover"
                  />
                )}
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  disabled={isUploading} // Disable while uploading
                >
                  {currentService ? 'Update' : 'Add'} Service
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
