<template>
  <button
    :class="['px-4 py-2', active ? 'border-b-2 border-blue-500' : 'text-gray-500 hover:text-black']"
    @click="selectTab">
    <slot></slot>
  </button>
</template>

<script setup>
const { active } = defineProps(['active']);
const emit = defineEmits(['select']);

const selectTab = () => {
  emit('select');
};
</script>

<style scoped>
button {
  outline: none;
  cursor: pointer;
  border: none;
  background: transparent;
  transition: all 0.3s;
}
</style>
