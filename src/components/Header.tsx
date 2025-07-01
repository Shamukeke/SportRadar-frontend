import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-gradient-to-r from-[#C7C5C5] via-[#8F8C8C] via-[43%] via-[#736F6F] via-[71%] to-[#736F6F] to-[96%]">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="mb-4 sm:mb-0">
          <img
            src="/images/hero/logo_sportRadar.png"
            alt="SportRadar Logo"
            className="h-16 sm:h-20 w-auto"
          />
        </Link>

        {/* Navigation */}
        <nav className="flex flex-col sm:flex-row gap-4 items-center text-gray-200 text-lg font-bold">
          <Link to="/" className="text-white hover:text-[#0a1128]">Accueil</Link>

          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="text-white hover:text-[#0a1128]">Dashboard</Link>
              <Link to="/activities" className="text-white hover:text-[#0a1128]">Activités</Link>
              {user?.type === 'business' && (
                <Link to="/business" className="text-white hover:text-[#0a1128]">Espace Entreprise</Link>
              )}
              <Link to="/profile" className="text-white hover:text-[#0a1128]">Mon profil</Link>
              <button
                onClick={handleLogout}
                className="bg-[#dc5f18] px-4 py-2 rounded-lg text-white text-lg font-medium hover:bg-[#0a1128] transition-colors"
              >
                Déconnexion
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-[#dc5f18] text-white px-4 py-2 rounded-lg text-lg font-medium hover:bg-[#0a1128] transition-colors"
            >
              Connexion
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
