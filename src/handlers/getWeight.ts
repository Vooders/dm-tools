import getSummaryData from '../lib/getSummary'
import getCharacter from './getCharacter'
import { Item } from '../lib/CharacterSheetProcessor'

export default async (): Promise<WeightData[]> => {
    const summary = await getSummaryData()
    const characterIds = Object.keys(summary)

    return await Promise.all(characterIds.map(async (characterId) => {
        const characterData = await getCharacter(null, characterId)

        const containers = characterData.inventory.map((inventory) => {
            return {
                name: inventory.name,
                totalWeight: Math.floor(inventory.contents.reduce((acc: number, item: Item) => acc + (item.definition.weight * item.quantity), 0))
            }
        })

        const totalContainerWeight = Math.floor(containers.reduce((acc, value) => acc + value.totalWeight, 0))

        return {
            name: characterData.profile.name,
            containers,
            totalContainerWeight
        }
    }))
}

export type WeightData = {
    name: string
    containers: ContainerWeight[]
    totalContainerWeight: number
}

export type ContainerWeight = {
    name: string,
    totalWeight: number
}
