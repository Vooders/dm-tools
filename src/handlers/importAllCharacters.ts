import { BrowserWindow } from 'electron';

import importCharacter from "../lib/importCharacter"
import getSummary from "../lib/getSummary"
import saveCharacter from "../lib/saveCharacter"
import saveMetrics from '../lib/saveMetrics';
import { Logger } from '../logger/Logger';

const logger = new Logger('[handler][importAllCharacters]')

export default (mainWindow: BrowserWindow) => {
    return async (): Promise<void> => {
        logger.info('Importing all characters')
        const summary = await getSummary()
        const characterIds = Object.keys(summary)
        logger.info(`Got ids - ${characterIds}`)
        for (const id of characterIds) {
            const importResponse = await importCharacter(id)

            if (importResponse.status === 'success') {
                await saveCharacter(importResponse.value)
            }
        }

        await saveMetrics()

        mainWindow.webContents.send('character:updated')
    }
}
