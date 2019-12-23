import {app, BrowserWindow} from 'electron';
import * as path from 'path';
import {format as formatUrl} from 'url';
import {isDevelopment} from '../common/utils';

if (isDevelopment && module.hot) {
    module.hot.accept();
}

let mainWindow: Electron.BrowserWindow | null;

const createMainWindow = (): Electron.BrowserWindow => {
    const window = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
        },
    });
    if (isDevelopment) {
        window.webContents.openDevTools();
        window.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`);
    } else {
        window.loadURL(formatUrl({
            pathname: path.join(__dirname, 'index.html'),
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
