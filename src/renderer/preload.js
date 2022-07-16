// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge, ipcRenderer } = require('electron')

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electron', {
  getPdf: (channel, data) => {
    return ipcRenderer.invoke(channel, data)
  },
  database: (channel, commandVerb, sql, params) => {
    return ipcRenderer.invoke(channel, commandVerb, sql, params)
  },
})
