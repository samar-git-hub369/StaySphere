import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null, // { uid, email, name, role, profileImg }
  isAuthenticated: false,
  isLoading: true,
  
  setUser: (user) => set({ user, isAuthenticated: !!user, isLoading: false }),
  setLoading: (isLoading) => set({ isLoading }),
  logout: () => set({ user: null, isAuthenticated: false, isLoading: false }),
}));
