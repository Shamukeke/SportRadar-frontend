import React, { useEffect, useState, ChangeEvent } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axiosInstance from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';

// Import direct des avatars pour garantir leur disponibilité
import defaultAvatarImg from '../assets/avatars/default-avatar.png';
import avatar1Img from '../assets/avatars/avatar1.png';
import avatar2Img from '../assets/avatars/avatar2.png';
import avatar3Img from '../assets/avatars/avatar3.png';
import avatar4Img from '../assets/avatars/avatar4.png';
import avatar5Img from '../assets/avatars/avatar5.png';

// Création d'un objet pour référencer facilement les avatars
const avatarOptions = {
  default: defaultAvatarImg,
  avatar1: avatar1Img,
  avatar2: avatar2Img,
  avatar3: avatar3Img,
  avatar4: avatar4Img,
  avatar5: avatar5Img,
};

const allObjectives = [
  'Perte de poids',
  'Renforcement musculaire',
  'Réduction du stress',
  'Amélioration de la flexibilité',
  'Endurance cardio',
  'Bien-être général',
  'Socialisation'
];

type Preferences = {
  activities: string[];
  location: string;
  level: string;
  objectives: string[];
};

const ProfilePage: React.FC = () => {
  const { user, isAuthenticated, updateUser } = useAuth();
  const navigate = useNavigate();

  const [preferences, setPreferences] = useState<Preferences>({
    activities: [],
    location: '',
    level: '',
    objectives: []
  });
  const [status, setStatus] = useState<string>('');
  const [avatarPreview, setAvatarPreview] = useState<string>(defaultAvatarImg);
  const [uploading, setUploading] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);

  useEffect(() => {
    if (!isAuthenticated || !user) return;
    
    setPreferences({
      activities: [],
      location: user.preferences?.location || '',
      level: user.preferences?.level || '',
      objectives: (user.preferences as any)?.objectives || []
    });
    
    // Utilise l'avatar de l'utilisateur ou un avatar par défaut
    const userAvatar = user.avatar || defaultAvatarImg;
    setAvatarPreview(avatarOptions[userAvatar as keyof typeof avatarOptions] || userAvatar);
  }, [user, isAuthenticated]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPreferences(prev => ({ ...prev, [name]: value }));
  };

  const handleObjectiveChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setPreferences(prev => ({
      ...prev,
      objectives: checked
        ? [...prev.objectives, value]
        : prev.objectives.filter(o => o !== value)
    }));
  };

  const handleAvatarUpload = async (e: ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;
  
  const form = new FormData();
  form.append('avatar', file);
  setUploading(true);
  setStatus('');
  
  // Prévisualisation immédiate
  setAvatarPreview(URL.createObjectURL(file));
  
  try {
    await updateUser({ avatar: form }); // Utilise directement updateUser
    setStatus('Avatar mis à jour ✔️');
  } catch (err: any) {
    console.error(err.response || err);
    setStatus(`Échec upload avatar ❌ (${err.response?.data?.avatar || err.message})`);
    setAvatarPreview(user?.avatar || defaultAvatarImg);
  } finally {
    setUploading(false);
  }
};

const handleAvatarSelect = async (avatarKey: string) => {
  if (uploading || saving) return;
  
  setUploading(true);
  setStatus('');
  
  const selectedAvatar = avatarOptions[avatarKey as keyof typeof avatarOptions];
  setAvatarPreview(selectedAvatar);
  
  try {
    await updateUser({ avatar: avatarKey }); // Utilise directement updateUser
    setStatus('Avatar mis à jour ✔️');
  } catch (err: any) {
    console.error(err.response || err);
    setStatus(`Échec sélection avatar ❌ (${err.response?.data?.avatar || err.message})`);
    setAvatarPreview(user?.avatar || defaultAvatarImg);
  } finally {
    setUploading(false);
  }
};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('');
    setSaving(true);
    try {
      await axiosInstance.patch('/me/', { preferences });
      setStatus('Préférences mises à jour ✔️');
      navigate('/activities');
    } catch (err: any) {
      console.error(err.response || err);
      setStatus(`Erreur mise à jour ❌ (${err.response?.data?.message || err.message})`);
    } finally {
      setSaving(false);
    }
  };

  if (!isAuthenticated || !user) {
    return <p className="p-6">Chargement du profil…</p>;
  }

  return (
    <div className="min-h-screen bg-[#C7C5C5] py-12">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <div className="flex flex-col items-center mb-8">
          <img
            src={avatarPreview}
            alt="Avatar"
            className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-md"
          />

          <label className="mt-3 inline-block bg-[#0a1128] text-white px-4 py-2 rounded cursor-pointer">
            {uploading ? 'Upload...' : 'Changer l’avatar'}
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarUpload}
              className="hidden"
              disabled={uploading || saving}
            />
          </label>

          <div className="mt-4 grid grid-cols-5 gap-2">
            {Object.entries(avatarOptions).map(([key, img]) => (
              <img
                key={key}
                src={img}
                alt={`Avatar ${key}`}
                className={`w-12 h-12 rounded-full cursor-pointer border-2 ${
                  avatarPreview === img ? 'border-[#dc5f18]' : 'border-transparent'
                }`}
                onClick={() => handleAvatarSelect(key)}
              />
            ))}
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-4 text-[#0a1128]">Mon profil</h1>
        <p><strong>Nom :</strong> {user.username}</p>
        <p><strong>Email :</strong> {user.email}</p>
        <p><strong>Type :</strong> {user.type}</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <div>
            <label className="block mb-1 font-medium">Localisation</label>
            <input
              type="text"
              name="location"
              value={preferences.location}
              onChange={handleChange}
              placeholder="Paris, Lyon…"
              className="w-full border rounded px-3 py-2"
              disabled={saving}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Niveau</label>
            <select
              name="level"
              value={preferences.level}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              disabled={saving}
            >
              <option value="">-- Sélectionner --</option>
              <option value="débutant">Débutant</option>
              <option value="intermédiaire">Intermédiaire</option>
              <option value="avancé">Avancé</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Objectifs</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {allObjectives.map(obj => (
                <label key={obj} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    value={obj}
                    checked={preferences.objectives.includes(obj)}
                    onChange={handleObjectiveChange}
                    className="mr-2"
                    disabled={saving}
                  />
                  {obj}
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="bg-[#dc5f18] text-white px-6 py-2 rounded hover:brightness-110 disabled:opacity-50"
            disabled={saving}
          >
            {saving ? 'Mise à jour...' : 'Mettre à jour'}
          </button>

          {status && <p className="mt-2 text-sm text-gray-700">{status}</p>}
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
