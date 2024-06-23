import { ItemContainer } from '../dm-tools-data.types'
import getParty from './getParty'
import { Logger } from '../logger/Logger'

const logger = new Logger('[handler][getInventories]')

export default async (): Promise<InventoryData[]> => {
    logger.info('Getting inventory data')
    const party = await getParty()

    return party.map(character => {
        logger.debug(`Extracting inventory of ${character.profile.name}`)
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
