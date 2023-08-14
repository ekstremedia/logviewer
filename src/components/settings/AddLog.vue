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
                        ? 'bg-green-500 hover:bg-green-600'
                        : 'bg-green-200 cursor-not-allowed'
                "
                class="p-2 rounded-md text-white"
            >
                Save Log
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, defineEmits } from "vue";

// Define the emits function
const emits = defineEmits(["saved"]);

const log = ref({ name: "", directory: "", type: "daily" });
const directoryExists = ref(false);
const error = ref("");

// Function to normalize the directory path by removing any trailing slashes
const normalizePath = (path) => path.replace(new RegExp("/+$"), "");

// Function to check if the directory exists
const checkDirectory = async () => {
  // Normalize the directory path
  const normalizedDirectory = normalizePath(log.value.directory);

  // Fetch existing logs
  const logs = JSON.parse(localStorage.getItem('logs') || '[]');

  // Check if the directory already exists in the logs
  const existingLog = logs.find((existingLog) => normalizePath(existingLog.directory) === normalizedDirectory);
  if (existingLog) {
    error.value = `The specified directory is already in use by the log named "${existingLog.name}" with type "${existingLog.type}".`;
    directoryExists.value = false; // Set directoryExists to false if directory is already in use
    return;
  }

  directoryExists.value = await window.electron.invoke('check-directory', normalizedDirectory);
  if (!directoryExists.value) {
    error.value = 'The specified directory does not exist.';
  } else {
    error.value = '';
  }
};

// Computed property to determine if the form can be saved
const canSave = computed(() => {
    if (
        !log.value.name.trim() ||
        !log.value.directory.trim() ||
        !directoryExists.value
    )
        return false;
    return true;
});

// Save Log Function
const saveLog = async () => {
    // Clear previous error
    error.value = "";

    // Perform the same directory check again
    await checkDirectory();

    // If there was an error in the directory check, return
    if (error.value) return;

    // Normalize the directory path before saving
    log.value.directory = normalizePath(log.value.directory);

    // Fetch existing logs
    const logs = JSON.parse(localStorage.getItem("logs") || "[]");

    // Continue with the rest of the save logic
    logs.push(log.value);
    localStorage.setItem("logs", JSON.stringify(logs));

    // Emit an event to notify the parent component
    emits("saved");

    // Optionally, you can clear the form after saving
    log.value = { name: "", directory: "", type: "daily" };
};
</script>
