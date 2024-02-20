import React from 'react'
import { Box } from '@mui/material'
import { GiInspiration } from "react-icons/gi"

const style = {
    container: {
        paddingTop: '5px',
        marginLeft: '10px'
    },
    icon: {
        color: '#FFD700',
        height: '1.5em',
        width: '1.5em'
    }
}

export default function Inspiration(props: InspirationProps) {
    return (
        <Box sx={style.container}>
            {props.inspiration ?
                <GiInspiration style={style.icon} /> : 'bob'
            }
        </Box>
    )
}

interface InspirationProps {
    inspiration: boolean
}
