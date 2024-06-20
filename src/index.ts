import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path'
import * as fs from 'node:fs/promises'

import handleImportAll from './handlers/importAllCharacters'
import handleImport from './handlers/importCharacter'
import handleSave from './handlers/saveCharacter'
import getSummary from './lib/getSummary'
import getInventories from './handlers/getInventories'
import deleteCharacter from './handlers/deleteCharacter'
import getCharacter from './handlers/getCharacter'
import getLanguages from './handlers/getLanguages'
import getSenses from './handlers/getSenses'
import getSkills from './handlers/getSkills'
import getHealth from './handlers/getHealth'
import getWealth from './handlers/getWealth'
import getMetrics from './handlers/getMetrics'
import { autoUpdater } from 'electron-updater'
import handleNpcSave from './handlers/saveNpc'
import getNpcs from './handlers/getNpcs'
import deleteNpc from './handlers/deleteNpc'
import getNpc from './handlers/getNpc'

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;
const devMode = process.env.NODE_ENV === 'development'

fs.mkdir(path.join(app.getPath('userData'), 'characters'))
fs.mkdir(path.join(app.getPath('userData'), 'avatars'))
fs.mkdir(path.join(app.getPath('userData'), 'npcs'))

const createWindow = (): void => {
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

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  if (devMode) {
    mainWindow.webContents.openDevTools();
  }

  app.whenReady().then(() => {
    ipcMain.handle('character:import', handleImport)
    ipcMain.handle('character:save', handleSave(mainWindow))
    ipcMain.handle('npc:save', handleNpcSave(mainWindow))
    ipcMain.handle('character:updateAll', handleImportAll(mainWindow))
    ipcMain.handle('summary:get', getSummary)
    ipcMain.handle('character:get', getCharacter)
    ipcMain.handle('inventory:get', getInventories)
    ipcMain.handle('languages:get', getLanguages)
    ipcMain.handle('senses:get', getSenses)
    ipcMain.handle('skills:get', getSkills)
    ipcMain.handle('health:get', getHealth)
    ipcMain.handle('wealth:get', getWealth)
    ipcMain.handle('metrics:get', getMetrics)
    ipcMain.handle('npcs:get', getNpcs)
    ipcMain.handle('npc:get', getNpc)
    ipcMain.handle('character:delete', deleteCharacter(mainWindow))
    ipcMain.handle('npc:delete', deleteNpc(mainWindow))
  })
};

app.on("ready", async () => {
  createWindow()
	await autoUpdater.checkForUpdatesAndNotify()
});

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  ipcMain.removeAllListeners()
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
