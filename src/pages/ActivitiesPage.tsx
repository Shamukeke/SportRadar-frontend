// File: src/pages/ActivitiesPage.tsx
import React, { useState, useEffect, useMemo } from 'react';
import axiosInstance from '../api/axiosInstance';
import CountUp from 'react-countup';
import { MapPin, Calendar as CalendarIcon, Clock, Users } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';

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
  image: string;
}

const ITEMS_PER_PAGE = 9;

const ActivitiesPage: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('');

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get<Activity[]>('/activities/');
        console.log(response.data);
        setActivities(response.data);
      } catch {
        alert('Erreur lors du chargement des activités.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Filtering + sorting
  const filtered = useMemo(() => {
    return activities
      .filter(a => {
        if (searchTerm && !(
          a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          a.description.toLowerCase().includes(searchTerm.toLowerCase())
        )) return false;
        if (categoryFilter && a.category !== categoryFilter) return false;
        if (locationFilter && a.location !== locationFilter) return false;
        if (dateFilter && a.date !== dateFilter) return false;
        return true;
      })
      .sort((a, b) =>
        new Date(`${a.date}T${a.time}`).getTime() - new Date(`${b.date}T${b.time}`).getTime()
      );
  }, [activities, searchTerm, categoryFilter, locationFilter, dateFilter]);

  // Pagination
  const pageCount = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const displayed = useMemo(() => {
    if (!showAll) return filtered.slice(0, 3);
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, showAll, currentPage]);

  // Stats calculations
  const totalActivities = activities.length;
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

  const levels = useMemo(() => {
    const unique = Array.from(new Set(activities.map(a => a.level)));
    if (!selectedLevel && unique.length) setSelectedLevel(unique[0]);
    return unique;
  }, [activities, selectedLevel]);

  const podiumData = useMemo(() => {
    const byName: Record<string, number> = {};
    activities
      .filter(a => a.level === selectedLevel)
      .forEach(a => { byName[a.name] = (byName[a.name] || 0) + 1; });
    return Object.entries(byName)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 3);
  }, [activities, selectedLevel]);

  if (loading) return <div className="p-6 text-center">Chargement…</div>;

  return (
    <div className="min-h-screen bg-[#C7C5C5] py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-[#0a1128] mb-6">Activités</h1>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <input
            name="searchTerm"
            type="text"
            placeholder="Recherche libre..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="p-2 rounded-lg border"
          />
          <select name="categoryFilter" value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)} className="p-2 rounded-lg border">
            <option value="">Toutes catégories</option>
            {[...new Set(activities.map(a => a.category))].map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select name="locationFilter" value={locationFilter} onChange={e => setLocationFilter(e.target.value)} className="p-2 rounded-lg border">
            <option value="">Tous lieux</option>
            {[...new Set(activities.map(a => a.location))].map(l => <option key={l} value={l}>{l}</option>)}
          </select>
          <input name="dateFilter" type="date" value={dateFilter} onChange={e => setDateFilter(e.target.value)} className="p-2 rounded-lg border" />
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {displayed.map(act => {
            return (
              <div key={act.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                {act.image && (
                  <img
                    src={act.image}
                    alt={act.name}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-[#0a1128] mb-2">{act.name}</h2>
                  <p className="text-sm text-gray-600 mb-2">{act.description}</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li><MapPin className="inline w-4 h-4 mr-1" /> {act.location}</li>
                    <li><CalendarIcon className="inline w-4 h-4 mr-1" /> {act.date}</li>
                    <li><Clock className="inline w-4 h-4 mr-1" /> {act.time}</li>
                    <li><Users className="inline w-4 h-4 mr-1" /> {act.participants}/{act.max_participants}</li>
                    <li><strong>Prix :</strong> {act.price}</li>
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Show more / pagination */}
        {!showAll && filtered.length > 3 && (
          <div className="text-center mb-6">
            <button onClick={() => { setShowAll(true); setCurrentPage(1); }} className="px-6 py-2 bg-[#0a1128] text-white rounded-lg">
              Voir la suite
            </button>
          </div>
        )}
        {showAll && pageCount > 1 && (
          <div className="flex justify-center items-center gap-4 mb-6">
            <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="px-4 py-2 bg-white border rounded disabled:opacity-50">
              Précédent
            </button>
            <span className="text-[#0a1128] font-medium">Page {currentPage} / {pageCount}</span>
            <button onClick={() => setCurrentPage(p => Math.min(pageCount, p + 1))} disabled={currentPage === pageCount} className="px-4 py-2 bg-white border rounded disabled:opacity-50">
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
            <h3 className="text-xl font-semibold text-[#0a1128] mb-4 text-center">Évolution mensuelle</h3>
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
              <select className="border rounded px-3 py-1" value={selectedLevel} onChange={e => setSelectedLevel(e.target.value)}>
                {levels.map(lvl => <option key={lvl} value={lvl}>{lvl}</option>)}
              </select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {podiumData.map((p, idx) => (
                <div key={p.name} className={`p-4 rounded-xl shadow-md text-center ${idx === 0 ? 'bg-[#dc5f18] text-white' : idx === 1 ? 'bg-[#ABC2D7] text-[#0a1128]' : 'bg-[#C7C5C5] text-[#0a1128]'}`}>
                  <div className="text-5xl font-extrabold">{idx + 1}</div>
                  <div className="text-xl font-semibold mt-2">{p.name}</div>
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
