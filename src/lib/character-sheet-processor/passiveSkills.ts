import { Modifier } from "../../ddb-data.types"
import { Skill, PassiveSkill } from "../../dm-tools-data.types"

export default function passiveSkills(skills: Skill[], bonuses: Modifier[]): PassiveSkill[] {
    const passiveBonuses = bonuses
        .filter((bonus) => bonus.subType.includes('passive'))

    return [
        { mod: 'WIS', name: 'Perception', score: 10 },
        { mod: 'INT', name: 'Investigation', score: 10 },
        { mod: 'WIS', name: 'Insight', score: 10 }
    ].map(passiveSkill => {
        const modifier = skillModifier(passiveSkill.name)
        const bonus = passiveBonuses
            .filter(passiveBonus => passiveBonus.friendlySubtypeName.includes(passiveSkill.name))
            .reduce((total: number, passiveBonus) => total += passiveBonus.fixedValue, 0)

        return {
            ...passiveSkill,
            score: passiveSkill.score + modifier + bonus
        }
    })
    
    function skillModifier(name: string): number {
        return skills.find(skill => skill.name === name).bonus
    }
}
