import { CurrenciesType, ContainerWealth } from '../dm-tools-data.types'
import getSummaryData from '../lib/getSummary'
import getCharacter from './getCharacter'

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
    currencies: CurrenciesType
    containers: ContainerWealth[]
    totalContainerWealth: number
    totalWealth: number
}
