import React from "react"
import { Npc } from "../../../src/lib/saveNpc"
import { nameByRace } from "fantasy-name-generator"
import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material"

export default function editNpc(npc: Npc) {
  const [race, setRace] = React.useState(npc.race)
  const [name, setName] = React.useState(npc.name)
  const [gender, setGender] = React.useState(npc.gender)
  const [notes, setNotes] = React.useState(npc.notes)
  const [strength, setStrength] = React.useState<number | null>(10)
  const [dexterity, setDexterity] = React.useState<number | null>(10)
  const [constitution, setConstitution] = React.useState<number | null>(10)
  const [intelligence, setIntelligence] = React.useState<number | null>(10)
  const [wisdom, setWisdom] = React.useState<number | null>(10)
  const [charisma, setCharisma] = React.useState<number | null>(10)
  const id = npc.id

  function getAbilities() {
    return {
      strength,
      dexterity,
      constitution,
      intelligence,
      wisdom,
      charisma
    }
  }

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
      gender,
      notes,
      abilities: getAbilities(),
      id
    }
    await window.electron.saveEditedNpc(npc)
  }
  
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ width: 0.3 }}>
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
            <Box sx={{ width: 0.3 }}>
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
            <TextField value={name} sx={{ width: 0.4 }} label="Name" variant="outlined" onChange={(e) => setName(e.target.value)} />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <TextField value={notes} sx={{ width: 1 }} onChange={(e) => {setNotes(e.target.value)}} label='notes' variant='outlined' multiline />
          </Box>
        </Box>
        <Box sx={{ width: 0.15, height: 0.7, marginX: 5 }}>
        <Button variant="outlined"  onClick={generateName}>Generate Name</Button>
        </Box>
      </Box>
      <Box>
      <TextField label='strength' type='number' onChange={(e) => { setStrength(parseInt(e.target.value)) }} value={strength} />
        <TextField label='dexterity' type='number' onChange={(e) => { setDexterity(parseInt(e.target.value)) }} value={dexterity} />
        <TextField label='constitution' type='number' onChange={(e) => { setConstitution(parseInt(e.target.value)) }} value={constitution} />
        <TextField label='intelligence' type='number' onChange={(e) => { setIntelligence(parseInt(e.target.value)) }} value={intelligence} />
        <TextField label='wisdom' type='number' onChange={(e) => { setWisdom(parseInt(e.target.value)) }} value={wisdom} />
        <TextField label='charisma' type='number' onChange={(e) => { setCharisma(parseInt(e.target.value)) }} value={charisma} />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', margin: 5 }} >
        <Button variant="outlined" sx={{ width: 220 }} onClick={saveNpc} >Save</Button>
      </Box>
    </>
  )
}