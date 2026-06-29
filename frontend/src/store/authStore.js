import { create } from 'zustand';
import { authApi } from '../services/authApi';

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

export const useAuthStore = create((set) => ({
  ...initialState,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setToken: (token) => set({ token }),
  login: async (username, password) => {
    const response = await authApi.login({ username, password });
    const data = response.data;
    if (response.ok) {
      set({ user: data.user, token: data.token, isAuthenticated: true });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    } else {
      throw new Error(data.detail || 'Login failed');
    }
  },
  register: async (email, password, username) => {
    const response = await authApi.register({ username, email, password });
    const data = response.data;
    if (response.ok) {
      set({ user: data.user, token: data.token, isAuthenticated: true });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    } else {
      throw new Error(data.detail || 'Registration failed');
    }
  },
  logout: () => {
    set(initialState);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
}));
