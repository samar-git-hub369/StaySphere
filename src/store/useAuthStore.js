import { create } from 'zustand';
import { auth } from '../firebase/config';
import { signOut } from 'firebase/auth';

export const useAuthStore = create((set) => ({
  user: null, // { uid, email, name, role, profileImg }
  isAuthenticated: false,
  isLoading: true,
  
  setUser: (user) => set({ user, isAuthenticated: !!user, isLoading: false }),
  setLoading: (isLoading) => set({ isLoading }),
  logout: async () => {
    try {
      await signOut(auth);
      set({ user: null, isAuthenticated: false, isLoading: false });
    } catch (error) {
      console.error("Error signing out:", error);
    }
  },
}));
