import { CreatureType } from "../../dm-tools-data.types"
import { Logger } from '../../logger/Logger'

const logger = new Logger('[characterSheetProcessor][creatures]')

export default function creatures(ddbCreatures: any[]): CreatureType[] {
    logger.debug('Getting creatures')
    return ddbCreatures.map((creature) => {
        return {
            customName: creature.name,
            name: creature.definition.name,
            ac: creature.definition.armorClass,
            hp: {
                max: creature.definition.averageHitPoints,
                removed: creature.removedHitPoints
            }
        }
    })
}


