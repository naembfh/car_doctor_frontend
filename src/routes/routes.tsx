import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import LoginForm from '../pages/LoginForm';
import RegisterForm from '../pages/RegisterForm';
import Services from '../components/Services';
import ServiceDetail from '../components/ServiceDetail';
import NotFound from '../components/NotFound'; 
import ProtectedLayout from '../components/layout/ProtectedLayout';

import AdminDashboard from '../components/adminDashboard/AdminDashboard';
import PaymentSuccess from '../components/PaymentSuccess';
import ProfilePage from '../components/ProfilePage';
import AboutUsPage from '../components/AboutUspage';
import CurrentBooking from '../components/CurrentBooking';
import PastBooking from '../components/PastBooking';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedLayout />, 
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'services',
        element: <Services />,
      },
      {
        path: 'service/:id',
        element: <ServiceDetail />, 
      },
      {
        path: 'dashboard/current-bookings',
        element: <CurrentBooking />, 
      },
      {
        path: 'dashboard/past-bookings',
        element: <PastBooking />, 
      },
      {
        path: 'profile', 
        element: <ProfilePage></ProfilePage>,
      },
      {
        path: 'about', 
        element: <AboutUsPage></AboutUsPage>,
      },
      {
        path: 'admin',
        element: <AdminDashboard />, 
      },
      {
        path: 'success',
        element: <PaymentSuccess></PaymentSuccess>
      },
    ],
  },
  {
    path: '/login',
    element: <LoginForm />,
  },
  {
    path: '/register',
    element: <RegisterForm />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
