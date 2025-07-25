import React, { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';

interface Company {
  id: number;
  name: string;
  plan: { name: string; price: number; billing_period: string; };
  is_active: boolean;
}
interface User {
  id: number;
  email: string;
  username: string;
  type: 'personal' | 'business';
  preferences?: any;
  avatar?: string;
  is_staff: boolean;
  company?: Company;
  isCompanyAdmin?: boolean;
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

  const fetchMe = async () => {
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
  const updateUser = async (updates: Partial<User>) => {
    const { data } = await axiosInstance.patch('/me/', updates);
    setUser(prev => ({ ...prev!, ...data }));
    return data;
  };

  useEffect(() => {
    if (localStorage.getItem('access')) fetchMe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
