import React from 'react'
import { useParams } from 'react-router-dom'

import CharacterSheet from '../components/CharacterSheet'
import { DmToolsData } from '../dm-tools-data.types'
import useUpdateWithCharacters from '../hooks/useUpdateWithCharacters'

export default function PlayerCharacter() {
    let { characterId } = useParams()
    const character = useUpdateWithCharacters<DmToolsData>('character', '[page][PlayerCharacter]', null, characterId)

    return (
        <CharacterSheet character={character} />
    )
}
