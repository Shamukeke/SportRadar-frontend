import React from 'react';
import { Heart, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-sky-500 to-emerald-500 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">SportRadar</span>
            </div>
            <p className="text-sm text-gray-400">
              Votre compagnon bien-être pour une pratique sportive accessible et personnalisée.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-sky-400 transition-colors">Accueil</a></li>
              <li><a href="/activities" className="hover:text-sky-400 transition-colors">Activités</a></li>
              <li><a href="/business" className="hover:text-sky-400 transition-colors">Entreprises</a></li>
              <li><a href="/dashboard" className="hover:text-sky-400 transition-colors">Mon espace</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-sky-400 transition-colors">Activités locales</a></li>
              <li><a href="#" className="hover:text-sky-400 transition-colors">Recommandations</a></li>
              <li><a href="#" className="hover:text-sky-400 transition-colors">Badge SportZen</a></li>
              <li><a href="#" className="hover:text-sky-400 transition-colors">Bien-être entreprise</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-sky-400" />
                <span>contact@sportradar.fr</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-sky-400" />
                <span>01 23 45 67 89</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-sky-400" />
                <span>Paris, France</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2025 SportRadar by VitaMobilis. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;