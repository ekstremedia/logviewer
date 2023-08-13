<template>
  <div class="">
    <div class="flex space-x-4 border-b border-b-gray-600 shadow-lg mt-1">
      <Tab :active="selectedTab === 0" @select="selectTab(0)"><font-awesome-icon icon="cog" fixedWidth class="text-green-500 shadow-sm" />  Settings </Tab>
      <Tab :active="selectedTab === 1" @select="selectTab(1)">Log Viewer 1</Tab>
      <Tab :active="selectedTab === 2" @select="selectTab(2)">Log Viewer 2</Tab>
      <!-- Add more tabs as needed -->
    </div>
    <div class="p-4">
    <div v-if="selectedTab === 0">
      <Settings></Settings>
      <!-- Settings Component -->
    </div>
    <div v-if="selectedTab === 1">
      <!-- Log Viewer 1 Component -->
      log log
    </div>
    <div v-if="selectedTab === 2">
      <!-- Log Viewer 2 Component -->
    </div>
</div>
    <!-- Add more tab content as needed -->
  </div>
</template>


<script setup>
import Tab from './components/logviewer/Tab.vue';
import {ref,onMounted, onUnmounted } from 'vue';
import Settings from "./components/settings/Settings.vue";

const selectedTab = ref(0);
const numberOfTabs = 3; // Define the number of tabs you have

const selectTab = (index) => {
  selectedTab.value = index;
};

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown);
});

function handleKeyDown(event) {
  // Check if the Alt key is pressed
  if (event.altKey) {
    // Check the number key pressed (1-9)
    const numberKey = event.code.replace('Digit', '');
    const tabIndex = parseInt(numberKey) - 1;

    // Check if the tab index is within range
    if (tabIndex >= 0 && tabIndex <= numberOfTabs - 1) {
      selectTab(tabIndex);
    }
  }
}
</script>

