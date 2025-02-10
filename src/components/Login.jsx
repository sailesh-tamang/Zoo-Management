

import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar"; // Assuming you have a Navbar component


const Login = () => {
  const navigate = useNavigate();

  const handleCreateAccount = () => {
    navigate("/signup");
  };

  const handleLogin = () => {
    // Add your login logic here
    // No navigation to home
  };

  return (
    <div>
      <Navbar /> {/* Include the Navbar component */}
      <div className="login-container flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold">Welcome To Zoo Management System </h1>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-lg w-96">
          <h1 className="text-2xl font-semibold text-center mb-4">Login Form</h1>
          <form>
            <div className="mb-4">
              <input
                type="email"
                id="email"
                placeholder="Email or Phone Number"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                id="password"
                placeholder="Password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="button"
              onClick={handleLogin}
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Log In
            </button>
          </form>
          <hr className="my-4" />
          <button
            type="button"
            onClick={handleCreateAccount}
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
          >
            Signup
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
