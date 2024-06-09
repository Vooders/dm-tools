import { Box } from '@mui/material'
import React from 'react'
import { GiStandingPotion } from "react-icons/gi"
import { HealthPotionsType } from '../dm-tools-data.types'

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
            {new Array(props.healthPotions.normal).fill(0).map((thing: any, index) => {
                return(
                    <GiStandingPotion style={{ ...style.potion, ...style.normal }} key={`normalPotion${index}`}/>
                )
            })}
            {new Array(props.healthPotions.greater).fill(0).map((thing: any, index) => {
                return(
                    <GiStandingPotion style={{ ...style.potion, ...style.greater }}  key={`greaterPotion${index}`}/>
                )
            })}
            {new Array(props.healthPotions.superior).fill(0).map((thing: any, index) => {
                return(
                    <GiStandingPotion style={{ ...style.potion, ...style.superior }}  key={`superiorPotion${index}`}/>
                )
            })}
            {new Array(props.healthPotions.supreme).fill(0).map((thing: any, index) => {
                return(
                    <GiStandingPotion style={{ ...style.potion, ...style.supreme }}  key={`supremePotion${index}`}/>
                )
            })}
        </Box>
    )
}

interface HealthPotionsProps {
    healthPotions: HealthPotionsType
}
