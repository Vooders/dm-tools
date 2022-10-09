import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export default function CharacterSheet() {
    let { characterId } = useParams()
    const [character, setCharacter] = useState(null)

    useEffect(() => {
        const getCharacter = async () => {
            console.log('getting Character')
            const char = await window.electron.getCharacter(characterId)
            setCharacter(char)
        }

        if (!character || characterId != character.data.id) {
            getCharacter()
                .catch(console.error)
        }
    })

    return (
        <React.Fragment>
            {character ?
                <React.Fragment>
                    <Card sx={{ display: 'flex' }}>
                        <CardMedia
                            component="img"
                            sx={{ width: 151 }}
                            image={character.avatarPath}
                            alt={character.data.name}
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography component="div" variant="h5">
                                {character.data.name}
                            </Typography>
                            <Typography variant="subtitle1" color="text.primary" component="div">
                                {character.data.race.fullName}
                            </Typography>
                            <Typography variant="subtitle2" color="text.secondary" component="div">
                                {buildClassesString(character)}
                            </Typography>
                        </Box>
                    </Card>
                </React.Fragment>
                :
                "loading"
            }
        </React.Fragment>
    )
}

function buildClassesString(characterData: any) {
    return characterData.data.classes.map((clas: any) => `${clas.definition.name} ${clas.level}`).join(' ')
}
