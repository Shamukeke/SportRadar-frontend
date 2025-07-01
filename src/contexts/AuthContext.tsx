import axiosInstance from '../api/axiosInstance';
import React, { createContext, useContext, useState, useEffect } from 'react';


interface User {
  id: string;
  name: string;
  email: string;
  type: 'personal' | 'business';
  preferences?: {
    activities: string[];
    location: string;
    level: string;
  };
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = !!user;

  const login = async (email: string, password: string) => {
    const res = await axiosInstance.post('http://localhost:8000/api/token/', {
      email,
      password
    });

    localStorage.setItem('access', res.data.access);
    localStorage.setItem('refresh', res.data.refresh);

    const me = await axiosInstance.get('http://localhost:8000/api/me', {
      headers: { Authorization: `Bearer ${res.data.access}` }
    });

    setUser(me.data);
  };

  const logout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    setUser(null);
  };

  const fetchMe = async (access: string) => {
    try {
      const res = await axiosInstance.get('http://localhost:8000/api/me', {
        headers: { Authorization: `Bearer ${access}` }
      });
      setUser(res.data);
    } catch (err) {
      logout();
    }
  };

  const refreshToken = async () => {
    const refresh = localStorage.getItem('refresh');
    if (!refresh) return logout();

    try {
      const res = await axiosInstance.post('http://localhost:8000/api/token/refresh/', {
        refresh
      });
      localStorage.setItem('access', res.data.access);
      await fetchMe(res.data.access);
    } catch (err) {
      logout();
    }
  };

  useEffect(() => {
    const access = localStorage.getItem('access');
    if (access) {
      fetchMe(access);
    }

    const interval = setInterval(() => {
      refreshToken();
    }, 4 * 60 * 1000); // toutes les 4 minutes

    return () => clearInterval(interval);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
