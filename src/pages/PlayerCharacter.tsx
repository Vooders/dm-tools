import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import CharacterSheet from './CharacterSheet'
import { DmToolsData } from '../dm-tools-data.types'

export default function PlayerCharacter() {
    let { characterId } = useParams()
    const [character, setCharacter] = useState<DmToolsData>(null)

    useEffect(() => {
        (async () => {
            console.log('Initial load of health data')
            setCharacter(await window.electron.getCharacter(characterId))
        })()

        const removeListener = window.electron.receive('character:updated', async () => {
            console.log('Characters updated: reloading player character')
            setCharacter(await window.electron.getCharacter(characterId))
        })

        return () => {
            if(removeListener) removeListener()
        }
    }, [])

    return (
        <CharacterSheet character={character} />
    )
}
