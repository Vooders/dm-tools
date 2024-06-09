import { Ability, Modifier, Save } from "../CharacterSheetProcessor"

export default function saves(classes: any, proficiencies: Modifier[], abilities: Ability[], isMultiClass: boolean, proficiency: number): Save[] {
    let bannedIds: number[] = []
    if (isMultiClass) {
        const multiClasses = classes.slice(1)
        bannedIds = multiClasses.map((clas: any) => {
            const multiClassProficiency = clas.definition.classFeatures.find((feature: any) => feature.name === 'Proficiencies')
            if (multiClassProficiency) {
                return multiClassProficiency.id
            }
        })
    }

    const saveProficiencies = proficiencies
        .filter(proficiency => proficiency.subType.includes('saving-throws'))
        .filter(proficiency => !bannedIds.includes(proficiency.componentId))
        .map(proficientSave => proficientSave.friendlySubtypeName.split(' ')[0])

    return abilities.map(ability => {
        return {
            name: ability.name,
            modifier: saveProficiencies.includes(ability.name) ? ability.modifier + proficiency : ability.modifier,
            shortName: ability.name.slice(0, 3).toUpperCase(),
            proficient: saveProficiencies.includes(ability.name),
            expertise: false
        }
    })
}