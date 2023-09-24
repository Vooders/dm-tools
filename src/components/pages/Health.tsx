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

    const avatarStyling = {
        height: 200,
        width: 160,
        variant: "rounded",
        p: '5px'
    }

    const slotStyling = {
        display: 'flex',
        paddingY: '3px'
    }

    const mainBox = {
        width: '100%',
        flexDirection: 'column',
        paddingLeft: '5px',
        paddingRight: '5px'
    }

    const topStatsBox = {
        display: 'flex',
        direction: 'row',
        alignItems: 'center',
        justifyContent: "space-between"
    }

    const hpBox = {
        display: 'flex',
        flexDirection: 'row'
    }

    const nameBox = {
        paddingY: '2px'
    }

    const hpBarBox = {
        display: 'flex',
        alignItems: 'center'
    }

    const hpBarInnerBox = {
        width: '100%',
        mr: 1
    }

    const hpBar = {
        height: '9px',
        borderRadius: 2,
        boxShadow: 5
    }

    const xpBar = {
        height: '5px',
        borderRadius: 2,
        boxShadow: 5
    }

    const healthTheme: ThemeOptions = createTheme({
        spacing: 5,
        palette: {
            mode: 'dark',
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

    const xpLevels = [
        300,
        900,
        2700,
        6500,
        14000,
        23000,
        34000,
        48000,
        64000,
        85000,
        100000,
        120000,
        140000,
        165000,
        195000,
        225000,
        265000,
        305000,
        355000
    ]

    const getLevelXpTotal = (level: number): number => {
        return xpLevels[level - 1]
    }

    const calculateXpPercent = (currentXp: number, level: number) => {
        const xpToNextLevel = getLevelXpTotal(level)
        const xpToPrevLevel = getLevelXpTotal(level - 1)
        return ((currentXp - xpToPrevLevel) / (xpToNextLevel - xpToPrevLevel)) * 100
    }

    function LinearProgressWithLabel(props: any & { value: number }, color: string) {
        return (
            (props.value > 0) ?
                <Box sx={hpBarBox}>
                    <Box sx={hpBarInnerBox}>
                        <LinearProgress variant="determinate" color={color} {...props} />
                    </Box>
                    <Box sx={{ minWidth: 35 }}>
                        <Typography variant="body2">{`${Math.round(
                            props.value,
                        )}%`}</Typography>
                    </Box>
                </Box>
                : <></>
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
                const hpPercent = calculateHpPercent(character.hp)
                const xpPercent = calculateXpPercent(character.experience, character.level)
                return (
                    <ThemeProvider theme={healthTheme}>
                        <Card sx={cardStyling}>
                            <CardMedia
                                component="img"
                                sx={avatarStyling}
                                image={character.avatarPath}
                                alt={character.name}
                            />
                            <Box sx={mainBox}>
                                <Box sx={topStatsBox}>
                                    <Box>
                                        <Box sx={nameBox}>
                                            <Typography variant="h1" >
                                                {character.name}
                                            </Typography>
                                        </Box>
                                        <Box sx={hpBox}>
                                            <Typography variant="subtitle2" mr={2} >
                                                {hpView(character.hp)} HP
                                            </Typography>
                                            <Typography variant="subtitle2" mr={2}>
                                                {(character.hp.temporary > 0) ?
                                                    <>
                                                        {character.hp.temporary} Temp
                                                    </>
                                                    : <></>
                                                }
                                            </Typography>
                                            <Typography variant="subtitle2" >
                                                {(xpPercent > 0) ?
                                                    <>
                                                        {character.experience}/
                                                        {getLevelXpTotal(character.level)} XP
                                                    </>
                                                    : <></>
                                                }
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <DeathSaves
                                        display={hpPercent === 0}
                                        failCount={character.deathSaves.failCount}
                                        successCount={character.deathSaves.successCount}
                                        isStabilized={character.deathSaves.isStabilized}
                                    />
                                    <Box >
                                        <Currencies
                                            showZeroes={false}
                                            currencies={character.currencies}
                                            align='right'
                                        />
                                    </Box>
                                </Box>
                                <LinearProgressWithLabel value={xpPercent} sx={xpBar} color='inherit' />
                                <LinearProgressWithLabel value={hpPercent} sx={hpBar} color={healthBarColour(hpPercent)} />
                                <Box sx={slotStyling}>
                                    {character.spellSlots.map(spellSlot => {
                                        return (
                                            <Slots
                                                title={`Level ${spellSlot.level}`}
                                                max={spellSlot.max} used={spellSlot.used}
                                                description=''
                                                highlight={hpPercent > 0}
                                            />
                                        )
                                    })}
                                </Box>
                                <Box sx={slotStyling}>
                                    {character.limitedUseActions.map(limitedUseAction => {
                                        return (
                                            <Slots
                                                title={`${limitedUseAction.name}`}
                                                max={limitedUseAction.limitedUse.maxUses}
                                                used={limitedUseAction.limitedUse.numberUsed}
                                                description={limitedUseAction.snippet}
                                                highlight={hpPercent > 0}
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
