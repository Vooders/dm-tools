import { app } from 'electron'
import path from 'path'
import { writeFile } from 'fs/promises';

const userDataPath = app.getPath('userData');
const npcsPath = path.join(userDataPath, 'npcs.json');

export default async function saveNpc(name: string) {
    console.log('saving name', name)
    const newNpc = { name: name }

    try {
        await writeFile(npcsPath, JSON.stringify(newNpc))
        console.log(`saved ${newNpc} at ${npcsPath}`)
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}
