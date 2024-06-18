import { Stat, Modifier } from "../../ddb-data.types"
import { Ability, ItemContainer } from "../../dm-tools-data.types"

const abilityNames = [
    'Strength',
    'Dexterity',
    'Constitution',
    'Intelligence',
    'Wisdom',
    'Charisma'
]

export default function abilities(stats: Stat[], modifiers: Modifier[]): Ability[] {
    const bonusModifiers = modifiers.filter((modifier) => {
        return modifier.entityId !== null
    })

    stats.forEach(stat => {
        bonusModifiers.forEach(modifier => {
            const statIsTheOne = stat.id === modifier.entityId
            if (statIsTheOne && modifier.type === 'bonus') {
                stat.value = stat.value + modifier.fixedValue
            } else if (statIsTheOne && modifier.type === 'set') {
                stat.value = modifier.fixedValue
            }
        })
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
