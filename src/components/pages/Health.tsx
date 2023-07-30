import React, { useEffect, useState } from 'react'

import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import LinearProgress from '@mui/material/LinearProgress'
import Rating from '@mui/material/Rating'

import { HealthData } from '../../handlers/getHealth'
import Title from '../Title'
import { CharacterProfileHp } from '../../lib/CharacterSheetProcessor'
import Slots from '../fragments/Slots'
import Currencies from '../fragments/Currencies'
import { Grid } from '@mui/material'

export default function Health() {
    const [health, setHealth] = useState<HealthData[]>([])

    const StyledRating = styled(Rating)({
        '& .MuiRating-iconFilled': {
            color: '#ddd',
        },
        '& .MuiRating-iconHover': {
            color: '#ff3d47',
        },
        '& .MuiRating-iconEmpty': {
            color: '#ff6d75'
        }
    });

    const getSenses = async () => {
        console.log('getting Health')
        setHealth(await window.electron.getHealth())
    }

    useEffect(() => {
        getSenses()
            .catch(console.error)

        window.electron.characterUpdated(async () => {
            await getSenses()
        })
    }, [])

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
                            <Currencies currencies={character.currencies}/>
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
                            <Box sx={{ display: 'flex', paddingBottom: '10px' }}>
                                {character.spellSlots.map(spellSlot => {
                                    return (
                                        <Slots title={`Level ${spellSlot.level}`} max={spellSlot.max} used={spellSlot.used} description=''/>
                                    )
                                })}
                            </Box>

                            <Box sx={{ display: 'flex', paddingBottom: '10px' }}>
                                {character.limitedUseActions.map(limitedUseAction => {
                                    return (
                                        <Slots 
                                            title={`${limitedUseAction.name}`} 
                                            max={limitedUseAction.limitedUse.maxUses} 
                                            used={limitedUseAction.limitedUse.numberUsed} 
                                            description={limitedUseAction.snippet} />
                                    )
                                })}
                            </Box>
                        </Box>
                    </Card>
                )
            })}

        </React.Fragment>
    )
}
