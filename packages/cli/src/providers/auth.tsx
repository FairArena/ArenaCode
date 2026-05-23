import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

import { apiClient } from "../lib/api-client";
import { addAuthListener, clearAuth, getAuth, saveAuth } from "../lib/auth";

type AuthContextValue = {
  isAuthenticated: boolean;
  token: string | null;
  remainingCredits: number | null;
  consumedCredits: number | null;
  login: (token: string) => void;
  logout: () => void;
  refreshCredits: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [remainingCredits, setRemainingCredits] = useState<number | null>(null);
  const [consumedCredits, setConsumedCredits] = useState<number | null>(null);

  const refreshCredits = useCallback(async () => {
    const auth = getAuth();
    if (!auth) {
      setRemainingCredits(null);
      setConsumedCredits(null);
      return;
    }

    try {
      const res = await apiClient.billing.balance.$get();
      if (res.ok) {
        const data = (await res.json()) as { remaining: number; consumed: number };
        setRemainingCredits(data.remaining);
        setConsumedCredits(data.consumed);
      }
    } catch {
      // Ignore balance refresh failures; auth state remains valid.
    }
  }, []);

  useEffect(() => {
    const auth = getAuth();
    setToken(auth ? auth.token : null);

    if (auth) {
      void refreshCredits();
    }

    const unsubscribe = addAuthListener((data) => {
      setToken(data ? data.token : null);

      if (data) {
        void refreshCredits();
      } else {
        setRemainingCredits(null);
        setConsumedCredits(null);
      }
    });

    const interval = setInterval(() => {
      if (getAuth()) {
        void refreshCredits();
      }
    }, 30000);

    return () => {
      unsubscribe();
      clearInterval(interval);
    };
  }, [refreshCredits]);

  const login = (newToken: string) => {
    saveAuth({ token: newToken });
  };

  const logout = () => {
    clearAuth();
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: token !== null,
        token,
        remainingCredits,
        consumedCredits,
        login,
        logout,
        refreshCredits,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}