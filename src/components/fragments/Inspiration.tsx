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

function inspiration() {
    return (
        <Box sx={style.container}>
            <GiInspiration style={style.icon} />
        </Box>
    )
}

export default function Inspiration(props: InspirationProps) {
    return (
        <>
            { props.inspiration ? inspiration() : null}
        </>
    )
}

interface InspirationProps {
    inspiration: boolean
}
