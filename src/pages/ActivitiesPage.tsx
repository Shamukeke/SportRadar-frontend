import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  Filter,
  Star,
  Heart,
  Zap,
  Leaf
} from 'lucide-react';

interface Activity {
  id: string;
  name: string;
  category: string;
  location: string;
  date: string;
  time: string;
  duration: string;
  participants: number;
  maxParticipants: number;
  price: string;
  level: string;
  sportZen: boolean;
  rating: number;
  description: string;
  instructor?: string;
  image: string;
}

const ActivitiesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { id: 'all', name: 'Toutes', icon: Heart },
    { id: 'yoga', name: 'Yoga', icon: Leaf },
    { id: 'running', name: 'Course', icon: Zap },
    { id: 'swimming', name: 'Natation', icon: Users },
    { id: 'fitness', name: 'Fitness', icon: Star }
  ];

  const activities: Activity[] = [
    {
      id: '1',
      name: 'Yoga doux en plein air',
      category: 'yoga',
      location: 'Parc des Buttes-Chaumont, Paris 19e',
      date: 'Aujourd\'hui',
      time: '18:00',
      duration: '1h',
      participants: 12,
      maxParticipants: 20,
      price: 'Gratuit',
      level: 'Débutant',
      sportZen: true,
      rating: 4.8,
      description: 'Séance de yoga accessible à tous dans un cadre verdoyant et apaisant.',
      instructor: 'Marie Chen',
      image: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '2',
      name: 'Course débutant',
      category: 'running',
      location: 'Bois de Vincennes, Paris 12e',
      date: 'Demain',
      time: '08:00',
      duration: '45min',
      participants: 8,
      maxParticipants: 15,
      price: '5€',
      level: 'Débutant',
      sportZen: false,
      rating: 4.5,
      description: 'Initiation à la course à pied avec un groupe bienveillant.',
      instructor: 'Thomas Martin',
      image: 'https://images.pexels.com/photos/2402926/pexels-photo-2402926.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '3',
      name: 'Aquagym seniors',
      category: 'swimming',
      location: 'Piscine Keller, Paris 15e',
      date: 'Mercredi',
      time: '14:00',
      duration: '1h15',
      participants: 15,
      maxParticipants: 25,
      price: '8€',
      level: 'Tous niveaux',
      sportZen: true,
      rating: 4.9,
      description: 'Activité aquatique douce spécialement adaptée aux seniors.',
      instructor: 'Sophie Dubois',
      image: 'https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '4',
      name: 'Pilates mat',
      category: 'fitness',
      location: 'Studio Wellness, Paris 11e',
      date: 'Jeudi',
      time: '19:30',
      duration: '1h',
      participants: 10,
      maxParticipants: 12,
      price: '15€',
      level: 'Intermédiaire',
      sportZen: true,
      rating: 4.7,
      description: 'Renforcement musculaire en douceur avec focus sur la posture.',
      instructor: 'Laura Petit',
      image: 'https://images.pexels.com/photos/3822621/pexels-photo-3822621.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '5',
      name: 'Marche nordique',
      category: 'fitness',
      location: 'Parc de la Villette, Paris 19e',
      date: 'Vendredi',
      time: '10:00',
      duration: '1h30',
      participants: 6,
      maxParticipants: 20,
      price: 'Gratuit',
      level: 'Tous niveaux',
      sportZen: true,
      rating: 4.6,
      description: 'Découverte de la marche nordique dans un cadre urbain verdoyant.',
      instructor: 'Jean Moreau',
      image: 'https://images.pexels.com/photos/7432616/pexels-photo-7432616.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '6',
      name: 'Tai Chi matinal',
      category: 'yoga',
      location: 'Jardin du Luxembourg, Paris 6e',
      date: 'Samedi',
      time: '08:30',
      duration: '1h',
      participants: 18,
      maxParticipants: 30,
      price: 'Gratuit',
      level: 'Tous niveaux',
      sportZen: true,
      rating: 4.9,
      description: 'Art martial doux pratiqué en groupe dans les jardins historiques.',
      instructor: 'Li Wei',
      image: 'https://images.pexels.com/photos/8436730/pexels-photo-8436730.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || activity.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || activity.level.toLowerCase().includes(selectedLevel.toLowerCase());
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Découvrez les activités près de chez vous
          </h1>
          <p className="text-gray-600">
            Trouvez l'activité parfaite selon vos préférences et les conditions du moment
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher une activité ou un lieu..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
              />
            </div>

            {/* Filters Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors lg:hidden"
            >
              <Filter className="w-5 h-5" />
              <span>Filtres</span>
            </button>
          </div>

          {/* Category Filters */}
          <div className={`mt-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="flex flex-wrap gap-2 mb-4">
              {categories.map(category => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-sky-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-sky-50 hover:text-sky-600'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{category.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Level Filter */}
            <div className="flex gap-2">
              {['all', 'débutant', 'intermédiaire', 'avancé'].map(level => (
                <button
                  key={level}
                  onClick={() => setSelectedLevel(level)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    selectedLevel === level
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600'
                  }`}
                >
                  {level === 'all' ? 'Tous niveaux' : level.charAt(0).toUpperCase() + level.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Weather Banner */}
        <div className="bg-gradient-to-r from-sky-500 to-emerald-500 rounded-xl p-6 text-white mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Conditions parfaites aujourd'hui !</h3>
              <p className="text-sky-100">22°C, ensoleillé • Qualité de l'air : Bonne</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">☀️</div>
              <div className="text-sm text-sky-100">Idéal pour l'extérieur</div>
            </div>
          </div>
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredActivities.map(activity => (
            <div key={activity.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              {/* Image */}
              <div className="relative h-48 bg-gray-200">
                <img
                  src={activity.image}
                  alt={activity.name}
                  className="w-full h-full object-cover"
                />
                {activity.sportZen && (
                  <div className="absolute top-3 left-3 bg-emerald-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                    SportZen
                  </div>
                )}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-semibold text-gray-900">
                  {activity.price}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{activity.name}</h3>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">{activity.rating}</span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4">{activity.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>{activity.location}</span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span>{activity.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span>{activity.time}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-1 text-gray-600">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span>{activity.participants}/{activity.maxParticipants} participants</span>
                    </div>
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
                      {activity.level}
                    </span>
                  </div>
                </div>

                {activity.instructor && (
                  <div className="text-sm text-gray-600 mb-4">
                    Avec <span className="font-medium">{activity.instructor}</span>
                  </div>
                )}

                <button className="w-full bg-sky-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-sky-700 transition-colors">
                  Participer
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredActivities.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucune activité trouvée</h3>
            <p className="text-gray-600">Essayez de modifier vos critères de recherche.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivitiesPage;