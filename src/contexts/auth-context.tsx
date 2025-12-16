
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

// Real API calls to Google Apps Script
const api = {
  async register(email: string, password: string): Promise<{ success: boolean; message: string }> {
    const scriptUrl = process.env.NEXT_PUBLIC_APPS_SCRIPT_URL || "TU_URL_DE_IMPLEMENTACIÓN_AQUÍ";
    if (!scriptUrl || scriptUrl === "TU_URL_DE_IMPLEMENTACIÓN_AQUÍ") {
      throw new Error("La URL de Apps Script no está configurada. Por favor, añádala a las variables de entorno de su hosting.");
    }

    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8', // Required for Apps Script simple POST
      },
      body: JSON.stringify({ action: 'register', email, password }),
    });

    return response.json();
  },
  
  async login(email: string, password: string): Promise<{ success: boolean; message: string }> {
    const scriptUrl = process.env.NEXT_PUBLIC_APPS_SCRIPT_URL || "TU_URL_DE_IMPLEMENTACIÓN_AQUÍ";
    if (!scriptUrl || scriptUrl === "TU_URL_DE_IMPLEMENTACIÓN_AQUÍ") {
      throw new Error("La URL de Apps Script no está configurada. Por favor, añádala a las variables de entorno de su hosting.");
    }

    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify({ action: 'login', email, password }),
    });

    return response.json();
  },
};


interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  userEmail: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Comprobar si hay una sesión guardada
    const sessionEmail = sessionStorage.getItem('userEmail');
    if (sessionEmail) {
      setIsAuthenticated(true);
      setUserEmail(sessionEmail);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const response = await api.login(email, password);
    if (response.success) {
      setIsAuthenticated(true);
      setUserEmail(email);
      sessionStorage.setItem('userEmail', email);
      router.push('/dashboard');
    } else {
      throw new Error(response.message);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserEmail(null);
    sessionStorage.removeItem('userEmail');
    router.push('/login');
  };

  const register = async (email: string, password: string) => {
    const response = await api.register(email, password);
    if (!response.success) {
      throw new Error(response.message);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, userEmail, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};


export const AuthGuard = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || !isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="flex flex-col items-center space-y-2">
            <svg className="animate-spin h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-muted-foreground">Verificando sesión...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
