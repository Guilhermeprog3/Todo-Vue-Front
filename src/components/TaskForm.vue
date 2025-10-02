<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  initialTask: { type: Object, default: () => null }
});
const emit = defineEmits(['submit', 'cancel']);

const title = ref('');
const description = ref('');
const dueDate = ref('');

watch(() => props.initialTask, (newTask) => {
  if (newTask) {
    title.value = newTask.title;
    description.value = newTask.description || '';
    if (newTask.due_date) {
      const date = new Date(newTask.due_date);
      dueDate.value = date.toISOString().slice(0, 16);
    } else {
      dueDate.value = '';
    }
  } else {
    title.value = '';
    description.value = '';
    dueDate.value = '';
  }
}, { immediate: true });

const handleSubmit = () => {
  if (!title.value) {
      alert('O título é obrigatório.');
      return;
  }
  const taskData = {
    title: title.value,
    description: description.value || null,
    due_date: dueDate.value ? new Date(dueDate.value).toISOString() : null,
  };
  emit('submit', taskData);
};
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <div>
      <label for="title" class="block text-sm font-medium text-gray-700">Título:</label>
      <input type="text" id="title" v-model="title" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
    </div>
    <div>
      <label for="description" class="block text-sm font-medium text-gray-700">Descrição (Opcional):</label>
      <textarea id="description" v-model="description" rows="3" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"></textarea>
    </div>
    <div>
      <label for="due_date" class="block text-sm font-medium text-gray-700">Prazo (Opcional):</label>
      <input type="datetime-local" id="due_date" v-model="dueDate" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
    </div>
    <div class="flex justify-end space-x-3 pt-4">
      <button type="button" @click="emit('cancel')" class="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">Cancelar</button>
      <button type="submit" class="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">{{ props.initialTask ? 'Salvar Alterações' : 'Adicionar Tarefa' }}</button>
    </div>
  </form>
</template>