import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import { format as formatUrl } from 'url';
import { isDevelopment } from 'common/utils';

if (module.hot) {
  module.hot.accept();
}

let mainWindow: Electron.BrowserWindow | null;

const createMainWindow = () => {
  const window = new BrowserWindow({
    width: parseInt(process.env.ELECTRON_WEBPACK_APP_WIDTH || '1440'),
    height: parseInt(process.env.ELECTRON_WEBPACK_APP_HEIGHT || '1080'),
    webPreferences: {
      enableRemoteModule: true,
      nodeIntegration: true,
      preload: path.join(app.getAppPath(), 'preload.js'),
    },
  });
  if (isDevelopment) {
    window.webContents.openDevTools();
    // noinspection JSIgnoredPromiseFromCall
    window.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`);
  } else {
    // noinspection JSIgnoredPromiseFromCall
    window.loadURL(formatUrl({
      pathname: path.join(app.getAppPath(), 'index.html'),
      protocol: 'file',
      slashes: true,
    }));
  }
  window.on('closed', () => {
    mainWindow = null;
  });
  window.webContents.on('devtools-opened', () => {
    window.focus();
    setImmediate(() => {
      window.focus();
    });
  });
  return window;
};

app.on('ready', () => {
  mainWindow = createMainWindow();
});
app.on('activate', () => {
  if (mainWindow === null) {
    mainWindow = createMainWindow();
  }
});
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
