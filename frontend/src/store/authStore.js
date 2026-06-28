import { create } from 'zustand';

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

export const useAuthStore = create((set) => ({
  ...initialState,
  login: async (username, password) => {
    const response = await fetch('http://localhost:6030/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (response.ok) {
      set({ user: data.user, token: data.token, isAuthenticated: true });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    } else {
      throw new Error(data.detail || 'Login failed');
    }
  },
  register: async (email, password, username) => {
    const response = await fetch('http://localhost:6030/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, username }),
    });
    const data = await response.json();
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
