import React from 'react'
import { Box, Typography } from '@mui/material'
import { CharacterProfileHp } from '../../lib/CharacterSheetProcessor'

const style = {
    display: 'flex',
    flexDirection: 'row',
    padding: '5px',
    ml: '5px',
    color: 'green',
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
                <Typography variant="h1" mr={2} sx={{ fontWeight: 700}}>
                    {hpView(props.hp)} HP
                </Typography>
                {(props.hp.temporary > 0) ?
                    <Typography variant="h1" mr={2} sx={{ fontWeight: 700}}>
                        {props.hp.temporary} Temp
                    </Typography>
                    : <></>
                }
            </Box>
        </React.Fragment>
    )
}

interface HpProps {
    hp: CharacterProfileHp
}
