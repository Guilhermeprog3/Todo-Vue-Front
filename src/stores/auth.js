import { defineStore } from 'pinia';
import api from '@/services/api';
import router from '@/router';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    user: null,
    error: null,
    loading: false,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    async login(email, password) {
      this.loading = true;
      this.error = null;
      try {
        const params = new URLSearchParams();
        params.append('username', email);
        params.append('password', password);
        const response = await api.post('/token', params);
        this.token = response.data.access_token;
        localStorage.setItem('token', this.token);
        router.push('/');
      } catch (error) {
        if (error.response) {
          if (error.response.status === 400) {
            this.error = 'E-mail ou senha incorretos.';
          } else {
            this.error = 'Ocorreu um erro no servidor. Tente novamente mais tarde.';
          }
        } else if (error.request) {
          this.error = 'Não foi possível se conectar ao servidor. Verifique sua conexão com a internet.';
        } else {
          this.error = 'Ocorreu um erro inesperado. Tente novamente.';
        }
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    async register(email, password) {
      this.loading = true;
      this.error = null;
      try {
        await api.post('/users/', { email, password });
        await this.login(email, password);
      } catch (error) {
        if (error.response && error.response.status === 400) {
          this.error = 'Este e-mail já está em uso.';
        } else {
          this.error = 'Falha no registro. Tente novamente mais tarde.';
        }
        console.error(error);
      } finally {
        this.loading = false;
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