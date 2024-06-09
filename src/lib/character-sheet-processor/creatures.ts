import { CreatureType } from "../../dm-tools-data.types"

export default function creatures(ddbCreatures: any[]): CreatureType[] {
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


