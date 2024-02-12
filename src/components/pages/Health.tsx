import React, { useEffect, useState } from 'react'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'

import { HealthData } from '../../handlers/getHealth'
import { CharacterProfileHp } from '../../lib/CharacterSheetProcessor'
import Slots from '../fragments/Slots'
import DeathSaves from '../fragments/DeathSaves'
import Experience from '../fragments/Experience'
import HpBar from '../fragments/HpBar'

export default function Health() {
    const [health, setHealth] = useState<HealthData[]>([])

    const cardStyling = {
        display: 'flex',
        variant: "outlined"
    }

    const avatarStyling = {
        height: 200,
        width: 160,
        variant: "rounded",
        padding: '5px'
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
        justifyContent: "space-between"
    }

    const hpBox = {
        display: 'flex',
        flexDirection: 'row'
    }

    const nameBox = {
        paddingY: '2px'
    }

    const deathSaves = {
        display: 'flex',
        justifyContent: "center"

    }

    const currencyBox = {
        display: 'flex',
        flexDirection: 'row'
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

    const maxHp = (hp: CharacterProfileHp) => {
        return (hp.override) ? hp.override : hp.constitutionBonus + hp.base + hp.bonus
    }

    const hpView = (hp: CharacterProfileHp) => {
        const trueHp = maxHp(hp) - hp.removed
        const posIntHp = trueHp > 0 ? trueHp : 0

        return `${posIntHp} / ${maxHp(hp)}`
    }

    const isUnconscious = (hp: CharacterProfileHp) => {
        return hp.removed >= maxHp(hp)
    }

    return (
        <React.Fragment>
            {health.map(character => {
                return (
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
                                </Box>
                            </Box>
                            <Box sx={deathSaves}>
                                <DeathSaves
                                    display={isUnconscious(character.hp)}
                                    failCount={character.deathSaves.failCount}
                                    successCount={character.deathSaves.successCount}
                                    isStabilized={character.deathSaves.isStabilized}
                                />
                            </Box>
                            <Experience level={character.level} experience={character.experience} />
                            <Box sx={hpBox}>
                                <Typography variant="subtitle2" mr={2}>
                                    {hpView(character.hp)} HP
                                </Typography>
                                {(character.hp.temporary > 0) ?
                                    <Typography variant="subtitle2" mr={2}>
                                        {character.hp.temporary} Temp
                                    </Typography>
                                    : <></>
                                }
                                <Typography variant="subtitle2" mr={2}>
                                    {character.ac} AC
                                </Typography>
                                {character.hitDice.map((hitDice) => {
                                    return (
                                        <Typography variant="subtitle2" mr={2}>
                                            {hitDice.max - hitDice.used}/{hitDice.max} {hitDice.dice}
                                        </Typography>
                                    )
                                })}

                            </Box>
                            <HpBar hpMax={maxHp(character.hp)} hpRemoved={character.hp.removed} />
                            <Box sx={slotStyling}>
                                {character.spellSlots.map(spellSlot => {
                                    return (
                                        <Slots
                                            title={`Level ${spellSlot.level}`}
                                            max={spellSlot.max} used={spellSlot.used}
                                            description=''
                                            highlight={!isUnconscious(character.hp)}
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
                                            highlight={!isUnconscious(character.hp)}
                                        />
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
