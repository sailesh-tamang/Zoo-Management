import React, { useState } from "react";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState(null);

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-blue-800 text-white py-4 text-center shadow-md">
        <h1 className="text-3xl font-bold">Zoo Management System</h1>
      </header>

      {/* Sidebar and Content */}
      <div className="container mx-auto mt-8 flex flex-col items-center">
        {/* Navigation Buttons */}
        <nav className="bg-gray-200 p-4 rounded-lg shadow-md w-full max-w-4xl flex justify-around">
          <button
            className={`px-4 py-2 rounded-lg font-semibold text-white shadow-md ${
              activeSection === "animal-details" ? "bg-black" : "bg-gray-400 hover:bg-gray-500"
            }`}
            onClick={() => toggleSection("animal-details")}
          >
            Animal Details
          </button>
          <button
            className={`px-4 py-2 rounded-lg font-semibold text-white shadow-md ${
              activeSection === "feeding-schedule" ? "bg-black" : "bg-gray-400 hover:bg-gray-500"
            }`}
            onClick={() => toggleSection("feeding-schedule")}
          >
            Feeding Schedule
          </button>
          <button
            className={`px-4 py-2 rounded-lg font-semibold text-white shadow-md ${
              activeSection === "visitor-ticketing" ? "bg-black" : "bg-gray-400 hover:bg-gray-500"
            }`}
            onClick={() => toggleSection("visitor-ticketing")}
          >
            Visitor Ticketing
          </button>
          <button
            className={`px-4 py-2 rounded-lg font-semibold text-white shadow-md ${
              activeSection === "petting-area" ? "bg-black" : "bg-gray-400 hover:bg-gray-500"
            }`}
            onClick={() => toggleSection("petting-area")}
          >
            Petting/Riding Area
          </button>
        </nav>

        {/* Content Sections */}
        <div className="bg-white w-full max-w-4xl mt-6 p-6 rounded-lg shadow-lg">
          {activeSection === "animal-details" && (
            <section>
              <h2 className="text-2xl font-bold mb-4">Animal Details</h2>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Animal Name"
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Cage Number"
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Species"
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <input
                  type="number"
                  placeholder="Number of Animals"
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <div className="flex space-x-4">
                  <input
                    type="number"
                    placeholder="Males"
                    className="w-1/2 px-4 py-2 border rounded-lg"
                  />
                  <input
                    type="number"
                    placeholder="Females"
                    className="w-1/2 px-4 py-2 border rounded-lg"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Add Animal
                </button>
              </form>
            </section>
          )}

          {activeSection === "feeding-schedule" && (
            <section>
              <h2 className="text-2xl font-bold mb-4">Feeding Schedule</h2>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Cage Number"
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <div className="flex space-x-4">
                  <input
                    type="time"
                    className="w-1/2 px-4 py-2 border rounded-lg"
                  />
                  <input
                    type="time"
                    className="w-1/2 px-4 py-2 border rounded-lg"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Add Feeding Times
                </button>
              </form>
            </section>
          )}

          {activeSection === "visitor-ticketing" && (
            <section>
              <h2 className="text-2xl font-bold mb-4">Visitor Ticketing</h2>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Visitor Name"
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Contact Number"
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <select className="w-full px-4 py-2 border rounded-lg">
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                <input
                  type="text"
                  placeholder="Ticket Price"
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Add Visitor
                </button>
              </form>
            </section>
          )}

          {activeSection === "petting-area" && (
            <section>
              <h2 className="text-2xl font-bold mb-4">Petting/Riding Area</h2>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Animal (Horse/Elephant)"
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Interaction Type (Ride/Petting)"
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Ticket Price"
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Add Interaction
                </button>
              </form>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;