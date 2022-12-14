import { app } from 'electron';
import { readFile } from 'fs/promises';
import path from 'path'

const directory = 'characters'
const userDataPath = app.getPath('userData');

export default async (_: Electron.IpcMainInvokeEvent, characterId: string) => {
    const characterPath = path.join(userDataPath, directory, characterId + '.json');
    try {
        const fileBuffer = await readFile(characterPath)
        const file = fileBuffer.toString()
        console.log(`Got file of length ${file.length}`)
        const characterJson = JSON.parse(file)
        characterJson.dmTools.avatarPath = path.join(userDataPath, 'avatars', characterId + '.jpeg')
        return characterJson
    } catch (error) {
        console.error(error)
    }
}
