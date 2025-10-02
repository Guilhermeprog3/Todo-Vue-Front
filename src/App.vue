<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
</script>

<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">
    <header class="bg-white shadow-md p-4">
      <div class="max-w-7xl mx-auto flex justify-between items-center">
        <h1 class="text-2xl font-bold">
          <RouterLink to="/" class="text-indigo-600 hover:text-indigo-800">To-Do List</RouterLink>
        </h1>
        <nav class="space-x-4">
          <RouterLink v-if="!authStore.isAuthenticated" to="/login" class="text-gray-600 hover:text-indigo-600">Login</RouterLink>
          <RouterLink v-if="!authStore.isAuthenticated" to="/register" class="text-gray-600 hover:text-indigo-600">Registrar</RouterLink>
          <a v-if="authStore.isAuthenticated" href="#" @click.prevent="authStore.logout()" class="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md">Sair</a>
        </nav>
      </div>
    </header>
    <main class="flex-grow container mx-auto p-4">
      <RouterView />
    </main>
  </div>
</template>