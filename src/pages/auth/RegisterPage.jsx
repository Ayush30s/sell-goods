import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const globalData = useSelector((store) => store.global);
  const isDarkMode = globalData.theme;

  return (
    <div
      className={`flex items-center justify-center min-h-screen px-4 transition-colors duration-300 ${
        isDarkMode
          ? "bg-gray-900"
          : "bg-white"
      }`}
    >
      <div
        className={`max-w-lg w-full p-10 text-center rounded-sm shadow-xl transition-colors duration-300 ${
          isDarkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
        }`}
      >
        {/* Title */}
        <h1
          className={`text-3xl font-bold mb-3 transition-colors duration-300 ${
            isDarkMode ? "text-gray-100" : "text-gray-800"
          }`}
        >
          Welcome to Our E-Commerce Platform
        </h1>
        <p
          className={`mb-8 transition-colors duration-300 ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Join us today! Choose your role to get started.
        </p>

        {/* Buttons */}
        <div className="grid gap-4">
          <button
            onClick={() => navigate("/register-customer")}
            className="w-full py-3 rounded-sm bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition duration-200"
          >
            Register as Customer
          </button>
          <button
            onClick={() => navigate("/register-admin")}
            className="w-full py-3 rounded-sm bg-green-600 text-white font-semibold shadow hover:bg-green-700 transition duration-200"
          >
            Register as Admin
          </button>
          <button
            onClick={() => navigate("/login")}
            className={`w-full py-3 rounded-sm font-semibold shadow transition duration-200 ${
              isDarkMode
                ? "bg-gray-700 text-gray-100 hover:bg-gray-600"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            Sign In
          </button>
        </div>

        {/* Info */}
        <p
          className={`text-sm mt-6 transition-colors duration-300 ${
            isDarkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          ⚠️ Note: One email address can only have <b>one role</b>.
        </p>
      </div>
    </div>
  );
};

export default Register;
