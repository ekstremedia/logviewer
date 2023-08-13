<template>
  <div class="">
    <div class="flex space-x-4 border-b">
      <Tab :active="selectedTab === 0" @select="selectTab(0)">Settings</Tab>
      <Tab :active="selectedTab === 1" @select="selectTab(1)">Log Viewer 1</Tab>
      <!-- Add more tabs as needed -->
    </div>
    <div class="p-4">
    <div v-if="selectedTab === 0">
      <Settings></Settings>
      <!-- Settings Component -->
    </div>
    <div v-if="selectedTab === 1">
      <!-- Log Viewer 1 Component -->
    </div>
</div>
    <!-- Add more tab content as needed -->
  </div>
</template>

<script setup>
import Tab from './components/logviewer/Tab.vue';
import {ref} from 'vue';
import Settings from "./components/settings/Settings.vue";

const selectedTab = ref(0);

const selectTab = (index) => {
  selectedTab.value = index;
};
</script>
