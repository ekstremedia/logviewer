import Store from 'electron-store';

const store = new Store();

export function getWindowState(): { width: number; height: number } {
  // Default window size
  const { width, height } = store.get('windowBounds', { width: 800, height: 600 });
  return { width, height };
}

export function setWindowState(bounds: { width: number; height: number }): void {
  store.set('windowBounds', bounds);
}
