import { app } from 'electron'
import path from 'path'
import { writeFile } from 'fs/promises';

const userDataPath = app.getPath('userData');
const npcsPath = path.join(userDataPath, 'npcs.json');

export default async function saveNpc(npc: any) {
    try {
        await writeFile(npcsPath, JSON.stringify(npc))
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}
