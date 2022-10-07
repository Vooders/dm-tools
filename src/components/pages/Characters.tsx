import React, { useState, useEffect  } from 'react';
import CharacterImporter from '../fragments/CharacterImporter';
import Title from '../Title';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';

import { Summary, CharacterSummary } from '../../handlers/saveCharacter';

export default function Characters() {
    const [characters, setCharacters] = useState<Summary>({})
    const [gotSummary, setGotSummary] = useState(false)

    window.electron.summaryUpdate((event: any, value: any) => {
        setCharacters(value)
    })

    useEffect(() => {
        const getSummary = async () => {
            const bob = await window.electron.getSummary()
            setCharacters(bob)
        }

        if (!gotSummary) {
            getSummary()
                .catch(console.error)
            setGotSummary(true)
        }
    })

    return (
        <React.Fragment>
            <Title>Characters</Title>
            {Object.keys(characters).map((characterKey) => {
                const character = characters[characterKey]
                const name = character.name
                const details = `${character.race} ${character.classes.join(' ')}`
                return (
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <ImageIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={name} secondary={details} />
                    </ListItem>
                )
            })}
            <CharacterImporter />
        </React.Fragment>
    )
}
