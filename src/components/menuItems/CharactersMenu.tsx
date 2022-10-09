import React, { useState, useEffect } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import People from '@mui/icons-material/People';
import { Link } from 'react-router-dom';
import { Summary } from '../../handlers/saveCharacter';
import GroupsIcon from '@mui/icons-material/Groups';

const data = [
    { icon: <People />, label: 'Characters' }
];

export default function CharactersMenu() {
    const [open, setOpen] = React.useState(true);
    const [characters, setCharacters] = useState<Summary>({})
    const [gotSummary, setGotSummary] = useState(false)

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

    return (
        <>
            <ListItemButton
                alignItems="flex-start"
                onClick={() => setOpen(!open)}>
                <ListItemAvatar>
                    <GroupsIcon />
                </ListItemAvatar>
                <ListItemText
                    primary="Characters"
                />
                <KeyboardArrowDown
                    sx={{
                        mr: -1,
                        opacity: 0,
                        transform: open ? 'rotate(-180deg)' : 'rotate(0)',
                        transition: '0.2s',
                    }}
                />
            </ListItemButton>
            {open &&
                Object.keys(characters).map((characterKey) => {
                    const character = characters[characterKey]
                    const shortName = character.name.split(' ')[0]
                    return (
                        <Link to={`/characterSheet/${character.id}`}>
                            <ListItemButton
                                key={character.name}
                                sx={{ color: 'rgba(255,255,255,.8)' }}
                            >
                                <ListItemAvatar>
                                    <Avatar src={character.avatarPath} />
                                </ListItemAvatar>
                                <ListItemText primary={shortName} />
                            </ListItemButton>
                        </Link>
                    )

                })}
        </>
    );
}
