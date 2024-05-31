import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { DmToolsData } from '../../lib/CharacterSheetProcessor'
import CharacterSheet from './CharacterSheet'

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