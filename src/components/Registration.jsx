import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import instanced from "../service/api"; 

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();
  
  const navigate = useNavigate();
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);
  const password = watch("password", ""); // Ensure confirmPassword updates dynamically

  const handleRegister = async (data) => {
    setApiError("");
    setLoading(true);

    try {
      await instanced.post("/auth/register", {
        name: data.name,
        email: data.email,
        password: data.password,
      });

      alert("Registration successful!");
      reset();
      navigate("/login");
    } catch (error) {
      setApiError(error.response?.data?.message || "Error during registration");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-gray-100">

      {/* Header Section */}
      <header className="relative w-full h-[60vh] flex items-center justify-center bg-brown">
        <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col items-center justify-center text-white">
          <h1 className="text-4xl font-bold text-center">Welcome To  Zoo World</h1>
        </div>
      </header>

      {/* Registration Form */}
      <section className="flex justify-center items-center py-10">
        <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-xl">
          <form onSubmit={handleSubmit(handleRegister)} className="space-y-6">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Create Your Account</h2>

            {apiError && <p className="text-red-500 text-center">{apiError}</p>}

            {/* Name Input */}
            <div className="relative">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                placeholder="Name"
                {...register("name", { required: "Name is required" })}
                className="w-full border border-gray-300 p-4 rounded-md focus:ring-2 focus:ring-blue-500"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>

            {/* Email Input */}
            <div className="relative">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                placeholder="Email"
                {...register("email", { 
                  required: "Email is required",
                  pattern: { value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/, message: "Invalid email format" }
                })}
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
                {...register("password", { 
                  required: "Password is required", 
                  minLength: { value: 6, message: "Password must be at least 6 characters" } 
                })}
                className="w-full border border-gray-300 p-4 rounded-md focus:ring-2 focus:ring-blue-500"
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>

            {/* Confirm Password Input */}
            <div className="relative">
              <label className="block text-gray-700">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm Password"
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value) => value === password || "Passwords do not match",
                })}
                className="w-full border border-gray-300 p-4 rounded-md focus:ring-2 focus:ring-blue-500"
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className={`w-full py-3 rounded-md text-white transition duration-300 ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
              }`}
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          <p className="text-center mt-4 text-gray-600">
            Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login here</Link>
          </p>
        </div>
      </section>
    </div>
  );
};

export default RegisterPage;
