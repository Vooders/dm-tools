import getSummaryData from '../lib/getSummary'
import getCharacter from './getCharacter'
import { CharacterProfileHp, SpellSlot, Action } from '../../src/lib/CharacterSheetProcessor'

export default async (): Promise<HealthData[]> => {
    const summary = await getSummaryData()
    const characterIds = Object.keys(summary)

    const characters = await Promise.all(characterIds.map(async (characterId) => {
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
            limitedUseActions
        }
        
    }))

    return characters
}

export type HealthData = {
    name: string,
    hp: CharacterProfileHp,
    avatarPath: string,
    spellSlots: SpellSlot[],
    limitedUseActions: Action[]
}
