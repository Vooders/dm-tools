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
        for (const id of characterIds) {
            logger.debug(`importing ${id}`)
            const importResponse = await importCharacter(id)

            if (importResponse.status === 'success') {
                await saveCharacter(importResponse.value)
                logger.debug(`saved ${id}`)
            }
        }

        await saveMetrics()

        mainWindow.webContents.send('character:updated')
    }
}
