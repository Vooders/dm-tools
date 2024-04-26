import { app } from 'electron'
import path from 'path'
import { writeFile } from 'fs/promises';

const userDataPath = app.getPath('userData');
const npcsPath = path.join(userDataPath, 'npcs.json');

export default async function saveNpc() {
    const newNpc = { name: 'testNpc' }

    try {
        await writeFile(npcsPath, JSON.stringify(newNpc))
        console.log(`saved ${newNpc} at ${npcsPath}`)
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}
