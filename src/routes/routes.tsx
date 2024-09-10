import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import LoginForm from "../pages/LoginForm";
import RegisterForm from "../pages/RegisterForm";
import DashboardSidebar from "../components/shared/DashboardSidebar";
import Services from "../components/Services";
import ServiceDetail from "../components/ServiceDetail";
import NotFound from "../components/NotFound"; // Add a NotFound component for undefined routes

const router = createBrowserRouter([
    {
        path: "/home",
        element: <Home />,
    },
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/login",
        element: <LoginForm />,
    },
    {
        path: "/register",
        element: <RegisterForm />,
    },
    {
        path: "/dashboard",
        element: <DashboardSidebar />,
        children: [
            {
                path: "",
                element: <Services />, // Default dashboard route renders services
            },
            {
                path: "services",
                element: <Services />, // Explicit /dashboard/services route for services
            },
            {
                path: "service/:id", // Route for service details with dynamic id
                element: <ServiceDetail />,
            },
        ],
    },
    {
        path: "*",
        element: <NotFound />, // Catch-all route for undefined paths
    },
]);

export default router;
