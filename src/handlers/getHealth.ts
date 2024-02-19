import getSummaryData from '../lib/getSummary'
import getCharacter from './getCharacter'
import { CharacterProfileHp, SpellSlot, Action, CurrenciesType, DeathSaves, HealthPotions} from '../../src/lib/CharacterSheetProcessor'
import { HitDice } from '../../src/lib/character-sheet-processor/hitDice'
import { Creature } from '../../src/lib/character-sheet-processor/creatures'

export default async (): Promise<HealthData[]> => {
    const summary = await getSummaryData()
    const characterIds = Object.keys(summary)

    return await Promise.all(characterIds.map(async (characterId) => {
        const characterData = await getCharacter(null, characterId)
        const limitedUseActions = characterData.actions
            .map(action => {
                if (action.name === 'Bardic Inspiration') {
                    action.limitedUse.maxUses = 5
                }
                return action
            })
            .filter(action => action.limitedUse.maxUses > 0)
        
        return {
            name: characterData.profile.name,
            hp: characterData.hp,
            avatarPath: characterData.avatarPath,
            spellSlots: characterData.spellSlots,
            limitedUseActions,
            currencies: characterData.currencies,
            deathSaves: characterData.deathSaves,
            experience: characterData.profile.xp,
            level: characterData.profile.level,
            ac: characterData.ac,
            hitDice: characterData.hitDice,
            healthPotions: characterData.healthPotions,
            creatures: characterData.creatures
        }
    }))
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
    healthPotions: HealthPotions
    creatures: Creature[]
}
