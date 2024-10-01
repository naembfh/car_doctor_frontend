import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation, Navigate } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';
import { selectCurrentUser, setUser } from '../../redux/features/authSlice';
import MainLayout from './ManiLayout';

const ProtectedLayout = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(setUser({ token }));
    }
  }, [dispatch]);

  const isHomeRoute = location.pathname === '/';
  const isServiceOrDetailRoute = location.pathname.startsWith('/services') || location.pathname.startsWith('/service/');
  const isDashboardRoute = location.pathname.startsWith('/dashboard');
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isProfileRoute = location.pathname.startsWith('/profile');

  // Always use MainLayout for Home
  if (isHomeRoute) {
    return (
      <MainLayout>
        <Outlet />
      </MainLayout>
    );
  }

  // Use DashboardLayout for Services and ServiceDetail if user is logged in
  if (isServiceOrDetailRoute) {
    return user ? (
      <DashboardLayout>
        {/* <Outlet /> */}
      </DashboardLayout>
    ) : (
      <MainLayout>
        <Outlet />
      </MainLayout>
    );
  }

  // Admin-specific routes
  if (isAdminRoute) {
    return user?.role === 'admin' ? (
      <DashboardLayout>
        {/* <Outlet /> */}
      </DashboardLayout>
    ) : (
      <Navigate to="/" /> 
    );
  }

  // Profile route for both user and admin
  if (isProfileRoute) {
    return user ? (
      <DashboardLayout>
        {/* <Outlet /> */}
      </DashboardLayout>
    ) : (
      <Navigate to="/login" />
    );
  }

  // Regular user dashboard (MyBooking route)
  if (isDashboardRoute) {
    return user ? (
      user.role === 'user' || user.role === 'admin' ? ( 
        <DashboardLayout>
          {/* <Outlet /> */}
        </DashboardLayout>
      ) : (
        <Navigate to="/admin" /> 
      )
    ) : (
      <MainLayout>
        <Outlet />
      </MainLayout>
    );
  }

  // Default to MainLayout for any other route
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};

export default ProtectedLayout;
