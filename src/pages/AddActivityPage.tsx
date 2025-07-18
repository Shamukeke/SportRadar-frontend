// src/pages/AddActivityPage.tsx
import React, { useState, type ChangeEvent, type FormEvent } from 'react';
import axiosInstance from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface ActivityForm {
  name: string;
  description: string;
  category: string;
  location: string;
  date: string;
  time: string;
  duration: string;
  max_participants: number;
  price: string;
  level: string;
  sport_zen: boolean;
  image: string;
  instructor: string;
}

const AddActivityPage: React.FC = () => {
  const navigate = useNavigate();

  const [activity, setActivity] = useState<ActivityForm>({
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

  // handleChange générique pour inputs, selects et textareas
  const handleChange = (
    e: ChangeEvent<HTMLInputElement> |
      ChangeEvent<HTMLSelectElement> |
      ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, type } = e.target;
    const value = type === 'checkbox'
      ? (e.target as HTMLInputElement).checked
      : e.target.value;

    setActivity(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/activities/', activity);
      toast.success('Activité créée avec succès ✅');
      navigate('/activities');
    } catch (error: any) {
      console.error(error);
      toast.error("Erreur lors de l'enregistrement ❌");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-2xl mt-10">
      <h1 className="text-2xl font-bold mb-6 text-sky-700">Créer une activité</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Nom"
          value={activity.name}
          onChange={handleChange}
          required
          className="input"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={activity.description}
          onChange={handleChange}
          rows={3}
          className="input"
        />
        <input
          name="location"
          placeholder="Lieu"
          value={activity.location}
          onChange={handleChange}
          required
          className="input"
        />
        <input
          name="date"
          type="date"
          value={activity.date}
          onChange={handleChange}
          required
          className="input"
        />
        <input
          name="time"
          type="time"
          value={activity.time}
          onChange={handleChange}
          required
          className="input"
        />
        <input
          name="duration"
          placeholder="Durée"
          value={activity.duration}
          onChange={handleChange}
          className="input"
        />
        <input
          name="max_participants"
          type="number"
          placeholder="Max participants"
          value={activity.max_participants}
          onChange={handleChange}
          className="input"
        />
        <input
          name="price"
          placeholder="Prix"
          value={activity.price}
          onChange={handleChange}
          className="input"
        />
        <select
          name="level"
          value={activity.level}
          onChange={handleChange}
          className="input"
        >
          <option value="Débutant">Débutant</option>
          <option value="Intermédiaire">Intermédiaire</option>
          <option value="Avancé">Avancé</option>
          <option value="Tous niveaux">Tous niveaux</option>
        </select>
        <label className="flex items-center">
          <input
            type="checkbox"
            name="sport_zen"
            checked={activity.sport_zen}
            onChange={handleChange}
            className="mr-2"
          />
          Activité Zen
        </label>
        <input
          name="instructor"
          placeholder="Nom de l’instructeur"
          value={activity.instructor}
          onChange={handleChange}
          className="input"
        />
        <input
          name="image"
          placeholder="URL de l'image"
          value={activity.image}
          onChange={handleChange}
          className="input"
        />
        <button
          type="submit"
          className="bg-sky-600 text-white px-6 py-3 rounded hover:bg-sky-700 font-bold"
        >
          Créer l’activité
        </button>
      </form>
    </div>
  );
};

export default AddActivityPage;
