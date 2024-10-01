import { Outlet } from 'react-router-dom';
import Navbar from '../shared/Navbar';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className=''>
      <Navbar />
      {children || <Outlet />}
      </div>
    </>
  );
};

export default MainLayout;
