import React, { useEffect, useState } from 'react'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'

import { HealthData } from '../../handlers/getHealth'
import { CharacterProfileHp } from '../../lib/CharacterSheetProcessor'
import DeathSaves from '../fragments/DeathSaves'
import Experience from '../fragments/Experience'
import HpBar from '../fragments/HpBar'
import Currencies from '../fragments/Currencies'
import Actions from '../fragments/Actions'
import Hp from '../fragments/Hp'

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
                                <Box sx={currencyBox}>
                                    <Currencies
                                        showZeroes={false}
                                        currencies={character.currencies}
                                        align='right'
                                    />
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
                            <Hp hp={character.hp} hitDice={character.hitDice}/>
                            <Actions 
                                spellSlots={character.spellSlots}
                                limitedUseActions={character.limitedUseActions}
                                isUnconscious={isUnconscious(character.hp)}
                            />
                        </Box>
                    </Card>
                )
            })}
        </React.Fragment>
    )
}
