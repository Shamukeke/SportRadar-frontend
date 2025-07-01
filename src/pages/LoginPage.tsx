import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, User, Building, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const LoginPage: React.FC = () => {
  const [accountType, setAccountType] = useState<'personal' | 'business'>('personal');
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        if (formData.password !== formData.confirmPassword) {
          alert("Les mots de passe ne correspondent pas.");
          return;
        }

        await axios.post('http://localhost:8000/api/register/', {
          email: formData.email,
          username: formData.name,
          password: formData.password,
          type: accountType,
          preferences: {
            activities: ['yoga'], // valeurs par défaut
            location: 'Paris',
            level: 'débutant'
          }
        });

        await login(formData.email, formData.password);
      }

      navigate('/dashboard');
    } catch (error) {
      console.error('Erreur lors de la connexion ou inscription :', error);
      alert("Identifiants incorrects ou erreur côté serveur.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-[#C7C5C5] py-12">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <div className="#0a1128 rounded-2xl shadow-xl overflow-hidden">
          <div className="px-6 py-8 bg-[#0a1128] text-gray-400 text-center">
            <Link to="/" className="inline-flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 #0a1128/20 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-[#dc5f18]" />
              </div>
              <span className="text-xl font-bold">SportRadar</span>
            </Link>
            <h1 className="text-2xl font-bold">{isLogin ? 'Bienvenue !' : 'Rejoignez-nous'}</h1>
            <p className="text-sky-100 mt-2">{isLogin ? 'Connectez-vous à votre espace' : 'Créez votre compte'}</p>
          </div>
<div className="px-6 py-4 border-b border-[#dc5f18]">
  <div className="flex rounded-lg bg-[#0a1128] p-1">
    <button
      type="button"
      onClick={() => setAccountType('personal')}
      className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md text-sm font-medium transition-all ${
        accountType === 'personal' 
          ? 'text-[#0a1128] bg-white' 
          : 'text-[#C7C5C5] hover:bg-[#dc5f18] hover:text-white'
      }`}
    >
      <User className={`w-4 h-4 ${
        accountType === 'personal' ? 'text-[#0a1128]' : 'text-[#C7C5C5] group-hover:text-white'
      }`} />
      <span>Personnel</span>
    </button>
    <button
      type="button"
      onClick={() => setAccountType('business')}
      className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md text-sm font-medium transition-all ${
        accountType === 'business' 
          ? 'text-[#0a1128] bg-white' 
          : 'text-[#C7C5C5] hover:bg-[#dc5f18] hover:text-white'
      }`}
    >
      <Building className={`w-4 h-4 ${
        accountType === 'business' ? 'text-[#0a1128]' : 'text-[#C7C5C5] group-hover:text-white'
      }`} />
      <span>Entreprise</span>
    </button>
  </div>
</div>

          <form onSubmit={handleSubmit} className="px-6 py-6 space-y-4">
            {!isLogin && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
                  {accountType === 'business' ? "Nom de l'entreprise" : 'Nom complet'}
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
                  placeholder={accountType === 'business' ? 'Mon Entreprise' : 'Jean Dupont'}
                  required={!isLogin}
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
                  placeholder="votre@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-400 mb-2">Mot de passe</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-400 mb-2">
                  Confirmer le mot de passe
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
                    placeholder="••••••••"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0a1128] text-gray-200 py-3 px-4 rounded-lg font-semibold hover:brightness-110 focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Chargement...' : isLogin ? 'Se connecter' : 'Créer mon compte'}
            </button>
          </form>

          <div className="px-6 py-4 #0a1128 text-center">
            <p className="text-sm text-gray-600">
              {isLogin ? 'Pas encore de compte ?' : 'Déjà un compte ?'}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="ml-1 text-[#0a1128] hover:text-sky-700 font-medium"
              >
                {isLogin ? 'Créer un compte' : 'Se connecter'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
