import { BrowserWindow } from 'electron';
import saveCharacter from "../lib/saveCharacter"

export default (mainWindow: BrowserWindow) => {
    return async (_: Electron.IpcMainInvokeEvent, character: any): Promise<boolean> => {
        const char = await saveCharacter(character)
        return char
    }
}
