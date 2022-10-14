import React from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Divider, Typography } from '@mui/material';
import { Save } from '../../../lib/CharacterSheetProcessor';

export default function Saves({ saves }: SavesProps) {
    return (
        <Grid container sm={6}>

            <Box sx={{ flexGrow: 1, 'paddingTop': '10px' }}>
                <Paper variant="outlined" sx={{ textAlign: 'center' }}>
                    <Typography variant='overline' >saves</Typography>
                    <Divider />
                    <Grid container spacing={2}>
                        {saves.map(save => {
                            return (
                                <Grid item xs={4} md={2} sx={{ textAlign: 'center' }}>
                                    <Typography variant='overline'>{save.shortName}</Typography>
                                    <Typography variant='h5'>{save.modifier >= 0 ? `+${save.modifier}` : save.modifier}</Typography>
                                </Grid>
                            )
                        })}
                    </Grid>
                </Paper>
            </Box>
        </Grid>
    )
}

interface SavesProps {
    saves: Save[]
}
