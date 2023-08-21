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
                value: Math.round((inventory.contents.reduce((acc: number, item: Item) =>
                    acc + (item.definition.cost / item.definition.bundleSize) * item.quantity, 0)) * 100) / 100
            }
        })

        const totalContainerWealth = Math.round((containers.reduce((acc, value) => acc + value.value, 0)) * 100) / 100

        const customItems = characterData.customItems
        const totalCustomItemWealth = Math.round((customItems.reduce((acc, item) => acc + (item.cost * item.quantity), 0)) * 100) / 100
        console.log(characterData.profile.name)
        console.log(totalCustomItemWealth)
        const totalWealth = totalContainerWealth + totalCustomItemWealth + characterData.currencies.total

        return {
            name: characterData.profile.name,
            currencies: characterData.currencies,
            containers,
            totalContainerWealth,
            totalCustomItemWealth,
            totalWealth
        }
    }))
}

export type WealthData = {
    name: string
    currencies: Currencies
    containers: Container[]
    totalContainerWealth: number
    totalCustomItemWealth: number
    totalWealth: number
}

export type Container = {
    name: string
    value: number
}
