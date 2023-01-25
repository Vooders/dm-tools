import getSummaryData from '../lib/getSummary'
import getCharacter from './getCharacter'
import { Skill } from '../lib/CharacterSheetProcessor'

export default async () => {
    const summary = await getSummaryData()
    const characterIds = Object.keys(summary)

    const characters = await Promise.all(characterIds.map(async (characterId) => {
        const characterData = await getCharacter(null, characterId)
        return {
            name: characterData.profile.name,
            skills: characterData.skills
        }
    })) as SkillsData[]


    const characterNames = ['', ...characters.map(character => character.name)]
    const skillNames = characters[0].skills.map(skill => skill.name)
    const allSkills = characters.map(character => character.skills).flat()

    const sortedSkills = skillNames.map(skillName => {
        return [skillName, ...allSkills.filter(skill => skill.name === skillName).map(skill => skill.bonus)]
    })

    return [characterNames, sortedSkills]
}

export type SkillsData = {
    name: string,
    skills: Skill[]
}


