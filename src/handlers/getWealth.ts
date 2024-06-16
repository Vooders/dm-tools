import { CurrenciesType, ContainerWealth } from '../dm-tools-data.types'
import getParty from './getParty'

export default async (): Promise<WealthData[]> => {
    const party = await getParty()

    return party.map((character) => {       
        return {
            name: character.profile.name,
            currencies: character.currencies,
            containers: character.wealth.containers,
            totalContainerWealth: character.wealth.totalContainerWealth,
            totalWealth: character.wealth.totalWealth
        }
    })
}

export type WealthData = {
    name: string
    currencies: CurrenciesType
    containers: ContainerWealth[]
    totalContainerWealth: number
    totalWealth: number
}
