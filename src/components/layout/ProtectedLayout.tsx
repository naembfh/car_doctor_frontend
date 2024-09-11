import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/features/authSlice";
import DashboardSidebar from "../shared/DashboardSidebar";
import { Outlet } from "react-router-dom";
import MainLayout from "./ManiLayout";
import DashboardLayout from "./DashboardLayout";

const ProtectedLayout = () => {
  const user = useSelector(selectCurrentUser);

  if (user) {
    return (
      <DashboardLayout>
        <Outlet />
      </DashboardLayout>
    );
  }

  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};

export default ProtectedLayout;
