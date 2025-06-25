import React, { createContext, useContext, useState, ReactNode } from 'react';

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
  login: (email: string, password: string, type: 'personal' | 'business') => Promise<void>;
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

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string, type: 'personal' | 'business') => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser: User = {
      id: '1',
      name: type === 'business' ? 'Entreprise Exemple' : 'Marie Dupont',
      email,
      type,
      preferences: type === 'personal' ? {
        activities: ['yoga', 'marche', 'natation'],
        location: 'Paris 11ème',
        level: 'débutant'
      } : undefined
    };
    
    setUser(mockUser);
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};