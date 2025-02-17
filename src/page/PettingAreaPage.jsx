import React, { useState, useEffect } from "react";
import instanced from "../service/api"; // Import your axios instance

const PettingAreaPage = () => {
  const [bookings, setBookings] = useState([]); // State to hold booking data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [isUpdating, setIsUpdating] = useState(false); // Track if we are updating a booking
  const [currentBooking, setCurrentBooking] = useState(null); // Store the current booking for update

  // Fetch all bookings on component mount
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await instanced.get("/pettingRidingArea"); // Endpoint to fetch all bookings
        setBookings(response.data.data); // Set booking data from response
        setLoading(false); // Set loading to false after data is fetched
      } catch (err) {
        setError("Error fetching bookings."); // Set error state if request fails
        setLoading(false); // Set loading to false after error
      }
    };

    fetchBookings();
  }, []); // Empty dependency array to fetch once when component mounts

  // Function to handle booking creation
  const handleCreate = async (e) => {
    e.preventDefault();
    const { visitorName, contact, activityType, animalType, bookingDate, duration, price } = e.target;

    try {
      const response = await instanced.post("/pettingRidingArea", { // API endpoint to create a booking
        visitorName: visitorName.value,
        contact: contact.value,
        activityType: activityType.value,
        animalType: animalType.value,
        bookingDate: bookingDate.value,
        duration: duration.value,
        price: price.value,
      });
      setBookings([...bookings, response.data.data]); // Add new booking to state
    } catch (err) {
      setError("Error creating booking.");
    }
  };

  // Function to handle booking updating
  const handleUpdate = async (e) => {
    e.preventDefault();
    const { visitorName, contact, activityType, animalType, bookingDate, duration, price } = e.target;

    try {
      const response = await instanced.put(`/pettingRidingArea/${currentBooking.id}`, { // API endpoint to update booking by ID
        visitorName: visitorName.value,
        contact: contact.value,
        activityType: activityType.value,
        animalType: animalType.value,
        bookingDate: bookingDate.value,
        duration: duration.value,
        price: price.value,
      });
      setBookings(
        bookings.map((booking) =>
          booking.id === currentBooking.id ? response.data.data : booking
        )
      );
      setIsUpdating(false); // Reset update state
      setCurrentBooking(null); // Reset current booking
    } catch (err) {
      setError("Error updating booking.");
    }
  };

  // Function to handle booking deletion
  const handleDelete = async (bookingId) => {
    try {
      await instanced.delete(`/pettingRidingArea/${bookingId}`); // API endpoint to delete booking by ID
      setBookings(bookings.filter((booking) => booking.id !== bookingId)); // Remove booking from state
    } catch (err) {
      setError("Error deleting booking.");
    }
  };

  // Render loading message or error if any
  if (loading) {
    return <div>Loading...</div>; // Loading spinner or message
  }

  if (error) {
    return <div>{error}</div>; // Display error message
  }

  return (
    <div>
      <h1>Petting and Riding Area Booking</h1>

      {/* Create or Update Form */}
      <form onSubmit={isUpdating ? handleUpdate : handleCreate}>
        <label>Visitor Name:</label>
        <input
          type="text"
          name="visitorName"
          defaultValue={isUpdating ? currentBooking.visitorName : ""}
          required
        />
        <label>Contact:</label>
        <input
          type="text"
          name="contact"
          defaultValue={isUpdating ? currentBooking.contact : ""}
          required
        />
        <label>Activity Type:</label>
        <select name="activityType" defaultValue={isUpdating ? currentBooking.activityType : "Petting"}>
          <option value="Petting">Petting</option>
          <option value="Riding">Riding</option>
        </select>
        <label>Animal Type:</label>
        <input
          type="text"
          name="animalType"
          defaultValue={isUpdating ? currentBooking.animalType : ""}
          required
        />
        <label>Booking Date:</label>
        <input
          type="date"
          name="bookingDate"
          defaultValue={isUpdating ? currentBooking.bookingDate : ""}
          required
        />
        <label>Duration:</label>
        <input
          type="number"
          name="duration"
          defaultValue={isUpdating ? currentBooking.duration : ""}
          required
        />
        <label>Price:</label>
        <input
          type="number"
          name="price"
          defaultValue={isUpdating ? currentBooking.price : ""}
          required
        />
        <button type="submit">{isUpdating ? "Update Booking" : "Create Booking"}</button>
      </form>

      {/* Booking List Table */}
      <h2>Booking List</h2>
      {bookings.length === 0 ? (
        <p>No bookings found</p> // If no bookings are found
      ) : (
        <table>
          <thead>
            <tr>
              <th>Visitor Name</th>
              <th>Contact</th>
              <th>Activity Type</th>
              <th>Animal Type</th>
              <th>Booking Date</th>
              <th>Duration</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.visitorName}</td>
                <td>{booking.contact}</td>
                <td>{booking.activityType}</td>
                <td>{booking.animalType}</td>
                <td>{booking.bookingDate}</td>
                <td>{booking.duration}</td>
                <td>{booking.price}</td>
                <td>
                  {/* Add actions for booking, e.g., Update, Delete */}
                  <button onClick={() => { setIsUpdating(true); setCurrentBooking(booking); }}>Update</button>
                  <button onClick={() => handleDelete(booking.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PettingAreaPage;
