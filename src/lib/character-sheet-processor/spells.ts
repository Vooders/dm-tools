import { CastingTime, SpellType, Spells } from "../CharacterSheetProcessor"

export default function spells(spellsArray: any): Spells[] {
    function getActionType(spell: any): CastingTime {
        switch (spell.activation.activationType) {
            case 1:
                return 'action'
            case 3:
                return 'bonus'
            case 4:
                return 'reaction'
            case 6:
                return 'minutes'
        }

    }

    function isPrepared(spell: any) {
        if (spell.alwaysPrepared || spell.definition.level === 0) {
            return true
        } else {
            return spell.prepared
        }
    }

    const spells = spellsArray.map((classSpell: any) => {
        return classSpell.spells.map((spell: any) => {
            return {
                name: spell.definition.name,
                level: spell.definition.level,
                school: spell.definition.school,
                duration: spell.definition.duration,
                range: spell.definition.range,
                description: spell.definition.description,
                components: spell.definition.componentsDescription,
                tags: spell.definition.tags,
                prepared: isPrepared(spell),
                castingTime: getActionType(spell)
            }
        })
    }).flat()

    return new Array(10).fill('').map((spell: SpellType, index: number) => {
        return {
            level: index,
            spells: spells.filter((s: SpellType) => s.level === index)
        }
    }).filter((spellLevel) => spellLevel.spells.length > 0)
}