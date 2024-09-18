  import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { produce } from 'immer';

type AuthState = {
  jwtToken: string | null;
  roleToken: string | null;
  refreshToken: string | null;
  user: {
    full_name?: string;
    email: string;
  } | null;
  isAuthenticated: boolean;
  setAuthData: (jwtToken: string, roleToken: string, refreshToken: string, user: { full_name?: string; email: string }) => void;
  logout: () => void; // Added logout method to the type
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      jwtToken: null,
      roleToken: null,
      refreshToken: null,
      user: null,
      isAuthenticated: false,
      setAuthData: (jwtToken, roleToken, refreshToken, user) => {
        set(
          produce((state) => {
            state.jwtToken = jwtToken;
            state.roleToken = roleToken;
            state.refreshToken = refreshToken;
            state.user = user;
            state.isAuthenticated = !!jwtToken;
          })
        );
      },
      logout: () => {
        set(
          produce((state) => {
            state.jwtToken = null;
            state.roleToken = null;
            state.refreshToken = null;
            state.user = null;
            state.isAuthenticated = false;
          })
        );
        localStorage.removeItem('auth-storage'); // Remove the stored data from localStorage
      }
    }),
    {
      name: 'auth-storage', // Storage key
      storage: createJSONStorage(() => localStorage), // Persist in localStorage
    }
  )
);
