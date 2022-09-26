const { app, BrowserWindow, ipcMain, session, protocol } = require('electron');
require('dotenv').config();
const path = require('path');
const url = require('url');
const fs = require('fs');
const isDev = require('electron-is-dev');
const { databaseInit, databaseHandler } = require("./commands/database");
const pdfGeneratorHandler = require('./commands/pdfGenerator/pdfGenerator');
const { saveJobDescription } = require('./commands/saveJobDescription');
const { getUserDataPath } = require('./commands/getPaths');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
// eslint-disable-next-line global-require
if (require('electron-squirrel-startup')) {
  app.quit();
}

// initialise output file directories
const pdfFilesDir = path.join(
  app.getPath('userData'),
  'output_files/pdf_files'
);
if (!fs.existsSync(pdfFilesDir)) {
  fs.mkdirSync(pdfFilesDir, { recursive: true });
}
const texFilesDir = path.join(
  app.getPath('userData'),
  'output_files/tex_files'
);
if (!fs.existsSync(texFilesDir)) {
  fs.mkdirSync(texFilesDir, { recursive: true });
}
const uploadPdfFilesDir = path.join(
  app.getPath('userData'),
  'output_files/job_desc_files'
);
if (!fs.existsSync(uploadPdfFilesDir)) {
  fs.mkdirSync(uploadPdfFilesDir, { recursive: true });
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    // TODO add next line after adding top bar
    // frame: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  if (isDev) {
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  }
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  // react developer extension
  try {
    await session.defaultSession.loadExtension(
      process.env.REACT_DEV_TOOLS_PATH
    );
  } catch (err) {
    console.error(err);
  }

  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': [
          "default-src 'self' 'unsafe-inline'; object-src 'self' data:; frame-src 'self'; img-src 'self' data:; connect-src 'self' atom:",
        ],
      },
    });
  });

  protocol.registerFileProtocol('atom', (request, callback) => {
    const filePath = url.fileURLToPath(
      'file://' + request.url.slice('atom://'.length)
    );
    callback(filePath);
  });
  databaseInit();
  createWindow();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

// ipcMain handlers
ipcMain.handle("get-user-data-path",getUserDataPath)
ipcMain.handle('get-pdf', pdfGeneratorHandler);
ipcMain.handle('database', databaseHandler);
ipcMain.handle('save-job-description', saveJobDescription);
