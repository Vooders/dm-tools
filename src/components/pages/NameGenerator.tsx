import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material"
import { nameByRace } from "fantasy-name-generator"
import React from "react"

export default function NameGenerator() {
  const [race, setRace] = React.useState('')
  const [name, setName] = React.useState('')

  const handleRaceChange = (event: SelectChangeEvent) => {
    setRace(event.target.value as string);
  }

  const generateName = () => {
    setName(nameByRace(`${race}`, { gender: 'male', allowMultipleNames: true }).toString())
  }

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ width: 220 }}>
          <FormControl fullWidth>
            <InputLabel id="race-select-label">Race</InputLabel>
            <Select
              labelId="race-select-label"
              id="race-select"
              value={race}
              label="Race"
              onChange={handleRaceChange}
            >
              <MenuItem value={'angel'}>Angel</MenuItem>
              <MenuItem value={'cavePerson'}>Cave Person</MenuItem>
              <MenuItem value={'darkelf'}>Dark Elf</MenuItem>
              <MenuItem value={'demon'}>Demon</MenuItem>
              <MenuItem value={'dragon'}>Dragon</MenuItem>
              <MenuItem value={'drow'}>Drow</MenuItem>
              <MenuItem value={'dwarf'}>Dwarf</MenuItem>
              <MenuItem value={'elf'}>Elf</MenuItem>
              <MenuItem value={'fairy'}>Fairy</MenuItem>
              <MenuItem value={'gnome'}>Gnome</MenuItem>
              <MenuItem value={'goblin'}>Goblin</MenuItem>
              <MenuItem value={'halfdemon'}>Half Demon</MenuItem>
              <MenuItem value={'halfling'}>Halfling</MenuItem>
              <MenuItem value={'highelf'}>High Elf</MenuItem>
              <MenuItem value={'highfairy'}>High Fairy</MenuItem>
              <MenuItem value={'human'}>Human</MenuItem>
              <MenuItem value={'ogre'}>Ogre</MenuItem>
              <MenuItem value={'orc'}>Orc</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Button variant="outlined" sx={{ width: 220, marginX: 5 }} onClick={generateName}>Generate</Button>
      </Box>
      <Typography variant='h5' sx={{ display: 'flex', justifyContent: 'center', margin: 5 }}>
        {name}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center' }} >
        <Button variant="outlined" sx={{ width: 220 }} onClick={() => { navigator.clipboard.writeText(`${name}`) }}>copy</Button>
      </Box>
    </>
  )

}