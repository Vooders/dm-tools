import React from 'react'
import { CardMedia } from '@mui/material'

const style = {
    height: 200,
    width: '100%',
    variant: "rounded",
    padding: '5px'
}

export default function Avatar(props: AvatarProps) {
    return (
        <CardMedia
            component="img"
            sx={style}
            image={props.avatarPath}
            alt={props.name}
        />
    )
}

interface AvatarProps {
    name: string
    avatarPath: string
}
