import React from 'react'
import { Box, Typography } from '@mui/material'
import { CharacterProfileHp } from '../../lib/CharacterSheetProcessor'
import { HitDice } from '../../lib/character-sheet-processor/hitDice'
import HpBar from './HpBar'

const style = {
    display: 'flex',
    flexDirection: 'row'
}

export default function Hp(props: HpProps) {
    const maxHp = (hp: CharacterProfileHp) => {
        return (hp.override) ? hp.override : hp.constitutionBonus + hp.base + hp.bonus
    }

    const hpView = (hp: CharacterProfileHp) => {
        const trueHp = maxHp(hp) - hp.removed
        const posIntHp = trueHp > 0 ? trueHp : 0
        return `${posIntHp} / ${maxHp(hp)}`
    }

    return (
        <React.Fragment>
            <Box sx={style}>
                <Typography variant="subtitle2" mr={2}>
                    {hpView(props.hp)} HP
                </Typography>
                {(props.hp.temporary > 0) ?
                    <Typography variant="subtitle2" mr={2}>
                        {props.hp.temporary} Temp
                    </Typography>
                    : <></>
                }
                {props.hitDice.map((hitDice) => {
                    return (
                        <Typography variant="subtitle2" mr={2}>
                            {hitDice.max - hitDice.used}/{hitDice.max} {hitDice.dice}
                        </Typography>
                    )
                })}
            </Box>
            <HpBar hpMax={maxHp(props.hp)} hpRemoved={props.hp.removed} />
        </React.Fragment>
    )
}

interface HpProps {
    hp: CharacterProfileHp
    hitDice: HitDice[]
}
