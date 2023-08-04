import getSummaryData from '../lib/getSummary'
import getCharacter from './getCharacter'
import { Currencies } from '../lib/CharacterSheetProcessor'

export default async () => {
    const summary = await getSummaryData()
    const characterIds = Object.keys(summary)

    const characters = await Promise.all(characterIds.map(async (characterId) => {
        const characterData = await getCharacter(null, characterId)
        return {
            name: characterData.profile.name,
            currencies: characterData.currencies
        }
    }))

    return characters
}

export type WealthData = {
    name: string,
    currencies: Currencies
}
