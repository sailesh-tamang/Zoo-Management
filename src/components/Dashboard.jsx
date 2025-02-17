import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-blue-800 text-white py-4 text-center shadow-md">
        <h1 className="text-3xl font-bold">Zoo Management System</h1>
      </header>
      <div className="container mx-auto mt-8 flex flex-col items-center">
        <nav className="bg-gray-200 p-4 rounded-lg shadow-md w-full max-w-4xl flex justify-around">
          <Link to="/animals" className="px-4 py-2 rounded-lg font-semibold text-white bg-gray-400 hover:bg-gray-500">
            Animal Management
          </Link>
          <Link to="/feeding-schedule" className="px-4 py-2 rounded-lg font-semibold text-white bg-gray-400 hover:bg-gray-500">
            Feeding Schedule
          </Link>
          <Link to="/visitor-ticketing" className="px-4 py-2 rounded-lg font-semibold text-white bg-gray-400 hover:bg-gray-500">
            Visitor Ticketing
          </Link>
          <Link to="/petting-area" className="px-4 py-2 rounded-lg font-semibold text-white bg-gray-400 hover:bg-gray-500">
            Petting/Riding Area
          </Link>
          <Link to="/user-management" className="px-4 py-2 rounded-lg font-semibold text-white bg-gray-400 hover:bg-gray-500">
            User Management
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Dashboard;

