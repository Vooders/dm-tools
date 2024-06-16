import { DmToolsData } from '../dm-tools-data.types'
import getSummaryData from '../lib/getSummary'
import getCharacter from './getCharacter'

export default async function getParty(): Promise<DmToolsData[]> {
    const summary = await getSummaryData()
    const characterIds = Object.keys(summary)

    return await Promise.all(characterIds.map(async characterId => {
        return await getCharacter(null, characterId)
    }))
}
