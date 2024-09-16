import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { produce } from 'immer';

type AuthState = {
  token: string | null;
  user: {
    full_name: string;
    email: string;
  } | null;
  isAuthenticated: boolean;
//   setAuthData: (token: string, user: { full_name: string; email: string }) => void;
setAuthData: (token: string, user: { full_name: string; email: string }) => void;

};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      setAuthData: (token, user) => {
        set(
          produce((state) => {
            state.token = token;
            state.user = user;
            state.isAuthenticated = !!token;
          })
        );
      },
    }),
    {
      name: 'auth-storage', // Storage key
      storage: createJSONStorage(() => localStorage), // Persist in localStorage (you can use sessionStorage if preferred)
    }
  )
);
