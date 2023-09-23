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

    const boxStyle = () => {
        if (props.max - props.used != 0 && props.highlight) {
            return {
                color: 'rgb(220,220,220)',
                boxShadow: 5,
                background: 'linear-Gradient(rgb(10,50,90), rgb(30,70,110))',
            }
        }
        return {
            color: 'rgb(190, 190, 190)',
            boxShadow: 1        
        }
    }

    const iconColor = (props.highlight) ? { color: 'white'} : {color: 'gray'}

    return (
        <Box mr={3}
            px={1}
            py={0.5}
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
            border={1}
            borderRadius={2}
            borderColor='rgb(10, 35, 57)'
            sx={boxStyle}
        >
            <Typography component="legend" fontSize={17}> {props.title}</Typography>
            {props.max < 10 ?
                <StyledRating
                    name="customized-color"
                    defaultValue={props.max - props.used}
                    max={props.max}
                    readOnly
                    precision={0.5}
                    icon={<Brightness1Icon fontSize="inherit" sx={iconColor} />}
                    emptyIcon={<BlockIcon fontSize="inherit" />}
                />
                :
                <Typography variant='h6'>{`${props.max - props.used} / ${props.max}`}</Typography>
            }             
        </Box>
    )
}

interface SlotsProps {
    title: string,
    max: number,
    used: number,
    description: string,
    highlight: boolean
}
