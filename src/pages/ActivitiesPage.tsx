import React, { useState, useEffect, useMemo } from 'react';
import axiosInstance from '../api/axiosInstance';
import {
  MapPin,
  Calendar as CalendarIcon,
  Clock,
  Users,
  Star
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  Legend,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer
} from 'recharts';

interface Activity {
  id: number;
  name: string;
  description: string;
  category: string;
  location: string;
  date: string;
  time: string;
  duration: string;
  participants: number;
  max_participants: number;
  price: string;
  level: string;
  sport_zen: boolean;
  rating: number;
  instructor?: string;
  image?: string;
}

interface Stats {
  total_activities: number;
  average_participants: number;
  monthly_activity: { month: string; count: number }[];
  top_categories: { category: string; total: number }[];
}

const COLORS = ['#0a1128', '#ABC2D7', '#dc5f18', '#82ca9d', '#ffc658'];

const ActivitiesPage: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [registered, setRegistered] = useState<Set<number>>(new Set());
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  // filtres avancés
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  const [showAll, setShowAll] = useState(false);
  const ITEMS_PER_PAGE = 9;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const [allRes, myRes, statsRes] = await Promise.all([
          axiosInstance.get<Activity[]>('/activities/'),
          axiosInstance.get<Activity[]>('/activities/my-activities/'),
          axiosInstance.get<Stats>('/activities/stats/'),
        ]);
        setActivities(allRes.data);
        setRegistered(new Set(myRes.data.map(a => a.id)));
        setStats(statsRes.data);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // tri chronologique
  const sorted = useMemo(() => {
    return [...activities].sort((a, b) => {
      const da = new Date(`${a.date}T${a.time}`);
      const db = new Date(`${b.date}T${b.time}`);
      return da.getTime() - db.getTime();
    });
  }, [activities]);

  // options pour dropdowns
  const categories = useMemo(() => Array.from(new Set(activities.map(a => a.category))), [activities]);
  const locations  = useMemo(() => Array.from(new Set(activities.map(a => a.location))), [activities]);

  // filtrage
  const filtered = useMemo(() => {
    return sorted.filter(a => {
      if (searchTerm && !(
        a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.description.toLowerCase().includes(searchTerm.toLowerCase())
      )) return false;
      if (categoryFilter && a.category !== categoryFilter) return false;
      if (locationFilter && a.location !== locationFilter) return false;
      if (dateFilter && a.date !== dateFilter) return false;
      return true;
    });
  }, [sorted, searchTerm, categoryFilter, locationFilter, dateFilter]);

  const displayed = showAll
    ? filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)
    : filtered.slice(0, 3);
  const pageCount = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  // calcul dynamique des stats par lieu
  const locationStats = useMemo(() => {
    const m = new Map<string, number>();
    activities.forEach(a => {
      m.set(a.location, (m.get(a.location) || 0) + 1);
    });
    return Array.from(m.entries()).map(([location, total]) => ({ location, total }));
  }, [activities]);

  const toggleRegister = async (act: Activity) => {
    try {
      const isReg = registered.has(act.id);
      const res = isReg
        ? await axiosInstance.delete<{ participants: number }>(`/activities/${act.id}/register/`)
        : await axiosInstance.post<{ participants: number }>(`/activities/${act.id}/register/`);
      setActivities(prev =>
        prev.map(a => a.id === act.id ? { ...a, participants: res.data.participants } : a)
      );
      setRegistered(prev => {
        const s = new Set(prev);
        isReg ? s.delete(act.id) : s.add(act.id);
        return s;
      });
    } catch {
      alert('Erreur lors de la mise à jour de votre inscription.');
    }
  };

  if (loading) return <div className="p-6 text-center">Chargement…</div>;

  return (
    <div className="min-h-screen bg-[#C7C5C5] py-10 px-4">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold text-[#0a1128] mb-6">Activités</h1>

        {/* Barre de recherche avancée */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <input
            type="text"
            placeholder="Recherche libre..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="p-2 rounded-lg border"
          />
          <select
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            className="p-2 rounded-lg border"
          >
            <option value="">Toutes catégories</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select
            value={locationFilter}
            onChange={e => setLocationFilter(e.target.value)}
            className="p-2 rounded-lg border"
          >
            <option value="">Tous lieux</option>
            {locations.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
          <input
            type="date"
            value={dateFilter}
            onChange={e => setDateFilter(e.target.value)}
            className="p-2 rounded-lg border"
          />
        </div>

        {/* Grille d’activités */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {displayed.map(act => {
            const isFull = act.participants >= act.max_participants;
            const isReg = registered.has(act.id);
            return (
              <div key={act.id} className="bg-white rounded-2xl shadow-lg flex flex-col overflow-hidden">
                <img
                  src={act.image || '/images/activity-default.jpg'}
                  alt={act.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h2 className="text-xl font-semibold text-[#0a1128]">{act.name}</h2>
                      <div className="flex items-center space-x-1 text-[#dc5f18]">
                        <Star className="w-4 h-4" /> <span>{act.rating.toFixed(1)}</span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-2">{act.description}</p>
                    <ul className="text-sm text-gray-600 space-y-1 mb-4">
                      <li className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {act.location}</li>
                      <li className="flex items-center gap-2"><CalendarIcon className="w-4 h-4" /> {act.date}</li>
                      <li className="flex items-center gap-2"><Clock className="w-4 h-4" /> {act.time} • {act.duration}</li>
                      <li className="flex items-center gap-2">
                        <Users className="w-4 h-4" /> {act.participants} / {act.max_participants}
                        {isFull && <span className="ml-2 text-red-600 font-semibold">En attente</span>}
                      </li>
                      <li><strong>Prix :</strong> {act.price}</li>
                      <li><strong>Niveau :</strong> {act.level}</li>
                      {act.instructor && <li><strong>Coach :</strong> {act.instructor}</li>}
                    </ul>
                  </div>
                  <button
                    onClick={() => toggleRegister(act)}
                    disabled={isFull && !isReg}
                    className={`
                      w-full py-2 rounded-lg font-semibold
                      ${isReg
                        ? 'bg-[#ABC2D7] text-[#0a1128] hover:bg-white'
                        : isFull
                          ? 'bg-gray-200 text-gray-600'
                          : 'bg-[#dc5f18] text-white hover:bg-opacity-90'}
                    `}
                  >
                    {isReg ? 'Se désinscrire' : isFull ? 'Complet' : 'S’inscrire'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Voir toutes & Pagination */}
        {!showAll && filtered.length > 3 && (
          <div className="text-center mb-6">
            <button
              onClick={() => setShowAll(true)}
              className="px-6 py-2 bg-[#0a1128] text-white rounded-lg"
            >Voir toutes les activités</button>
          </div>
        )}
        {showAll && pageCount > 1 && (
          <div className="flex justify-center items-center gap-4 mb-6">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-white border rounded disabled:opacity-50"
            >Précédent</button>
            <span className="text-[#0a1128] font-medium">Page {currentPage} / {pageCount}</span>
            <button
              onClick={() => setCurrentPage(p => Math.min(pageCount, p + 1))}
              disabled={currentPage === pageCount}
              className="px-4 py-2 bg-white border rounded disabled:opacity-50"
            >Suivant</button>
          </div>
        )}

        {/* Statistiques dynamiques */}
        {stats && (
          <div className="bg-white p-6 rounded-2xl shadow-inner">
            <h2 className="text-2xl font-bold text-[#dc5f18] mb-4">Statistiques</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 text-center">
              <div>
                <p className="text-xl font-semibold">{stats.total_activities}</p>
                <p>Total d’activités</p>
              </div>
              <div>
                <p className="text-xl font-semibold">{stats.average_participants.toFixed(1)}</p>
                <p>Moyenne participants</p>
              </div>
              <div>
                <p className="text-xl font-semibold">
                  {stats.top_categories.map(tc => `${tc.category} (${tc.total})`).join(' • ')}
                </p>
                <p>Top catégories</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Évolution mensuelle */}
              <div>
                <h3 className="text-lg font-medium mb-2">Évolution mensuelle</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={stats.monthly_activity}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <RechartsTooltip />
                    <Legend />
                    <Line type="monotone" dataKey="count" stroke="#dc5f18" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Répartition par catégorie */}
              <div>
                <h3 className="text-lg font-medium mb-2">Par catégorie</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={stats.top_categories.map(tc => ({ category: tc.category, count: tc.total }))}>
                    <XAxis dataKey="category" />
                    <YAxis />
                    <RechartsTooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#0a1128" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Répartition par lieu */}
              <div>
                <h3 className="text-lg font-medium mb-2">Par lieu</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={locationStats}>
                    <XAxis dataKey="location" />
                    <YAxis />
                    <RechartsTooltip />
                    <Legend />
                    <Bar dataKey="total" fill="#ABC2D7" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ActivitiesPage;
