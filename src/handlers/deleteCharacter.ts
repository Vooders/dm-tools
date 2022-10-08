import { app, BrowserWindow } from 'electron';
import path from 'path'
import { unlink, writeFile } from 'fs/promises'
import getSummaryData from './getSummary';

const userDataPath = app.getPath('userData');
const avatarPath = path.join(userDataPath, 'avatars')
const characterPath = path.join(userDataPath, 'characters');
const summaryPath = path.join(characterPath, 'summary.json')

export default (mainWindow: BrowserWindow) => {
    return async (_: Electron.IpcMainInvokeEvent, characterId: any) => {
        try {
            await unlink(path.join(avatarPath, characterId + '.jpeg'))
            await unlink(path.join(characterPath, characterId + '.json'))
            const summary = await getSummaryData()
            delete summary[characterId]
            await writeFile(summaryPath, JSON.stringify(summary))
            mainWindow.webContents.send('character:summaryUpdate', summary)
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }
}

