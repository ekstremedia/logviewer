<template>
    <div class="p-4 bg-white rounded-md shadow-md text-black">
      <h2 class="text-xl font-semibold mb-2">{{ log.name }}</h2>
      <pre class="text-sm">{{ logContent }}</pre>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue';
  
  // Props for receiving the log object from the parent component
  const props = defineProps({
    log: Object
  });
  
  // Ref for log content
  const logContent = ref('');
  
  // Compute the log path based on the log type and filename
  const logPath = computed(() => {
    if (props.log.type === "daily") {
      const date = new Date();
      const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
      return `${props.log.directory}/${props.log.filename}-${formattedDate}.log`;
    } else {
      return `${props.log.directory}/${props.log.filename}`;
    }
  });
  
  // Function to fetch the log content
  const fetchLogContent = async () => {
    // You can implement logic here to fetch the content of the log file
    // based on the logPath.
    logContent.value = 'This is the content of the log...'; // Replace with actual logic to fetch log content
  };
  
  // Fetch the log content when the component is mounted
  onMounted(fetchLogContent);
  </script>
  
  <style scoped>
  /* You can add any necessary styles here */
  </style>
  