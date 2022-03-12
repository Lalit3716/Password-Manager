const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("db", {
  checkMasterPassword: () => ipcRenderer.invoke("check-master-password"),
  createMasterPassword: password =>
    ipcRenderer.invoke("create-master-password", password),
  authenticate: password => ipcRenderer.invoke("authenticate", password),
  add: data => ipcRenderer.invoke("add", data),
  getAllAccounts: () => ipcRenderer.invoke("getAllAccounts"),
  saveAccount: data => ipcRenderer.invoke("saveAccount", data),
});
