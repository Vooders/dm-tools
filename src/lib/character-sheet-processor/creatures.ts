
export default function creatures(ddbCreatures: any[]): Creature[] {
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

export type Creature = {
    customName: string
    name: string
    ac: number
    hp: {
        max: number
        removed: number
    }
}
