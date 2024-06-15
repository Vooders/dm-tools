import { Stat, Modifier } from "../../ddb-data.types"
import { Ability, ItemContainer } from "../../dm-tools-data.types"

const statType = [175, 176, 177, 178, 179, 180]
const abilityNames = [
    'Strength',
    'Dexterity',
    'Constitution',
    'Intelligence',
    'Wisdom',
    'Charisma'
]

export default function abilities(stats: Stat[], modifiers: Modifier[], inventory: ItemContainer[]): Ability[] {
    const bonusModifiers = modifiers.filter((modifier) => {
        return modifier.entityId !== null
    })

    function getSetModifier(subType: number): number {
        return inventory.map((container) => container.contents).flat()
            .filter((item) => item.equipped && item.modifiers)
            .map((item) => item.modifiers.filter((mod: any) => mod.modifierTypeId === 9 && mod.modifierSubTypeId === subType)).flat()
            .reduce((prev, current) => (prev && prev.value > current.value) ? prev : current, 0).value
    }

    stats.forEach(stat => {
        const setModifier = getSetModifier(statType[stat.id - 1])

        bonusModifiers.forEach(modifier => {
            if (stat.id === modifier.entityId) {
                stat.value = stat.value + modifier.fixedValue
            }
        })
        if (setModifier > stat.value) {
            stat.value = setModifier
        }
    })

    return stats.map(stat => {
        return {
            name: abilityNames[stat.id - 1],
            value: stat.value,
            modifier: Math.floor((stat.value - 10) / 2),
            shortName: abilityNames[stat.id - 1].slice(0, 3).toUpperCase()
        }
    })
}
