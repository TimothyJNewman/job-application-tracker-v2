// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
var _a = require('electron'), contextBridge = _a.contextBridge, ipcRenderer = _a.ipcRenderer;
// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electron', {
    getPath: function (channel) {
        return ipcRenderer.invoke(channel);
    },
    modifySettings: function (channel, key, value) {
        return ipcRenderer.invoke(channel, key, value);
    },
    getPdf: function (channel, type, data) {
        return ipcRenderer.invoke(channel, type, data);
    },
    exportToCsv: function (channel, arrayOfObjects) {
        return ipcRenderer.invoke(channel, arrayOfObjects);
    },
    database: function (channel, commandVerb, sql, params) {
        return ipcRenderer.invoke(channel, commandVerb, sql, params);
    },
    savePdf: function (channel, args) {
        return ipcRenderer.invoke(channel, args);
    }
});
//# sourceMappingURL=preload.js.map