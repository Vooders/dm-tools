import { PassiveSkill } from '../dm-tools-data.types'
import getParty from './getParty'


export default async (): Promise<SensesData[]> => {
    const party = await getParty()

    return party.map((character) => {
        return {
            name: character.profile.name,
            senses: character.passiveSkills
        }
    })
}

export type SensesData = {
    name: string,
    senses: PassiveSkill[]
}
