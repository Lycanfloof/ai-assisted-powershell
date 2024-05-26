const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
    makeRequestToAPI: (prompt) => ipcRenderer.invoke('api-request', prompt)
})