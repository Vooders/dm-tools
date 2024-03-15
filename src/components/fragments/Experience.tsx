import styled from "@emotion/styled"
import { Box, LinearProgress, Typography } from "@mui/material"
import React from "react"

export default function Experience(props: ExperienceProps) {

    const XpBarInnerBox = styled(Box)({
        width: '100%',
        marginRight: 8
    })

    const XpBar = styled(LinearProgress)({
        height: '6px',
        borderRadius: 2
    })

    const XpBarBox = styled(Box)({
        display: 'flex',
        alignItems: 'center',
        marginBottom: 8
    })

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
    const xpToNextLevel = xpToLevel[props.level]
    const xpToPrevLevel = xpToLevel[props.level - 1]
    const currentXp = props.experience

    const calculateXpPercent = () => {
        const xp = Math.round(((currentXp - xpToPrevLevel) / (xpToNextLevel - xpToPrevLevel)) * 100)
        return (xp > 0) ? xp : 0
    }
    const xpPercent = calculateXpPercent()

    return (
        (props.isMilestone) ?
            
                <XpBarBox>
                    <XpBarInnerBox>
                        <XpBar value={xpPercent} variant="determinate" />
                    </XpBarInnerBox>
                </XpBarBox>
             : <></>
    )
}

interface ExperienceProps {
    level: number
    experience: number
    isMilestone: boolean
}
