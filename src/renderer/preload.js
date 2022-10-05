// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electron', {
  getPath: (channel) => {
    return ipcRenderer.invoke(channel);
  },
  modifySettings: (channel, key, value) => {
    return ipcRenderer.invoke(channel, key, value);
  },
  getPdf: (channel, type, data) => {
    return ipcRenderer.invoke(channel, type, data);
  },
  exportToCsv: (channel, arrayOfObjects) => {
    return ipcRenderer.invoke(channel, arrayOfObjects);
  },
  database: (channel, commandVerb, sql, params) => {
    return ipcRenderer.invoke(channel, commandVerb, sql, params);
  },
  savePdf: (channel, args) => {
    return ipcRenderer.invoke(channel, args);
  },
  openFolder: (path) => ipcRenderer.invoke("open-folder", path)
});
