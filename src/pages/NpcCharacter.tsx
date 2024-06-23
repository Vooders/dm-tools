import React from 'react'
import { useParams } from 'react-router-dom'

import CharacterSheet from '../components/CharacterSheet'
import { DmToolsData } from '../dm-tools-data.types'

import useUpdateWithNpcs from '../hooks/useUpdateWithNpcs'
import { RendererLogger } from '../logger/RendererLogger';

const logger = new RendererLogger('[page][NpcCharacter]', window)

export default function NpcCharacter() {
    let { characterId } = useParams()
    const character = useUpdateWithNpcs<DmToolsData>('npc', logger, null, characterId)

    return (
        <CharacterSheet character={character} />
    )
}
