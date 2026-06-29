import axios from 'axios';

const API_BASE_URL = 'http://localhost:6030';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authApi = {
  register(data) {
    return api.post('/api/auth/register', data);
  },
  login(data) {
    return api.post('/api/auth/login', data);
  },
  logout() {
    return api.post('/api/auth/logout');
  },
  getCurrentUser() {
    return api.get('/api/auth/me');
  },
};

export default api;
