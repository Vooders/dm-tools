import getParty from './getParty'

export default async (): Promise<LanguagesData> => {
    const party = await getParty()

    const characters = party.map((character) => {
        const languages = character.proficiencyView
            .filter((prof: { name: any }) => prof.name === 'Languages')[0].value
            .map((language: string) => language.trim())

        return {
            name: character.profile.name,
            languages
        }
    })

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
