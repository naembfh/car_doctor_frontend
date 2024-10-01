import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../redux/features/authSlice';
import { toast } from 'sonner'; 

interface ProfileUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (updatedProfile: { name: string; phone: string; address: string; img: string }) => void;
}

const ProfileUpdateModal: React.FC<ProfileUpdateModalProps> = ({ isOpen, onClose, onUpdate }) => {
  const currentUser = useSelector(selectCurrentUser);
  const [updatedProfile, setUpdatedProfile] = useState({
    name: '',
    phone: '',
    address: '',
    img: ''
  });
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (isOpen && currentUser) {
      // Populate form fields with current user data when modal opens
      setUpdatedProfile({
        name: currentUser?.name || '',
        phone: currentUser?.phone || '',
        address: currentUser?.address || '',
        img: currentUser?.img || '',
      });
    }
  }, [isOpen, currentUser]);

  // Handle image upload to imgbb
  const handleImageUpload = async (file: File) => {
    setIsUploading(true);
    toast('Uploading image, please wait...');

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
      toast.error('Failed to upload image');
      setIsUploading(false);
      return '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(updatedProfile); 
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-800 text-gray-100 p-6 rounded-lg w-full max-w-lg shadow-lg relative">
        <h3 className="text-lg font-semibold mb-4 text-gray-100">Update Profile</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-100">Name</label>
            <input
              type="text"
              value={updatedProfile.name}
              onChange={(e) => setUpdatedProfile({ ...updatedProfile, name: e.target.value })}
              className="w-full border p-2 rounded text-gray-800 bg-gray-100 placeholder:text-gray-800 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-100">Phone</label>
            <input
              type="text"
              value={updatedProfile.phone}
              onChange={(e) => setUpdatedProfile({ ...updatedProfile, phone: e.target.value })}
              className="w-full border p-2 rounded text-gray-800 bg-gray-100 placeholder:text-gray-800 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your phone number"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-100">Address</label>
            <input
              type="text"
              value={updatedProfile.address}
              onChange={(e) => setUpdatedProfile({ ...updatedProfile, address: e.target.value })}
              className="w-full border p-2 rounded bg-gray-100 text-gray-800 placeholder:text-gray-800 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your address"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-100">Profile Image</label>
            <input
              type="file"
              onChange={async (e) => {
                const file = (e.target as HTMLInputElement).files?.[0];
                if (file) {
                  const uploadedImageUrl = await handleImageUpload(file);
                  setUpdatedProfile({ ...updatedProfile, img: uploadedImageUrl });
                }
              }}
              className="w-full"
            />
            {updatedProfile.img && (
              <img
                src={updatedProfile.img}
                alt="Profile"
                className="mt-2 w-20 h-20 rounded-full object-cover"
              />
            )}
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              disabled={isUploading}
            >
              {isUploading ? 'Updating...' : 'Update Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileUpdateModal;
