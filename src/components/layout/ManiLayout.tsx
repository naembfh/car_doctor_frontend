import { Outlet } from "react-router-dom";
import Navbar from "../shared/Navbar"


export default function MainLayout() {
  return (
    <>
      <Navbar></Navbar>
      <Outlet></Outlet>
    </>
  );
}
