import { HealthPotionsType } from "../../dm-tools-data.types"
import { Logger } from '../../logger/Logger'

const logger = new Logger('[characterSheetProcessor][healthPotions]')

export default function healthPotions(inventory: any): HealthPotionsType {
    logger.debug('Counting healing potions')
    const calculateAmount = (potionName: string) => {
        return inventory.filter((item: any) => item.definition.name === potionName)
            .reduce((acc: any, item: any) => acc + item.quantity, 0)
    }

    return {
        normal: calculateAmount('Potion of Healing'),
        greater: calculateAmount('Potion of Healing (Greater)'),
        superior: calculateAmount('Potion of Healing (Superior)'),
        supreme: calculateAmount('Potion of Healing (Supreme)')
    }
}


