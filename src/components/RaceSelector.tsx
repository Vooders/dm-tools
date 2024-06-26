import React from "react"
import { Box, FormControl, InputLabel, TextField, Select, MenuItem, Grid } from "@mui/material"

const style = {
    box: {
        display: 'flex',
        flexDirection: 'row',
        m: 1
    },
    select: {
        width: '40px'
    }
}

export default function RaceSelector(props: RaceSelectorProps) {
    const handleChange = (event: any) => {
        props.setRace(event.target.value)
    }

    return (
        <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
                <Box sx={style.box}>
                    <InputLabel id="race-select-label" shrink={true} >Race</InputLabel>
                    <TextField value={props.race} onChange={handleChange}></TextField>
                    <Select
                        sx={style.select}
                        labelId="race-select-label"
                        id="race-select"
                        value=''
                        onChange={handleChange}
                    >
                        <MenuItem value={'Angel'}>Angel</MenuItem>
                        <MenuItem value={'Cave Person'}>Cave Person</MenuItem>
                        <MenuItem value={'Darkelf'}>Dark Elf</MenuItem>
                        <MenuItem value={'Demon'}>Demon</MenuItem>
                        <MenuItem value={'Dragon'}>Dragon</MenuItem>
                        <MenuItem value={'Drow'}>Drow</MenuItem>
                        <MenuItem value={'Dwarf'}>Dwarf</MenuItem>
                        <MenuItem value={'Elf'}>Elf</MenuItem>
                        <MenuItem value={'Fairy'}>Fairy</MenuItem>
                        <MenuItem value={'Gnome'}>Gnome</MenuItem>
                        <MenuItem value={'Goblin'}>Goblin</MenuItem>
                        <MenuItem value={'Half Demon'}>Half Demon</MenuItem>
                        <MenuItem value={'Halfling'}>Halfling</MenuItem>
                        <MenuItem value={'Highelf'}>High Elf</MenuItem>
                        <MenuItem value={'High Fairy'}>High Fairy</MenuItem>
                        <MenuItem value={'Human'}>Human</MenuItem>
                        <MenuItem value={'Ogre'}>Ogre</MenuItem>
                        <MenuItem value={'Orc'}>Orc</MenuItem>
                    </Select>
                </Box>
            </FormControl>
        </Grid>
    )
}

interface RaceSelectorProps {
    race: string
    setRace: (race: string) => void
}
