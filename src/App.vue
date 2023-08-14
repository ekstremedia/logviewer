<template>
    <div class="">
        logs: {{ logs }}
        <div class="flex space-x-2 border-b border-b-gray-600 shadow-lg mt-1">
            <Tab :active="selectedTab === 0" @select="selectTab(0)">
                <font-awesome-icon
                    icon="cog"
                    fixedWidth
                    class="text-green-500 shadow-sm"
                />
                Settings
            </Tab>
            <Tab
                v-for="(log, index) in tabs"
                :key="index"
                :active="selectedTab === index + 1"
                @select="selectTab(index + 1)"
            >
                <span :title="getLogDisplayPath(log)">{{ log.name }}</span>
            </Tab>
        </div>
        <div class="p-4">
            <div v-if="selectedTab === 0">
                <Settings></Settings>
            </div>
            <div v-if="selectedTab !== 0">
                {{ getLogDisplayPath(selectedLog) }}
                <LogViewer :log="selectedLog" />

            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from "vue";
import { ref, onMounted, onUnmounted } from "vue";
import Tab from "@/components/logviewer/Tab.vue";
import Settings from "@/components/settings/Settings.vue";
import LogViewer from "@/components/logviewer/LogViewer.vue";
import { useLogsStore } from "@/piniaStore"; // Import the logs store

const logStore = useLogsStore();

const selectedTab = ref(0);
const logs = logStore.logs;

const selectTab = (index) => {
    selectedTab.value = index;
};

const tabs = computed(() => logStore.logs);

const selectedLog = computed(() =>
    selectedTab.value > 0 ? logs[selectedTab.value - 1] : null
);

// Function to get the display path of a log based on its type
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
// Listen for ALT + 1, 2, 3, etc. to switch tabs
onMounted(() => {
    window.addEventListener("keydown", handleKeyDown);
});

onUnmounted(() => {
    window.removeEventListener("keydown", handleKeyDown);
});

function handleKeyDown(event) {
    // Updated logic to handle the dynamic number of tabs
    if (event.altKey) {
        const numberKey = event.code.replace("Digit", "");
        const tabIndex = parseInt(numberKey) - 1;
        if (tabIndex >= 0 && tabIndex <= tabs.value.length) { // Use tabs.value.length instead of logs.value.length
            selectTab(tabIndex);
        }
    }
}

</script>
