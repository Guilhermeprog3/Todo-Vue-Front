<script setup>
import TaskItem from './TaskItem.vue';
defineProps({ tasks: { type: Array, required: true } });
const emit = defineEmits(['delete-task', 'edit-task', 'toggle-completion']);
</script>

<template>
  <div class="space-y-4">
    <TaskItem 
      v-for="task in tasks" 
      :key="task.id" 
      :task="task" 
      @delete-task="(id) => emit('delete-task', id)"
      @edit-task="(taskData) => emit('edit-task', taskData)"
      @toggle-completion="(id) => emit('toggle-completion', id)"
    />
  </div>
</template>