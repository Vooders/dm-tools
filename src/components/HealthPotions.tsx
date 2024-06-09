import { Box } from '@mui/material'
import React from 'react'
import { HealthPotionsType } from '../lib/character-sheet-processor/healthPotions'
import { GiStandingPotion } from "react-icons/gi"

export default function HealthPotions(props: HealthPotionsProps) {

    const style = {
        container: {
            paddingTop: '5px',
            marginLeft: '10px'
        },
        potion: {
            height: '1.5em',
            width: '1.5em'
        },
        normal: {
            color: '#1eff00'
        },
        greater: {
            color: '#0070dd'
        },
        superior: {
            color: '#a335ee'
        },
        supreme: {
            color: '#ff8000'
        }
    }

    return (
        <Box sx={style.container}>
            {new Array(props.healthPotions.normal).fill(0).map((thing: any) => {
                return(
                    <GiStandingPotion style={{ ...style.potion, ...style.normal }} />
                )
            })}
            {new Array(props.healthPotions.greater).fill(0).map((thing: any) => {
                return(
                    <GiStandingPotion style={{ ...style.potion, ...style.greater }} />
                )
            })}
            {new Array(props.healthPotions.superior).fill(0).map((thing: any) => {
                return(
                    <GiStandingPotion style={{ ...style.potion, ...style.superior }} />
                )
            })}
            {new Array(props.healthPotions.supreme).fill(0).map((thing: any) => {
                return(
                    <GiStandingPotion style={{ ...style.potion, ...style.supreme }} />
                )
            })}
        </Box>
    )
}

interface HealthPotionsProps {
    healthPotions: HealthPotionsType
}
