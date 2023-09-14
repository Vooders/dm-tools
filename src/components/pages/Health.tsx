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
import { ThemeOptions } from '@mui/material/styles'
import DeathSaves from '../fragments/DeathSaves'


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

    const boxStyling = {
        width: '100%',
        flexDirection: 'column',
        paddingLeft: '5px',
        paddingRight: '5px'
    }

    const healthTheme: ThemeOptions = createTheme({
        palette: {
            text: {
                primary: 'white'
            }
        },
        typography: {
            h1: {
                fontSize: '1.4rem',
            },
            subtitle1: {
                fontSize: '1rem',
            },
            body2: {
                fontSize: '0.9rem',
            },
            subtitle2: {
                fontSize: '0.98rem',
                lineHeight: '1.4'
            },
        }
    })


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
                    <LinearProgress sx={{ height: '9px', borderRadius: 2, boxShadow: 5 }} variant="determinate" color={healthBarColour(props.value)} {...props} />
                </Box>
                <Box sx={{ minWidth: 35 }}>
                    <Typography variant="body2">{`${Math.round(
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
                    <ThemeProvider theme={healthTheme}>
                        <Card sx={cardStyling}>
                            <CardMedia
                                component="img"
                                sx={{ height: 200, width: 160, variant: "rounded", p: '5px' }}
                                image={character.avatarPath}
                                alt={character.name}
                            />
                            <Box sx={boxStyling}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Box>
                                        <Box sx={{ paddingY: '2px' }}>
                                            <Typography component="div" variant="h1" noWrap={true} >
                                                {character.name}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                            <Typography component="div" variant="subtitle2" mr={2} noWrap={true} overflow='visible'>
                                                {hpView(character.hp)} HP
                                            </Typography>
                                            <Typography component="div" variant="subtitle2" noWrap={true} overflow='visible'>
                                                {(character.hp.temporary > 0) ?
                                                    <>
                                                        {character.hp.temporary} Temp
                                                    </>
                                                    : <></>
                                                }
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box ml={30} >
                                        <DeathSaves
                                            display={calculateHpPercent(character.hp) === 0}
                                            failCount={character.deathSaves.failCount}
                                            successCount={character.deathSaves.successCount}
                                            isStabilized={true}
                                        />
                                    </Box>
                                    <Currencies showZeroes={false} align='right' currencies={character.currencies} />
                                </Box>
                                <LinearProgressWithLabel value={calculateHpPercent(character.hp)} />
                                <Box sx={{ display: 'flex', paddingY: '3px' }}>
                                    {character.spellSlots.map(spellSlot => {
                                        return (
                                            <Slots
                                                title={`Level ${spellSlot.level}`}
                                                max={spellSlot.max} used={spellSlot.used}
                                                description=''
                                                display={calculateHpPercent(character.hp) > 0}
                                            />
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
                                                description={limitedUseAction.snippet}
                                                display={calculateHpPercent(character.hp) > 0}
                                            />
                                        )
                                    })}
                                </Box>
                            </Box>
                        </Card>
                    </ThemeProvider>
                )
            })}
        </React.Fragment>
    )
}
