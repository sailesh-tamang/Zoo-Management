import React, { useState, useEffect } from "react";
import instanced from "../service/api"; // Import your axios instance

const UserManagementPage = () => {
  const [users, setUsers] = useState([]); // State to hold user data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [isUpdating, setIsUpdating] = useState(false); // Track if we are updating a user
  const [currentUser, setCurrentUser] = useState(null); // Store the current user for update

  // Fetch all users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await instanced.get("/users"); // Endpoint to fetch all users
        setUsers(response.data.data); // Set user data from response
        setLoading(false); // Set loading to false after data is fetched
      } catch (err) {
        setError("Error fetching users."); // Set error state if request fails
        setLoading(false); // Set loading to false after error
      }
    };

    fetchUsers();
  }, []); // Empty dependency array to fetch once when component mounts

  // Function to handle user creation
  const handleCreate = async (e) => {
    e.preventDefault();
    const { name, email, password, role } = e.target;
    try {
      const response = await instanced.post("/users", { // API endpoint to create a user
        name: name.value,
        email: email.value,
        password: password.value,
        role: role.value,
      });
      setUsers([...users, response.data.data]); // Add new user to state
    } catch (err) {
      setError("Error creating user.");
    }
  };

  // Function to handle user updating
  const handleUpdate = async (e) => {
    e.preventDefault();
    const { name, email, password, role } = e.target;
    try {
      const response = await instanced.put(`/users/${currentUser.id}`, { // API endpoint to update user by ID
        name: name.value,
        email: email.value,
        password: password.value,
        role: role.value,
      });
      setUsers(
        users.map((user) =>
          user.id === currentUser.id ? response.data.data : user
        )
      );
      setIsUpdating(false); // Reset update state
      setCurrentUser(null); // Reset current user
    } catch (err) {
      setError("Error updating user.");
    }
  };

  // Function to handle user deletion
  const handleDelete = async (userId) => {
    try {
      await instanced.delete(`/users/${userId}`); // API endpoint to delete user by ID
      setUsers(users.filter((user) => user.id !== userId)); // Remove user from state
    } catch (err) {
      setError("Error deleting user.");
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
      <h1>User Management</h1>

      {/* Create or Update Form */}
      <form onSubmit={isUpdating ? handleUpdate : handleCreate}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          defaultValue={isUpdating ? currentUser.name : ""}
          required
        />
        <label>Email:</label>
        <input
          type="email"
          name="email"
          defaultValue={isUpdating ? currentUser.email : ""}
          required
        />
        <label>Password:</label>
        <input
          type="password"
          name="password"
          defaultValue={isUpdating ? currentUser.password : ""}
          required
        />
        <label>Role:</label>
        <select name="role" defaultValue={isUpdating ? currentUser.role : ""}>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
        <button type="submit">{isUpdating ? "Update User" : "Create User"}</button>
      </form>

      {/* User List Table */}
      <h2>User List</h2>
      {users.length === 0 ? (
        <p>No users found</p> // If no users are found
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  {/* Add actions for user, e.g., Update, Delete */}
                  <button onClick={() => { setIsUpdating(true); setCurrentUser(user); }}>Update</button>
                  <button onClick={() => handleDelete(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserManagementPage;
