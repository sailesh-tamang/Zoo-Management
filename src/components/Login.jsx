import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Navbar from './Navbar'; 
import instanced from "../service/api"; // Using the axios instance

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    setApiError("");  // Reset error message
    setLoading(true);  // Set loading state

    try {
      const response = await instanced.post("/auth/login", data); // Send login request

      if (response.data?.token) {
        console.log("Access Token:", response.data.token);  // Log the token to check

        // Store token in localStorage
        localStorage.setItem("token", response.data.token);
        
        // Navigate to dashboard
        navigate("/dashboard");
      } else {
        setApiError("Login failed! Check credentials.");
      }
    } catch (error) {
      // Handle any error (e.g., incorrect credentials or server error)
      setApiError(error.response?.data?.message || "Error logging in. Please try again.");
    } finally {
      setLoading(false);  // Reset loading state
      reset();  // Reset form after submission
    }
  };

  return (
    <div className="w-full bg-gray-100">
      {/* Navbar Component */}
      <Navbar />

      {/* Header Section */}
      <header className="relative w-full h-[50vh] flex items-center justify-center bg-brown">
        <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col items-center justify-center text-white">
          <h1 className="text-4xl font-bold text-center">Welcome To Zoo World</h1>
        </div>
      </header>

      {/* Login Form */}
      <section className="flex justify-center items-center bg-gray-50 py-10">
        <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-xl">
          <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Log in to Your Account</h2>

            {apiError && <p className="text-red-500 text-center">{apiError}</p>}

            {/* Email Input */}
            <div className="relative">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                placeholder="Email"
                {...register("email", { required: "Email is required" })}
                className="w-full border border-gray-300 p-4 rounded-md focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            {/* Password Input */}
            <div className="relative">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                placeholder="Password"
                {...register("password", { required: "Password is required" })}
                className="w-full border border-gray-300 p-4 rounded-md focus:ring-2 focus:ring-blue-500"
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full py-3 rounded-md text-white transition duration-300 ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
              }`}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-center mt-4 text-gray-600">
            Don't have an account?{" "}
            <a href="/register" className="text-blue-500 hover:underline">
              Register here
            </a>
          </p>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
