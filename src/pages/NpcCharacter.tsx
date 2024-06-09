import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import CharacterSheet from './CharacterSheet'
import { DmToolsData } from '../dm-tools-data.types'

export default function NpcCharacter() {
    let { characterId } = useParams()
    const [character, setCharacter] = useState<DmToolsData>(null)

    useEffect(() => {
        const getCharacter = async () => {
            console.log('getting NPC')
            const char = await window.electron.getNpc(characterId)
            setCharacter(char)
        }

        if (!character) {
            getCharacter()
                .catch(console.error)
        }
    })

    return (
        <CharacterSheet character={character} />
    )
}