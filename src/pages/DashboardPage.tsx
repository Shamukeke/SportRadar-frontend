// File: src/pages/DashboardPage.tsx
import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axiosInstance from '../api/axiosInstance';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { toast } from 'react-toastify';
import avatarOptions from '../assets/avatars';
import SummaryCards from '../components/SummaryCards';
import PreferencesCard from '../components/PreferencesCard';
import UpcomingActivitiesList from '../components/UpcomingActivitiesList';
import PastActivitiesList from '../components/PastActivitiesList';
import CategoryChart from '../components/CategoryChart';
import QuickActions from '../components/QuickActions';
import type { Activity, Notification } from '../types';

const DashboardPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<'upcoming' | 'past'>('upcoming');

  // Hook d'effet de redirection
  useEffect(() => { if (!isAuthenticated) navigate('/login'); }, [isAuthenticated, navigate]);

  // Fetch des données
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const myRes = await axiosInstance.get<Activity[]>('/activities/my-activities/');
        setActivities(myRes.data);
        setNotifications([
          { id: 1, message: 'Nouvelle activité ajoutée', date: '2025-06-20' },
          { id: 2, message: 'Préférences mises à jour', date: '2025-06-25' }
        ]);
      } catch {
        toast.error('Erreur chargement données');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Calculs à base de hooks, toujours exécutés
  const avatarKey = user?.avatar || 'default';
  const avatarUrl = (avatarOptions as any)[avatarKey] ?? user?.avatar ?? avatarOptions.default;

  const today = new Date();
  const upcomingActivities = useMemo(
    () => activities.filter(a => new Date(a.date) >= today),
    [activities, today]
  );
  const pastActivities = useMemo(
    () => activities.filter(a => new Date(a.date) < today),
    [activities, today]
  );

  // Rendu conditionnel une fois tous les hooks appelés
  if (!user) return null;
  if (loading) return <div className="min-h-screen flex justify-center items-center">Chargement...</div>;

  return (
    <div className="min-h-screen bg-[#C7C5C5] p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        {/* Header */}
        <div className="flex items-center gap-6 mb-6">
          <img src={avatarUrl} alt="avatar" className="w-20 h-20 rounded-full object-cover border" />
          <div>
            <h1 className="text-3xl font-bold text-[#0a1128]">
              Bonjour {user.type === 'business' ? 'Entreprise ' : ''}{user.username} 👋
            </h1>
            <p className="text-gray-500">{user.email}</p>
          </div>
        </div>

        {/* Summary Cards */}
        <SummaryCards activities={activities} notifications={notifications} />

        {/* Preferences */}
        {user.preferences && <PreferencesCard preferences={user.preferences} />}

        {/* Tabs */}
        <div className="mb-4">
          <button
            className={`px-4 py-2 mr-2 rounded ${tab === 'upcoming' ? 'bg-[#dc5f18] text-white' : 'bg-gray-200'}`}
            onClick={() => setTab('upcoming')}
          >À venir</button>
          <button
            className={`px-4 py-2 rounded ${tab === 'past' ? 'bg-[#dc5f18] text-white' : 'bg-gray-200'}`}
            onClick={() => setTab('past')}
          >Historique</button>
        </div>

        {/* Activities List */}
        {tab === 'upcoming' ? (
          <UpcomingActivitiesList activities={upcomingActivities} />
        ) : (
          <PastActivitiesList activities={pastActivities} />
        )}

        {/* Category Chart */}
        <section className="my-8">
          <h2 className="text-xl font-semibold mb-4">Répartition par catégorie</h2>
          <CategoryChart activities={activities} />
        </section>

        {/* Calendrier */}
        <section className="my-8">
          <h2 className="text-xl font-semibold mb-4">Calendrier</h2>
          <Calendar onChange={setDate} value={date} />
        </section>

        {/* Quick Actions */}
        <QuickActions />
      </div>
    </div>
  );
};

export default DashboardPage;