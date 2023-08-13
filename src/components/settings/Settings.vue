<template>
  <div>
    <h1>Settings</h1>
    <div v-for="(path, index) in logPaths" :key="index">
      <input type="text" v-model="logPaths[index]" placeholder="Enter log folder path"/>
      <button @click="removePath(index)">Remove</button>
    </div>
    <button @click="addPath">Add Log Folder</button>
    <button @click="saveSettings">Save Settings</button>
  </div>
</template>

<script setup>
import {reactive} from 'vue';

const logPaths = reactive([]);

const addPath = () => {
  logPaths.push('');
};

const removePath = (index) => {
  logPaths.splice(index, 1);
};

const saveSettings = () => {
  // Save the logPaths to a persistent store, like localStorage
  localStorage.setItem('logPaths', JSON.stringify(logPaths));
};
</script>
