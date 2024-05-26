const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
    makeRequestToAPI: (prompt) => ipcRenderer.invoke('api-request', prompt),
    executeCode: (code) => ipcRenderer.invoke("code-execution", code)
})