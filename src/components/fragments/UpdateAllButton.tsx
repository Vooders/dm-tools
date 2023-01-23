import React, { useState } from 'react';

import Box from '@mui/material/Box';
import LoadingButton from '@mui/lab/LoadingButton';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

export default function UpdateAllButton() {
    const [loading, setLoading] = useState(false);

    const updateAll = async () => {
        setLoading(true)
        await window.electron.importAllCharacters()
        setLoading(false);
    }

    return (
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
    )
}
