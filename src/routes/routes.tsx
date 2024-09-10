import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import LoginForm from "../pages/LoginForm";
import RegisterForm from "../pages/RegisterForm";
import DashboardSidebar from "../components/shared/DashboardSidebar";
import Services from "../components/Services";
 // Import the Services component

const router = createBrowserRouter([
    {
        path: "/home",
        element: <Home></Home>
    },
    {
        path: "/",
        element: <Home></Home>
    },
    {
        path: "/login",
        element: <LoginForm></LoginForm>
    },
    {
        path: "/register",
        element: <RegisterForm></RegisterForm>
    },
    {
        path: "/dashboard",
        element: <DashboardSidebar></DashboardSidebar>,
        children: [
            {
                path: "/dashboard", // Render services on the main dashboard
                element: <Services></Services>
            },
            {
                path: "services", // Render services on /dashboard/services
                element: <Services></Services>
            }
        ]
    },
]);

export default router;
