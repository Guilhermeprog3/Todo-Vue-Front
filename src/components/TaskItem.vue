<script setup>
import { computed } from 'vue';

const props = defineProps({
  task: { type: Object, required: true }
});
const emit = defineEmits(['delete-task', 'edit-task', 'toggle-completion']);

const formattedDueDate = computed(() => {
  if (!props.task.due_date) return 'Sem prazo';
  return new Date(props.task.due_date).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });
});

const isOverdue = computed(() => {
  if (props.task.completed || !props.task.due_date) return false;
  return new Date(props.task.due_date) < new Date();
});
</script>

<template>
  <div :class="['flex items-center justify-between p-4 border rounded-lg transition-colors duration-200', task.completed ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200', isOverdue ? '!bg-red-50 !border-red-300' : '']">
    <div class="flex items-center flex-grow min-w-0">
      <input 
        type="checkbox" 
        :checked="task.completed" 
        @change="emit('toggle-completion', task.id)"
        class="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 cursor-pointer"
      />
      <div class="ml-4 min-w-0" :class="{'opacity-60': task.completed}">
        <h3 class="text-lg font-semibold text-gray-800 truncate" :class="{'line-through': task.completed}">{{ task.title }}</h3>
        <p v-if="task.description" class="text-gray-600 text-sm mt-1 truncate" :class="{'line-through': task.completed}">{{ task.description }}</p>
        <div class="flex items-center text-xs mt-2" :class="[isOverdue ? 'text-red-700 font-bold' : 'text-gray-500']">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          <span>Prazo: {{ formattedDueDate }}</span>
          <span v-if="isOverdue" class="ml-2 px-2 py-0.5 bg-red-200 text-red-800 rounded-full text-xs">VENCIDA</span>
        </div>
      </div>
    </div>
    <div class="flex items-center space-x-2 ml-4 flex-shrink-0">
      <button @click="emit('edit-task', task)" class="p-2 text-gray-500 hover:text-indigo-600 hover:bg-gray-100 rounded-full" title="Editar Tarefa">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.38-2.827-2.828z" /></svg>
      </button>
      <button @click="emit('delete-task', task.id)" class="p-2 text-gray-500 hover:text-red-600 hover:bg-gray-100 rounded-full" title="Deletar Tarefa">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" /></svg>
      </button>
    </div>
  </div>
</template>