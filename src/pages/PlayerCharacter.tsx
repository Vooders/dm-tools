import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'

import CharacterSheet from './CharacterSheet'
import { DmToolsData } from '../dm-tools-data.types'

export default function PlayerCharacter() {
    const pageRendered = useRef(false)
    let { characterId } = useParams()
    const [character, setCharacter] = useState<DmToolsData>(null)

    window.electron.characterUpdated(async () => {
        console.log('Characters updated: reloading player character')
        setCharacter(await window.electron.getCharacter(characterId))
    })

    useEffect(() => {
        if (!pageRendered.current) {
            (async () => {
                console.log('Initial load of health data')
                setCharacter(await window.electron.getCharacter(characterId))
            })()
        }
        pageRendered.current = true
    })

    return (
        <CharacterSheet character={character} />
    )
}
