<template>
    <div class="p-6 bg-gray-800 text-gray-50 rounded-md shadow-md">
        <h1 class="text-2xl font-semibold mb-4">Settings</h1>

        <!-- Add Log Component -->
        <AddLog @saved="loadLogs" />

        <!-- Saved Logs Section -->
        <div class="mt-4">
            <h2 class="text-xl font-semibold mb-2">Enabled Log files</h2>
            <div
                v-for="(log, index) in logs"
                :key="index"
                class="mb-2 flex justify-evenly border-b border-b-gray-50/20 border-b-dashed"
            >
                <span class="font-medium text-gray-100  text-left w-full">{{ log.name }}:</span>
                <span class="text-gray-300 ml-2 w-full">{{ log.directory }}</span>

                <!-- Remove Log Button -->
                <button
                    @click="removeLog(index)"
                    class="ml-2 p-1 rounded-md bg-red-500 text-white hover:bg-red-600"
                >
                    Remove
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { watchEffect } from "vue";
import AddLog from "./AddLog.vue";
import { useLogsStore } from "@/piniaStore"; // Import the logs store

// Use the logs store
const logsStore = useLogsStore();

// Load logs from the store
const logs = logsStore.logs;



// Function to load logs from localStorage
const loadLogs = () => {
    logs.value = JSON.parse(localStorage.getItem("logs") || "[]");
};

// Function to remove a log
const removeLog = (index) => {
  logsStore.removeLog(index); // Call the removeLog action from the store
};

// Watch the logs and reload when there's a change
watchEffect(() => {
    loadLogs();
});

// Initial load of logs
loadLogs();
</script>
