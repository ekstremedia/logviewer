<template>
    <div ref="logContainer" class="overflow-y-scroll h-[90vh]">
        <pre>
            {{ logContent }}
        </pre>
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, watch, nextTick } from "vue";

// Prop for the log object
const props = defineProps({
    log: Object,
});

// Reactive variable to store the log content
const logContent = ref("");

// Reference to the log container
const logContainer = ref(null);

// Watch for changes in the log content
watch(logContent, async () => {
    // Wait for the next tick to ensure the DOM has been updated
    await nextTick();

    // Scroll to the bottom
    if (logContainer.value) {
        logContainer.value.scrollTop = logContainer.value.scrollHeight;
    }
});

const getLogDisplayPath = (log) => {
    if (log.type === "daily") {
        const date = new Date();
        const formattedDate = `${date.getFullYear()}-${String(
            date.getMonth() + 1
        ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
        return `${log.directory}/${log.filename}-${formattedDate}.log`;
    } else {
        return `${log.directory}/${log.filename}`;
    }
};

// Function to load the log
const loadLog = async () => {
  const logPath = getLogDisplayPath(props.log);
  
  // Start tailing the log
  await window.electron.invoke('start-tail-log', logPath);

  // Load the content
  const content = await window.electron.invoke('tail-log', logPath);
  logContent.value = content;
};

// Function to handle log updates
const handleLogUpdate = async (event, updatedLogPath) => {
  if (updatedLogPath === getLogDisplayPath(props.log)) {
    await loadLog();
  }
};

// Listen for updates
window.electron.on('log-updated', handleLogUpdate);

onUnmounted(() => {
  // Clean up the listener
  window.electron.removeListener('log-updated', handleLogUpdate);
});

onMounted(loadLog);
</script>

