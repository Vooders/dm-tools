import React, { useEffect, useState } from 'react'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import LinearProgress from '@mui/material/LinearProgress'

import { HealthData } from '../../handlers/getHealth'
import { CharacterProfileHp } from '../../lib/CharacterSheetProcessor'
import Slots from '../fragments/Slots'
import Currencies from '../fragments/Currencies'
import { createTheme } from '@mui/material'
import { ThemeProvider } from '@emotion/react'

export default function Health() {
    const [health, setHealth] = useState<HealthData[]>([])

    const cardStyling = {
        display: 'flex',
        padding: '8px',
        variant: "outlined",
        boxShadow: 5,
        borderRadius: 2,
        margin: 1,
        background: 'linear-gradient(rgb(10, 35, 57), rgb(20,45,67))',
    }
    

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
                    <LinearProgress sx={{ height: '9px', borderRadius: 2, boxShadow: 4 }} variant="determinate" color={healthBarColour(props.value)} {...props} />
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
            {health.map(character => {
                return (
                    <Card sx={cardStyling}>
                        <CardMedia
                            component="img"
                            sx={{ height: 190, width: 150, variant: "rounded" }}
                            image={character.avatarPath}
                            alt={character.name}
                        />
                        <Box sx={{ display: 'flex', width: '100%', flexDirection: 'column', px: '5px' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                <Box sx={{ paddingY: '2px' }}>
                                    <Typography component="div" variant="h5" noWrap={true} fontSize={20}>
                                        {character.name}
                                    </Typography>
                                </Box>
                                <Currencies showZeroes={false} align='right' currencies={character.currencies} />
                            </Box>
                            <Box display='flex'>
                                <Typography component="div" variant="subtitle1" mr={2}>
                                    {hpView(character.hp)} HP
                                </Typography>
                                <Typography component="div" variant="subtitle1">
                                    {(character.hp.temporary > 0) ?
                                        <>
                                            {character.hp.temporary} Temp
                                        </>
                                        : <></>
                                    }
                                </Typography>
                            </Box>
                            <LinearProgressWithLabel value={calculateHpPercent(character.hp)} />
                            <Box sx={{ display: 'flex', paddingY: '3px' }}>
                                {character.spellSlots.map(spellSlot => {
                                    return (
                                        <Slots title={`Level ${spellSlot.level}`} max={spellSlot.max} used={spellSlot.used} description='' />
                                    )
                                })}
                            </Box>
                            <Box sx={{ display: 'flex', paddingY: '3px' }}>
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
