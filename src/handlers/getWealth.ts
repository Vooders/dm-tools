import getSummaryData from '../lib/getSummary'
import getCharacter from './getCharacter'
import { Currencies } from '../lib/CharacterSheetProcessor'
import { Item } from '../lib/CharacterSheetProcessor'

export default async (): Promise<WealthData[]> => {
    const summary = await getSummaryData()
    const characterIds = Object.keys(summary)

    return await Promise.all(characterIds.map(async (characterId) => {
        const characterData = await getCharacter(null, characterId)

        const containers = characterData.inventory.map((inventory) => {
            return {
                name: inventory.name,
                value: Math.floor(inventory.contents.reduce((acc: number, item: Item) => acc + (item.definition.cost * item.quantity), 0))
            }
        })

        const totalContainerWealth = Math.floor(containers.reduce((acc, value) => acc + value.value, 0))

        const totalWealth = totalContainerWealth + characterData.currencies.total
        
        return {
            name: characterData.profile.name,
            currencies: characterData.currencies,
            containers,
            totalContainerWealth,
            totalWealth
        }
    }))
}

export type WealthData = {
    name: string,
    currencies: Currencies
    containers: Container[]
    totalContainerWealth: number
    totalWealth: number
}

export type Container = {
    name: string,
    value: number
}
