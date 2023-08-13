import React, { useState, useEffect } from 'react';
import CharacterImporter from '../fragments/CharacterImporter';
import Title from '../Title';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import { Summary } from '../../lib/saveCharacter';

export default function Characters() {
    const [characters, setCharacters] = useState<Summary>({})

    const getSummary = async () => {
        setCharacters(await window.electron.getSummary())
    }

    useEffect(() => {
        getSummary()
            .catch(console.error)

        window.electron.characterUpdated(async () => {
            await getSummary()
        })
    }, [])

    const handleDelete = async (characterId: number) => {
        const result = await window.electron.deleteCharacter(characterId)
        console.log(`Delete ${characterId} - ${result}`)
    }

    return (
        <React.Fragment>
            <Title>Characters</Title>
            <List>
                {Object.keys(characters).map((characterKey) => {
                    const character = characters[characterKey]
                    const name = character.name
                    const details = `${character.race} ${character.classes.join(' ')}`
                    console.log(character.avatarPath)
                    return (
                        <>
                            <ListItem secondaryAction={
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
                        </>
                    )
                })}
            </List>
            <CharacterImporter />
        </React.Fragment>
    )
}
