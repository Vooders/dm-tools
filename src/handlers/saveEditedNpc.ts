import { BrowserWindow } from "electron"
import saveEditedNpc from "../lib/saveEditedNpc"

export default (mainWindow: BrowserWindow) => {
    return async (_: Electron.IpcMainInvokeEvent, npc: any): Promise<boolean> => {
        const npcData = await saveEditedNpc(npc)
        mainWindow.webContents.send('npc:updated')
        return npcData
    }
}
