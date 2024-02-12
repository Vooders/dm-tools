import React, { useEffect, useState } from 'react'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'

import { HealthData } from '../../handlers/getHealth'
import { CharacterProfileHp } from '../../lib/CharacterSheetProcessor'
import DeathSaves from '../fragments/DeathSaves'
import Experience from '../fragments/Experience'
import Actions from '../fragments/Actions'
import Hp from '../fragments/Hp'
import CharacterDetails from '../fragments/CharacterDetails'
import Avatar from '../fragments/Avatar'

const style = {
    outer: {
        display: 'flex',
        variant: "outlined"
    },
    inner: {
        width: '100%',
        flexDirection: 'column',
        paddingLeft: '5px',
        paddingRight: '5px'
    }
}

export default function Health() {
    const [health, setHealth] = useState<HealthData[]>([])

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
                    <Card sx={style.outer}>
                        <Avatar name={character.name} avatarPath={character.avatarPath}/>
                        <Box sx={style.inner}>
                            <CharacterDetails name={character.name} currencies={character.currencies}/>
                            <DeathSaves
                                display={isUnconscious(character.hp)}
                                failCount={character.deathSaves.failCount}
                                successCount={character.deathSaves.successCount}
                                isStabilized={character.deathSaves.isStabilized}
                            />
                            <Experience level={character.level} experience={character.experience} />
                            <Hp hp={character.hp} hitDice={character.hitDice} />
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
