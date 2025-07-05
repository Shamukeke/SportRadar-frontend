import React, {
  createContext,
  useContext,
  useState,
  useEffect
} from 'react';
import axiosInstance from '../api/axiosInstance';

interface User {
  id: number;
  username: string;
  email: string;
  type: 'personal' | 'business';
  preferences?: {
    activities: string[];
    location: string;
    level: string;
    objectives?: string[];
  };
  avatar?: string;
  is_staff: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  updateUser: (updates: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = Boolean(user);

  const fetchMe = async (accessToken?: string) => {
    try {
      const res = await axiosInstance.get('/me/');
      setUser(res.data);
    } catch {
      logout();
    }
  };

  const login = async (email: string, password: string) => {
    const { data } = await axiosInstance.post('/token/', { email, password });
    localStorage.setItem('access', data.access);
    localStorage.setItem('refresh', data.refresh);
    await fetchMe();
  };

  const logout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    setUser(null);
  };

  // Nouvelle fonction pour mettre à jour les données utilisateur
  const updateUser = async (updates: Partial<User>) => {
    try {
      const { data } = await axiosInstance.patch('/me/', updates);
      setUser(prev => ({ ...prev!, ...data }));
      return data;
    } catch (error) {
      console.error('Failed to update user:', error);
      throw error;
    }
  };

  const refreshToken = async () => {
    const refresh = localStorage.getItem('refresh');
    if (!refresh) return logout();
    try {
      const { data } = await axiosInstance.post('/token/refresh/', { refresh });
      localStorage.setItem('access', data.access);
      await fetchMe();
    } catch {
      logout();
    }
  };

  useEffect(() => {
    if (localStorage.getItem('access')) {
      fetchMe();
    }
    const iv = setInterval(refreshToken, 4 * 60 * 1000);
    return () => clearInterval(iv);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
