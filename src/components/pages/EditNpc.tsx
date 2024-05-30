import React from "react"
import { Npc } from "../../../src/lib/saveNpc"
import { nameByRace } from "fantasy-name-generator"
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material"

export default function editNpc(npc: Npc) {
  const [race, setRace] = React.useState<string>(npc.race)
  const [name, setName] = React.useState<string>(npc.name)
  const [gender, setGender] = React.useState<string>(npc.gender)
  const [notes, setNotes] = React.useState<string>(npc.notes)
  const [strength, setStrength] = React.useState<number | null>(npc.abilities.strength)
  const [dexterity, setDexterity] = React.useState<number | null>(npc.abilities.dexterity)
  const [constitution, setConstitution] = React.useState<number | null>(npc.abilities.constitution)
  const [intelligence, setIntelligence] = React.useState<number | null>(npc.abilities.intelligence)
  const [wisdom, setWisdom] = React.useState<number | null>(npc.abilities.wisdom)
  const [charisma, setCharisma] = React.useState<number | null>(npc.abilities.charisma)
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
    },
    outer: {
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column'
    }
  }
  
  return (
    <Box sx={style.outer} >
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
    </Box>
  )
}
