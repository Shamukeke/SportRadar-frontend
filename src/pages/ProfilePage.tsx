import React, { useEffect, useState } from 'react';
import type { ChangeEvent } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axiosInstance from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import avatarOptions from '../assets/avatars';

const locationOptions = [
  'Paris',
  'Lyon',
  'Marseille',
  'Bordeaux',
  'Nice'
];

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
  const [status, setStatus] = useState('');
  const [avatarPreview, setAvatarPreview] = useState(avatarOptions.default);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || !user) return;
    setPreferences({
      activities: user.preferences?.activities || [],
      location: user.preferences?.location || '',
      level: user.preferences?.level || '',
      objectives: user.preferences?.objectives || []
    });
    const key = user.avatar || 'default';
    setAvatarPreview(avatarOptions[key as keyof typeof avatarOptions] || avatarOptions.default);
  }, [user, isAuthenticated]);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
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
    setAvatarPreview(URL.createObjectURL(file));
    try {
      await axiosInstance.patch('/me/', form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setStatus('Avatar mis à jour ✔️');
    } catch (err: any) {
      console.error(err);
      setStatus('Échec upload avatar ❌');
    } finally {
      setUploading(false);
    }
  };

  const handleAvatarSelect = async (key: string) => {
    if (uploading || saving) return;
    setUploading(true);
    setStatus('');
    const url = avatarOptions[key as keyof typeof avatarOptions];
    setAvatarPreview(url);
    try {
      await updateUser({ avatar: key });
      setStatus('Avatar mis à jour ✔️');
    } catch (err: any) {
      console.error(err);
      setStatus('Échec sélection avatar ❌');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatus('');
    try {
      await axiosInstance.patch('/me/', { preferences });
      setStatus('Préférences mises à jour ✔️');
      navigate('/activities');
    } catch (err: any) {
      console.error(err);
      setStatus('Erreur mise à jour ❌');
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
                alt={key}
                className={`w-12 h-12 rounded-full cursor-pointer border-2 ${avatarPreview === img ? 'border-[#dc5f18]' : 'border-transparent'
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
            <select
              name="location"
              value={preferences.location}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              disabled={saving}
            >
              <option value="">-- Sélectionner une ville --</option>
              {locationOptions.map(v => (
                <option key={v} value={v}>{v}</option>
              ))}
            </select>
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
