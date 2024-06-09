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

    const getSummary = async () => {
        setCharacters(await window.electron.getSummary())
    }

    useEffect(() => {
        getSummary()
            .catch(console.error)

        window.electron.characterUpdated(async () => {
            console.log('character updated')
            await setCharacters(await window.electron.getSummary())
        })
    }, [])

    return (
        <>
            <ListSubheader component="div" inset>
                Party
            </ListSubheader>
            {open &&
                Object.keys(characters).map((characterKey) => {
                    const character = characters[characterKey]
                    const shortName = character.name.split(' ')[0]
                    return (
                        <Link to={`/characterSheet/${character.id}`}>
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
