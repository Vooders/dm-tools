import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material"
import { nameByRace } from "fantasy-name-generator"
import React from "react"

export default function CreateNpc() {
  const [race, setRace] = React.useState('human')
  const [name, setName] = React.useState('')
  const [gender, setGender] = React.useState('male')
  const [notes, setNotes] = React.useState('')
  const [strength, setStrength] = React.useState<number | null>(10)
  const [dexterity, setDexterity] = React.useState<number | null>(10)
  const [constitution, setConstitution] = React.useState<number | null>(10)
  const [intelligence, setIntelligence] = React.useState<number | null>(10)
  const [wisdom, setWisdom] = React.useState<number | null>(10)
  const [charisma, setCharisma] = React.useState<number | null>(10)

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
    setRace(event.target.value)
  }
  const handleGenderChange = (event: SelectChangeEvent) => {
    setGender(event.target.value)
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
      abilities: getAbilities()
    }
    await window.electron.saveNpc(npc)
  }

  const style = {
    centred: {
      display: 'flex',
      justifyContent: 'center'
    },
    textInput: {
      width: 0.3
    },
    name: {
      width: 0.4
    },
    notes: {
      width: 1
    },
    nameButton: {
      width: 0.15,
      height: 0.7,
      marginX: 5
    },
    saveButton: {
      width: 0.2
    },
    abilities: {
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'row',
      margin: 2
    }
  }

  return (
    <>
      <Box sx={style.centred}>
        <Box>
          <Box sx={style.centred}>
            <Box sx={style.textInput}>
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
            <Box sx={style.textInput}>
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
            <Box sx={style.name}>
              <TextField value={name} label="Name" variant="outlined" onChange={(e) => setName(e.target.value)} />
            </Box>
          </Box>
          <Box>
            <TextField sx={style.notes} onChange={(e) => { setNotes(e.target.value) }} label='notes' variant='outlined' multiline />
          </Box>
        </Box>
        <Box sx={style.nameButton}>
          <Button variant="outlined" onClick={generateName}>Generate Name</Button>
        </Box>
      </Box>
        <Grid container sx={style.abilities}>
          <Grid item xs={2} md={1}>
            <TextField label='STR' type='number' onChange={(e) => { setStrength(parseInt(e.target.value)) }} value={strength} />
          </Grid>
          <Grid item xs={2} md={1}>
            <TextField label='DEX' type='number' onChange={(e) => { setDexterity(parseInt(e.target.value)) }} value={dexterity} />
          </Grid>
          <Grid item xs={2} md={1}>
            <TextField label='CON' type='number' onChange={(e) => { setConstitution(parseInt(e.target.value)) }} value={constitution} />
          </Grid>
          <Grid item xs={2} md={1}>
            <TextField label='INT' type='number' onChange={(e) => { setIntelligence(parseInt(e.target.value)) }} value={intelligence} />
          </Grid>
          <Grid item xs={2} md={1}>
            <TextField label='WIS' type='number' onChange={(e) => { setWisdom(parseInt(e.target.value)) }} value={wisdom} />
          </Grid>
          <Grid item xs={2} md={1}>
            <TextField label='CHA' type='number' onChange={(e) => { setCharisma(parseInt(e.target.value)) }} value={charisma} />
          </Grid>
        </Grid>
      <Box>
      </Box>
      <Box sx={style.centred}>
        <Button variant="outlined" sx={style.saveButton} onClick={saveNpc} >Save</Button>
      </Box>
    </>
  )
}