import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-sm p-10 max-w-lg w-full text-center">
        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          Welcome to Our E-Commerce Platform
        </h1>
        <p className="text-gray-600 mb-8">
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
            className="w-full py-3 rounded-sm bg-gray-200 text-gray-800 font-semibold shadow hover:bg-gray-300 transition duration-200"
          >
            Sign In
          </button>
        </div>

        {/* Info */}
        <p className="text-sm text-gray-500 mt-6">
          ⚠️ Note: One email address can only have <b>one role</b>.
        </p>
      </div>
    </div>
  );
};

export default Register;
