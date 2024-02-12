import React from 'react'
import { Box, Typography } from '@mui/material'
import Currencies from './Currencies'
import { CurrenciesType } from '../../lib/CharacterSheetProcessor'

const style = {
    display: 'flex',
    direction: 'row',
    justifyContent: "space-between"
}

export default function CharacterDetails(props: CharacterDetailsProps) {
    return (
        <Box sx={style}>
            <Box>
                <Box sx={{paddingY: '2px'}}>
                    <Typography variant="h1" >
                        {props.name}
                    </Typography>
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
}
