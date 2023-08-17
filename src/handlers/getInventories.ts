import getSummaryData from '../lib/getSummary';
import getCharacter from './getCharacter'
import { ItemContainer } from '../lib/CharacterSheetProcessor';

export default async (): Promise<InventoryData[]> => {
    const summary = await getSummaryData()
    const characterIds = Object.keys(summary)

    return await Promise.all(characterIds.map(async characterId => {
        const character = await getCharacter(null, characterId)
        const inventory = character.inventory
        return {
            name: character.profile.name,
            inventory
        }
    }))
}

export type InventoryData = {
    name: string
    inventory: ItemContainer[]
}
