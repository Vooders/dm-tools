import { app } from 'electron';
import { readFile } from 'fs/promises';
import path from 'path'
import { DmToolsData } from '../dm-tools-data.types';

const directory = 'npcs'
const userDataPath = app.getPath('userData');

export default async (_: Electron.IpcMainInvokeEvent, id: string): Promise<DmToolsData> => {
    console.log(`[handler][getNpc] Loading npc file ${id}`)
    const npcPath = path.join(userDataPath, directory, id + '.json');
    try {
        const fileBuffer = await readFile(npcPath)
        const file = fileBuffer.toString()
        return JSON.parse(file)
    } catch (error) {
        console.error(error)
    }
}
