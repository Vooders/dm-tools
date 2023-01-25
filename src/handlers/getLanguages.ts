import getSummaryData from '../lib/getSummary'
import getCharacter from './getCharacter'

export default async (): Promise<LanguagesData> => {
    const summary = await getSummaryData()
    const characterIds = Object.keys(summary)

    const characters = await Promise.all(characterIds.map(async (characterId) => {
        const characterData = await getCharacter(null, characterId)
        const languages = characterData.proficiencyView
            .filter((prof: { type: any }) => prof.type === 'Languages')[0].value.split(',')
            .map((language: string) => language.trim())

        return {
            name: characterData.profile.name,
            languages
        }
    }))

    const allLanguages = [ ...new Set(characters.map(toon => toon.languages).flat()) ]

    return {
        allLanguages,
        characters
    }
}

export type LanguagesData = {
    allLanguages: string[],
    characters: characterLanguages[]
}

type characterLanguages = {
    name: string,
    languages: string[]
}
