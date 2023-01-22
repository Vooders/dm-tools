import getSummaryData from './getSummary'
import getCharacter from './getCharacter'
import { CharacterProfileHp } from '../../src/lib/CharacterSheetProcessor'

export default async (): Promise<HealthData[]> => {
    const summary = await getSummaryData()
    const characterIds = Object.keys(summary)

    const characters = await Promise.all(characterIds.map(async (characterId) => {
        const characterData = await getCharacter(null, characterId)
        
        return {
            name: characterData.dmTools.profile.name,
            hp: characterData.dmTools.hp,
            avatarPath: characterData.dmTools.avatarPath
        }
        
    }))

    return characters
}

export type HealthData = {
    name: string,
    hp: CharacterProfileHp,
    avatarPath: string
}
