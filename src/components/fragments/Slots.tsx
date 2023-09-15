import React from 'react'

import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Rating from '@mui/material/Rating'
import Typography from '@mui/material/Typography'
import Popover from '@mui/material/Popover'

import Brightness1Icon from '@mui/icons-material/Brightness1'
import BlockIcon from '@mui/icons-material/Block'

export default function Slots(props: SlotsProps) {
    const StyledRating = styled(Rating)({
        '& .MuiRating-iconFilled': {
            color: 'rgb(220,220,220)',
        },
        '& .MuiRating-iconHover': {
            color: '#ff3d47',
        },
        '& .MuiRating-iconEmpty': {
            color: '#ff6d75'
        }
    });

    const style = () => {
        if (props.max - props.used != 0 && props.highlight) {
            return {
                color: 'rgb(220,220,220)',
                boxShadow: 5,
                border: 1,
                background: 'linear-Gradient(rgb(8,48,77), rgb(20,60,89))'
            }
        }
        return {
            color: 'rgb(190, 190, 190)',
            boxShadow: 1
        }
    }

    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

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
            sx={style}
        >
            <Typography component="legend" fontSize={17}> {props.title}</Typography>
            {props.max < 10 ?
                <StyledRating
                    onClick={handleClick}
                    name="customized-color"
                    defaultValue={props.max - props.used}
                    max={props.max}
                    readOnly
                    precision={0.5}
                    icon={<Brightness1Icon fontSize="inherit" />}
                    emptyIcon={<BlockIcon fontSize="inherit" />}
                />
                :
                <Typography variant='h6'>{`${props.max - props.used} / ${props.max}`}</Typography>
            }
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Typography sx={{ p: 2 }}>{props.description}</Typography>
            </Popover>
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
