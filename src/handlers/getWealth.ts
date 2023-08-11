import getSummaryData from '../lib/getSummary'
import getCharacter from './getCharacter'
import { Currencies } from '../lib/CharacterSheetProcessor'

export default async(): Promise<WealthData[]> => {
    const summary = await getSummaryData()
    const characterIds = Object.keys(summary)

    return await Promise.all(characterIds.map(async (characterId) => {
        const characterData = await getCharacter(null, characterId)
        console.log(characterData)
        return {
            name: characterData.profile.name,
            currencies: characterData.currencies
        }       
    }))
}

export type WealthData = {
    name: string,
    currencies: Currencies
}
