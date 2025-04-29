import { useEffect, useState } from "react";

function Home() {
  const [pets, setPets] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = () => {
    fetch("http://localhost:8080/peralta/pets")
      .then((res) => res.json())
      .then((data) => setPets(data));
  };

  const handleSearch = () => {
    fetch(`http://localhost:8080/peralta/pets/search/${search}`)
      .then((res) => res.json())
      .then((data) => setPets(data));
  };

  const handleDeletePet = (id) => {
    fetch(`http://localhost:8080/peralta/pets/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          fetchPets();
        }
      });
  };

  return (
    <div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search pets..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {pets.length === 0 ? (
        <p className="no-data">No pets found.</p>
      ) : (
        <div className="grid">
          {pets.map((pet) => (
            <div key={pet.id} className="card">
              <img src={pet.imageUrl} alt={pet.name} />
              <h3>{pet.name}</h3>
              <p><b>Species:</b> {pet.species}</p>
              <p><b>Breed:</b> {pet.breed}</p>
              <p><b>Gender:</b> {pet.gender}</p>
              <p><b>Price:</b> ${pet.price}</p>
              <p>{pet.description}</p>
              <button onClick={() => handleDeletePet(pet.id)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
