import { Skill } from '../dm-tools-data.types'
import getSummaryData from '../lib/getSummary'
import getCharacter from './getCharacter'

export default async (): Promise<SkillsData> => {
    const summary = await getSummaryData()
    const characterIds = Object.keys(summary)

    const characters = await Promise.all(characterIds.map(async (characterId) => {
        const characterData = await getCharacter(null, characterId)
        return {
            name: characterData.profile.name,
            skills: characterData.skills
        }
    })) as CharacterSkills[]


    const characterNames = ['', ...characters.map(character => character.name)]
    const skillNames = characters[0].skills.map(skill => skill.name)
    const allSkills = characters.map(character => character.skills).flat()

    const sortedSkills = skillNames.map(skillName => {
        return [skillName, ...allSkills.filter(skill => skill.name === skillName).map(skill => skill.bonus)]
    })

    return [characterNames, sortedSkills]
}

type CharacterSkills = {
    name: string,
    skills: Skill[]
}

export type SkillsData = [
    string[],
    (string | number)[][]
]


