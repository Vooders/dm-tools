import React from 'react'
import { LinearProgress } from '@mui/material';

export default function HpBar(props: HpBarProps) {

    const hpBar = {
        height: '10px',
        borderRadius: 2,
        boxShadow: 5,
        "& .MuiLinearProgress-dashed": {
            backgroundColor: '#263029',
            backgroundImage: "none",
            animation: "none"
        },
        "& .MuiLinearProgress-bar2Buffer": {
            backgroundColor: '#3498c7'
        },
        marginBottom: '10px'
    }

    const calculateHpPercent = (max: number, removed: number) => {
        return 100 - (removed / max) * 100
    }

    const healthBarColour = (percent: number): 'error' | 'warning' | 'success' => {
        if (percent < 20) return 'error'
        else if (percent < 50) return 'warning'
        else return 'success'
    }

    const percentHp = calculateHpPercent((props.hpMax + props.hpTemp), props.hpRemoved)
    const tempPercentHp = calculateHpPercent((props.hpMax + props.hpTemp), props.hpRemoved + props.hpTemp)

    return (
        <LinearProgress
            variant="buffer"
            value={tempPercentHp}
            color={healthBarColour(percentHp)}
            valueBuffer={percentHp} 
            sx={hpBar}
        />
    )
}

interface HpBarProps {
    hpMax: number,
    hpRemoved: number,
    hpTemp: number
}
