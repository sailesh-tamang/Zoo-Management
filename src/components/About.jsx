import React from "react";
import { useNavigate } from "react-router-dom";

function About() {
  const navigate = useNavigate();

  const handleContactUs = () => {
    navigate("/contact");
  };

  return (
    <>
      
      <div
        className="bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?zoo')" }}
      >
      </div>
      <div className="max-w-4xl mx-auto p-8 text-gray-700">
        <h2 className="text-3xl font-bold text-center mb-6">About Our Zoo Management System</h2>
        <p className="text-lg leading-relaxed text-center">
          Welcome to our Zoo Management System. Our system is designed to efficiently manage the zoo's operations, including animal care, staff management, and visitor services. We aim to provide a seamless experience for both zoo staff and visitors, ensuring the well-being of our animals and the satisfaction of our guests.
        </p>

        <h2 className="text-3xl font-bold text-center mt-10 mb-6">Our Mission</h2>
        <p className="text-lg leading-relaxed text-center">
          Our mission is to create a safe and enjoyable environment for both animals and visitors. We strive to promote wildlife conservation and education through our zoo management practices. Our goal is to inspire a love for animals and a commitment to preserving their natural habitats.
        </p>

        <h2 className="text-3xl font-bold text-center mt-10 mb-6">Rules and Regulations</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed">
          <li>All visitors must follow the designated pathways and avoid restricted areas.</li>
          <li>Do not feed the animals unless supervised by zoo staff.</li>
          <li>Maintain a safe distance from the animal enclosures.</li>
          <li>Respect the zoo's opening and closing hours.</li>
          <li>Dispose of trash in the designated bins to keep the zoo clean.</li>
          <li>Children must be supervised by an adult at all times.</li>
          <li>Flash photography is prohibited to avoid disturbing the animals.</li>
          <li>Follow the instructions of zoo staff for your safety and the safety of the animals.</li>
        </ul>

        <div className="flex justify-center mt-10">
          <button
            className="bg-red-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-600 transition"
            onClick={handleContactUs}
          >
            Contact Us
          </button>
        </div>
        <div className="flex justify-center mt-10">
          <p>
            @designed and developed by HamroGroup
          </p>
        </div>
      </div>
    </>
  );
}

export default About;
