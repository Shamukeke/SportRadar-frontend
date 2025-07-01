import React, { useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddActivityPage: React.FC = () => {
  const navigate = useNavigate();

  const [activity, setActivity] = useState({
    name: '',
    description: '',
    category: 'yoga',
    location: '',
    date: '',
    time: '',
    duration: '1h',
    max_participants: 20,
    price: 'Gratuit',
    level: 'Tous niveaux',
    sport_zen: false,
    image: '',
    instructor: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target;
    setActivity(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/activities/', activity);
      toast.success('Activité créée avec succès ✅');
      navigate('/activities');
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de l'enregistrement ❌");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-2xl mt-10">
      <h1 className="text-2xl font-bold mb-6 text-sky-700">Créer une activité</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="Nom" value={activity.name} onChange={handleChange} required className="input" />
        <textarea name="description" placeholder="Description" value={activity.description} onChange={handleChange} rows={3} className="input" />
        <input name="location" placeholder="Lieu" value={activity.location} onChange={handleChange} required className="input" />
        <input type="date" name="date" value={activity.date} onChange={handleChange} required className="input" />
        <input type="time" name="time" value={activity.time} onChange={handleChange} required className="input" />
        <input name="duration" placeholder="Durée" value={activity.duration} onChange={handleChange} className="input" />
        <input type="number" name="max_participants" placeholder="Max participants" value={activity.max_participants} onChange={handleChange} className="input" />
        <input name="price" placeholder="Prix" value={activity.price} onChange={handleChange} className="input" />
        <select name="level" value={activity.level} onChange={handleChange} className="input">
          <option value="Débutant">Débutant</option>
          <option value="Intermédiaire">Intermédiaire</option>
          <option value="Avancé">Avancé</option>
          <option value="Tous niveaux">Tous niveaux</option>
        </select>
        <label className="flex items-center">
          <input type="checkbox" name="sport_zen" checked={activity.sport_zen} onChange={handleChange} className="mr-2" />
          Activité Zen
        </label>
        <input name="instructor" placeholder="Nom de l’instructeur" value={activity.instructor} onChange={handleChange} className="input" />
        <input name="image" placeholder="URL de l'image" value={activity.image} onChange={handleChange} className="input" />
        <button type="submit" className="bg-sky-600 text-white px-6 py-3 rounded hover:bg-sky-700 font-bold">Créer l’activité</button>
      </form>
    </div>
  );
};

export default AddActivityPage;
