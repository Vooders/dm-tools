import { Skill } from '../dm-tools-data.types'
import getParty from './getParty'

export default async (): Promise<SkillsData> => {
    const party = await getParty()

    const characters = party.map((character) => {
        return {
            name: character.profile.name,
            skills: character.skills
        }
    }) as CharacterSkills[]

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


