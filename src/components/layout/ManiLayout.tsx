import { Outlet } from 'react-router-dom';
import Navbar from '../shared/Navbar';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      {children || <Outlet />}
    </>
  );
};

export default MainLayout;
