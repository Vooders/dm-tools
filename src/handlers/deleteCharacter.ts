import { app, BrowserWindow } from 'electron';
import path from 'path'
import { unlink, writeFile } from 'fs/promises'
import getSummaryData from '../lib/getSummary';
import { Logger } from '../logger/Logger';

const logger = new Logger('[handler][deleteCharacter]')

const userDataPath = app.getPath('userData');
const avatarDir = path.join(userDataPath, 'avatars')
const charactersDir = path.join(userDataPath, 'characters');
const summaryPath = path.join(charactersDir, 'summary.json')

export default (mainWindow: BrowserWindow) => {
    return async (_: Electron.IpcMainInvokeEvent, characterId: any): Promise<boolean> => {
        try {
            logger.info(`Deleting character ${characterId}`)
            const avatarPath = path.join(avatarDir, characterId + '.jpeg')
            const characterPath = path.join(charactersDir, characterId + '.json')
            await unlink(avatarPath)
            logger.debug(`Deleted ${avatarPath}`)
            await unlink(characterPath)
            logger.debug(`Deleted ${characterPath}`)
            const summary = await getSummaryData()
            delete summary[characterId]
            await writeFile(summaryPath, JSON.stringify(summary))
            logger.debug(`Removed ${characterId} from the summary`)
            mainWindow.webContents.send('character:updated')
            return true
        } catch (error) {
            logger.error(`Could not delete character ${error}`)
            return false
        }
    }
}

