import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Abilities from '../fragments/character-sheet/Abilities';
import { CharacterProfileHp, DmToolsData } from '../../lib/CharacterSheetProcessor';

import { Paper } from '@mui/material';
import Saves from '../fragments/character-sheet/Saves';

export default function CharacterSheet() {
    let { characterId } = useParams()
    const [character, setCharacter] = useState<DmToolsData>(null)

    useEffect(() => {
        const getCharacter = async () => {
            console.log('getting Character')
            const char = await window.electron.getCharacter(characterId)
            console.log(char.dmTools)
            setCharacter(char.dmTools)
        }

        if (!character || characterId !== character.id.toString()) {
            getCharacter()
                .catch(console.error)
        }
    })

    return (
        <React.Fragment>
            {character ?
                <React.Fragment>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Card sx={{ display: 'flex', paddingBottom: '10px' }}>
                            <CardMedia
                                component="img"
                                sx={{ width: 151 }}
                                image={character.avatarPath}
                                alt={character.profile.name}
                            />
                            <Box sx={{ display: 'flex', flexDirection: 'column', padding: '5px' }}>
                                <Typography component="div" variant="h5">
                                    {character.profile.name}
                                </Typography>
                                <Typography variant="subtitle1" color="text.primary" component="div">
                                    {`${character.profile.appearance.gender} ${character.profile.race} ${character.profile.classes}`}
                                </Typography>
                                <Typography variant="subtitle2" color="text.secondary" component="div">
                                    {`Level ${character.profile.level}`}
                                </Typography>
                            </Box>
                        </Card>
                        <Box sx={{ display: 'flex', flexDirection: 'column', padding: '5px' }}>
                            <Hp hp={character.hp}></Hp>
                        </Box>
                    </Box>
                    <Abilities abilities={character.abilities} />
                    <Saves saves={character.saves} />
                </React.Fragment>
                :
                "loading"
            }
        </React.Fragment>
    )
}

interface HpProps {
    hp: CharacterProfileHp
}

function Hp({ hp }: HpProps) {
    const max = hp.base + hp.bonus + hp.constitutionBonus
    const currentHp = hp.override ? hp.override : hp.base + hp.bonus + hp.constitutionBonus - hp.removed
    return (
        <Paper variant="outlined" elevation={0} sx={{padding: '10px', textAlign: 'center'}}>
            <Typography component="div" variant="subtitle1">
                HP
            </Typography>
            <Typography component="div" variant="h5">
                {`${currentHp} / ${max}`}
            </Typography>
            <Typography component="div" variant="overline">
                {`temp ${hp.temporary}`}
            </Typography>
        </Paper>
    )
}
