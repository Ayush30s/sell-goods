import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Lock, User, Building } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { categoriesResgiter } from "../../utils/Rawdata";

// Validation schema (removed role field)
const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  permissions: z.string().optional(),
  shopName: z.string().min(2, "Shop/Brand name is required"),
  address: z.object({
    street: z.string().min(2, "Street is required"),
    city: z.string().min(2, "City is required"),
    state: z.string().min(2, "State is required"),
  }),
  productTypes: z.array(z.string()).min(1, "Select at least one product type"),
});

export default function RegisterAdminPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { productTypes: [] },
  });

  const selectedProductTypes = watch("productTypes");
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    try {
      const permissions = data.permissions
        ? data.permissions.split(",").map((p) => p.trim())
        : [];

      // Force role as "admin"
      const payload = { ...data, permissions, role: "admin" };

      const res = await fetch("http://localhost:3000/api/admin/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const response = await res.json();
      if (res.ok) {
        toast.success("Admin registered successfully ✅");
        reset();
        navigate("/login");
      } else {
        toast.error(response.message || "Failed to register admin ❌");
      }
    } catch (err) {
      toast.error("Something went wrong ❌");
      console.error(err);
    }
  };

  // Handle checkbox toggle
  const toggleProductType = (type) => {
    const updated = selectedProductTypes.includes(type)
      ? selectedProductTypes.filter((t) => t !== type)
      : [...selectedProductTypes, type];
    setValue("productTypes", updated, { shouldValidate: true });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-28 pb-10 flex items-center justify-center px-4">
        <div className="w-full max-w-6xl bg-white rounded-sm shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
          {/* Left: Form */}
          <div className="flex items-center justify-center p-8">
            <div className="w-full max-w-md">
              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Register as Admin
                </h1>
                <p className="text-gray-500">
                  Create your shop and start selling
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Full Name */}
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Full Name"
                    {...register("name")}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    placeholder="Email Address"
                    {...register("email")}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    {...register("password")}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                  {errors.password && (
                    <p className="text-red-500 text-sm">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Shop/Brand Name */}
                <div className="relative">
                  <Building className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Shop / Brand Name"
                    {...register("shopName")}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  {errors.shopName && (
                    <p className="text-red-500 text-sm">
                      {errors.shopName.message}
                    </p>
                  )}
                </div>

                {/* Address */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  <input
                    type="text"
                    placeholder="Street"
                    {...register("address.street")}
                    className="w-full py-3 px-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <input
                    type="text"
                    placeholder="City"
                    {...register("address.city")}
                    className="w-full py-3 px-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <input
                    type="text"
                    placeholder="State"
                    {...register("address.state")}
                    className="w-full py-3 px-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                {errors.address && (
                  <p className="text-red-500 text-sm">
                    Fill all address fields properly
                  </p>
                )}

                {/* Product Types */}
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Product Types
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {categoriesResgiter.map((cat) => (
                      <label
                        key={cat}
                        className="flex items-center gap-2 text-sm"
                      >
                        <input
                          type="checkbox"
                          checked={selectedProductTypes.includes(cat)}
                          onChange={() => toggleProductType(cat)}
                          disabled={
                            selectedProductTypes.includes("All") &&
                            cat !== "All"
                          }
                        />
                        {cat}
                      </label>
                    ))}
                  </div>
                  {errors.productTypes && (
                    <p className="text-red-500 text-sm">
                      {errors.productTypes.message}
                    </p>
                  )}
                </div>

                {/* Permissions */}
                <input
                  type="text"
                  placeholder="Permissions (comma separated)"
                  {...register("permissions")}
                  className="w-full py-3 px-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-sm shadow-lg hover:from-purple-600 hover:to-blue-600 transition transform hover:scale-105 disabled:opacity-50"
                >
                  {isSubmitting ? "Registering..." : "Register Admin"}
                </button>
              </form>
            </div>
          </div>

          {/* Right: Image */}
          <div className="hidden lg:block">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80"
              alt="Admin Register"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </>
  );
}
