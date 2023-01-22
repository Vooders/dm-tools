import { BrowserWindow } from 'electron';
import saveCharacter from "../lib/saveCharacter"

export default (mainWindow: BrowserWindow) => {
    return async (_: Electron.IpcMainInvokeEvent, character: any): Promise<any> => {
        const char = await saveCharacter(character)
        mainWindow.webContents.send('character:updated')
        return char
    }
}
