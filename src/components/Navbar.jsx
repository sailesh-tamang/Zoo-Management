import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
      <div className="flex justify-evenly text-white bg-black h-[100px]">
        <ul className="hidden md:flex text-lg justify-evenly w-full max-w-4xl">
          <li className="mx-[25px] cursor-pointer flex items-center justify-center">
            <Link to="/home" className="hover:text-gray-300">Home</Link>
          </li>
          <li className="mx-[25px] cursor-pointer flex items-center justify-center">
            <Link to="/dashboard" className="hover:text-gray-300">Dashboard</Link>
          </li>
          
          <li className="mx-[25px] cursor-pointer flex items-center justify-center">
            <Link to="/about" className="hover:text-gray-300">About</Link>
          </li>

          <li className="mx-[25px] cursor-pointer flex items-center justify-center">
            <Link to="/contact" className="hover:text-gray-300">Contact Us</Link>
          </li>
          <li className="mx-[25px] cursor-pointer flex items-center justify-center">
            <Link to="/login" className="hover:text-gray-300">Login</Link>
          </li>
          <li className="mx-[25px] cursor-pointer flex items-center justify-center">
            <Link to="/register" className="hover:text-gray-300">Signup</Link>
          </li>
        </ul>
      </div>
  );
}

export default Navbar;
