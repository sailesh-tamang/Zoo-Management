import React, { useState, useEffect } from "react";
import instanced from "../service/api"; // Import your axios instance

const FeedingSchedulePage = () => {
  const [feedingSchedules, setFeedingSchedules] = useState([]); // State to hold feeding schedule data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [isUpdating, setIsUpdating] = useState(false); // Track if we are updating a feeding schedule
  const [currentSchedule, setCurrentSchedule] = useState(null); // Store the current schedule for update

  // Fetch all feeding schedules on component mount
  useEffect(() => {
    const fetchFeedingSchedules = async () => {
      try {
        const response = await instanced.get("/feedingSchedules"); // Updated API endpoint
        setFeedingSchedules(response.data); // Set feeding schedule data from response
        setLoading(false); // Set loading to false after data is fetched
      } catch (err) {
        setError("Error fetching feeding schedules.");
        setLoading(false); // Set loading to false after error
      }
    };

    fetchFeedingSchedules();
  }, []); // Empty dependency array to fetch once when component mounts

  // Function to handle feeding schedule creation
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const { cageNumber, morningTime, eveningTime } = e.target;
      const response = await instanced.post("/feedingSchedules", { // Updated API endpoint
        cageNumber: cageNumber.value,
        morningTime: morningTime.value,
        eveningTime: eveningTime.value,
      });
      setFeedingSchedules([...feedingSchedules, response.data]); // Add new feeding schedule to state
    } catch (err) {
      setError("Error creating feeding schedule.");
    }
  };

  // Function to handle feeding schedule update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { cageNumber, morningTime, eveningTime } = e.target;
      const response = await instanced.put(`/feedingSchedules/${currentSchedule.id}`, { // Updated API endpoint
        cageNumber: cageNumber.value,
        morningTime: morningTime.value,
        eveningTime: eveningTime.value,
      });
      setFeedingSchedules(
        feedingSchedules.map((schedule) =>
          schedule.id === currentSchedule.id ? response.data : schedule
        )
      );
      setIsUpdating(false);
      setCurrentSchedule(null); // Reset update state
    } catch (err) {
      setError("Error updating feeding schedule.");
    }
  };

  // Function to handle feeding schedule deletion
  const handleDelete = async (scheduleId) => {
    try {
      await instanced.delete(`/feedingSchedules/${scheduleId}`); // Updated API endpoint
      setFeedingSchedules(feedingSchedules.filter((schedule) => schedule.id !== scheduleId)); // Remove schedule from state
    } catch (err) {
      setError("Error deleting feeding schedule.");
    }
  };

  // Function to set current schedule for updating
  const handleEdit = (schedule) => {
    setIsUpdating(true);
    setCurrentSchedule(schedule);
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
      <h1>Feeding Schedule</h1>

      {/* Create or Update Form */}
      <form onSubmit={isUpdating ? handleUpdate : handleCreate}>
        <label>Cage Number:</label>
        <input
          type="number"
          name="cageNumber"
          defaultValue={isUpdating ? currentSchedule.cageNumber : ""}
          required
        />
        <label>Morning Feeding Time:</label>
        <input
          type="time"
          name="morningTime"
          defaultValue={isUpdating ? currentSchedule.morningTime : ""}
          required
        />
        <label>Evening Feeding Time:</label>
        <input
          type="time"
          name="eveningTime"
          defaultValue={isUpdating ? currentSchedule.eveningTime : ""}
          required
        />
        <button type="submit">{isUpdating ? "Update Schedule" : "Create Schedule"}</button>
      </form>

      {/* Feeding Schedule Table */}
      <h2>Feeding Schedule List</h2>
      {feedingSchedules.length === 0 ? (
        <p>No feeding schedules found</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Cage Number</th>
              <th>Morning Time</th>
              <th>Evening Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {feedingSchedules.map((schedule) => (
              <tr key={schedule.id}>
                <td>{schedule.cageNumber}</td>
                <td>{schedule.morningTime}</td>
                <td>{schedule.eveningTime}</td>
                <td>
                  <button onClick={() => handleEdit(schedule)}>Edit</button>
                  <button onClick={() => handleDelete(schedule.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FeedingSchedulePage;
