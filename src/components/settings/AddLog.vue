<template>
    <!-- Add Log Form -->
    <div class="p-6 bg-gray-900 text-white rounded-md shadow-md">
        <h1 class="text-2xl font-semibold mb-4">Add Log</h1>

        <!-- Error Panel -->
        <div
            v-if="error"
            class="mb-4 p-2 rounded-md bg-red-800 text-white font-bold"
        >
            {{ error }}
        </div>

        <!-- Log Name Input -->
        <div class="mb-4">
            <label for="logName" class="block text-sm font-medium text-gray-300"
                >Name of project you are logging</label
            >
            <input
                type="text"
                id="logName"
                v-model="log.name"
                class="mt-1 p-2 w-full rounded-md border-gray-300 focus:ring focus:ring-opacity-50"
            />
        </div>

        <!-- Log Directory Input -->
        <div class="mb-4">
            <label
                for="logDirectory"
                class="block text-sm font-medium text-gray-200"
                >Directory where logs are</label
            >
            <div class="flex items-center">
                <input
                    type="text"
                    id="logDirectory"
                    v-model="log.directory"
                    @blur="checkDirectory"
                    class="mt-1 p-2 w-full rounded-md border-gray-300 focus:ring focus:ring-opacity-50"
                />
            </div>
        </div>

        <!-- Log Type Selection -->
        <div class="mb-4">
            <span class="block text-sm font-medium text-gray-200"
                >Log Type</span
            >
            <label class="block mt-1">
                <input
                    type="radio"
                    value="daily"
                    v-model="log.type"
                    class="mr-2"
                />
                Daily (e.g., "laravel-2023-08-10.log")
            </label>
            <label class="block mt-1">
                <input
                    type="radio"
                    value="static"
                    v-model="log.type"
                    class="mr-2"
                />
                Static (e.g., "laravel.log")
            </label>
        </div>

        <!-- Save Log Button -->
        <div>
            <button
                :disabled="!canSave"
                @click="saveLog"
                :class="
                    canSave
                        ? 'bg-green-700 hover:bg-green-600 text-gray-50'
                        : 'bg-gray-500 cursor-not-allowed text-gray-800'
                "
                class="py-2 px-5 rounded-md text-white font-bold"
            >
                Save Log
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useLogsStore } from "@/piniaStore"; // Import the logs store

const log = ref({ name: "", directory: "", type: "daily" });
const directoryExists = ref(false);
const error = ref("");

// Use the logs store
const logsStore = useLogsStore();

// Function to normalize the directory path by removing any trailing slashes
const normalizePath = (path) => path.replace(new RegExp("/+$"), "");

// Function to check if the directory exists
const checkDirectory = async () => {
  const normalizedDirectory = normalizePath(log.value.directory);
  const existingLog = logsStore.logs.find(
    (existingLog) => normalizePath(existingLog.directory) === normalizedDirectory
  );
  if (existingLog) {
    error.value = `The specified directory is already in use by the log named "${existingLog.name}" with type "${existingLog.type}".`;
    directoryExists.value = false;
    return;
  }
  directoryExists.value = await window.electron.invoke("check-directory", normalizedDirectory);
  if (!directoryExists.value) {
    error.value = "The specified directory does not exist.";
  } else {
    error.value = "";
  }
};

// Computed property to determine if the form can be saved
const canSave = computed(() => {
  return log.value.name.trim() && log.value.directory.trim() && directoryExists.value;
});

// Save Log Function
const saveLog = async () => {
  error.value = "";
  await checkDirectory();
  if (error.value) return;
  log.value.directory = normalizePath(log.value.directory);
  logsStore.addLog(log.value); // Use the logs store to add the log
  log.value = { name: "", directory: "", type: "daily" };
};
</script>
