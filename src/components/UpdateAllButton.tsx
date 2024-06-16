import React, { useState } from 'react';

import Box from '@mui/material/Box';
import LoadingButton from '@mui/lab/LoadingButton';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

import * as characterRepository from '../repositories/characterRepository'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

const refreshTimeSeconds = 60

export default function UpdateAllButton() {
    const [loading, setLoading] = useState(false);

    const updateAll = async () => {
        setLoading(true)
        await characterRepository.updateAll()
        setLoading(false);
    }

    return (
        <React.Fragment>
            <Box sx={{ '& > button': { m: 1 } }}>
                <LoadingButton
                    onClick={updateAll}
                    startIcon={<CloudDownloadIcon />}
                    loading={loading}
                    variant="outlined"
                >
                    UPDATE
                </LoadingButton>
            </Box>
            <CountdownCircleTimer
                isPlaying
                duration={refreshTimeSeconds}
                colors="#19e6d4"
                trailColor="#de3210"
                size={50}
                strokeWidth={6}
                onComplete={() => {
                    updateAll()
                    return { shouldRepeat: true, delay: 1.5 }
                }}
            />
        </React.Fragment>
    )
}
