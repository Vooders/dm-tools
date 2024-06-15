import React, { useEffect, useState, useRef } from 'react';

import Box from '@mui/material/Box';
import LoadingButton from '@mui/lab/LoadingButton';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { Typography } from '@mui/material';

const refreshTime = 60

export default function UpdateAllButton() {
    const [loading, setLoading] = useState(false);
    const [count, setCounter] = useState(refreshTime)

    async function useInterval(callback: Function, delay: number) {
        if (count < 1) {
            setCounter(refreshTime)
            await window.electron.invoke('character:updateAll')
        }
        const savedCallback: any = useRef();

        // Remember the latest callback.
        useEffect(() => {
            savedCallback.current = callback;
        }, [callback]);

        // Set up the interval.
        useEffect(() => {
            let id = setInterval(() => {
                savedCallback.current();
            }, delay);
            return () => clearInterval(id);
        }, [delay]);
    }

    // useInterval(() => {
    //     setCounter(count - 1);
    // }, 1000);

    const updateAll = async () => {
        setLoading(true)
        await window.electron.invoke('character:updateAll')
        setCounter(refreshTime)
        setLoading(false);
    }

    return (
        <>
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
            <Typography>{count}</Typography>
        </>
    )
}
