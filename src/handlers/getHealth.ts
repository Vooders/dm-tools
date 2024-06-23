import {
    CharacterProfileHp,
    SpellSlot,
    Action,
    CurrenciesType,
    DeathSaves,
    HitDice,
    HealthPotionsType,
    CreatureType
} from '../dm-tools-data.types'
import getParty from './getParty'
import { Logger } from '../logger/Logger'

const logger = new Logger('[handler][getHealth]')

export default async (): Promise<HealthData[]> => {
    logger.info('Getting health data')
    const party = await getParty()

    return party.map((character) => {
        const limitedUseActions = character.actions
            .map(action => {
                if (action.name === 'Bardic Inspiration') {
                    action.limitedUse.maxUses = 5
                }
                return action
            })
            .filter(action => action.limitedUse.maxUses > 0)
        logger.debug(`Built health data for ${character.profile.name}`)
        return {
            name: character.profile.name,
            hp: character.hp,
            avatarPath: character.avatarPath,
            spellSlots: character.spellSlots,
            limitedUseActions,
            currencies: character.currencies,
            deathSaves: character.deathSaves,
            experience: character.profile.xp,
            level: character.profile.level,
            ac: character.ac,
            hitDice: character.hitDice,
            healthPotions: character.healthPotions,
            creatures: character.creatures,
            inspiration: character.inspiration,
            milestoneProgression: character.milestoneProgression
        }
    })
}

export type HealthData = {
    name: string,
    hp: CharacterProfileHp
    avatarPath: string
    spellSlots: SpellSlot[]
    limitedUseActions: Action[]
    currencies: CurrenciesType
    deathSaves: DeathSaves
    experience: number
    level: number
    ac: number
    hitDice: HitDice[]
    healthPotions: HealthPotionsType
    creatures: CreatureType[]
    inspiration: boolean
    milestoneProgression: boolean
}
