import getSummaryData from '../lib/getSummary'
import getCharacter from './getCharacter'
import { Currencies } from '../lib/CharacterSheetProcessor'
import { Item } from '../lib/CharacterSheetProcessor'

export default async (): Promise<WealthData[]> => {
    const summary = await getSummaryData()
    const characterIds = Object.keys(summary)

    function reduceAndRound<T>(someArray: T[], reduceFunc: (acc: number, item: T) => number): number {
        const result = someArray.reduce(reduceFunc, 0)
        return Math.round(result * 100) / 100
    }

    return await Promise.all(characterIds.map(async (characterId) => {
        const characterData = await getCharacter(null, characterId)

        const containers = characterData.inventory.map((inventory) => {
            return {
                name: inventory.name,
                value: reduceAndRound<Item>(inventory.contents, (acc, item) => {
                    return acc + (item.definition.cost / item.definition.bundleSize) * item.quantity
                })
            }
        }) as Container[]

        const totalContainerWealth = reduceAndRound<Container>(containers, (acc, container) => acc + container.value)
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
    name: string
    currencies: Currencies
    containers: Container[]
    totalContainerWealth: number
    totalWealth: number
}

export type Container = {
    name: string
    value: number
}
