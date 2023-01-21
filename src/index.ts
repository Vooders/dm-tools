import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path'
import * as fs from 'node:fs/promises'
import handleImport from './handlers/importCharacter'
import handleSave from './handlers/saveCharacter'
import getSummary from './handlers/getSummary'
import getInventories from './handlers/getInventories'
import deleteCharacter from './handlers/deleteCharacter'
import getCharacter from './handlers/getCharacter'
import getLanguages from './handlers/getLanguages'
import getSenses from './handlers/getSenses'
import getSkills from './handlers/getSkills'
import { autoUpdater } from 'electron-updater'

app.on("ready", () => {
	autoUpdater.checkForUpdatesAndNotify();
});


// This allows TypeScript to pick up the magic constants that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}

const devMode = process.env.NODE_ENV === 'development'

fs.mkdir(path.join(app.getPath('userData'), 'characters'))
fs.mkdir(path.join(app.getPath('userData'), 'avatars'))

const createWindow = (): void => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      webSecurity: !devMode,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  if (devMode) {
    mainWindow.webContents.openDevTools();
  }
  
  app.whenReady().then(() => {
    ipcMain.handle('character:import', handleImport)
    ipcMain.handle('character:getSummary', getSummary)
    ipcMain.handle('character:get', getCharacter)
    ipcMain.handle('character:save', handleSave(mainWindow))
    ipcMain.handle('character:delete', deleteCharacter(mainWindow))
    ipcMain.handle('inventory:get', getInventories)
    ipcMain.handle('languages:get', getLanguages)
    ipcMain.handle('senses:get', getSenses)
    ipcMain.handle('skills:get', getSkills)
  })
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);



// ipcMain.on('import', async (event, id) => {
//   console.log(`Importing character ${id}`)
//   const data = await characterService.get(id)
//   console.log(data.message)
//   store.set(id.toString(), 'characters', data)
//   notifications.characterSaved(id).show()
// })

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
