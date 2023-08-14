<template>
    <button
      class="ml-1 px-4 py-0.5 text-lg font-medium rounded-t-lg rounded-b-none border-b-none transition duration-300 ease-in-out
        hover:bg-gray-500 hover:text-gray-100 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
      :class="{
        'bg-gray-700  border-x-gray-300  border-t-gray-300': active,
        'text-gray-400': !active,
      }"
      @click="select"
    >
      <slot></slot>
    </button>
  </template>
  
  <script setup>
  
  // Define properties
  const props = defineProps({
    active: Boolean,
  });
  
  // Define emits
  const emit = defineEmits(['select']);
  
  // Function to emit select event
  const select = () => {
    emit('select');
  };
  </script>
  
  <style scoped>
  button {
    /* Custom styles if needed */
  }
  </style>
  