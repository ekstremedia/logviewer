<template>
    <!-- Add Log Form -->
    <div class="p-6 bg-gray-900 text-white rounded-md shadow-md">
      <h1 class="text-2xl font-semibold mb-4">Add Log</h1>
    
      <!-- Error Panel -->
    <div v-if="error" class="mb-4 p-2 rounded-md bg-red-600 text-white">
      {{ error }}
    </div>

      <!-- Log Name Input -->
      <div class="mb-4">
        <label for="logName" class="block text-sm font-medium text-gray-300">Name of log</label>
        <input type="text" id="logName" v-model="log.name" class="mt-1 p-2 w-full rounded-md border-gray-300 focus:ring focus:ring-opacity-50" />
      </div>
      
      <!-- Log Directory Input -->
      <div class="mb-4">
    <label for="logDirectory" class="block text-sm font-medium text-gray-200">Directory</label>
    <div class="flex items-center">
      <input type="text" id="logDirectory" v-model="log.directory" @blur="checkDirectory" class="mt-1 p-2 w-full rounded-md border-gray-300 focus:ring focus:ring-opacity-50" />
    </div>
  </div>
      
      <!-- Log Type Selection -->
      <div class="mb-4">
        <span class="block text-sm font-medium text-gray-200">Log Type</span>
        <label class="block mt-1">
          <input type="radio" value="daily" v-model="log.type" class="mr-2" />
          Daily (e.g., "laravel-2023-08-10.log")
        </label>
        <label class="block mt-1">
          <input type="radio" value="static" v-model="log.type" class="mr-2" />
          Static (e.g., "laravel.log")
        </label>
      </div>
      
    <!-- Save Log Button -->
    canSave {{ canSave  }}
<!-- Save Log Button -->
<div>
  canSave {{ canSave }}
  <button
    :disabled="!canSave"
    @click="saveLog"
    :class="canSave ? 'bg-green-500 hover:bg-green-600' : 'bg-green-200 cursor-not-allowed'"
    class="p-2 rounded-md text-white">
    Save Log
  </button>
</div>

    
    </div>
  </template>
  

  <script setup>
  import { ref, computed } from 'vue';
  
  const log = ref({ name: '', directory: '', type: 'daily' });
  const directoryExists = ref(false);
  const error = ref('');
  
  // Function to check if the directory exists
  const checkDirectory = async () => {
    directoryExists.value = await window.electron.invoke('check-directory', log.value.directory);
    if (!directoryExists.value) {
      error.value = 'The specified directory does not exist.';
    } else {
      error.value = '';
    }
  };
  
  // Computed property to determine if the form can be saved
  const canSave = computed(() => {
    if (!log.value.name.trim() || !log.value.directory.trim() || !directoryExists.value) return false;
    return true;
  });
  
  // Save Log Function
  const saveLog = async () => {
    // Clear previous error
    error.value = '';
  
    // Check if directory exists
    const directoryExists = await window.electron.invoke('check-directory', log.value.directory);
    if (!directoryExists) {
      error.value = 'The specified directory does not exist.';
      return;
    }
    const logs = JSON.parse(localStorage.getItem('logs') || '[]');
    logs.push(log.value);
    localStorage.setItem('logs', JSON.stringify(logs));
  };
  </script>