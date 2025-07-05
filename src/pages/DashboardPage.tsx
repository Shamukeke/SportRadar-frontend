
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axiosInstance from '../api/axiosInstance';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { toast } from 'react-toastify';
import { MapPin, Zap, ActivitySquare, Bell, Target } from 'lucide-react';

interface Notification {
  id: number;
  message: string;
  date: string;
}

interface Activity {
  id: number;
  name: string;
  category: string;
  date: string;
  time: string;
}

const DashboardPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [activities, setActivities] = useState<Activity[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) navigate('/login');
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // mes activités inscrites
        const myRes = await axiosInstance.get<Activity[]>('/activities/my-activities/');
        setActivities(myRes.data);
        // notifications statiques
        setNotifications([
          { id: 1, message: 'Nouvelle activité ajoutée', date: '2025-06-20' },
          { id: 2, message: 'Préférences mises à jour', date: '2025-06-25' }
        ]);
      } catch {
        toast.error('Erreur chargement données');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (!user) return null;
  if (loading) return <div className="min-h-screen bg-[#C7C5C5] p-6 flex justify-center items-center">Chargement...</div>;

  const filtered = selectedCategory
    ? activities.filter(a => a.category === selectedCategory)
    : activities;

  return (
    <div className="min-h-screen bg-[#C7C5C5] p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        {/* Header */}
        <div className="flex items-center gap-6 mb-6">
          <img
            src={user.avatar || 'defaultAvatarImg'}
            alt="avatar"
            className="w-20 h-20 rounded-full object-cover border border-gray-300"
          />
          <div>
            <h1 className="text-3xl font-bold text-[#0a1128]">
              Bonjour {user.type === 'business' ? 'Entreprise' : ''} {user.username} 👋
            </h1>
            <p className="text-gray-500">{user.email}</p>
          </div>
        </div>

        {/* Préférences */}
        {user.preferences && (
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
            <div className="flex items-center bg-gray-100 p-4 rounded-lg">
              <MapPin className="w-6 h-6 text-[#dc5f18] mr-3" />
              <div>
                <p className="text-sm text-gray-600">Localisation</p>
                <p className="font-semibold text-gray-800">{user.preferences.location || 'Non spécifiée'}</p>
              </div>
            </div>
            <div className="flex items-center bg-gray-100 p-4 rounded-lg">
              <Zap className="w-6 h-6 text-[#dc5f18] mr-3" />
              <div>
                <p className="text-sm text-gray-600">Niveau</p>
                <p className="font-semibold text-gray-800">{user.preferences.level || 'Non spécifié'}</p>
              </div>
            </div>
            <div className="flex items-center bg-gray-100 p-4 rounded-lg">
              <ActivitySquare className="w-6 h-6 text-[#dc5f18] mr-3" />
              <div>
                <p className="text-sm text-gray-600">Activités</p>
                <p className="font-semibold text-gray-800">
                  {user.preferences.activities?.length
                    ? user.preferences.activities.join(', ')
                    : 'Non spécifiées'}
                </p>
              </div>
            </div>
            <div className="flex items-center bg-gray-100 p-4 rounded-lg">
              <Target className="w-6 h-6 text-[#dc5f18] mr-3" />
              <div>
                <p className="text-sm text-gray-600">Objectifs</p>
                <p className="font-semibold text-gray-800">
                  {user.preferences.objectives?.length
                    ? user.preferences.objectives.join(', ')
                    : 'Non définis'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Filtre catégorie */}
        <div className="mb-6">
          <label className="block font-medium text-[#0a1128]">Filtrer par catégorie :</label>
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="mt-1 w-full rounded-md border-gray-300 shadow-sm"
          >
            <option value="">Toutes</option>
            {Array.from(new Set(activities.map(a => a.category))).map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Notifications */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-[#0a1128] flex items-center gap-2 mb-2">
            <Bell className="w-5 h-5" /> Notifications
          </h2>
          <ul className="space-y-2">
            {notifications.map(note => (
              <li key={note.id} className="bg-gray-50 border rounded px-4 py-2 text-sm text-gray-700 shadow-sm">
                <strong>{note.date} :</strong> {note.message}
              </li>
            ))}
          </ul>
        </div>

        {/* Mes activités inscrites */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-[#0a1128] mb-2">Mes activités inscrites</h2>
          <ul className="space-y-3">
            {filtered.map(act => (
              <li key={act.id} className="p-4 bg-gray-50 border rounded shadow-sm flex justify-between">
                <div>
                  <p className="font-semibold">{act.name}</p>
                  <p className="text-sm text-gray-600">{act.date} à {act.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Historique des activités */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-[#0a1128] mb-2">Historique des activités</h2>
          <ul className="space-y-3">
            {filtered.slice(0,5).map((a, idx) => (
              <li key={idx} className="p-4 bg-gray-50 border rounded shadow-sm">
                <p className="font-semibold">{a.name}</p>
                <p className="text-sm text-gray-600">Inscrit le {new Date(a.date).toLocaleDateString('fr-FR')}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Calendrier */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-[#0a1128] mb-2">Calendrier</h2>
          <Calendar onChange={setDate} value={date} />
        </div>

        <Link
          to="/profile"
          className="mt-4 inline-block bg-[#dc5f18] text-white px-6 py-3 rounded-lg font-semibold hover:brightness-110 transition"
        >
          Modifier mes préférences
        </Link>
      </div>
    </div>
  );
};

export default DashboardPage;

