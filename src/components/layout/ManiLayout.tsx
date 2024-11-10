import { Outlet } from 'react-router-dom';
import Navbar from '../shared/Navbar';
import ScrollToTop from '../ScrollToTop';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className=''>
      <Navbar />
      {children || <Outlet />}
      <ScrollToTop></ScrollToTop>
      </div>
    </>
  );
};

export default MainLayout;
