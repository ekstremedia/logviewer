<template>
    <div class="">
        logs: {{ logs }}
        <div class="flex space-x-4 border-b border-b-gray-600 shadow-lg mt-1">
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
                {{ log.name }}
            </Tab>
        </div>
        <div class="p-4">
            <div v-if="selectedTab === 0">
                <Settings></Settings>
            </div>
            <div v-if="selectedTab !== 0">
                {{ selectedLog.directory }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from "vue";
import Tab from "./components/logviewer/Tab.vue";
import { ref, onMounted, onUnmounted } from "vue";
import Settings from "./components/settings/Settings.vue";
import { useLogsStore } from "@/piniaStore"; // Import the logs store

const logStore = useLogsStore();

const selectedTab = ref(0);
const logs = JSON.parse(localStorage.getItem("logs") || "[]");

const selectTab = (index) => {
    selectedTab.value = index;
};
// const tabs = computed(() => logs); // Assuming you want to display all logs as tabs
const tabs = computed(() => logStore.logs);

const selectedLog = computed(() =>
    selectedTab.value > 0 ? logs[selectedTab.value - 1] : null
);

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
        if (tabIndex >= 0 && tabIndex <= logs.value.length) {
            selectTab(tabIndex);
        }
    }
}
</script>
