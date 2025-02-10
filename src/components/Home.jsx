import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function Home() {
  const navigate = useNavigate();

  const handleDashboardClick = () => {
    navigate("/dashboard");
  };

  return (
    <div>
      <Navbar />
      {/* Hero Section */}
      <div
        className="h-screen bg-cover bg-center flex flex-col items-center justify-center text-center"
        style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?technology,modern')" }}
      >
        <h1 className="text-5xl font-bold text-black drop-shadow-lg">
          Welcome to Our Website
        </h1>
        <p className="text-lg text-white mt-4 max-w-2xl">
          Explore our amazing services and take your experience to the next level.
        </p>
        <button
          className="mt-6 bg-red-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition"
          onClick={handleDashboardClick}
        >
          Dashboard
        </button>
      </div>
    </div>
  );
}

export default Home;
