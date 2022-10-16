import React from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Divider, Typography } from '@mui/material';
import { Ability } from '../../../lib/CharacterSheetProcessor';

export default function Abilities({ abilities }: AbilitiesProps) {
    return (
        <Grid item sm={12}>
            <Box sx={{ flexGrow: 1, 'paddingTop': '10px' }}>
                <Grid container sm={12}>
                    {abilities.map(ability => {
                        return (
                            <Grid item xs={4} md={2} sx={{ textAlign: 'center' }}>
                                <Paper variant="outlined" >
                                    <Typography variant='overline'>{ability.name}</Typography>
                                    <Divider />
                                    <Typography variant='h4'>{ability.modifier >= 0 ? `+${ability.modifier}` : ability.modifier}</Typography>
                                </Paper>
                                <Grid container justifyContent="center">
                                    <Grid item xs={12} md={6}>
                                        <Paper variant="outlined" elevation={0}>
                                            <Typography variant='subtitle1'>{ability.value}</Typography>
                                        </Paper>
                                    </Grid>

                                </Grid>
                            </Grid>
                        )
                    })}
                </Grid>
            </Box>
        </Grid>
    )
}

interface AbilitiesProps {
    abilities: Ability[]
}
