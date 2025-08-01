// File: src/pages/ActivitiesPage.tsx
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import { useAuth } from '../contexts/AuthContext';
import CountUp from 'react-countup';
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

const ITEMS_PER_PAGE = 9;

const ActivitiesPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [registered, setRegistered] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const getImageUrl = (img?: string) => {
    if (!img) return '/images/activity-default.jpg';
    // Si c'est déjà une URL (http), renvoie-la directement
    if (/^https?:\/\//i.test(img)) return img;
    // Sinon, concatène via la variable d'env (VITE_MEDIA_URL ou REACT_APP_MEDIA_URL, selon ton build tool)
    return `${import.meta.env.VITE_MEDIA_URL}${img}`;
  };

  // Filtres de recherche
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  // Niveau sélectionné pour le podium
  const [selectedLevel, setSelectedLevel] = useState<string>('');

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const allRes = await axiosInstance.get<Activity[]>('/activities/');
        setActivities(allRes.data);
        if (isAuthenticated) {
          const myRes = await axiosInstance.get<Activity[]>('/activities/my-activities/');
          setRegistered(new Set(myRes.data.map(a => a.id)));
        }
      } catch {
        alert('Erreur lors du chargement des activités.');
      } finally {
        setLoading(false);
      }
    })();
  }, [isAuthenticated]);

  // Filtrage + tri chronologique
  const filtered = useMemo(() => {
    return activities
      .filter(a => {
        if (searchTerm &&
          !(
            a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            a.description.toLowerCase().includes(searchTerm.toLowerCase())
          )
        ) return false;
        if (categoryFilter && a.category !== categoryFilter) return false;
        if (locationFilter && a.location !== locationFilter) return false;
        if (dateFilter && a.date !== dateFilter) return false;
        return true;
      })
      .sort((a, b) => {
        const da = new Date(`${a.date}T${a.time}`).getTime();
        const db = new Date(`${b.date}T${b.time}`).getTime();
        return da - db;
      });
  }, [activities, searchTerm, categoryFilter, locationFilter, dateFilter]);

  // Pagination
  const displayed = showAll
    ? filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)
    : filtered.slice(0, 3);
  const pageCount = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  // Calcul des niveaux et podium
  const levels = useMemo(() => Array.from(new Set(activities.map(a => a.level))), [activities]);
  useEffect(() => {
    if (!selectedLevel && levels.length) {
      setSelectedLevel(levels[0]);
    }
  }, [levels, selectedLevel]);

  const podiumData = useMemo(() => {
    const byName: Record<string, number> = {};
    activities
      .filter(a => a.level === selectedLevel)
      .forEach(a => {
        byName[a.name] = (byName[a.name] || 0) + 1;
      });
    return Object.entries(byName)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 3);
  }, [activities, selectedLevel]);

  // Statistique mensuelle
  const monthlyActivity = useMemo(() => {
    const map = new Map<string, number>();
    activities.forEach(a => {
      const month = a.date.slice(0, 7);
      map.set(month, (map.get(month) || 0) + 1);
    });
    return Array.from(map.entries())
      .map(([month, count]) => ({ month, count }))
      .sort((a, b) => a.month.localeCompare(b.month));
  }, [activities]);

  // Total d’activités
  const totalActivities = activities.length;

  // Gestion inscription/désinscription
  const handleRegisterClick = async (act: Activity) => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/activities' } });
      return;
    }
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

        {/* Filtres */}
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
            {[...new Set(activities.map(a => a.category))].map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <select
            value={locationFilter}
            onChange={e => setLocationFilter(e.target.value)}
            className="p-2 rounded-lg border"
          >
            <option value="">Tous lieux</option>
            {[...new Set(activities.map(a => a.location))].map(l => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
          <input
            type="date"
            value={dateFilter}
            onChange={e => setDateFilter(e.target.value)}
            className="p-2 rounded-lg border"
          />
        </div>

        {/* Grille */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {displayed.map(act => {
            const isFull = act.participants >= act.max_participants;
            const isReg = registered.has(act.id);
            return (
              <div key={act.id} className="bg-white rounded-2xl shadow-lg flex flex-col overflow-hidden">
                <img
                  src={getImageUrl(act.image)}
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
                    <ul className="text-sm text-gray-600 space-y-1 mb-4">
                      <li className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {act.location}</li>
                      <li className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {act.level}</li>
                      <li className="flex items-center gap-2"><CalendarIcon className="w-4 h-4" /> {act.date}</li>
                      <li className="flex items-center gap-2"><Clock className="w-4 h-4" /> {act.time} • {act.duration}</li>
                      <li className="flex items-center gap-2">
                        <Users className="w-4 h-4" /> {act.participants}/{act.max_participants}
                        {isFull && !isReg && <span className="ml-2 text-red-600 font-semibold">En attente</span>}
                      </li>
                      <li><strong>Prix :</strong> {act.price}</li>
                    </ul>
                  </div>
                  <button
                    onClick={() => handleRegisterClick(act)}
                    disabled={isFull && !isReg}
                    className={`w-full py-2 rounded-lg font-semibold ${isReg ? 'bg-[#ABC2D7] text-[#0a1128]' :
                      isFull ? 'bg-gray-200 text-gray-600' :
                        'bg-[#dc5f18] text-white'
                      }`}
                  >
                    {isReg ? 'Se désinscrire' : isFull ? 'Complet' : 'S’inscrire'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        {!showAll && filtered.length > 3 && (
          <div className="text-center mb-6">
            <button
              onClick={() => setShowAll(true)}
              className="px-6 py-2 bg-[#0a1128] text-white rounded-lg"
            >
              Voir la suite
            </button>
          </div>
        )}
        {showAll && pageCount > 1 && (
          <div className="flex justify-center items-center gap-4 mb-6">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-white border rounded disabled:opacity-50"
            >
              Précédent
            </button>
            <span className="text-[#0a1128] font-medium">
              Page {currentPage} / {pageCount}
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.min(pageCount, p + 1))}
              disabled={currentPage === pageCount}
              className="px-4 py-2 bg-white border rounded disabled:opacity-50"
            >
              Suivant
            </button>
          </div>
        )}

        {/* Statistiques allégées */}
        <div className="bg-white p-6 rounded-2xl shadow-inner space-y-8">
          {/* Total */}
          <div className="text-center">
            <div className="text-6xl font-extrabold text-[#0a1128]">
              <CountUp end={totalActivities} duration={1.5} separator=" " />
            </div>
            <div className="text-gray-600 uppercase tracking-wide">Total d’activités</div>
          </div>

          {/* Évolution mensuelle */}
          <div>
            <h3 className="text-xl font-semibold text-[#0a1128] mb-4 text-center">
              Évolution mensuelle
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={monthlyActivity}>
                <XAxis dataKey="month" />
                <YAxis allowDecimals={false} />
                <RechartsTooltip />
                <Line type="monotone" dataKey="count" stroke="#dc5f18" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Podium dynamique par niveau */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-[#0a1128]">Podium par niveau</h3>
              <select
                className="border rounded px-3 py-1"
                value={selectedLevel}
                onChange={e => setSelectedLevel(e.target.value)}
              >
                {levels.map(lvl => (
                  <option key={lvl} value={lvl}>{lvl}</option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {podiumData.map((act, idx) => (
                <div
                  key={act.name}
                  className={`p-4 rounded-xl shadow-md text-center ${idx === 0
                    ? 'bg-[#dc5f18] text-white'
                    : idx === 1
                      ? 'bg-[#ABC2D7] text-[#0a1128]'
                      : 'bg-[#C7C5C5] text-[#0a1128]'
                    }`}
                >
                  <div className="text-5xl font-extrabold">{idx + 1}</div>
                  <div className="text-xl font-semibold mt-2">{act.name}</div>

                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ActivitiesPage;
