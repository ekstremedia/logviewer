<template>
  <div>
    <div class="flex space-x-4">
      <slot name="tabs"></slot>
    </div>
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { provide, ref } from 'vue';

const selectedTab = ref(0);
provide('selectedTab', selectedTab);

const selectTab = (index) => {
  selectedTab.value = index;
};

provide('selectTab', selectTab);
</script>

<style scoped>
/* Add styling for the tabs container here */
</style>
