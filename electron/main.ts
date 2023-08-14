import { app, BrowserWindow, ipcMain } from 'electron';
import { getWindowState, setWindowState } from './windowState';
import path from 'node:path';
import fs from 'fs';

// Set the environment variables for DIST and PUBLIC
process.env.DIST = path.join(__dirname, '../dist');
process.env.PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, '../public');

// IPC handler to check if a directory exists
ipcMain.handle('check-directory', (event, path) => fs.existsSync(path));

let win: BrowserWindow | null;
const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']; // Dev server URL if running in development mode

function createWindow() {
  // Retrieve stored window size and position or use default values
  const { width, height, x, y } = getWindowState();

  // Create the browser window with the specified dimensions and preload script
  win = new BrowserWindow({
    width,
    height,
    x,
    y,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // Save window size and position when resized or moved
  win.on('resize', () => setWindowState(win.getBounds()));
  win.on('move', () => setWindowState(win.getBounds()));

  // Send a message to the renderer process when the window is ready
  win.webContents.on('did-finish-load', () => win?.webContents.send('main-process-message', (new Date).toLocaleString()));

  // Load the application from the appropriate source depending on the mode (development or production)
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL); // Load from dev server in development mode
  } else {
    win.loadFile(path.join(process.env.DIST, 'index.html')); // Load from static file in production mode
  }
}

// Create the main window when the application is ready
app.whenReady().then(createWindow);

// Set the window to null when all windows are closed
app.on('window-all-closed', () => {
  win = null;
});
      