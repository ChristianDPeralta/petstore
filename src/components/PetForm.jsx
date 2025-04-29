import { useState } from 'react';

function PetForm({ onAdd }) {
    const [form, setForm] = useState({
        name: '',
        type: '',
        breed: '',
        gender: '',
        price: '',
        imageUrl: '',
        description: ''
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd({ ...form, price: parseFloat(form.price) });
        setForm({ name: '', type: '', breed: '', gender: '', price: '', imageUrl: '', description: '' });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
            <input name="type" value={form.type} onChange={handleChange} placeholder="Species" />
            <input name="breed" value={form.breed} onChange={handleChange} placeholder="Breed" />
            <input name="gender" value={form.gender} onChange={handleChange} placeholder="Gender" />
            <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="Price" />
            <input name="imageUrl" value={form.imageUrl} onChange={handleChange} placeholder="Image URL" />
            <input name="description" value={form.description} onChange={handleChange} placeholder="Description" />
            <button type="submit">Add Pet</button>
        </form>
    );
}

export default PetForm;