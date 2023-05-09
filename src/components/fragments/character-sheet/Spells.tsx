
import React, { useState, useEffect } from 'react';

import Grid from '@mui/material/Grid';
import { Divider, FormControl, List, ListSubheader, Stack, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';

import { SpellType } from '../../../lib/CharacterSheetProcessor';
import Spell from './Spell';

export default function Spells({ theSpells }: SpellsProps) {
    const castingTimes = ['action', 'bonus', 'reaction']

    const [spells, setSpells] = useState(theSpells)
    const [hideUnprepared, setHideUnprepared] = useState(true)
    const [castingTimeFilters, setCastingTimeFilters] = React.useState(() => castingTimes);
    const [searchString, setSearchString] = useState('')

    useEffect(() => {
        setSpells(theSpells.map((level: SpellType[]) => {
            return level
                .filter((spell: SpellType) => castingTimeFilters.includes(spell.castingTime))
                .filter((spell: SpellType) => spell.prepared === true || spell.prepared === hideUnprepared)
                .filter((spell: SpellType) => spell.name.toLowerCase().includes(searchString.toLowerCase()))
        }))
        
    }, [ theSpells, castingTimeFilters, hideUnprepared, searchString ])

    const handleCastingTime = (event: React.MouseEvent<HTMLElement>, newFormats: string[]) => {
        setCastingTimeFilters(newFormats);
    };

    const handleShowPrepared = () => {
        setHideUnprepared(!hideUnprepared)
    }

    const handleSearch = (s: string) => {
        setSearchString(s)
    }

    return (
        <Grid item sm={12}>
            <FormControl sx={{ paddingBottom: '20px' }} component="fieldset" variant="standard">
                <Stack direction="row" spacing={4}>
                    <ToggleButton
                        value='prepared'
                        selected={hideUnprepared}
                        onChange={handleShowPrepared}
                        aria-label="bold"
                    >
                        prepared
                    </ToggleButton>
                    <ToggleButtonGroup
                        value={castingTimeFilters}
                        onChange={handleCastingTime}
                        aria-label="text formatting"
                    >
                        <ToggleButton value="action" aria-label="italic">
                            action
                        </ToggleButton>
                        <ToggleButton value="bonus" aria-label="underlined">
                            bonus action
                        </ToggleButton>
                        <ToggleButton value="reaction" aria-label="color">
                            reaction
                        </ToggleButton>
                    </ToggleButtonGroup>
                    <TextField id="outlined-basic" label="Search" variant="outlined" onChange={(e) => handleSearch(e.target.value)} />
                </Stack>
            </FormControl>

            <List
                sx={{
                    width: '100%',
                    maxWidth: '100%',
                    bgcolor: 'background.paper',
                    position: 'relative',
                    overflow: 'auto',
                    maxHeight: 600,
                    paddingTop: 0,
                    '& ul': { padding: 0 },
                }}
            >
                {
                    spells.map((spellLevel, index) => (
                        <>
                            <ListSubheader color="primary" key={`section-${index}`}>Level {index + 1}</ListSubheader>
                            <Divider component="li" />
                            { spellLevel.map(spell => (<Spell spell={spell} />)) }
                        </>
                    ))
                }
            </List>
        </Grid >
    )
}

interface SpellsProps {
    theSpells: SpellType[][]
}
