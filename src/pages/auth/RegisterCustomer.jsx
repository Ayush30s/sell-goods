import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const RegisterCustomerPage = () => {
  const initialData = { name: "", email: "", password: "" };
  const [formData, setFormData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const globalData = useSelector((store) => store.global);
  const isDarkMode = globalData.theme;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(`${"http://localhost:3000"}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setFormData(initialData);
        toast.success(data.message);
        navigate("/login");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen pt-10 pb-10 flex items-center justify-center px-4 transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900" : "bg-white"
      }`}
    >
      <div
        className={`w-full max-w-5xl rounded-sm shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 transition-colors duration-300 ${
          isDarkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
        }`}
      >
        {/* Left: Register Form */}
        <div className="flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            {/* Header */}
            <div className="text-center mb-8">
              <h1
                className={`text-3xl font-bold mb-2 transition-colors duration-300 ${
                  isDarkMode ? "text-gray-100" : "text-gray-900"
                }`}
              >
                Create Account
              </h1>
              <p
                className={`transition-colors duration-300 ${
                  isDarkMode ? "text-gray-300" : "text-gray-500"
                }`}
              >
                Join our shopping community
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  className={`w-full pl-10 pr-4 py-3 rounded-sm transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    isDarkMode
                      ? "bg-gray-700 text-gray-100 placeholder-gray-400 border-gray-600"
                      : "bg-gray-100 text-gray-900 placeholder-gray-400 border-gray-300"
                  }`}
                  value={formData.name}
                  onChange={handleChange}
                  required
                  autoComplete="off"
                />
              </div>

              {/* Email */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className={`w-full pl-10 pr-4 py-3 rounded-sm transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    isDarkMode
                      ? "bg-gray-700 text-gray-100 placeholder-gray-400 border-gray-600"
                      : "bg-gray-100 text-gray-900 placeholder-gray-400 border-gray-300"
                  }`}
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete="off"
                />
              </div>

              {/* Password */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  className={`w-full pl-10 pr-12 py-3 rounded-sm transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    isDarkMode
                      ? "bg-gray-700 text-gray-100 placeholder-gray-400 border-gray-600"
                      : "bg-gray-100 text-gray-900 placeholder-gray-400 border-gray-300"
                  }`}
                  value={formData.password}
                  onChange={handleChange}
                  required
                  autoComplete="off"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>

              {/* Register Button */}
              <button
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-sm shadow-lg hover:from-purple-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition transform hover:scale-105 disabled:opacity-50"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Creating account...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <User className="w-5 h-5 mr-2" />
                    Register
                  </div>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center">
              <div className="flex-1 border-t border-gray-200"></div>
              <span
                className={`px-4 text-sm transition-colors duration-300 ${
                  isDarkMode ? "text-gray-400" : "text-gray-400"
                }`}
              >
                or
              </span>
              <div className="flex-1 border-t border-gray-200"></div>
            </div>

            {/* Login Link */}
            <div className="text-center">
              <p
                className={`transition-colors duration-300 ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Already have an account?{" "}
                <button
                  className="text-blue-600 hover:text-blue-800 font-semibold transition hover:underline"
                  onClick={() => navigate("/login")}
                >
                  Sign In
                </button>
              </p>
            </div>
          </div>
        </div>

        {/* Right: Image */}
        <div className="hidden lg:block">
          <img
            src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1200&q=80"
            alt="Register illustration"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default RegisterCustomerPage;
