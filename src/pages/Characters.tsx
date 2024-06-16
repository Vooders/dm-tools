import React, { useState, useEffect } from 'react';
import CharacterImporter from '../components/CharacterImporter';
import Title from '../components/Title';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import { Summary } from '../lib/saveCharacter';
import * as characterRepository from '../repositories/characterRepository'

export default function Characters() {
    const [characters, setCharacters] = useState<Summary>({})

    useEffect(() => {
        (async () => {
            console.log('[page][Characters] Initial load of characters')
            setCharacters(await characterRepository.getSummary())
        })()

        const removeListener = characterRepository.onUpdate(async () => {
            console.log('[page][Characters] Characters updated: reloading character data')
            setCharacters(await characterRepository.getSummary())
        })

        return () => {
            if(removeListener) removeListener()
        }
    }, [])

    const handleDelete = async (characterId: string) => {
        const result = await characterRepository.deleteCharacter(characterId)
        console.log(`[page][Characters] Delete ${characterId} - ${result}`)
    }

    return (
        <React.Fragment>
            <Title>Characters</Title>
            <List>
                {Object.keys(characters).map((characterKey) => {
                    const character = characters[characterKey]
                    const name = character.name
                    const details = `${character.race} ${character.classes.join(' ')}`
                    console.log(`[page][Characters] ${character.avatarPath}`)
                    return (
                        <React.Fragment key={characterKey}>
                            <ListItem
                                secondaryAction={
                                    <>
                                        <Tooltip title="Delete">
                                            <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(character.id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </>
                                }>
                                <ListItemAvatar>
                                    <Avatar src={character.avatarPath} />
                                </ListItemAvatar>
                                <ListItemText primary={name} secondary={details} />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                        </React.Fragment>
                    )
                })}
            </List>
            <CharacterImporter />
        </React.Fragment>
    )
}
