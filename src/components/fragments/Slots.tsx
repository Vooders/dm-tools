import React from 'react'

import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Rating from '@mui/material/Rating'
import Typography from '@mui/material/Typography'

import Brightness1Icon from '@mui/icons-material/Brightness1'
import BlockIcon from '@mui/icons-material/Block'

export default function Slots(props: SlotsProps) {
    const StyledRating = styled(Rating)({
        '& .MuiRating-iconFilled': {
            color: 'rgb(220,220,220)',
        },
        '& .MuiRating-iconEmpty': {
            color: '#ff6d75'
        }
    })

    const SlotsBox = styled(Box)({
        marginRight: 20,
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 4,
        paddingBottom: 4,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
        borderRadius: 8
    })

    const boxStyle = () => {
        if (props.max - props.used != 0 && props.highlight) {
            return {
                color: 'rgb(220,220,220)',
                boxShadow: '0 3px 5px 2px rgba(135, 135, 135, .2)',
                background: 'linear-Gradient(rgb(10,50,90), rgb(30,70,110))',
            }
        }
        return {
            color: 'rgb(180, 180, 180)',
            boxShadow: '0 1px 3px 1px rgba(135, 135, 135, .1)'        
        }
    }

    const iconColor = (props.highlight) ? { color: 'white' } : { color: 'gray' }

    return (
        <SlotsBox sx={boxStyle}>
            <Typography component="legend" fontSize={17}> {props.title}</Typography>
            {props.max < 10 ?
                <StyledRating
                    defaultValue={props.max - props.used}
                    max={props.max}
                    readOnly
                    icon={<Brightness1Icon fontSize="inherit" sx={iconColor} />}
                    emptyIcon={<BlockIcon fontSize="inherit" />}
                />
                :
                <Typography variant='h6'>{`${props.max - props.used} / ${props.max}`}</Typography>
            }
        </SlotsBox>
    )
}

interface SlotsProps {
    title: string,
    max: number,
    used: number,
    description: string,
    highlight: boolean
}
