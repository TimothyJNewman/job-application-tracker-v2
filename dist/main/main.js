var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var _a = require('electron'), app = _a.app, BrowserWindow = _a.BrowserWindow, ipcMain = _a.ipcMain, session = _a.session, protocol = _a.protocol, shell = _a.shell;
require('dotenv').config();
var path = require('path');
var url = require('url');
var fs = require('fs');
var isDev = require('electron-is-dev');
var _b = require('./commands/database'), databaseInit = _b.databaseInit, databaseHandler = _b.databaseHandler;
var pdfGeneratorHandler = require('./commands/pdfGenerator/pdfGenerator');
var saveJobDescription = require('./commands/saveJobDescription').saveJobDescription;
var getUserDataPath = require('./commands/getPaths').getUserDataPath;
var exportToCsv = require('./commands/export').exportToCsv;
var saveCV = require('./commands/saveCV').saveCV;
var configManagement = require('./commands/settings').configManagement;
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
// eslint-disable-next-line global-require
if (require('electron-squirrel-startup')) {
    app.quit();
}
// initialise output file directories
var cvPdfFilesDir = path.join(app.getPath('userData'), 'output_files/cv_pdf');
if (!fs.existsSync(cvPdfFilesDir)) {
    fs.mkdirSync(cvPdfFilesDir, { recursive: true });
}
var cvTexFilesDir = path.join(app.getPath('userData'), 'output_files/cv_tex');
if (!fs.existsSync(cvTexFilesDir)) {
    fs.mkdirSync(cvTexFilesDir, { recursive: true });
}
var letterPdfFilesDir = path.join(app.getPath('userData'), 'output_files/letter_pdf');
if (!fs.existsSync(letterPdfFilesDir)) {
    fs.mkdirSync(letterPdfFilesDir, { recursive: true });
}
var letterTexFilesDir = path.join(app.getPath('userData'), 'output_files/letter_tex');
if (!fs.existsSync(letterTexFilesDir)) {
    fs.mkdirSync(letterTexFilesDir, { recursive: true });
}
var uploadPdfFilesDir = path.join(app.getPath('userData'), 'output_files/job_desc_files');
if (!fs.existsSync(uploadPdfFilesDir)) {
    fs.mkdirSync(uploadPdfFilesDir, { recursive: true });
}
var csvFilesDir = path.join(app.getPath('userData'), 'output_files/csv_files');
if (!fs.existsSync(csvFilesDir)) {
    fs.mkdirSync(csvFilesDir, { recursive: true });
}
var createWindow = function () {
    // Create the browser window.
    var mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        // TODO add next line after adding top bar
        // frame: false,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY
        }
    });
    // and load the index.html of the app.
    mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
    // Redirecting new window event to external browser
    mainWindow.webContents.setWindowOpenHandler(function (_a) {
        var url = _a.url;
        shell.openExternal(url);
        return { action: 'deny' };
    });
    // Open the DevTools.
    if (isDev) {
        mainWindow.webContents.openDevTools({ mode: 'detach' });
    }
};
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', function () { return __awaiter(_this, void 0, void 0, function () {
    var err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, session.defaultSession.loadExtension(process.env.REACT_DEV_TOOLS_PATH)];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                console.error(err_1);
                return [3 /*break*/, 3];
            case 3:
                // Setting content security policy
                session.defaultSession.webRequest.onHeadersReceived(function (details, callback) {
                    callback({
                        responseHeaders: __assign(__assign({}, details.responseHeaders), { 'Content-Security-Policy': [
                                "default-src 'self' 'unsafe-inline'; object-src 'self' atom:; frame-src 'self' atom:; img-src 'self' data: atom:; connect-src 'self' atom:",
                            ] })
                    });
                });
                // Creating custom file protocol to avoid using file:// protocol which is restricted
                protocol.registerFileProtocol('atom', function (request, callback) {
                    var filePath = url.fileURLToPath('file://' + request.url.slice('atom://'.length));
                    callback(filePath);
                });
                databaseInit();
                createWindow();
                return [2 /*return*/];
        }
    });
}); });
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
// ipcMain handlers
ipcMain.handle('get-user-data-path', getUserDataPath);
ipcMain.handle('settings', configManagement);
ipcMain.handle('generate-pdf', pdfGeneratorHandler);
ipcMain.handle('database', databaseHandler);
ipcMain.handle('save-job-description', saveJobDescription);
ipcMain.handle('save-cv', saveCV);
ipcMain.handle('export-to-csv', exportToCsv);
//# sourceMappingURL=main.js.map