import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export type UserType = 'marca' | 'faccao' | 'artesao' | null;

interface AuthState {
  isLoggedIn: boolean;
  hasSeenOnboarding: boolean;
  userType: UserType;
  isApproved: boolean;
  userName: string;
  userEmail: string;
  isGuest: boolean;
  isLoading: boolean;
}

interface AuthContextType extends AuthState {
  register: (data: { name: string; email: string; password: string; userType: UserType }) => Promise<{ error?: string }>;
  login: (email: string, password: string) => Promise<boolean>;
  loginAsGuest: (userType: UserType) => void;
  logout: () => Promise<void>;
  markOnboardingSeen: () => void;
  simulateApproval: () => Promise<void>;
}

const ONBOARDING_KEY = 'elo_onboarding_seen';
const GUEST_KEY = 'elo_guest';

const defaults: AuthState = {
  isLoggedIn: false,
  hasSeenOnboarding: false,
  userType: null,
  isApproved: false,
  userName: '',
  userEmail: '',
  isGuest: false,
  isLoading: true,
};

const AuthContext = createContext<AuthContextType | null>(null);

async function fetchProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('name, user_type, is_approved')
    .eq('user_id', userId)
    .maybeSingle();
  if (error || !data) return null;
  return data;
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<AuthState>(() => {
    const onboarding = localStorage.getItem(ONBOARDING_KEY) === 'true';
    const guest = localStorage.getItem(GUEST_KEY);
    if (guest) {
      try {
        const g = JSON.parse(guest);
        return {
          ...defaults,
          isLoggedIn: true,
          hasSeenOnboarding: true,
          userType: g.userType,
          isApproved: true,
          userName: 'Visitante',
          userEmail: '',
          isGuest: true,
          isLoading: false,
        };
      } catch { /* ignore */ }
    }
    return { ...defaults, hasSeenOnboarding: onboarding };
  });

  useEffect(() => {
    // Listen for auth changes FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        localStorage.removeItem(GUEST_KEY);
        const profile = await fetchProfile(session.user.id);
        setState(prev => ({
          ...prev,
          isLoggedIn: true,
          hasSeenOnboarding: true,
          userType: (profile?.user_type as UserType) || null,
          isApproved: profile?.is_approved ?? false,
          userName: profile?.name ?? '',
          userEmail: session.user.email ?? '',
          isGuest: false,
          isLoading: false,
        }));
      } else {
        const guest = localStorage.getItem(GUEST_KEY);
        if (guest) return;
        setState(prev => ({
          ...defaults,
          hasSeenOnboarding: prev.hasSeenOnboarding,
          isLoading: false,
        }));
      }
    });

    // Then check existing session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        const profile = await fetchProfile(session.user.id);
        setState(prev => ({
          ...prev,
          isLoggedIn: true,
          hasSeenOnboarding: true,
          userType: (profile?.user_type as UserType) || null,
          isApproved: profile?.is_approved ?? false,
          userName: profile?.name ?? '',
          userEmail: session.user.email ?? '',
          isGuest: false,
          isLoading: false,
        }));
      } else {
        setState(prev => ({ ...prev, isLoading: false }));
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (state.hasSeenOnboarding) {
      localStorage.setItem(ONBOARDING_KEY, 'true');
    }
  }, [state.hasSeenOnboarding]);

  const register = useCallback(async (data: { name: string; email: string; password: string; userType: UserType }): Promise<{ error?: string }> => {
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        emailRedirectTo: window.location.origin,
        data: {
          name: data.name,
          user_type: data.userType,
        },
      },
    });

    if (error) return { error: error.message };

    setState(prev => ({
      ...prev,
      hasSeenOnboarding: true,
      userName: data.name,
      userEmail: data.email,
      userType: data.userType,
    }));

    return {};
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return !error;
  }, []);

  const loginAsGuest = useCallback((guestType: UserType) => {
    localStorage.setItem(GUEST_KEY, JSON.stringify({ userType: guestType }));
    setState(prev => ({
      ...prev,
      isLoggedIn: true,
      hasSeenOnboarding: true,
      userType: guestType,
      isApproved: true,
      userName: 'Visitante',
      userEmail: '',
      isGuest: true,
      isLoading: false,
    }));
  }, []);

  const logout = useCallback(async () => {
    localStorage.removeItem(GUEST_KEY);
    await supabase.auth.signOut();
    setState(prev => ({
      ...defaults,
      hasSeenOnboarding: prev.hasSeenOnboarding,
      isLoading: false,
    }));
  }, []);

  const markOnboardingSeen = useCallback(() => {
    setState(prev => ({ ...prev, hasSeenOnboarding: true }));
  }, []);

  const simulateApproval = useCallback(async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      await supabase
        .from('profiles')
        .update({ is_approved: true } as any)
        .eq('user_id', session.user.id);
    }
    setState(prev => ({ ...prev, isApproved: true }));
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, register, login, loginAsGuest, logout, markOnboardingSeen, simulateApproval }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
};
