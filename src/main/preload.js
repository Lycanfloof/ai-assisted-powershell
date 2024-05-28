const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
    makeRequestToAPI: (prompt) => ipcRenderer.invoke('api-request', prompt),
    executeCode: (code) => ipcRenderer.invoke("code-execution", code),
    remakeRequestToAPI: (code, output) => ipcRenderer.invoke("remake-request", code, output)
})