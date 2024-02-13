import React from 'react'
import {
    LinearProgress,
    Typography,
    Box
} from '@mui/material';

export default function HpBar(props: HpBarProps) {
    const hpBarBox = {
        display: 'flex',
        alignItems: 'center'
    }

    const hpBarInnerBox = {
        width: '100%',
        mr: 1
    }

    const hpBar = {
        height: '9px',
        borderRadius: 2,
        boxShadow: 5
    }

    const calculateHpPercent = (max: number, removed: number) => {
        return 100 - (removed / max) * 100
    }

    const healthBarColour = (percent: number): 'error' | 'warning' | 'success' => {
        if (percent < 20) return 'error'
        else if (percent < 50) return 'warning'
        else return 'success'
    }

    const percentHp = calculateHpPercent(props.hpMax, props.hpRemoved)

    function LinearProgressWithLabel(props: any & { value: number }) {
        return (
            (props.value > 0) ?
                <Box sx={hpBarBox}>
                    <Box sx={hpBarInnerBox}>
                        <LinearProgress variant="determinate" color={healthBarColour(percentHp)} {...props} />
                    </Box>
                    <Box sx={{ minWidth: 35 }}>
                        <Typography variant="body2">{`${Math.round(
                            percentHp,
                        )}%`}</Typography>
                    </Box>
                </Box>
                : <></>
        );
    }

    return (
        <LinearProgressWithLabel value={percentHp} sx={hpBar} />
    )
}

interface HpBarProps {
    hpMax: number,
    hpRemoved: number
}