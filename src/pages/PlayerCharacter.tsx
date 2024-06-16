import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import CharacterSheet from './CharacterSheet'
import { DmToolsData } from '../dm-tools-data.types'
import * as characterRepository from '../repositories/characterRepository'

export default function PlayerCharacter() {
    let { characterId } = useParams()
    const [character, setCharacter] = useState<DmToolsData>(null)

    useEffect(() => {
        (async () => {
            console.log('Initial load of health data')
            setCharacter(await characterRepository.get(characterId))
        })()

        const removeListener = characterRepository.onUpdate(async () => {
            console.log('Characters updated: reloading player character')
            setCharacter(await characterRepository.get(characterId))
        })

        return () => {
            if(removeListener) removeListener()
        }
    }, [characterId])

    return (
        <CharacterSheet character={character} />
    )
}
