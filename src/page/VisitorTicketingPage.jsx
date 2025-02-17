import React, { useState, useEffect } from "react";
import instanced from "../service/api"; // Import your axios instance

const VisitorTicketingPage = () => {
  const [tickets, setTickets] = useState([]); // State to hold ticket data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [isUpdating, setIsUpdating] = useState(false); // Track if we are updating a ticket
  const [currentTicket, setCurrentTicket] = useState(null); // Store the current ticket for update

  // Fetch all tickets on component mount
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await instanced.get("/tickets"); // Updated API endpoint
        setTickets(response.data); // Set ticket data from response
        setLoading(false); // Set loading to false after data is fetched
      } catch (err) {
        setError("Error fetching tickets.");
        setLoading(false); // Set loading to false after error
      }
    };

    fetchTickets();
  }, []); // Empty dependency array to fetch once when component mounts

  // Function to handle ticket creation
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const { ticketType, price, quantity } = e.target;
      const response = await instanced.post("/tickets", { // Updated API endpoint
        ticketType: ticketType.value,
        price: price.value,
        quantity: quantity.value,
      });
      setTickets([...tickets, response.data]); // Add new ticket to state
    } catch (err) {
      setError("Error creating ticket.");
    }
  };

  // Function to handle ticket update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { ticketType, price, quantity } = e.target;
      const response = await instanced.put(`/tickets/${currentTicket.id}`, { // Updated API endpoint
        ticketType: ticketType.value,
        price: price.value,
        quantity: quantity.value,
      });
      setTickets(
        tickets.map((ticket) =>
          ticket.id === currentTicket.id ? response.data : ticket
        )
      );
      setIsUpdating(false);
      setCurrentTicket(null); // Reset update state
    } catch (err) {
      setError("Error updating ticket.");
    }
  };

  // Function to handle ticket deletion
  const handleDelete = async (ticketId) => {
    try {
      await instanced.delete(`/tickets/${ticketId}`); // Updated API endpoint
      setTickets(tickets.filter((ticket) => ticket.id !== ticketId)); // Remove ticket from state
    } catch (err) {
      setError("Error deleting ticket.");
    }
  };

  // Function to set current ticket for updating
  const handleEdit = (ticket) => {
    setIsUpdating(true);
    setCurrentTicket(ticket);
  };

  // Render loading message or error if any
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Visitor Ticketing</h1>

      {/* Create or Update Form */}
      <form onSubmit={isUpdating ? handleUpdate : handleCreate}>
        <label>Ticket Type:</label>
        <input
          type="text"
          name="ticketType"
          defaultValue={isUpdating ? currentTicket.ticketType : ""}
          required
        />
        <label>Price:</label>
        <input
          type="number"
          name="price"
          defaultValue={isUpdating ? currentTicket.price : ""}
          required
        />
        <label>Quantity:</label>
        <input
          type="number"
          name="quantity"
          defaultValue={isUpdating ? currentTicket.quantity : ""}
          required
        />
        <button type="submit">{isUpdating ? "Update Ticket" : "Create Ticket"}</button>
      </form>

      {/* Ticket List Table */}
      <h2>Ticket List</h2>
      {tickets.length === 0 ? (
        <p>No tickets found</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Ticket Type</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.id}>
                <td>{ticket.ticketType}</td>
                <td>{ticket.price}</td>
                <td>{ticket.quantity}</td>
                <td>
                  <button onClick={() => handleEdit(ticket)}>Edit</button>
                  <button onClick={() => handleDelete(ticket.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default VisitorTicketingPage;
