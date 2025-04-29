function PetList({ pets }) {
    return (
        <div>
            {pets.length === 0 ? (
                <p>No pets found.</p>
            ) : (
                <ul>
                    {pets.map((pet) => (
                        <li key={pet.id}>
                            <h3>{pet.name}</h3>
                            <p>Species: {pet.type}</p>
                            <p>Breed: {pet.breed}</p>
                            <p>Gender: {pet.gender}</p>
                            <p>Price: ${pet.price}</p>
                            <img src={pet.imageUrl} alt={pet.imageAlt || pet.name} width="150" />
                            <p>{pet.description}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default PetList;