import React from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Divider, Tooltip, Typography } from '@mui/material';
import { Save } from '../../../lib/CharacterSheetProcessor';


export default function Saves({ saves }: SavesProps) {
    return (
        <Grid item sm={6}>

            <Box sx={{ flexGrow: 1 }}>
                <Paper variant="outlined" sx={{ textAlign: 'center' }}>
                    <Typography variant='overline' >saves</Typography>
                    <Divider />
                    <Grid container spacing={2}>
                        {saves.map(save => {
                            return (
                                <Grid item xs={4} md={2} sx={{ textAlign: 'center' }}>
                                    <Tooltip title={save.name}>
                                        <Typography variant='overline'>{save.shortName}</Typography>
                                    </Tooltip>
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
