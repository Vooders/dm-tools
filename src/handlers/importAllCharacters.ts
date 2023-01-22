import { BrowserWindow } from 'electron';

import importCharacter from "../lib/importCharacter"
import getSummary from "../lib/getSummary"
import saveCharacter from "../lib/saveCharacter"

export default (mainWindow: BrowserWindow) => {
    return async () => {
        const summary = await getSummary()
        const characterIds = Object.keys(summary)
        console.log(`Got ids - ${characterIds}`)
        for (const id of characterIds) {
            const importResponse = await importCharacter(id)

            if (importResponse.status === 'success') {
                await saveCharacter(importResponse.value)
            }
        }

        mainWindow.webContents.send('character:updated')
    }
}
