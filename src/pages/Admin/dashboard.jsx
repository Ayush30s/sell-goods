import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./sideBar";
import { Menu } from "lucide-react";
import { useSelector } from "react-redux";

export default function AdminDashboard() {
  const globalData = useSelector((store) => store.global);
  const isDarkMode = globalData.theme;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Track window resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isSmallDevice = windowWidth < 768; // threshold for small devices

  return (
    <div
      className={`h-screen flex flex-col md:flex-row transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* Top bar for mobile */}
      <div className="md:hidden flex items-center justify-between p-4 shadow-sm">
        <h1 className="text-lg font-bold">Dashboard</h1>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed md:static z-40 transition-transform duration-300 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } md:flex-shrink-0 h-full w-72`}
      >
        <Sidebar closeSidebar={() => setIsSidebarOpen(false)} />
      </div>

      {/* Dark overlay for mobile */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm md:hidden"
        />
      )}

      {/* Content Area */}
      <div className="flex-1 h-full overflow-y-auto p-4 md:p-6">
        {isSmallDevice && (
          <div
            className={`mb-4 p-3 rounded-md text-sm border-l-4 ${
              isDarkMode
                ? "bg-gray-800 border-yellow-400 text-yellow-300"
                : "bg-yellow-50 border-yellow-500 text-yellow-700"
            }`}
          >
            ⚠️ For a better experience, use a desktop or laptop. <br />
            The graphs are showing a limited amount of data due to the small
            screen size. Hover on the chart to see details, or switch to a
            larger display to view the complete data.
          </div>
        )}

        <Outlet />
      </div>
    </div>
  );
}
