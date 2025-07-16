// File: src/components/Header.tsx
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-gradient-to-r from-[#C7C5C5] via-[#8F8C8C] to-[#736F6F] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" onClick={() => window.scrollTo(0, 0)}>
          <img
            src="/images/hero/logo_sportRadar.png"
            alt="SportRadar"
            className="h-16"
          />
        </Link>
        <nav className="flex items-center gap-6 text-white font-bold">
          <Link to="/" onClick={() => window.scrollTo(0, 0)}>Accueil</Link>

          {!isAuthenticated && (
            <>
              <Link to="/activities" onClick={() => window.scrollTo(0, 0)}>Activités</Link>
              <Link
                to="/login"
                className="bg-[#dc5f18] px-4 py-2 rounded"
                onClick={() => window.scrollTo(0, 0)}
              >
                Connexion
              </Link>
            </>
          )}

          {isAuthenticated && user?.is_staff && (
            <>
              <Link to="/activities" onClick={() => window.scrollTo(0, 0)}>Activités</Link>
              <Link to="/admin" onClick={() => window.scrollTo(0, 0)}>Admin</Link>
              <button
                onClick={handleLogout}
                className="bg-[#dc5f18] px-4 py-2 rounded"
              >
                Déconnexion
              </button>
            </>
          )}

          {isAuthenticated && !user?.is_staff && user?.type === 'business' && (
            <>
              <Link to="/business" onClick={() => window.scrollTo(0, 0)}>Espace Entreprise</Link>
              <Link to="/activities" onClick={() => window.scrollTo(0, 0)}>Activités</Link>
              <button
                onClick={handleLogout}
                className="bg-[#dc5f18] px-4 py-2 rounded"
              >
                Déconnexion
              </button>
            </>
          )}

          {isAuthenticated && !user?.is_staff && user?.type === 'personal' && (
            <>
              <Link to="/dashboard" onClick={() => window.scrollTo(0, 0)}>Dashboard</Link>
              <Link to="/activities" onClick={() => window.scrollTo(0, 0)}>Activités</Link>
              <Link to="/profile" onClick={() => window.scrollTo(0, 0)}>Mon profil</Link>
              <button
                onClick={handleLogout}
                className="bg-[#dc5f18] px-4 py-2 rounded"
              >
                Déconnexion
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
