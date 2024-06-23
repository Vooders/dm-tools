
import React, { useState, useEffect } from 'react'

import Grid from '@mui/material/Grid'
import { Divider, FormControl, List, ListSubheader, Stack, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material'

import Spell from './Spell'
import { SpellsType } from '../dm-tools-data.types'

export default function Spells({ theSpells }: SpellsProps) {
    const castingTimes = ['action', 'bonus', 'reaction', 'minutes']

    const [spells, setSpells] = useState(theSpells)
    const [hideUnprepared, setHideUnprepared] = useState(true)
    const [castingTimeFilters, setCastingTimeFilters] = React.useState(() => castingTimes)
    const [searchString, setSearchString] = useState('')

    useEffect(() => {
        setSpells(theSpells.map((level: SpellsType) => {
            return {
                ...level,
                spells: level.spells
                .filter((spell) => castingTimeFilters.includes(spell.castingTime))
                .filter((spell) => spell.prepared === true || spell.prepared === hideUnprepared)
                .filter((spell) => spell.name.toLowerCase().includes(searchString.toLowerCase()))
            }
        }))
    }, [ theSpells, castingTimeFilters, hideUnprepared, searchString ])

    const handleCastingTime = (event: React.MouseEvent<HTMLElement>, newFormats: string[]) => {
        setCastingTimeFilters(newFormats)
    }

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
                        <ToggleButton value="minutes" aria-label="color">
                            minutes
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
                        <React.Fragment key={`${spellLevel.level}-${index}`}>
                            <ListSubheader color="primary" key={`section-${spellLevel.level}`}>Level {spellLevel.level}</ListSubheader>
                            <Divider component="li" />
                            { spellLevel.spells.map(spell => (<Spell spell={spell} key={spell.name.replace(' ', '-')}/>)) }
                        </React.Fragment>
                    ))
                }
            </List>
        </Grid >
    )
}

interface SpellsProps {
    theSpells: SpellsType[]
}
