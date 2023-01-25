import { app } from 'electron';
import { readFile } from 'fs/promises';
import path from 'path'
import { DmToolsData } from '../lib/CharacterSheetProcessor';

const directory = 'characters'
const userDataPath = app.getPath('userData');

export default async (_: Electron.IpcMainInvokeEvent, characterId: string): Promise<DmToolsData> => {
    console.log(`Loading character file ${characterId}`)
    const characterPath = path.join(userDataPath, directory, characterId + '.json');
    try {
        const fileBuffer = await readFile(characterPath)
        const file = fileBuffer.toString()
        const characterJson = JSON.parse(file)
        characterJson.dmTools.avatarPath = path.join(userDataPath, 'avatars', characterId + '.jpeg')
        return characterJson.dmTools
    } catch (error) {
        console.error(error)
    }
}
