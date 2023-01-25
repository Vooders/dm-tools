import getSummaryData from '../lib/getSummary'
import getCharacter from './getCharacter'
import { PassiveSkill } from '../lib/CharacterSheetProcessor'

export default async () => {
    const summary = await getSummaryData()
    const characterIds = Object.keys(summary)

    const characters = await Promise.all(characterIds.map(async (characterId) => {
        const characterData = await getCharacter(null, characterId)
        return {
            name: characterData.profile.name,
            senses: characterData.passiveSkills
        }
    }))

    return characters
}

export type SensesData = {
    name: string,
    senses: PassiveSkill[]
}
