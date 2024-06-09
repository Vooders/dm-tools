import React from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { Creature } from '../lib/character-sheet-processor/creatures'
import HpBar from './HpBar'
import Ac from './Ac'

const style = {
    container: {
        padding: '5px'
    },
    content: {
        padding: '5px',
        paddingBottom: '5px !important'
    },
    name: {
        fontSize: '17px',
        paddingTop: '5px'
    },
    top: {
        display: 'flex',
        direction: 'row',
        justifyContent: "space-between",
        marginBottom: '10px'
    }
}

export default function Creature(props: CreatureProps) {

    return (
        <Card sx={style.container}>
            <CardContent sx={style.content}>
                <Box sx={style.top}>
                    <Typography sx={style.name}>
                        {props.creature.customName ? props.creature.customName : props.creature.name}
                    </Typography>
                    <Ac ac={props.creature.ac} />
                </Box>
                <HpBar hpMax={props.creature.hp.max} hpRemoved={props.creature.hp.removed} hpTemp={0} />
            </CardContent>
        </Card>
    )
}

interface CreatureProps {
    creature: Creature
}
