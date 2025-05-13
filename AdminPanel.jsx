import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminPanel() {
  const [guppies, setGuppies] = useState([]);
  const [form, setForm] = useState({ name: '', price: '', image: '', description: '' });

  const fetchGuppies = () => {
    axios.get('http://localhost:5000/api/guppies').then((res) => setGuppies(res.data));
  };

  useEffect(() => {
    fetchGuppies();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/guppies', form).then(() => {
      setForm({ name: '', price: '', image: '', description: '' });
      fetchGuppies();
    });
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Panel de Administración - Guppy Galaxy</h1>

      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={form.name}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Precio"
          value={form.price}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
          required
        />
        <input
          type="text"
          name="image"
          placeholder="URL de Imagen"
          value={form.image}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
          required
        />
        <textarea
          name="description"
          placeholder="Descripción"
          value={form.description}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
          required
        ></textarea>
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Agregar Guppy
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-2">Lista de Guppies</h2>
      <ul>
        {guppies.map((g) => (
          <li key={g._id} className="border-b py-2">
            <span className="font-medium">{g.name}</span> - ${g.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
