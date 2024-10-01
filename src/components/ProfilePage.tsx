import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../redux/features/authSlice'; 
import ProfileUpdateModal from '../components/ProfileUpdateModal'; 
import { useUpdateUserProfileMutation } from '../redux/api/authApi'; 

const ProfilePage = () => {
  const currentUser = useSelector(selectCurrentUser); 
  const [isModalOpen, setModalOpen] = useState(false);
  const [updateUserProfile] = useUpdateUserProfileMutation();

  const handleProfileUpdate = async (updatedProfile: any) => {
    try {
      await updateUserProfile({ updatedData: updatedProfile }).unwrap();
      setModalOpen(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  if (!currentUser) {
    return <p className="text-center text-gray-700">Loading...</p>; 
  }

  return (
    <div className="p-6 max-w-md mx-auto text-gray-100 bg-gray-800">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>

      {/* Display User Profile Information */}
      <div className="p-4 rounded-md shadow-md">
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-100">Name:</label>
          <p>{currentUser.name}</p>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-100">Email:</label>
          <p>{currentUser.email}</p>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-100">Address:</label>
          <p>{currentUser.address || 'Not provided'}</p>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-100">Profile Image:</label>
          {currentUser.img ? (
            <img src={currentUser.img} alt="Profile" className="w-20 h-20 rounded-full object-cover" />
          ) : (
            <p>No profile image</p>
          )}
        </div>

        {/* Button to Open Modal for Editing Profile */}
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 mt-4"
          onClick={() => setModalOpen(true)}
        >
          Update Profile
        </button>
      </div>

      {/* Profile Update Modal */}
      {isModalOpen && (
        <ProfileUpdateModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          onUpdate={handleProfileUpdate} 
        />
      )}
    </div>
  );
};

export default ProfilePage;
