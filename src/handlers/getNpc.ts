import { app } from 'electron';
import { readFile } from 'fs/promises';
import path from 'path'
import { Npc } from '../../src/lib/saveNpc';

const directory = 'npcs'
const userDataPath = app.getPath('userData');

export default async (id: string): Promise<Npc> => {
    console.log(`Loading npc file ${id}`)
    const npcPath = path.join(userDataPath, directory, id + '.json');
    try {
        const fileBuffer = await readFile(npcPath)
        const file = fileBuffer.toString()
        return JSON.parse(file)
    } catch (error) {
        console.error(error)
    }
}
