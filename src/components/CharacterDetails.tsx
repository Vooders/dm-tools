import React from 'react'
import { Box, Typography } from '@mui/material'
import Currencies from './Currencies'
import Ac from './Ac'
import HealthPotions from './HealthPotions'
import Inspiration from './Inspiration'
import Hp from './Hp'
import { HealthPotionsType, CharacterProfileHp, CurrenciesType } from '../dm-tools-data.types'

const style = {
    outerContainer: {
        display: 'flex',
        direction: 'row',
        justifyContent: "space-between",
        marginBottom: '10px'
    },
    nameBox: {
        display: 'flex',
        paddingY: '2px'
    },
    name: {
        paddingTop: '5px'
    }
}

export default function CharacterDetails(props: CharacterDetailsProps) {
    return (
        <Box sx={style.outerContainer}>
            <Box>
                <Box sx={style.nameBox}>
                    <Inspiration inspiration={props.inspiration} />
                    <Typography variant="h1" sx={style.name}>
                        {props.name}
                    </Typography>
                    <Ac ac={props.ac} />
                    <Hp hp={props.hp} />
                    <HealthPotions healthPotions={props.healthPotions} />
                </Box>
            </Box>
            <Currencies
                showZeroes={false}
                currencies={props.currencies}
                align='right'
            />
        </Box>
    )
}

interface CharacterDetailsProps {
    name: string
    currencies: CurrenciesType
    ac: number
    healthPotions: HealthPotionsType
    inspiration: boolean
    hp: CharacterProfileHp
}
