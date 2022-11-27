import getSummaryData from './getSummary'
import getCharacter from './getCharacter'
import { PassiveSkill } from '../lib/CharacterSheetProcessor'

export default async () => {
    const summary = await getSummaryData()
    const characterIds = Object.keys(summary)

    const characters = await Promise.all(characterIds.map(async (characterId) => {
        const characterData = await getCharacter(null, characterId)
        return {
            name: characterData.dmTools.profile.name,
            senses: characterData.dmTools.passiveSkills
        }
    }))

    return characters
}

export type SensesData = {
    name: string,
    senses: PassiveSkill[]
}
