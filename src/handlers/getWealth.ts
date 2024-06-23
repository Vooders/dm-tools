import { CurrenciesType, ContainerWealth } from '../dm-tools-data.types'
import getParty from './getParty'
import { Logger } from '../logger/Logger'

const logger = new Logger('[handler][getWealth]')

export default async (): Promise<WealthData[]> => {
    logger.info('Getting wealth data')
    const party = await getParty()

    return party.map((character) => {
        logger.debug(`Extracting wealth data from ${character.profile.name}`)
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
