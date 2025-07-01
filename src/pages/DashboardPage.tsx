import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { toast } from 'react-toastify';
import { MapPin, Zap, ActivitySquare, Bell } from 'lucide-react';

interface MonthlyActivity {
  month: string;
  count: number;
}

interface CategoryStat {
  category: string;
  total: number;
}

interface Notification {
  id: number;
  message: string;
  date: string;
}

const COLORS = ['#8884d8', '#82ca9d', '#ffc658'];

const DashboardPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<{
    total_activities: number;
    monthly_activity: MonthlyActivity[];
    top_categories: CategoryStat[];
    average_participants: number;
  } | null>(null);
  const [activities, setActivities] = useState<any[]>([]);
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
        const token = localStorage.getItem('access');
        if (!token) return;

        const statsRes = await axios.get('http://localhost:8000/api/activities/stats/', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStats(statsRes.data);

        const activitiesRes = await axios.get('http://localhost:8000/api/activities/my-activities/', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setActivities(activitiesRes.data);

        setNotifications([
          { id: 1, message: "Nouvelle activité ajoutée", date: "2025-06-20" },
          { id: 2, message: "Préférences mises à jour", date: "2025-06-25" }
        ]);
      } catch (error) {
        toast.error("Erreur lors du chargement des données");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getBadge = () => {
    if (!stats) return null;
    const total = stats.total_activities;
    if (total >= 20) return '🏅 Super Actif';
    if (total >= 10) return '🥈 Actif';
    if (total > 0) return '🔰 Débutant';
    return '🚩 Aucun badge';
  };

  if (!user) return null;

  const filteredActivities = selectedCategory
    ? activities.filter((a) => a.category === selectedCategory)
    : activities;

  if (loading) {
    return <div className="min-h-screen bg-[#C7C5C5] p-6 flex justify-center items-center">Chargement en cours...</div>;
  }

  return (
    <div className="min-h-screen bg-[#C7C5C5] p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        {/* Header */}
        <div className="flex items-center gap-6 mb-6">
          <img
            src="/images/default-avatar.png"
            alt="avatar"
            className="w-20 h-20 rounded-full object-cover border border-gray-300"
          />
          <div>
            <h1 className="text-3xl font-bold text-[#0a1128]">
              Bonjour {user.type === 'business' ? 'Entreprise' : ''} {user.username} 👋
            </h1>
            <p className="text-gray-500">{user.email}</p>
            <span className="mt-2 inline-block text-sm bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full font-semibold">
              {getBadge()}
            </span>
          </div>
        </div>

        {/* Préférences */}
        {user.preferences && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
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
                  {user.preferences.activities && user.preferences.activities.length > 0 ? user.preferences.activities.join(', ') : 'Non spécifiées'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Filtres */}
        <div className="mb-6">
          <label className="block font-medium text-[#0a1128]">Filtrer par catégorie :</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="mt-1 w-full rounded-md border-gray-300 shadow-sm"
          >
            <option value="">Toutes</option>
            {Array.from(new Set(activities.map(a => a.category))).map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        {/* Notifications */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-[#0a1128] flex items-center gap-2 mb-2">
            <Bell className="w-5 h-5" /> Notifications
          </h2>
          <ul className="space-y-2">
            {notifications.map((note) => (
              <li key={note.id} className="bg-gray-50 border rounded px-4 py-2 text-sm text-gray-700 shadow-sm">
                <strong>{note.date} :</strong> {note.message}
              </li>
            ))}
          </ul>
        </div>

        {/* Graphique ligne */}
        {stats?.monthly_activity && (
          <div className="mb-10">
            <h2 className="text-lg font-semibold text-[#dc5f18] mb-2">Activité mensuelle</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={stats.monthly_activity}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke="#dc5f18" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Graphique circulaire */}
        {stats?.top_categories && (
          <div className="mb-10">
            <h2 className="text-lg font-semibold text-[#dc5f18] mb-2">Activité par catégorie</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={stats.top_categories} dataKey="total" nameKey="category" cx="50%" cy="50%" outerRadius={80} label>
                  {stats.top_categories.map((entry, index) => (
                    <Cell key={entry.category} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Historique */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-[#0a1128] mb-2">Dernières activités</h2>
          <ul className="space-y-3">
            {filteredActivities.slice(0, 5).map((a, index) => (
              <li key={index} className="p-4 bg-gray-50 border rounded shadow-sm">
                <p className="font-semibold">{a.name}</p>
                <p className="text-sm text-gray-600">Créée le {new Date(a.created_at).toLocaleDateString('fr-FR')}</p>
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
