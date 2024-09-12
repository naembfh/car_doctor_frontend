import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';
import { selectCurrentUser } from '../../redux/features/authSlice';
import MainLayout from './ManiLayout';

const ProtectedLayout = () => {
  const user = useSelector(selectCurrentUser, (prev, next) => prev === next);

  return user ? (
    <DashboardLayout>
      {/* <Outlet /> */}
    </DashboardLayout>
  ) : (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};

export default ProtectedLayout;
