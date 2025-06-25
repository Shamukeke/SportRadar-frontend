import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { 
  Activity, 
  MapPin, 
  Calendar, 
  Clock, 
  TrendingUp, 
  Target,
  Sun,
  Wind,
  Users,
  Award
} from 'lucide-react';

const DashboardPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const personalStats = [
    { label: 'Activités cette semaine', value: '3', icon: Activity, color: 'text-sky-600' },
    { label: 'Minutes d\'exercice', value: '180', icon: Clock, color: 'text-emerald-600' },
    { label: 'Objectif mensuel', value: '75%', icon: Target, color: 'text-orange-600' },
    { label: 'Niveau atteint', value: 'Intermédiaire', icon: TrendingUp, color: 'text-purple-600' }
  ];

  const businessStats = [
    { label: 'Employés actifs', value: '127', icon: Users, color: 'text-sky-600' },
    { label: 'Sessions organisées', value: '24', icon: Calendar, color: 'text-emerald-600' },
    { label: 'Taux de participation', value: '85%', icon: TrendingUp, color: 'text-orange-600' },
    { label: 'Score bien-être', value: '4.2/5', icon: Award, color: 'text-purple-600' }
  ];

  const recentActivities = [
    { name: 'Yoga en plein air', location: 'Parc des Buttes-Chaumont', date: 'Aujourd\'hui 18h00', badge: 'SportZen' },
    { name: 'Course débutant', location: 'Bois de Vincennes', date: 'Demain 8h00', badge: null },
    { name: 'Natation libre', location: 'Piscine Keller', date: 'Mercredi 12h00', badge: 'SportZen' }
  ];

  const weatherData = {
    temperature: '22°C',
    condition: 'Ensoleillé',
    airQuality: 'Bonne',
    recommendation: 'Parfait pour les activités en extérieur !'
  };

  const stats = user?.type === 'business' ? businessStats : personalStats;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Bonjour {user?.name} !
          </h1>
          <p className="text-gray-600 mt-2">
            {user?.type === 'business' 
              ? 'Tableau de bord entreprise - Suivi du bien-être de vos équipes'
              : 'Voici votre tableau de bord personnel'
            }
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg bg-gray-50 ${stat.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Weather & Recommendations */}
            {user?.type === 'personal' && (
              <div className="bg-gradient-to-r from-sky-500 to-emerald-500 rounded-xl p-6 text-white">
                <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
                  <Sun className="w-5 h-5" />
                  <span>Conditions actuelles</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{weatherData.temperature}</div>
                    <div className="text-sky-100">{weatherData.condition}</div>
                  </div>
                  <div className="text-center">
                    <Wind className="w-6 h-6 mx-auto mb-1" />
                    <div className="text-sky-100">Air: {weatherData.airQuality}</div>
                  </div>
                  <div className="text-center md:text-left">
                    <div className="text-sm font-medium">Recommandation</div>
                    <div className="text-sky-100 text-sm">{weatherData.recommendation}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Recent Activities */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {user?.type === 'business' ? 'Prochaines sessions' : 'Activités recommandées'}
              </h2>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center">
                        <Activity className="w-5 h-5 text-sky-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 flex items-center space-x-2">
                          <span>{activity.name}</span>
                          {activity.badge && (
                            <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-full font-semibold">
                              {activity.badge}
                            </span>
                          )}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{activity.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{activity.date}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button className="bg-sky-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-sky-700 transition-colors">
                      {user?.type === 'business' ? 'Gérer' : 'Participer'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions rapides</h3>
              <div className="space-y-3">
                <button className="w-full bg-sky-50 text-sky-700 p-3 rounded-lg text-left hover:bg-sky-100 transition-colors">
                  <div className="font-medium">Trouver une activité</div>
                  <div className="text-sm text-sky-600">Près de chez vous</div>
                </button>
                <button className="w-full bg-emerald-50 text-emerald-700 p-3 rounded-lg text-left hover:bg-emerald-100 transition-colors">
                  <div className="font-medium">
                    {user?.type === 'business' ? 'Planifier session' : 'Définir objectifs'}
                  </div>
                  <div className="text-sm text-emerald-600">
                    {user?.type === 'business' ? 'Pour vos équipes' : 'Pour cette semaine'}
                  </div>
                </button>
                <button className="w-full bg-orange-50 text-orange-700 p-3 rounded-lg text-left hover:bg-orange-100 transition-colors">
                  <div className="font-medium">Voir les progrès</div>
                  <div className="text-sm text-orange-600">Rapports détaillés</div>
                </button>
              </div>
            </div>

            {/* Profile Summary */}
            {user?.type === 'personal' && user.preferences && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Mon profil</h3>
                <div className="space-y-3">
                  <div>
                    <div className="text-sm font-medium text-gray-600">Activités préférées</div>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {user.preferences.activities.map((activity, index) => (
                        <span key={index} className="bg-sky-100 text-sky-800 text-xs px-2 py-1 rounded-full">
                          {activity}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-600">Localisation</div>
                    <div className="text-sm text-gray-900 mt-1">{user.preferences.location}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-600">Niveau</div>
                    <div className="text-sm text-gray-900 mt-1 capitalize">{user.preferences.level}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;