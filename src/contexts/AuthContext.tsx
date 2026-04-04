import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export type UserType = 'marca' | 'faccao' | 'artesao' | null;

interface AuthState {
  isLoggedIn: boolean;
  hasSeenOnboarding: boolean;
  userType: UserType;
  isApproved: boolean;
  userName: string;
  userEmail: string;
}

interface AuthContextType extends AuthState {
  register: (data: { name: string; email: string; password: string; userType: UserType }) => void;
  login: (email: string, password: string) => boolean;
  loginAsGuest: (userType: UserType) => void;
  logout: () => void;
  markOnboardingSeen: () => void;
  /** Simula aprovação (para teste) */
  simulateApproval: () => void;
}

const STORAGE_KEY = 'elo_auth';

const defaults: AuthState = {
  isLoggedIn: false,
  hasSeenOnboarding: false,
  userType: null,
  isApproved: false,
  userName: '',
  userEmail: '',
};

function load(): AuthState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...defaults, ...JSON.parse(raw) };
  } catch {
    /* ignore */
  }
  return defaults;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<AuthState>(load);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const register = useCallback(
    (data: { name: string; email: string; password: string; userType: UserType }) => {
      // Salva dados do registro; não loga automaticamente
      const registered = JSON.parse(localStorage.getItem('elo_registered_users') || '[]');
      registered.push({ email: data.email, password: data.password, name: data.name, userType: data.userType });
      localStorage.setItem('elo_registered_users', JSON.stringify(registered));

      setState((s) => ({
        ...s,
        hasSeenOnboarding: true,
        userType: data.userType,
        userName: data.name,
        userEmail: data.email,
        isApproved: false,
        isLoggedIn: false,
      }));
    },
    [],
  );

  const login = useCallback((email: string, password: string): boolean => {
    const registered: any[] = JSON.parse(localStorage.getItem('elo_registered_users') || '[]');
    const user = registered.find((u: any) => u.email === email && u.password === password);
    if (!user) return false;

    setState((s) => ({
      ...s,
      isLoggedIn: true,
      hasSeenOnboarding: true,
      userType: user.userType,
      userName: user.name,
      userEmail: user.email,
      isApproved: true, // se chegou ao login, já foi aprovado
    }));
    return true;
  }, []);

  const logout = useCallback(() => {
    setState((s) => ({ ...defaults, hasSeenOnboarding: s.hasSeenOnboarding }));
  }, []);

  const markOnboardingSeen = useCallback(() => {
    setState((s) => ({ ...s, hasSeenOnboarding: true }));
  }, []);

  const simulateApproval = useCallback(() => {
    setState((s) => ({ ...s, isApproved: true }));
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, register, login, logout, markOnboardingSeen, simulateApproval }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
};
