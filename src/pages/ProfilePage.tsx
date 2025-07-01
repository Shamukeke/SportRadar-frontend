import React, { useEffect, useState, ChangeEvent } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const defaultProfilePicture = '/images/default-avatar.png'; // à toi de mettre une image par défaut dans public/images/

const ProfilePage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();

  const [preferences, setPreferences] = useState({
    activities: [] as string[],
    location: '',
    level: ''
  });

  const [availableActivities, setAvailableActivities] = useState<string[]>([]);
  const [status, setStatus] = useState('');
  const [profilePicture, setProfilePicture] = useState<string>(defaultProfilePicture);

  // Charger préférences utilisateur et activités
  useEffect(() => {
    if (user?.preferences) {
      setPreferences(user.preferences);
    }
    if (user?.profile_picture) {
      setProfilePicture(user.profile_picture);
    }

    axios
      .get('http://localhost:8000/api/activities/')
      .then(res => {
        const names = res.data.map((a: any) => a.name);
        setAvailableActivities(names);
      })
      .catch(() => setAvailableActivities([]));
  }, [user]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPreferences(prev => ({ ...prev, [name]: value }));
  };

  const handleActivitiesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setPreferences(prev => ({
      ...prev,
      activities: checked
        ? [...prev.activities, value]
        : prev.activities.filter(a => a !== value)
    }));
  };

  const handlePictureUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result as string);
        // ➕ Optionnel : ici tu peux envoyer vers le backend
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('access');
      await axios.patch(
        'http://localhost:8000/api/me/',
        { preferences },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setStatus('Préférences mises à jour ✅');
    } catch (err) {
      console.error(err);
      setStatus('Erreur ❌');
    }
  };

  if (!isAuthenticated || !user) return <p className="p-6">Chargement...</p>;

  return (
    <div className="min-h-screen bg-[#C7C5C5] py-12">
    <div className="max-w-3xl mx-auto p-6 mt-8 bg-white text-[#0a1128] rounded-2xl shadow-xl">
      <div className="flex flex-col items-center space-y-4 mb-8 text-[#0a1128]">
        <img
          src={profilePicture}
          alt="Profil"
          className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-md"
        />
        <label className="cursor-pointer text-sm bg-[#0a1128] text-white px-4 py-2 rounded hover:bg-sky-700 transition">
          Changer l’image
          <input type="file" accept="image/*" onChange={handlePictureUpload} className="hidden" />
        </label>
      </div>

      <h1 className="text-3xl font-bold text-[#0a1128] mb-4">Mon profil</h1>
      <p><strong>Nom :</strong> {user.username}</p>
      <p><strong>Email :</strong> {user.email}</p>
      <p><strong>Type :</strong> {user.type}</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="block font-medium mb-2">Activités préférées</label>
          {availableActivities.length > 0 ? (
            availableActivities.map(activity => (
              <label key={activity} className="inline-flex items-center mr-4 mb-2">
                <input
                  type="checkbox"
                  value={activity}
                  checked={preferences.activities.includes(activity)}
                  onChange={handleActivitiesChange}
                  className="mr-1"
                />
                {activity}
              </label>
            ))
          ) : (
            <p className="text-sm text-gray-400">Aucune activité disponible.</p>
          )}
        </div>

        <div>
          <label className="block font-medium mb-2">Localisation</label>
          <input
            type="text"
            name="location"
            value={preferences.location}
            onChange={handleChange}
            className="w-full border border-gray-300 text-black rounded px-3 py-2"
            placeholder="Paris, Lyon..."
          />
        </div>

        <div>
          <label className="block font-medium mb-2">Niveau</label>
          <select
            name="level"
            value={preferences.level}
            onChange={handleChange}
            className="w-full border border-gray-300 text-black rounded px-3 py-2"
          >
            <option value="">Sélectionner</option>
            <option value="débutant">Débutant</option>
            <option value="intermédiaire">Intermédiaire</option>
            <option value="avancé">Avancé</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-[#dc5f18]  text-white px-6 py-2 rounded hover:brightness-110"
        >
          Mettre à jour
        </button>

        {status && <p className="text-sm text-gray-400 mt-2">{status}</p>}
      </form>
    </div>
    </div>
  );
};

export default ProfilePage;
