import React, { useState, useEffect } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListSubheader from '@mui/material/ListSubheader';

import { Link } from 'react-router-dom';
import { Summary } from '../lib/saveCharacter';

export default function CharactersMenu() {
    const [open, setOpen] = React.useState(true);
    const [characters, setCharacters] = useState<Summary>({})

    useEffect(() => {
        (async () => {
            console.log('Initial load of health data')
            setCharacters(await window.electron.getSummary())
        })()

        const removeListener = window.electron.receive('character:updated', async () => {
            console.log('Characters updated: reloading health data')
            setCharacters(await window.electron.getSummary())
        })

        return () => {
            if(removeListener) removeListener()
        }
    }, [])

    return (
        <>
            <ListSubheader component="div" inset>
                Party
            </ListSubheader>
            {open &&
                Object.keys(characters).map((characterKey, index) => {
                    const character = characters[characterKey]
                    const shortName = character.name.split(' ')[0]
                    return (
                        <Link to={`/characterSheet/${character.id}`}  key={`character${index}`}>
                            <ListItemButton
                                key={character.name}
                            // sx={{ color: 'rgba(255,255,255,.8)' }}
                            >
                                <ListItemAvatar sx={{ width: '35px', height: '35px' }}>
                                    <Avatar src={character.avatarPath} variant="rounded" />
                                </ListItemAvatar>
                                <ListItemText primary={shortName} />
                            </ListItemButton>
                        </Link>
                    )

                })}
        </>
    );
}
