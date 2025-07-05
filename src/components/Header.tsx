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
    <header className="bg-gradient-to-r from-[#C7C5C5] via-[#8F8C8C] to-[#736F6F]">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap items-center justify-between">
        <Link to="/">
          <img
            src="/images/hero/logo_sportRadar.png"
            alt="SportRadar"
            className="h-16"
          />
        </Link>
        <nav className="flex flex-wrap items-center gap-4 text-white font-bold">
          <Link to="/">Accueil</Link>
          {isAuthenticated ? (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/activities">Activités</Link>
              {user?.type === 'business' && (
                <Link to="/business">Espace Entreprise</Link>
              )}
              {user?.is_staff && (
                <Link to="/admin">Admin</Link>
              )}
              <Link to="/profile">Mon profil</Link>
              <button
                onClick={handleLogout}
                className="bg-[#dc5f18] px-4 py-2 rounded"
              >
                Déconnexion
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-[#dc5f18] px-4 py-2 rounded"
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
