import React from 'react'
import { Box, Typography } from '@mui/material'
import Currencies from './Currencies'
import { CurrenciesType } from '../../lib/CharacterSheetProcessor'
import Ac from './Ac'

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
                    <Typography variant="h1" sx={style.name}>
                        {props.name}
                    </Typography>
                    <Ac ac={props.ac}/>
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
}
