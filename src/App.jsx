import "./App.css";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useSelector } from "react-redux";

const App = () => {
  // Get theme mode from Redux store
  const globalData = useSelector((store) => store.global);
  const isDarkMode = globalData.theme;

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        isDarkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
      }`}
    >
      <Navbar />
      <div className="pt-4">
        <Outlet />
      </div>
    </div>
  );
};

export default App;
