import React, { useState, useEffect } from "react";
import instanced from "../service/api"; // Import your axios instance

const AnimalsPage = () => {
  const [animals, setAnimals] = useState([]); // State to hold animal data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [isUpdating, setIsUpdating] = useState(false); // Track if we are updating an animal
  const [currentAnimal, setCurrentAnimal] = useState(null); // Store the current animal for update

  // Fetch all animals on component mount
  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const response = await instanced.get("/animals"); // Endpoint to fetch all animals
        setAnimals(response.data); // Set animal data from response
        setLoading(false); // Set loading to false after data is fetched
      } catch (err) {
        setError("Error fetching animals."); // Set error state if request fails
        setLoading(false); // Set loading to false after error
      }
    };

    fetchAnimals();
  }, []); // Empty dependency array to fetch once when component mounts

  // Function to handle animal creation
  const handleCreate = async (e) => {
    e.preventDefault();
    const { name, species, age, habitat } = e.target;
    try {
      const response = await instanced.post("/animals", { // API endpoint to create an animal
        name: name.value,
        species: species.value,
        age: age.value,
        habitat: habitat.value,
      });
      setAnimals([...animals, response.data]); // Add new animal to state
    } catch (err) {
      setError("Error creating animal.");
    }
  };

  // Function to handle animal updating
  const handleUpdate = async (e) => {
    e.preventDefault();
    const { name, species, age, habitat } = e.target;
    try {
      const response = await instanced.put(`/animals/${currentAnimal.id}`, { // API endpoint to update animal by ID
        name: name.value,
        species: species.value,
        age: age.value,
        habitat: habitat.value,
      });
      setAnimals(
        animals.map((animal) =>
          animal.id === currentAnimal.id ? response.data : animal
        )
      );
      setIsUpdating(false); // Reset update state
      setCurrentAnimal(null); // Reset current animal
    } catch (err) {
      setError("Error updating animal.");
    }
  };

  // Function to handle animal deletion
  const handleDelete = async (animalId) => {
    try {
      await instanced.delete(`/animals/${animalId}`); // API endpoint to delete animal by ID
      setAnimals(animals.filter((animal) => animal.id !== animalId)); // Remove animal from state
    } catch (err) {
      setError("Error deleting animal.");
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
      <h1>Animal Management</h1>

      {/* Create or Update Form */}
      <form onSubmit={isUpdating ? handleUpdate : handleCreate}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          defaultValue={isUpdating ? currentAnimal.name : ""}
          required
        />
        <label>Species:</label>
        <input
          type="text"
          name="species"
          defaultValue={isUpdating ? currentAnimal.species : ""}
          required
        />
        <label>Age:</label>
        <input
          type="number"
          name="age"
          defaultValue={isUpdating ? currentAnimal.age : ""}
          required
        />
        <label>Habitat:</label>
        <input
          type="text"
          name="habitat"
          defaultValue={isUpdating ? currentAnimal.habitat : ""}
          required
        />
        <button type="submit">{isUpdating ? "Update Animal" : "Create Animal"}</button>
      </form>

      {/* Animal List Table */}
      <h2>Animal List</h2>
      {animals.length === 0 ? (
        <p>No animals found</p> // If no animals are found
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Species</th>
              <th>Age</th>
              <th>Habitat</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {animals.map((animal) => (
              <tr key={animal.id}>
                <td>{animal.name}</td>
                <td>{animal.species}</td>
                <td>{animal.age}</td>
                <td>{animal.habitat}</td>
                <td>
                  {/* Add actions for animal, e.g., Update, Delete */}
                  <button onClick={() => { setIsUpdating(true); setCurrentAnimal(animal); }}>Update</button>
                  <button onClick={() => handleDelete(animal.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AnimalsPage;
