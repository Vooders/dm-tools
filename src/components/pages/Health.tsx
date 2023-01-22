import React, { useEffect, useState } from 'react'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress'

import { HealthData } from '../../handlers/getHealth'
import Title from '../Title'
import { CharacterProfileHp } from '../../lib/CharacterSheetProcessor'

export default function Health() {
    const [gotHealth, setGotHealth] = useState(false)
    const [health, setHealth] = useState<HealthData[]>([])

    useEffect(() => {
        const getSenses = async () => {
            console.log('getting Health')
            const inv = await window.electron.getHealth()
            setHealth(inv)
        }

        if (!gotHealth) {
            getSenses()
                .catch(console.error)
            setGotHealth(true)
        }
    })

    const healthBarColour = (percent: number) => {
        if (percent < 20) return 'error'
        else if (percent < 50) return 'warning'
        else return 'success'
    }

    function LinearProgressWithLabel(props: any & { value: number }) {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: '100%', mr: 1 }}>
                    <LinearProgress variant="determinate" color={healthBarColour(props.value)} {...props} />
                </Box>
                <Box sx={{ minWidth: 35 }}>
                    <Typography variant="body2" color="text.secondary">{`${Math.round(
                        props.value,
                    )}%`}</Typography>
                </Box>
            </Box>
        );
    }

    const maxHp = (hp: CharacterProfileHp) => {
        return (hp.override) ? hp.override : hp.constitutionBonus + hp.base
    }

    const calculateHpPercent = (hp: CharacterProfileHp) => {
        return 100 - ((hp.removed / maxHp(hp))) * 100
    }

    const hpView = (hp: CharacterProfileHp) => {
        return `${maxHp(hp) - hp.removed} / ${maxHp(hp)}`
    }

    return (
        <React.Fragment>
            <Title>Health</Title>

            {health.map(character => {
                return (
                    <Card sx={{ display: 'flex', paddingBottom: '10px' }}>
                        <CardMedia
                            component="img"
                            sx={{ width: 151 }}
                            image={character.avatarPath}
                            alt={character.name}
                        />
                        <Box sx={{ display: 'flex', width: '100%', flexDirection: 'column', padding: '5px' }}>
                            <Typography component="div" variant="h5">
                                {character.name}
                            </Typography>
                            <Typography component="div" variant="subtitle1">
                                HP - {hpView(character.hp)}
                            </Typography>
                            <Typography component="div" variant="subtitle1">
                                {(character.hp.temporary > 0) ?
                                    <>
                                        Temporary - {character.hp.temporary}
                                    </>
                                    : <></>
                                }
                            </Typography>
                            <LinearProgressWithLabel value={calculateHpPercent(character.hp)} />
                        </Box>
                    </Card>
                )
            })}

        </React.Fragment>
    )
}
