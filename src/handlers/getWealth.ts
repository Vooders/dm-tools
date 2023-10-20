import getSummaryData from '../lib/getSummary'
import getCharacter from './getCharacter'
import { ContainerWealth, Currencies } from '../lib/CharacterSheetProcessor'

export default async (): Promise<WealthData[]> => {
    const summary = await getSummaryData()
    const characterIds = Object.keys(summary)

    return await Promise.all(characterIds.map(async (characterId) => {
        const characterData = await getCharacter(null, characterId)
        
        return {
            name: characterData.profile.name,
            currencies: characterData.currencies,
            containers: characterData.wealth.containers,
            totalContainerWealth: characterData.wealth.totalContainerWealth,
            totalWealth: characterData.wealth.totalWealth
        }
    }))
}

export type WealthData = {
    name: string
    currencies: Currencies
    containers: ContainerWealth[]
    totalContainerWealth: number
    totalWealth: number
}
