import { defineStore } from 'pinia';
import api from '@/services/api';
import router from '@/router';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    user: null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    async login(email, password) {
      try {
        const params = new URLSearchParams();
        params.append('username', email);
        params.append('password', password);
        const response = await api.post('/token', params);
        this.token = response.data.access_token;
        localStorage.setItem('token', this.token);
        router.push('/');
      } catch (error) {
        alert('Falha no login: Email ou senha incorretos.');
        console.error(error);
      }
    },
    async register(email, password) {
        try {
            await api.post('/users/', { email, password });
            await this.login(email, password);
        } catch (error) {
            alert('Falha no registro. O email pode já estar em uso.');
            console.error(error);
        }
    },
    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem('token');
      router.push('/login');
    },
  },
});