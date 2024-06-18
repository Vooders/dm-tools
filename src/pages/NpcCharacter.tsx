import React from 'react'
import { useParams } from 'react-router-dom'

import CharacterSheet from '../components/CharacterSheet'
import { DmToolsData } from '../dm-tools-data.types'

import useUpdateWithNpcs from '../hooks/useUpdateWithNpcs'

export default function NpcCharacter() {
    let { characterId } = useParams()
    const character = useUpdateWithNpcs<DmToolsData>('npc', '[page][NpcCharacter]', null, characterId)

    return (
        <CharacterSheet character={character} />
    )
}
