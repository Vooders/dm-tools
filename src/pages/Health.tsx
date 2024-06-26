import React from 'react'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'

import { HealthData } from '../handlers/getHealth'
import DeathSaves from '../components/DeathSaves'
import Experience from '../components/Experience'
import Actions from '../components/Actions'
import CharacterDetails from '../components/CharacterDetails'
import Avatar from '../components/Avatar'

import Creature from '../components/Creature'
import HitDice from '../components/HitDice'
import HpBar from '../components/HpBar'
import { CharacterProfileHp } from '../dm-tools-data.types'

import useUpdateWithCharacters from '../hooks/useUpdateWithCharacters'
import { RendererLogger } from '../logger/RendererLogger'

const logger = new RendererLogger('[page][Health]', window)

const style = {
    outer: {
        display: 'flex',
        variant: "outlined"
    },
    right: {
        width: '80%',
        flexDirection: 'column',
        paddingLeft: '5px',
        paddingRight: '5px',
    },
    left: {
        display: 'flex',
        flexDirection: 'column',
        width: '20%'
    }
}

export default function Health() {
    const health = useUpdateWithCharacters<HealthData[]>('health', logger, [])

    const maxHp = (hp: CharacterProfileHp) => {
        return (hp.override) ? hp.override : hp.constitutionBonus + hp.base + hp.bonus
    }

    const isUnconscious = (hp: CharacterProfileHp) => {
        return hp.removed >= maxHp(hp)
    }

    return (
        <React.Fragment>
            {health.map((character, index) => {
                return (
                    <Card sx={style.outer} key={`characterHealth${index}`}>
                        <Box sx={style.left}>
                            <Avatar name={character.name} avatarPath={character.avatarPath} />
                            {character.creatures.map((creature, index) => {
                                return (
                                    <Creature creature={creature} key={`${creature.name}-${index}`}/>
                                )
                            })}
                        </Box>
                        <Box sx={style.right}>
                            <CharacterDetails
                                name={character.name}
                                currencies={character.currencies}
                                ac={character.ac}
                                healthPotions={character.healthPotions}
                                inspiration={character.inspiration}
                                hp={character.hp}
                            />
                            <DeathSaves
                                display={isUnconscious(character.hp)}
                                failCount={character.deathSaves.failCount}
                                successCount={character.deathSaves.successCount}
                                isStabilized={character.deathSaves.isStabilized}
                            />
                            <Experience
                                level={character.level}
                                experience={character.experience}
                                isMilestone={character.milestoneProgression}
                            />
                            <HpBar
                                hpMax={maxHp(character.hp)}
                                hpRemoved={character.hp.removed}
                                hpTemp={character.hp.temporary}
                            />
                            <HitDice hitDice={character.hitDice} />
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
