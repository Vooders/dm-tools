import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material"
import { nameByRace } from "fantasy-name-generator"
import React from "react"

export default function CreateNpc() {
  
  const getAbilities = () => {
    return {
      strength,
      dexterity,
      constitution,
      intelligence,
      wisdom,
      charisma
    }
  }
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
  const [abilities, setAbilities] = React.useState(getAbilities())

  const handleStrength = () => {
    const str = document.getElementById('strength').innerHTML
    console.log('strength', str)
    setStrength(Number(document.getElementById('strength').innerHTML))
  }
  const handleDexterity = () => {
    setDexterity(Number(document.getElementById('dexterity').innerHTML))
  }
  const handleConstitution = () => {
    setConstitution(Number(document.getElementById('constitution').innerHTML))
  }
  const handleIntelligence = () => {
    setIntelligence(Number(document.getElementById('intelligence').innerHTML))
  }
  const handleWisdom = () => {
    setWisdom(Number(document.getElementById('wisdom').innerHTML))
  }
  const handleCharisma = () => {
    setCharisma(Number(document.getElementById('charisma').innerHTML))
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
    setAbilities(getAbilities())

    const npc = {
      name,
      race,
      gender,
      notes,
      abilities
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

      <TextField type='number' id='strength' onChange={handleStrength} value={strength}/>
      <Box>
        <input type='number' id='strength' onChange={handleStrength} value={strength} />
        <input type='number' id='dexterity' onChange={handleDexterity}/>
        <input type='number' id='constitution' onChange={handleConstitution}/>
        <input type='number' id='intelligence' onChange={handleIntelligence}/>
        <input type='number' id='wisdom' onChange={handleWisdom}/>
        <input type='number' id='charisma' onChange={handleCharisma}/>
      </Box>
      <Box>
      </Box>
      <Box sx={style.centred}>
        <Button variant="outlined" sx={style.saveButton} onClick={saveNpc} >Save</Button>
      </Box>
    </>
  )

}