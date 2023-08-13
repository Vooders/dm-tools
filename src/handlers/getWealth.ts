import getSummaryData from '../lib/getSummary'
import getCharacter from './getCharacter'
import { Currencies } from '../lib/CharacterSheetProcessor'
import { Item } from '../lib/CharacterSheetProcessor'

export default async(): Promise<WealthData[]> => {
    const summary = await getSummaryData()
    const characterIds = Object.keys(summary)

    return await Promise.all(characterIds.map(async (characterId) => {
        const characterData = await getCharacter(null, characterId)

        
        return {
            name: characterData.profile.name,
            currencies: characterData.currencies,
            containerWealth: characterData.inventory.map(inventory =>
                inventory.contents.reduce((acc: number, item: Item) => acc + (item.definition.cost * item.quantity), 0))
                .reduce((acc, value) => acc + value, 0)
        }       
    }))
}

export type WealthData = {
    name: string,
    currencies: Currencies
    containerWealth: number
}
