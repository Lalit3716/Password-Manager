const path = require("path");

const { app, BrowserWindow, dialog, ipcMain } = require("electron");
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
  deleteVault,
} = require("./db");
const isDev = require("electron-is-dev");
const { wrap: catchError } = require("./utils");

function handleSquirrelEvent() {
  if (process.argv.length === 1) {
    return false;
  }

  const ChildProcess = require('child_process');
  const path = require('path');

  const appFolder = path.resolve(process.execPath, '..');
  const rootAtomFolder = path.resolve(appFolder, '..');
  const updateDotExe = path.resolve(path.join(rootAtomFolder, 'Update.exe'));
  const exeName = path.basename(process.execPath);

  const spawn = function(command, args) {
    let spawnedProcess, error;

    try {
      spawnedProcess = ChildProcess.spawn(command, args, {detached: true});
    } catch (error) {}

    return spawnedProcess;
  };

  const spawnUpdate = function(args) {
    return spawn(updateDotExe, args);
  };

  const squirrelEvent = process.argv[1];
  switch (squirrelEvent) {
    case '--squirrel-install':
    case '--squirrel-updated':
      // Optionally do things such as:
      // - Add your .exe to the PATH
      // - Write to the registry for things like file associations and
      //   explorer context menus

      // Install desktop and start menu shortcuts
      spawnUpdate(['--createShortcut', exeName]);

      setTimeout(app.quit, 1000);
      return true;

    case '--squirrel-uninstall':
      // Undo anything you did in the --squirrel-install and
      // --squirrel-updated handlers

      // Remove desktop and start menu shortcuts
      spawnUpdate(['--removeShortcut', exeName]);

      setTimeout(app.quit, 1000);
      return true;

    case '--squirrel-obsolete':
      // This is called on the outgoing version of your app before
      // we update to the new version - it's the opposite of
      // --squirrel-updated

      app.quit();
      return true;
    
    default:
      return false;
  }
};

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
      : path.join(__dirname, "../build/index.html")
  );

  if (isDev) {
    win.webContents.openDevTools({ mode: "detach" });
  }
};

const addHandlers = () => {
  ipcMain.handle(
    "check-master-password",
    catchError(checkIfMasterPasswordExists)
  );
  ipcMain.handle("create-master-password", catchError(createMasterPassword));
  ipcMain.handle("authenticate", catchError(authenticate));
  ipcMain.handle("saveAccount", catchError(addAccount));
  ipcMain.handle("getAllAccounts", catchError(getAllAccounts));
  ipcMain.handle("deleteAccount", catchError(removeAccount));
  ipcMain.handle("updateAccount", catchError(updateAccount));
  ipcMain.handle("deleteVault", catchError(deleteVault));
  ipcMain.handle("createVault", catchError(createTable));
};

const main = async () => {
  if (require('electron-squirrel-startup')) return app.quit();

  if (handleSquirrelEvent()) {
    return;
  }

  app.whenReady().then(async () => {
    try {
      await connect(app);
      await createTable();
      createWindow();
  
      // Renderer-to-main two-way process communication
      addHandlers();
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
  
}

main();
