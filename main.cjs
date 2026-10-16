
const {
  app,
  BrowserWindow,
  session,
  systemPreferences,
  dialog
} = require('electron');
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

app.whenReady().then(async () => {
  const defaultSession = session.defaultSession;

  defaultSession.setPermissionCheckHandler(
    (_webContents, permission) => permission === 'media'
  );

  defaultSession.setPermissionRequestHandler(
    (_webContents, permission, callback) => {
      if (permission !== 'media') return callback(false);
      callback(true);
    }
  );

  createWindow();

  if (isMac) {
    try {
      const status = systemPreferences.getMediaAccessStatus('microphone');

      if (status === 'not-determined') {
        const granted =
          await systemPreferences.askForMediaAccess('microphone');

        if (!granted) {
          dialog.showMessageBox({
            type: 'warning',
            title: 'Microphone access needed',
            message: 'DRIFT needs microphone access to record live audio.',
            detail:
              'Open System Settings → Privacy & Security → Microphone and allow access for DRIFT, then reopen the app.'
          });
        }
      }
    } catch (error) {
      console.error('Microphone permission request failed:', error);
    }
  }

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (!isMac) app.quit();
});
