import React from "react"
import { Box, FormControl, InputLabel, TextField, Select, MenuItem } from "@mui/material"

const style = {
    textInput: {
        width: 0.3
    },
}

export default function RaceSelector(props: RaceSelectorProps) {
    const handleChange = (event: any) => {
        props.setRace(event.target.value)
    }

    return (
        <Box sx={style.textInput}>
            <FormControl fullWidth>
                <InputLabel id="race-select-label" shrink={true} >Race</InputLabel>
                <TextField value={props.race} onChange={handleChange}></TextField>
                <Select
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
            </FormControl>
        </Box>
    )
}

interface RaceSelectorProps {
    race: string
    setRace: (race: string) => void
}
