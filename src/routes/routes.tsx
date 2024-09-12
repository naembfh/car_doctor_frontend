// src/routes/routes.tsx
import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import LoginForm from '../pages/LoginForm';
import RegisterForm from '../pages/RegisterForm';
import Services from '../components/Services';
import ServiceDetail from '../components/ServiceDetail';
import NotFound from '../components/NotFound'; 
import ProtectedLayout from '../components/layout/ProtectedLayout';
import MyBooking from '../components/MyBooking';
import AdminDashboard from '../components/adminDashboard/AdminDashboard';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedLayout/>, 
    children: [
      {
        index: true,
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
        path: 'booking',
        element: <MyBooking/>,
      },
      {
        path: 'management',
        element: <AdminDashboard></AdminDashboard>
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
    element: <NotFound />, // Catch-all route for undefined paths
  },
]);

export default router;
