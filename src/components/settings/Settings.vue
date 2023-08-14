<template>
    <div class="p-6 bg-gray-800 text-gray-50 rounded-md shadow-md">
      <h1 class="text-2xl font-semibold mb-4">Settings</h1>
      
      <!-- Add Log Component -->
      <AddLog @saved="loadLogs" />
      
      <!-- Saved Logs Section -->
        <div class="mt-4">
        <h2 class="text-xl font-semibold mb-2">Saved Logs</h2>
        <div v-for="(log, index) in logs" :key="index" class="mb-2 flex items-center">
          <span class="font-medium text-gray-100">{{ log.name }}:</span>
          <span class="text-gray-300 ml-2">{{ log.directory }}</span>
          
          <!-- Remove Log Button -->
          <button @click="removeLog(index)" class="ml-2 p-1 rounded-md bg-red-500 text-white hover:bg-red-600">
            Remove
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import AddLog from './AddLog.vue';
  
  // Reference to the list of logs
  const logs = ref(JSON.parse(localStorage.getItem('logs') || '[]'));
  
  // Function to load logs from localStorage
  const loadLogs = () => {
    logs.value = JSON.parse(localStorage.getItem('logs') || '[]');
  };
  
  // Function to remove a log by index
  const removeLog = (index) => {
    logs.value.splice(index, 1);
    localStorage.setItem('logs', JSON.stringify(logs.value));
  };
  
  // Initial load of logs
  loadLogs();
  </script>
  
  <style scoped>
  /* You can add specific CSS styles here if needed */
  </style>
  