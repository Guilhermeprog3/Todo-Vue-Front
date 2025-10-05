<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import ErrorMessage from '@/components/ErrorMessage.vue';

const authStore = useAuthStore();
const email = ref('');
const password = ref('');

const handleLogin = () => {
  if (!email.value || !password.value) {
    alert('Por favor, preencha todos os campos.');
    return;
  }
  authStore.login(email.value, password.value);
};
</script>

<template>
  <div class="max-w-md mx-auto mt-10 p-8 bg-white rounded-lg shadow-xl">
    <h2 class="text-3xl font-extrabold text-gray-900 mb-6 text-center">Entrar na Conta</h2>
    <ErrorMessage v-if="authStore.error" :message="authStore.error" />
    <form @submit.prevent="handleLogin" class="space-y-6">
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">Email:</label>
        <input
          type="email"
          id="email"
          v-model="email"
          required
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <label for="password" class="block text-sm font-medium text-gray-700">Senha:</label>
        <input
          type="password"
          id="password"
          v-model="password"
          required
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <button
        type="submit"
        :disabled="authStore.loading"
        class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 disabled:opacity-50"
      >
        {{ authStore.loading ? 'Entrando...' : 'Entrar' }}
      </button>
    </form>
    <p class="mt-4 text-center text-sm text-gray-600 bg-yellow-100 p-2 rounded">
      Não tem uma conta?
      <RouterLink to="/register" class="font-medium text-indigo-600 hover:text-indigo-500">Registre-se aqui</RouterLink>
    </p>
  </div>
</template>