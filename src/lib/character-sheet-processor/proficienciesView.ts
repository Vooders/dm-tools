import { Modifier } from "../../ddb-data.types"
import { Skill, ProficiencyView } from "../../dm-tools-data.types"
import { Logger } from '../../logger/Logger'

const logger = new Logger('[characterSheetProcessor][proficienciesView]')

export default function proficienciesView(customProfs: any, skills: Skill[],  profs: Modifier[], langs: Modifier[]): ProficiencyView[] {
    logger.debug('Building proficiencies')
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

    const languages = langs.map(language => language.subType)

    return [
        {
            name: 'armour',
            value: getSubTypeNamesByEntityId(proficiencies, entityId.armour)
        },
        {
            name: 'Weapons',
            value: getSubTypeNamesByEntityId(proficiencies, entityId.martialWeapons)
                .concat(', ', getSubTypeNamesByEntityId(proficiencies, entityId.simpleWeapons))
        },
        {
            name: 'tools',
            value: getSubTypeNamesByEntityId(proficiencies, entityId.tools)
        },
        {
            name: 'Languages',
            value: languages
        }
    ]
    function getSubTypeNamesByEntityId(proficiencies: Modifier[], entityId: number): string[] {
        const names = proficiencies.filter(proficiency => proficiency.entityTypeId === entityId)
            .map(proficiency => proficiency.friendlySubtypeName)

        return [...new Set(names)]
    }
}
