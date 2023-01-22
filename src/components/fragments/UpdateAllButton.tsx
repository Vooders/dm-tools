import React, { useState } from 'react';

import Box from '@mui/material/Box';
import LoadingButton from '@mui/lab/LoadingButton';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

import { Summary } from '../../lib/saveCharacter';

export default function UpdateAllButton({ characters }: Props) {
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
                endIcon={<CloudDownloadIcon />}
                loading={loading}
                loadingPosition="end"
                variant="contained"
            >
                Update all
            </LoadingButton>
        </Box>
    )
}

interface Props {
    characters: Summary
}
