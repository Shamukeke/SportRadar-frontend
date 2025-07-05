// src/api/axiosInstance.ts
import axios from 'axios';
import { refreshAccessToken } from '../utils/auth';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api/',
  headers: { 'Content-Type': 'application/json' },
});

// Interceptor pour ajouter automatiquement access_token,
// sauf pour les endpoints d'auth/inscription.
axiosInstance.interceptors.request.use(async (config) => {
  const url = config.url || '';
  // on skippe register, token et token/refresh
  if (!url.endsWith('/register/') && !url.endsWith('/token/') && !url.endsWith('/token/refresh/')) {
    const token = localStorage.getItem('access');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Interceptor pour gérer automatiquement les erreurs 401 (unauthorized)
axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      localStorage.getItem('refresh')
    ) {
      originalRequest._retry = true;
      const newAccess = await refreshAccessToken();
      if (newAccess) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${newAccess}`;
        originalRequest.headers['Authorization'] = `Bearer ${newAccess}`;
        return axiosInstance(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
