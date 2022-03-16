const path = require("path");

const { app, BrowserWindow, dialog, ipcMain } = require("electron");
const isDev = require("electron-is-dev");
const {
  connect,
  createTable,
  addAccount,
  getAllAccounts,
  createMasterPassword,
  authenticate,
  checkIfMasterPasswordExists,
  removeAccount,
  updateAccount,
} = require("./db");
const { wrap } = require("./utils");

const createWindow = () => {
  const win = new BrowserWindow({
    minWidth: 1280,
    minHeight: 720,
    title: "Vault",
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.menuBarVisible = false;

  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  if (isDev) {
    win.webContents.openDevTools({ mode: "detach" });
  }
};

app.whenReady().then(async () => {
  try {
    await connect(app);
    await createTable();
    createWindow();

    // Renderer-to-main two-way process communication
    ipcMain.handle("check-master-password", wrap(checkIfMasterPasswordExists));
    ipcMain.handle("create-master-password", wrap(createMasterPassword));
    ipcMain.handle("authenticate", wrap(authenticate));
    ipcMain.handle("saveAccount", wrap(addAccount));
    ipcMain.handle("getAllAccounts", wrap(getAllAccounts));
    ipcMain.handle("deleteAccount", wrap(removeAccount));
    ipcMain.handle("updateAccount", wrap(updateAccount));
  } catch (err) {
    dialog.showErrorBox("Error", err.message);
    app.quit();
  }
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
