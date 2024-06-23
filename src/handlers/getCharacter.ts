import { app } from 'electron'
import { readFile } from 'fs/promises'
import path from 'path'
import { DmToolsData } from '../dm-tools-data.types'
import { Logger } from '../logger/Logger'

const logger = new Logger('[handler][getCharacter]')

const directory = 'characters'
const userDataPath = app.getPath('userData')

export default async (_: Electron.IpcMainInvokeEvent, characterId: string): Promise<DmToolsData> => {
    logger.info(`Loading character file ${characterId}`)
    const characterPath = path.join(userDataPath, directory, characterId + '.json')
    try {
        const fileBuffer = await readFile(characterPath)
        const file = fileBuffer.toString()
        const characterJson = JSON.parse(file)
        characterJson.dmTools.avatarPath = path.join(userDataPath, 'avatars', characterId + '.jpeg')
        logger.debug(`loaded character data for ${characterJson.dmTools.profile.name}`)
        return characterJson.dmTools
    } catch (error) {
        logger.error(`${error}`)
    }
}
