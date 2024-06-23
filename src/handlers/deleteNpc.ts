import { BrowserWindow, app } from "electron"
import { unlink, writeFile } from "fs/promises"
import path from "path"
import getNpcSummaryData from '../lib/getNpcSummary'
import { Npc } from "../../src/lib/saveNpc"
import { Logger } from '../logger/Logger'

const logger = new Logger('[handler][deleteNpc]')

const userDataPath = app.getPath('userData')
const npcsPath = path.join(userDataPath, 'npcs')
const summaryPath = path.join(npcsPath, 'summary.json')

export default (mainWindow: BrowserWindow) => {
    return async (_: Electron.IpcMainInvokeEvent, id: any): Promise<boolean> => {
        logger.info(`deleting NPC ${id}`)
        try {
            const npcPath = path.join(npcsPath, id + '.json')
            await unlink(npcPath)
            logger.debug(`Deleted NPC file ${npcPath}`)
            const summary = await getNpcSummaryData()
            const newSummary = summary.filter((sum: Npc) => {
                return sum.id != id
            })
            await writeFile(summaryPath, JSON.stringify(newSummary))
            logger.debug('Updated summary')
            mainWindow.webContents.send('npc:updated')
            return true
        } catch (error) {
            logger.error(`${error}`)
            return false
        }
    }
}
