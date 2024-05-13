import { BrowserWindow, app } from "electron";
import { unlink, writeFile } from "fs/promises";
import path from "path";
import getNpcSummaryData from '../lib/getNpcSummary';
import { Npc } from "../../src/lib/saveNpc";

const userDataPath = app.getPath('userData');
const npcsPath = path.join(userDataPath, 'npcs');
const summaryPath = path.join(npcsPath, 'summary.json')

export default (mainWindow: BrowserWindow) => {
  return async (_: Electron.IpcMainInvokeEvent, id: any): Promise<boolean> => {
    console.log('deleteNpc', id)
    try {
      await unlink(path.join(npcsPath, id + '.json'))
  
      const summary = await getNpcSummaryData()
      const newSummary = summary.filter((sum: Npc) => {
        return sum.id != id
      })
  
      await writeFile(summaryPath, JSON.stringify(newSummary))
      mainWindow.webContents.send('npc:updated')
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }
}
