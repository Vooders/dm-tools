import { ItemContainer } from '../dm-tools-data.types'
import getParty from './getParty'

export default async (): Promise<InventoryData[]> => {
    const party = await getParty()

    return party.map(character => {
        const inventory = character.inventory
        return {
            name: character.profile.name,
            inventory
        }
    })
}

export type InventoryData = {
    name: string
    inventory: ItemContainer[]
}
