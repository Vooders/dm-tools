import { Box, LinearProgress, Typography } from "@mui/material"
import React from "react"

export default function Experience(props: ExperienceProps) {

    const xpBarBox = {
        display: 'flex',
        alignItems: 'center'
    }

    const xpBarInnerBox = {
        width: '100%',
        mr: 1
    }

    const xpBar = {
        height: '5px',
        borderRadius: 2,
        boxShadow: 5
    }

    const xpToLevel = [
        0,
        300,
        900,
        2700,
        6500,
        14000,
        23000,
        34000,
        48000,
        64000,
        85000,
        100000,
        120000,
        140000,
        165000,
        195000,
        225000,
        265000,
        305000,
        355000
    ]

    const calculateXpPercent = () => {
        const xpToNextLevel = xpToLevel[props.level]
        const xpToPrevLevel = xpToLevel[props.level - 1]
        return Math.round(((props.experience - xpToPrevLevel) / (xpToNextLevel - xpToPrevLevel)) * 100)
    }

    const xpPercent = calculateXpPercent()

    return (
        (xpPercent > 0) ?
            <>
                <Typography variant="subtitle2" >
                    {props.experience} / {xpToLevel[props.level]} XP
                </Typography>
                <Box sx={xpBarBox}>
                    <Box sx={xpBarInnerBox}>
                        <LinearProgress value={xpPercent} variant="determinate" sx={xpBar} />
                    </Box>
                    <Box sx={{ minWidth: 35 }}>
                        <Typography variant="body2">
                            {xpPercent}%
                        </Typography>
                    </Box>
                </Box>
            </> : <></>
    )
}

interface ExperienceProps {
    level: number
    experience: number
}