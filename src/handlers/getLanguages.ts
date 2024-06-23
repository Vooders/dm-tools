import getParty from './getParty'
import { Logger } from '../logger/Logger'

const logger = new Logger('[handler][getLanguages]')

export default async (): Promise<LanguagesData> => {
    logger.info('Getting language data')
    const party = await getParty()

    const characters = party.map((character) => {
        const languages = character.proficiencyView
            .filter((prof: { name: any }) => prof.name === 'Languages')[0].value
            .map((language: string) => language.trim())

        logger.debug(`Build language data for ${character.profile.name}`)
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
