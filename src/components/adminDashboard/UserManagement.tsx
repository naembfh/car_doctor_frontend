import { useState } from 'react';
import { useAllUserQuery, useUpdateUserRoleMutation } from '../../redux/api/authApi';
import { toast } from 'sonner';

const UserManagement = () => {
  const { data, error, isLoading } = useAllUserQuery({});
  const [updateUserRole] = useUpdateUserRoleMutation();
  const users = data?.data || [];

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 8;

  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(users.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRoleChange = (userId: string, newRole: string) => {
    updateUserRole({ userId, newRole })
      .then(() => {
        toast.success(`User role updated to ${newRole}`);
      })
      .catch(() => {
        toast.error('Failed to update user role');
      });
  };

  if (isLoading) {
    return <p className="text-white">Loading users...</p>;
  }

  if (error) {
    return <p className="text-white">Failed to load users. Please try again.</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-white mb-4">User Management</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border-2 border-gray-700 rounded-md bg-gray-800">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-4 py-2 border-2 border-gray-700 font-semibold text-white">Username</th>
              <th className="px-4 py-2 border-2 border-gray-700 font-semibold text-white">Email</th>
              <th className="px-4 py-2 border-2 border-gray-700 font-semibold text-white">Role</th>
              <th className="px-4 py-2 border-2 border-gray-700 font-semibold text-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.length > 0 ? (
              currentUsers.map((user: { _id: string; name: string; email: string; role: string }) => (
                <tr key={user._id} className="hover:bg-gray-700">
                  <td className="px-4 py-2 border-2 border-gray-700 text-white">{user.name}</td>
                  <td className="px-4 py-2 border-2 border-gray-700 text-white">{user.email}</td>
                  <td className="px-4 py-2 border-2 border-gray-700 text-white">{user.role}</td>
                  <td className="px-4 py-2 border-2 border-gray-700">
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user._id, e.target.value)}
                      className="px-2 py-1 border-2 border-gray-700 rounded-md bg-gray-600 text-white"
                    >
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-4 text-white">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-center space-x-2">
        <button
          className={`px-4 py-2 border-2 border-gray-700 rounded-md ${currentPage === 1 ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-500'}`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
          <button
            key={number}
            className={`px-4 py-2 border-2 border-gray-700 rounded-md ${number === currentPage ? 'bg-blue-600 text-white' : 'bg-gray-600 text-white hover:bg-gray-500'}`}
            onClick={() => handlePageChange(number)}
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
  );
};

export default UserManagement;
