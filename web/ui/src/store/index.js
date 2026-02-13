import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { setAuthToken, authApi } from '../api/client';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      
      login: async (username, password) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authApi.login({ username, password });
          const { token, ...user } = response.data;
          setAuthToken(token);
          set({ user, token, isAuthenticated: true, isLoading: false });
          return user;
        } catch (error) {
          const message = error.response?.data?.error || 'Login failed';
          set({ error: message, isLoading: false });
          throw new Error(message);
        }
      },
      
      logout: () => {
        setAuthToken(null);
        set({ user: null, token: null, isAuthenticated: false });
      },
      
      clearError: () => set({ error: null }),
      
      setUser: (user) => set({ user }),
      
      isAdmin: () => get().user?.role === 'admin',
      
      isAgent: () => get().user?.role === 'agent',
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ token: state.token, user: state.user }),
    }
  )
);

// Zones Store
export const useZonesStore = create((set, get) => ({
  zones: [],
  selectedZone: null,
  isLoading: false,
  error: null,
  
  setZones: (zones) => set({ zones }),
  setSelectedZone: (zone) => set({ selectedZone: zone }),
  
  addZone: (zone) => set((state) => ({ 
    zones: [...state.zones, zone] 
  })),
  
  updateZone: (id, data) => set((state) => ({
    zones: state.zones.map(z => z.id === id ? { ...z, ...data } : z)
  })),
  
  removeZone: (id) => set((state) => ({
    zones: state.zones.filter(z => z.id !== id)
  })),
  
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}));

// UI Store
export const useUIStore = create((set) => ({
  sidebarOpen: true,
  theme: 'light',
  notifications: [],
  
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setTheme: (theme) => set({ theme }),
  
  addNotification: (notification) => set((state) => ({
    notifications: [...state.notifications, { 
      id: Date.now(), 
      ...notification 
    }]
  })),
  
  removeNotification: (id) => set((state) => ({
    notifications: state.notifications.filter(n => n.id !== id)
  })),
  
  clearNotifications: () => set({ notifications: [] }),
}));
