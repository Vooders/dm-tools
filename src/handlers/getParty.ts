import { DmToolsData } from '../dm-tools-data.types'
import getSummaryData from '../lib/getSummary'
import getCharacter from './getCharacter'
import { Logger } from '../logger/Logger'

const logger = new Logger('[handler][getParty]')

export default async function getParty(): Promise<DmToolsData[]> {
    logger.info('Getting party')
    const summary = await getSummaryData()
    const characterIds = Object.keys(summary)

    return await Promise.all(characterIds.map(async characterId => {
        const character = await getCharacter(null, characterId)
        logger.debug(`Got character sheet for ${character.profile.name}`)
        return character
    }))
}
