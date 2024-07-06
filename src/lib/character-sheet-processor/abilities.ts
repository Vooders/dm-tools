import { Stat, Modifier } from "../../ddb-data.types"
import { Ability } from "../../dm-tools-data.types"
import { Logger } from '../../logger/Logger'

const logger = new Logger('[characterSheetProcessor][abilities]')

const abilityNames = [
    'Strength',
    'Dexterity',
    'Constitution',
    'Intelligence',
    'Wisdom',
    'Charisma'
]

export default function abilities(stats: Stat[], modifiers: Modifier[]): Ability[] {
    logger.debug('Building abilities')
    const bonusModifiers = modifiers.filter((modifier) => {
        return modifier.entityId !== null
    })

    stats.forEach(stat => {
        bonusModifiers.forEach(modifier => {
            if (stat.id === modifier.entityId && !modifier.duration) {
                if (modifier.type === 'bonus') {
                    stat.value = stat.value + modifier.fixedValue
                } else if (modifier.type === 'set') {
                    stat.value = modifier.fixedValue
                }
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
