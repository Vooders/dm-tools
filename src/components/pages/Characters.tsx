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
import Box from '@mui/material/Box';
import LoadingButton from '@mui/lab/LoadingButton';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

import { Summary } from '../../handlers/saveCharacter';
import { ImportResponse } from '../../handlers/importCharacter';
import Button from '@mui/material/Button';

export default function Characters() {
    const [characters, setCharacters] = useState<Summary>({})
    const [gotSummary, setGotSummary] = useState(false)
    const [loading, setLoading] = React.useState(false);

    window.electron.summaryUpdate((event: any, value: any) => {
        setCharacters(value)
    })

    useEffect(() => {
        const getSummary = async () => {
            const summary = await window.electron.getSummary()
            setCharacters(summary)
        }

        if (!gotSummary) {
            getSummary()
                .catch(console.error)
            setGotSummary(true)
        }
    })

    const handleDelete = async (characterId: number) => {
        console.log(`Deleting ${characterId}`)
        const result = await window.electron.deleteCharacter(characterId)
        console.log(`Delete ${characterId} - ${result}`)
    }

    const updateAll = async () => {
        setLoading(true);
        const characterIds = Object.keys(characters)
        console.log(`Updating ${characterIds}`)
        for (const id of characterIds) {
            const response = await window.electron.importCharacter(id) as ImportResponse
            if (response.status === 'success') {
                const name = characters[id].name
                const saveResponse = await window.electron.saveCharacter(response.value)
                const message = saveResponse ? `${name} saved` : 'There was a problem saving'
            }
        }
        setLoading(false);
    }

    return (
        <React.Fragment>
            <Box sx={{ '& > button': { m: 1 } }}>
                <LoadingButton
                    onClick={updateAll}
                    endIcon={<CloudDownloadIcon />}
                    loading={loading}
                    loadingPosition="end"
                    variant="contained"
                >
                    Update all
                </LoadingButton>
            </Box>
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
