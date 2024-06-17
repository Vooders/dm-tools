import React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListSubheader from '@mui/material/ListSubheader';

import { Link } from 'react-router-dom';
import { Summary } from '../lib/saveCharacter';

import useUpdateWithCharacters from '../hooks/useUpdateWithCharacters'

export default function CharactersMenu() {
    const characters = useUpdateWithCharacters<Summary>('summary', '[page][CharactersMenu]', {})

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
    )
}
