import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { DmToolsData } from '../../lib/CharacterSheetProcessor'
import CharacterSheet from './CharacterSheet'

export default function PlayerCharacter() {
    let { characterId } = useParams()
    const [character, setCharacter] = useState<DmToolsData>(null)

    useEffect(() => {
        const getCharacter = async () => {
            console.log('getting Character')
            const char = await window.electron.getCharacter(characterId)
            setCharacter(char)
        }

        if (!character || characterId !== character.id.toString()) {
            getCharacter()
                .catch(console.error)
        }
    })

    return (
        <CharacterSheet character={character} />
    )
}