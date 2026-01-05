import { Outlet } from "react-router-dom";
import Sidebar from "../Shared/Sidebar/Sidebar";

const DashboardLayout = () => {
  return (
    <div className="relative min-h-screen md:flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Outlet */}
      <div className="flex-1 md:ml-72 md:p-10 p-6 ">
        <div className="min-h-[calc(100vh-80px)]  ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
