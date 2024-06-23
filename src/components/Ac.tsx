import React from 'react'
import ShieldIcon from '@mui/icons-material/Shield'
import { Box } from '@mui/material'

const style = {
    container: {
        marginLeft: '5px',
        position: 'relative',
        height: '30px',
        width: '30px'
    },
    text: {
        position: 'absolute',
        top: '18%',
        left: '28%',
        color: '#333',
        fontWeight: 'bold'
    }
}

export default function Ac(props: AcProps) {
    return (
        <Box sx={style.container}>
            <ShieldIcon fontSize='large'/>
            <Box sx={style.text}>{props.ac}</Box>
        </Box>
    )
}

interface AcProps {
    ac: number
}
