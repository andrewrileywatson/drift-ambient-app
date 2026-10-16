
const { app, BrowserWindow, session, systemPreferences } = require('electron');
const path = require('node:path');

const isMac = process.platform === 'darwin';
app.setName('DRIFT');

function createWindow() {
  const win = new BrowserWindow({
    width: 1180,
    height: 900,
    minWidth: 760,
    minHeight: 620,
    title: 'DRIFT',
    backgroundColor: '#101513',
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      autoplayPolicy: 'no-user-gesture-required'
    }
  });

  win.loadFile(path.join(__dirname, 'index.html'));
}

app.whenReady().then(() => {
  // Configure permissions only after Electron is ready.
  const defaultSession = session.defaultSession;

  defaultSession.setPermissionCheckHandler(
    (_webContents, permission) => {
      return permission === 'media';
    }
  );

  defaultSession.setPermissionRequestHandler(
    (_webContents, permission, callback) => {
      if (permission !== 'media') return callback(false);

      if (
        isMac &&
        systemPreferences.getMediaAccessStatus('microphone') === 'denied'
      ) {
        return callback(false);
      }

      callback(true);
    }
  );

  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (!isMac) app.quit();
});
