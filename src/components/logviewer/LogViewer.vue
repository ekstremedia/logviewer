<template>
    <div class="overflow-y-scroll h-[90vh]">
        <pre>
      {{ logContent }}
    </pre>
    </div>
  </template>
  
  <script setup>
  import { onMounted, onUnmounted, ref } from 'vue';
  
  // Prop for the log object
  const props = defineProps({
    log: Object,
  });
  
  // Reactive variable to store the log content
  const logContent = ref('');
  
  // Function to handle log updates
  const handleLogUpdate = (event, newLines) => {
    logContent.value += newLines;
  };
    

  const getLogDisplayPath = (log) => {
  if (log.type === "daily") {
    const date = new Date();
    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")}`;
    return `${log.directory}/${log.filename}-${formattedDate}.log`;
  } else {
    return `${log.directory}/${log.filename}`;
  }
  };
  // Function to load the log
  const loadLog = async () => {
    const logPath = getLogDisplayPath(props.log); // Assuming you have this function in scope
  
    // Load the initial content
    await window.electron
      .invoke('tail-log', logPath)
      .then((content) => {
        logContent.value = content;
      });
  
    // Listen for updates
    window.electron.on('log-updated', handleLogUpdate);
  };
  
  onUnmounted(() => {
    // Clean up the listener
    window.electron.removeListener('log-updated', handleLogUpdate);
  });
  
  onMounted(loadLog);
  </script>
  
