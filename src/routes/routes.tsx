// src/routes/routes.tsx
import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import LoginForm from '../pages/LoginForm';
import RegisterForm from '../pages/RegisterForm';
import Services from '../components/Services';
import ServiceDetail from '../components/ServiceDetail';
import NotFound from '../components/NotFound'; // Add a NotFound component for undefined routes

import App from '../App';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // Use ProtectedLayout for routes
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
