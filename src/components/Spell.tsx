import React from "react";

import { SpellType } from '../lib/CharacterSheetProcessor';

import { Avatar, Divider, Grid, ListItem, ListItemAvatar, ListItemText, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from "@mui/material";

const buildDuration = (spell: SpellType) => {
    const duration = []
    if (spell.duration.durationInterval > 0) {
        duration.push(`${spell.duration.durationInterval}`)
    }

    if (spell.duration.durationUnit) {
        duration.push(spell.duration.durationUnit)
    }

    if (duration.length === 0) {
        duration.push(spell.duration.durationType)
    }
    return duration.join(' ')
}

const buildRange = (spell: SpellType) => {
    const range = []
    if (spell.range.origin == 'Ranged') {
        range.push(`${spell.range.rangeValue} ft`)
    } else {
        range.push(spell.range.origin)
    }
    return range.join(' ')
}

export default function Spell({ spell }: SpellProps) {
    return (
        <>
            <ListItem key={`spell-${spell.name}`}>
                <ListItemAvatar>
                    <Tooltip title={spell.school}>
                        <Avatar src={`https://www.dndbeyond.com/Content/Skins/Waterdeep/images/spell-schools/35/${spell.school.toLocaleLowerCase()}.png`} />
                    </Tooltip>
                </ListItemAvatar>
                <ListItemText>
                <Grid container>
                    <Grid xs={4} sx={{paddingTop: '10px'}}>
                        <Typography variant="h6">{spell.name}</Typography>
                    </Grid>
                    <Grid xs={8}>
                    <TableContainer component={Paper}>
                        <Table size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">Range</TableCell>
                                    <TableCell align="left">Duration</TableCell>
                                    <TableCell align="left">Hit/DC</TableCell>
                                    <TableCell align="left">Damage</TableCell>
                                    <TableCell align="left">Damage Type</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow
                                    key='bb'
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                    <TableCell align="left">{buildRange(spell)}</TableCell>
                                    <TableCell align="left">{buildDuration(spell)}</TableCell>
                                    <TableCell align="left">?</TableCell>
                                    <TableCell align="left">?</TableCell>
                                    <TableCell align="left">?</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                </Grid>
                </ListItemText>
            </ListItem>
            <Typography sx={{ paddingLeft: '72px', paddingRight: '20px', width: '100%' }} dangerouslySetInnerHTML={{ __html: spell.description }} />
            <Divider variant="inset" component="li" />
        </>
    )
}

interface SpellProps {
    spell: SpellType
}
