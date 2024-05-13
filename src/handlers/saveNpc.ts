import { BrowserWindow } from 'electron';
import saveNpc from "../lib/saveNpc"

export default (mainWindow: BrowserWindow) => {
    return async (_: Electron.IpcMainInvokeEvent, npc: any): Promise<boolean> => {
        const npcData = await saveNpc(npc)
        mainWindow.webContents.send('npc:updated')
        return npcData
    }
}
