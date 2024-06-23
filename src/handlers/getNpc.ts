import { app } from 'electron';
import { readFile } from 'fs/promises';
import path from 'path'
import { DmToolsData } from '../dm-tools-data.types';
import { Logger } from '../logger/Logger'

const logger = new Logger('[handler][getNpc]')

const directory = 'npcs'
const userDataPath = app.getPath('userData');

export default async (_: Electron.IpcMainInvokeEvent, id: string): Promise<DmToolsData> => {
    const npcPath = path.join(userDataPath, directory, id + '.json');
    logger.info(`Loading npc file ${npcPath}`)
    try {
        const fileBuffer = await readFile(npcPath)
        const file = fileBuffer.toString()
        return JSON.parse(file)
    } catch (error) {
        console.error(error)
    }
}
