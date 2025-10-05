<script setup>
import { ref, onMounted } from 'vue';
import api from '@/services/api';
import TaskList from '@/components/TaskList.vue';
import TaskForm from '@/components/TaskForm.vue';
import ErrorMessage from '@/components/ErrorMessage.vue';

const tasks = ref([]);
const loading = ref(true);
const error = ref(null);
const showTaskForm = ref(false);
const editingTask = ref(null);

const fetchTasks = async () => {
  try {
    loading.value = true;
    error.value = null;
    const response = await api.get('/tasks/');
    tasks.value = response.data;
  } catch (err) {
    if (err.code === 'ECONNABORTED' || !err.response) {
      error.value = 'O servidor está demorando para responder. Ele pode estar "despertando". Por favor, tente novamente em 1 minuto.';
    } else {
      error.value = 'Erro ao buscar tarefas.';
    }
    console.error('Erro ao buscar tarefas:', err);
  } finally {
    loading.value = false;
  }
};

const openCreateForm = () => {
  editingTask.value = null;
  showTaskForm.value = true;
};

const openEditForm = (task) => {
  editingTask.value = { ...task };
  showTaskForm.value = true;
};

const closeForm = () => {
  showTaskForm.value = false;
  editingTask.value = null;
};

const handleTaskSubmit = async (taskData) => {
  try {
    if (editingTask.value) {
      await api.put(`/tasks/${editingTask.value.id}`, taskData);
    } else {
      await api.post('/tasks/', taskData);
    }
    closeForm();
    await fetchTasks();
  } catch (error) {
    alert('Erro ao salvar tarefa.');
    console.error('Erro ao salvar tarefa:', error);
  }
};

const handleTaskDelete = async (taskId) => {
  if (confirm('Tem certeza que deseja deletar esta tarefa?')) {
    try {
      await api.delete(`/tasks/${taskId}`);
      await fetchTasks();
    } catch (error) {
      alert('Erro ao deletar tarefa.');
      console.error('Erro ao deletar tarefa:', error);
    }
  }
};

const handleTaskToggle = async (taskId) => {
  try {
    await api.patch(`/tasks/${taskId}/toggle`);
    await fetchTasks();
  } catch (error) {
    alert('Erro ao mudar status da tarefa.');
    console.error('Erro ao mudar status da tarefa:', error);
  }
};

onMounted(fetchTasks);
</script>

<template>
  <div class="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 bg-white rounded-lg shadow-xl mt-8">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-3xl font-extrabold text-gray-900">Minhas Tarefas</h2>
      <button @click="openCreateForm" class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md shadow transition-colors duration-200">
        Adicionar Tarefa
      </button>
    </div>

    <ErrorMessage v-if="error" :message="error" />

    <div v-if="loading" class="text-center text-gray-600">Carregando tarefas...</div>
    <div v-else-if="tasks.length === 0 && !error" class="text-center text-gray-500 mt-8 border-2 border-dashed border-gray-300 p-8 rounded-lg">
      <p class="mb-4">Nenhuma tarefa encontrada. Que tal adicionar uma?</p>
      <button @click="openCreateForm" class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-md">Adicionar minha primeira tarefa</button>
    </div>
    <TaskList
      v-else-if="!error"
      :tasks="tasks"
      @delete-task="handleTaskDelete"
      @edit-task="openEditForm"
      @toggle-completion="handleTaskToggle"
    />

    <div v-if="showTaskForm" class="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center z-50">
      <div class="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full m-4">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-2xl font-bold text-gray-900">{{ editingTask ? 'Editar Tarefa' : 'Nova Tarefa' }}</h3>
          <button @click="closeForm" class="text-gray-500 hover:text-gray-700 text-2xl font-bold">&times;</button>
        </div>
        <TaskForm
          :initial-task="editingTask"
          @submit="handleTaskSubmit"
          @cancel="closeForm"
        />
      </div>
    </div>
  </div>
</template>