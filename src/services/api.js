import axios from 'axios';
import { useAuthStore } from '@/stores/auth';

const api = axios.create({
  baseURL: 'https://todo-vue-back-api.onrender.com',
});

api.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore();
    if (authStore.token) {
      config.headers['Authorization'] = `Bearer ${authStore.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
