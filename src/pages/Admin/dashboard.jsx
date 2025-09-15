import { Outlet } from "react-router-dom";
import Sidebar from "./sideBar";

export default function AdminDashboard() {
  return (
    <div className="h-screen flex bg-gray-100 overflow-hidden">
      {/* Left Sidebar - fixed, not scrollable */}
      <div className="h-full flex-shrink-0">
        <Sidebar />
      </div>

      {/* Right Content - scrollable */}
      <div className="flex-1 h-full overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}
