import Store from 'electron-store';

const store = new Store();

export function getWindowState(): { width: number; height: number; x?: number; y?: number } {
  // Default window size and position
  return store.get('windowBounds', { width: 800, height: 600 });
}

export function setWindowState(bounds: { width: number; height: number; x: number; y: number }): void {
  store.set('windowBounds', bounds);
}
