import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material"
import { nameByRace } from "fantasy-name-generator"
import React from "react"
import Npcs from "./Npcs"

export default function NameGenerator() {
  const [race, setRace] = React.useState('')
  const [name, setName] = React.useState('')
  const [gender, setGender] = React.useState('male')

  const handleRaceChange = (event: SelectChangeEvent) => {
    setRace(event.target.value);
  }
  const handleGenderChange = (event: SelectChangeEvent) => {
    setGender(event.target.value);
  }

  const generateName = () => {
    setName(nameByRace(`${race}`, { gender: `${gender}` as 'male' || 'female', allowMultipleNames: true }).toString())
  }

  const saveNpc = async (): Promise<void> => {
    const npc = {
      name,
      race,
      gender
    }
    await window.electron.saveNpc(npc)
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
        <Box sx={{ width: 220 }}>
          <FormControl fullWidth>
            <InputLabel id="gender-select-label">Gender</InputLabel>
            <Select
              labelId="gender-select-label"
              id="gender-select"
              value={gender}
              label="Gender"
              onChange={handleGenderChange}
            >
              <MenuItem value={'male'}>Male</MenuItem>
              <MenuItem value={'female'}>Female</MenuItem>
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
      <Box sx={{ display: 'flex', justifyContent: 'center' }} >
        <Button variant="outlined" sx={{ width: 220 }} onClick={saveNpc} >Save</Button>
      </Box>
      <Npcs/>
    </>
  )

}