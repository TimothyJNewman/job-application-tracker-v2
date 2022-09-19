const { app, BrowserWindow, ipcMain, session, protocol } = require('electron');
require('dotenv').config();
const path = require('path');
const fs = require('fs');
const isDev = require('electron-is-dev');
const { databaseInit, databaseHandler } = require('./database');
const pdfGeneratorHandler = require('./pdfGenerator/pdfGenerator');

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

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
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
  protocol.registerFileProtocol('atom', (request, callback) => {
    const url = request.url.substr(7);
    callback({ path: path.normalize(`${__dirname}/${url}`) });
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
ipcMain.handle('get-pdf', pdfGeneratorHandler);
ipcMain.handle('database', databaseHandler);
