import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import {
  MapPin,
  Calendar,
  Clock,
  Users,
  Star
} from 'lucide-react';

interface Activity {
  id: number;
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
  rating: number;
  instructor?: string;
  image?: string;
  created_by: string;
  created_at: string;
}

const ActivitiesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const res = await axiosInstance.get('/activities/');
      setActivities(res.data);
    } catch (error) {
      console.error('Erreur chargement activités', error);
    }
  };

  const filteredActivities = activities.filter(activity =>
    activity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    activity.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#C7C5C5] text-[#0a1128] py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Activités disponibles</h1>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Rechercher une activité ou un lieu..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 rounded-lg bg-white text-gray-800 border border-gray-300"
          />
        </div>

        {filteredActivities.length === 0 && (
          <p className="text-center text-[#0a1128]">Aucune activité trouvée.</p>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredActivities.map((activity) => (
            <div
              key={activity.id}
              className="bg-white text-gray-900 rounded-xl shadow-md overflow-hidden"
            >
              {activity.image && (
                <img
                  src={activity.image}
                  alt={activity.name}
                  className="w-full h-48 object-cover"
                />
              )}

              <div className="p-4 space-y-2">
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-bold">{activity.name}</h2>
                  <div className="flex items-center space-x-1 text-sm text-yellow-600">
                    <Star className="w-4 h-4 fill-yellow-400" />
                    <span>{activity.rating.toFixed(1)}</span>
                  </div>
                </div>

                <p className="text-gray-700">{activity.description}</p>

                <div className="text-sm text-gray-600 space-y-1">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>{activity.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>{activity.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span>{activity.time} • {activity.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span>Max {activity.max_participants} participants</span>
                  </div>
                  <div><strong>Prix :</strong> {activity.price}</div>
                  <div><strong>Niveau :</strong> {activity.level}</div>
                  {activity.instructor && (
                    <div><strong>Coach :</strong> {activity.instructor}</div>
                  )}
                </div>

                <div className="text-xs text-gray-500 mt-2">
                  Créé par : {activity.created_by} • {new Date(activity.created_at).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivitiesPage;
