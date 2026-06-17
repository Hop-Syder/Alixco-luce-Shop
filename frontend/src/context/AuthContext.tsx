"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useTranslation } from '@/context/LanguageContext';

interface User {
  id: string;
  email: string | null;
  phone: string;
  full_name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, userData: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { t } = useTranslation();
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Only access localStorage on client-side after hydration
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    try {
      if (storedToken && storedUser) {
        const parsedUser: User = JSON.parse(storedUser);
        // Une seule mise à jour d'état groupée pour éviter les rendus en cascade depuis un effet
        React.startTransition(() => {
          setToken(storedToken);
          setUser(parsedUser);
        });
      }
    } catch {
      // If localStorage data is corrupted, clear it
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }, []);

  const login = (newToken: string, userData: User) => {
    setToken(newToken);
    setUser(userData);
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(userData));
    toast.success(t('auth.welcome_toast', { name: userData.full_name.split(' ')[0] }));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success(t('auth.logout_toast'));
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      login,
      logout,
      isAuthenticated: !!token
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
