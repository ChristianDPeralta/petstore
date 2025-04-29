import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddPet() {
  const [newPet, setNewPet] = useState({
    name: "",
    species: "",
    breed: "",
    age: "",
    gender: "",
    price: "",
    description: "",
    imageUrl: ""
  });
  const navigate = useNavigate();

  const handleAddPet = () => {
    fetch("http://localhost:8080/peralta/pets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPet)
    })
      .then((res) => res.json())
      .then(() => {
        navigate("/"); // Go back to home after adding
      });
  };

  return (
    <div className="form-container">
      <h2>Add a Pet</h2>
      <input
        type="text"
        placeholder="Name"
        value={newPet.name}
        onChange={(e) => setNewPet({ ...newPet, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Species"
        value={newPet.species}
        onChange={(e) => setNewPet({ ...newPet, species: e.target.value })}
      />
      <input
        type="text"
        placeholder="Breed"
        value={newPet.breed}
        onChange={(e) => setNewPet({ ...newPet, breed: e.target.value })}
      />
      <input
        type="number"
        placeholder="Age (Years)"
        value={newPet.age}
        onChange={(e) => setNewPet({ ...newPet, age: e.target.value })}
      />
      <input
        type="text"
        placeholder="Gender"
        value={newPet.gender}
        onChange={(e) => setNewPet({ ...newPet, gender: e.target.value })}
      />
      <input
        type="number"
        placeholder="Price ($)"
        value={newPet.price}
        onChange={(e) => setNewPet({ ...newPet, price: e.target.value })}
      />
      <input
        type="text"
        placeholder="Description"
        value={newPet.description}
        onChange={(e) => setNewPet({ ...newPet, description: e.target.value })}
      />
      <input
        type="text"
        placeholder="Image URL"
        value={newPet.imageUrl}
        onChange={(e) => setNewPet({ ...newPet, imageUrl: e.target.value })}
      />
      <button onClick={handleAddPet}>Add Pet</button>
    </div>
  );
}

export default AddPet;
