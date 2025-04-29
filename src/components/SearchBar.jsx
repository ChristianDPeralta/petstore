import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [pets, setPets] = useState([]);
  const [search, setSearch] = useState("");
  const [newPet, setNewPet] = useState({
    name: "",
    type: "",
    breed: "",
    age: 0,
    gender: "",
    price: 0,
    description: "",
    imageUrl: "",
  });

  useEffect(() => {
    fetch("http://localhost:8080/peralta/pets")
      .then((response) => response.json())
      .then((data) => setPets(data));
  }, []);

  // Handle search
  const handleSearch = () => {
    fetch(`http://localhost:8080/peralta/pets/search/${search}`)
      .then((response) => response.json())
      .then((data) => setPets(data));
  };

  // Handle adding a new pet
  const handleAddPet = () => {
    fetch("http://localhost:8080/peralta/pets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPet),
    })
      .then((response) => response.json())
      .then((data) => {
        setPets([...pets, data]);
        setNewPet({
          name: "",
          type: "",
          breed: "",
          age: 0,
          gender: "",
          price: 0,
          description: "",
          imageUrl: "",
        });
      });
  };

  return (
    <div className="container">
      <h1 className="title">🐾 Pet Store</h1>

      {/* Search bar */}
      <div className="search-container">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search pets..."
          className="search-input"
        />
        <button onClick={handleSearch} className="search-btn">Search</button>
      </div>

      {/* Add Pet Form */}
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
          value={newPet.type}
          onChange={(e) => setNewPet({ ...newPet, type: e.target.value })}
        />
        <input
          type="text"
          placeholder="Breed"
          value={newPet.breed}
          onChange={(e) => setNewPet({ ...newPet, breed: e.target.value })}
        />
        <input
          type="number"
          placeholder="Age"
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
          placeholder="Price"
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

      <div className="grid">
        {pets.map((pet) => (
          <div key={pet.id} className="card">
            <img src={pet.imageUrl} alt={pet.name} />
            <div className="card-content">
              <h2>{pet.name}</h2>
              <p><strong>Species:</strong> {pet.type}</p>
              <p><strong>Breed:</strong> {pet.breed}</p>
              <p><strong>Gender:</strong> {pet.gender}</p>
              <p><strong>Price:</strong> ${pet.price.toFixed(2)}</p>
              <p>{pet.description}</p>
              <button>Delete</button> 
              <button>Edit</button> 
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;