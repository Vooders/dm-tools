import React from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Divider, Typography } from '@mui/material';
import { Ability } from '../../../lib/processCharacterSheet';

export default function Abilities({ abilities }: AbilitiesProps) {
    return (
        <Box sx={{ flexGrow: 1, 'paddingTop': '10px' }}>
            <Grid container spacing={2}>
                {abilities.map(ability => {
                    return (
                        <Grid item xs={4} md={2} sx={{ textAlign: 'center' }}>
                            <Paper variant="outlined" >
                                <Typography variant='overline'>{ability.name}</Typography>
                                <Divider />
                                <Typography variant='h4'>{ability.modifier >= 0 ? `+${ability.modifier}` : ability.modifier}</Typography>
                            </Paper>
                            <Grid container>
                                <Grid item xs={12} md={6}>
                                    <Paper variant="outlined" elevation={0}>
                                        <Typography variant='subtitle1'>{ability.value}</Typography>
                                    </Paper>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Paper variant="outlined" elevation={0}>
                                        <Typography variant='subtitle1'>-</Typography>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Grid>
                    )
                })}
            </Grid>
        </Box>
    )
}

interface AbilitiesProps {
    abilities: Ability[]
}
