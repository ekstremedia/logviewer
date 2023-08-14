import { defineStore } from 'pinia';

export const useLogsStore = defineStore({
  id: 'logs',
  state: () => ({
    logs: JSON.parse(localStorage.getItem('logs') || '[]'),
  }),
  actions: {
    addLog(log) {
      this.logs.push(log);
      localStorage.setItem('logs', JSON.stringify(this.logs));
    },
    removeLog(index) {
      this.logs.splice(index, 1);
      localStorage.setItem('logs', JSON.stringify(this.logs));
    },
    loadLogs() {
      this.logs = JSON.parse(localStorage.getItem('logs') || '[]');
    },
  },
});
