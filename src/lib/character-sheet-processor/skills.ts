import { CustomProficiency, Modifier } from "../../ddb-data.types"
import { Ability, Skill } from "../../dm-tools-data.types"

export default function skills(abilities: Ability[], customProfs: CustomProficiency[], proficiencies: Modifier[], expertise: Modifier[], proficiency: number): Skill[] {
    const abilityNames = abilities.map(ability => ability.name)
    const base = [
        { mod: 'DEX', name: 'Acrobatics' },
        { mod: 'WIS', name: 'Animal Handling' },
        { mod: 'INT', name: 'Arcana' },
        { mod: 'STR', name: 'Athletics' },
        { mod: 'CHA', name: 'Deception' },
        { mod: 'INT', name: 'History' },
        { mod: 'WIS', name: 'Insight' },
        { mod: 'CHA', name: 'Intimidation' },
        { mod: 'INT', name: 'Investigation' },
        { mod: 'WIS', name: 'Medicine' },
        { mod: 'INT', name: 'Nature' },
        { mod: 'WIS', name: 'Perception' },
        { mod: 'CHA', name: 'Performance' },
        { mod: 'CHA', name: 'Persuasion' },
        { mod: 'INT', name: 'Religion' },
        { mod: 'DEX', name: 'Sleight of Hand' },
        { mod: 'DEX', name: 'Stealth' },
        { mod: 'WIS', name: 'Survival' }
    ].concat(customProfs.map((customProficiency: any) => {
        return {
            mod: abilityNames[customProficiency.statId - 1].slice(0, 3).toUpperCase(),
            name: customProficiency.name
        }
    }))

    const skillNames = base.map(skill => skill.name)
    const skillProficiencies = proficiencies
        .filter(proficiency => skillNames.includes(proficiency.friendlySubtypeName))
        .map(proficiency => proficiency.friendlySubtypeName)

    const skillExpertise = expertise
        .filter(proficiency => skillNames.includes(proficiency.friendlySubtypeName))
        .map(proficiency => proficiency.friendlySubtypeName)

    return base.map(skill => {
        const proficient = skillProficiencies.includes(skill.name)
        const expertise = skillExpertise.includes(skill.name)

        const baseModifier = abilityModifierByShortName(skill.mod)
        let abilityModifier = baseModifier
        if (expertise) {
            abilityModifier += (proficiency * 2)
        } else if (proficient) {
            abilityModifier += proficiency
        }

        return {
            ...skill,
            bonus: abilityModifier,
            proficient,
            expertise
        }
    })
    function abilityModifierByShortName(shortName: string): number {
        return abilities.find(ability => ability.shortName === shortName).modifier
    }
}
