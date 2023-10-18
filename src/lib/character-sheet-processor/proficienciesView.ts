import { ModifierType, ProficiencyView, Skill } from "../CharacterSheetProcessor"

export default function proficienciesView(customProfs: any, skills: Skill[],  profs: ModifierType[], langs: ModifierType[]): ProficiencyView[] {
    const entityId = {
        tools: 2103445194,
        martialWeapons: 1782728300,
        simpleWeapons: 660121713,
        armour: 174869515
    }
    const customProficiencies = customProfs.map((customProficiency: any) => customProficiency.name)
    const skillNames = skills.map(skill => skill.name)
    const proficiencies = profs
        .filter(proficiency => !proficiency.subType.includes('saving-throws'))
        .filter(proficiency => !skillNames.includes(proficiency.friendlySubtypeName) || customProficiencies.includes(proficiency.friendlySubtypeName))

    const languages = langs
        .map(language => language.subType)
        .join(', ')

    return [
        {
            type: 'armour',
            value: getSubTypeNamesByEntityId(proficiencies, entityId.armour)
        },
        {
            type: 'Weapons',
            value: getSubTypeNamesByEntityId(proficiencies, entityId.martialWeapons)
                .concat(', ', getSubTypeNamesByEntityId(proficiencies, entityId.simpleWeapons))
        },
        {
            type: 'tools',
            value: getSubTypeNamesByEntityId(proficiencies, entityId.tools)
        },
        {
            type: 'Languages',
            value: languages
        }
    ]
    function getSubTypeNamesByEntityId(proficiencies: ModifierType[], entityId: number): string {
        const names = proficiencies.filter(proficiency => proficiency.entityTypeId === entityId)
            .map(proficiency => proficiency.friendlySubtypeName)

        return [...new Set(names)].join(', ')
    }
}
