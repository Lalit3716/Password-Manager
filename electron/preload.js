const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("db", {
  add: data => ipcRenderer.invoke("add", data),
  getAllAccounts: () => ipcRenderer.invoke("getAllAccounts"),
});