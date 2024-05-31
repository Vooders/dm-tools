import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material"
import { nameByRace } from "fantasy-name-generator"
import React, { useEffect } from "react"
import { useParams } from "react-router-dom"
import { DmToolsData } from "../../lib/CharacterSheetProcessor"
import { v4 as uuidv4 } from 'uuid'

export default function CreateNpc() {
  const [race, setRace] = React.useState<string>('human')
  const [name, setName] = React.useState<string>('')
  const [gender, setGender] = React.useState<string>('male')
  const [notes, setNotes] = React.useState<string>('')
  const [strength, setStrength] = React.useState<number>(10)
  const [dexterity, setDexterity] = React.useState<number>(10)
  const [constitution, setConstitution] = React.useState<number>(10)
  const [intelligence, setIntelligence] = React.useState<number>(10)
  const [wisdom, setWisdom] = React.useState<number>(10)
  const [charisma, setCharisma] = React.useState<number>(10)
  const [id, setId] = React.useState<string>(uuidv4())

  const { npcId } = useParams()
  console.log(npcId)

  useEffect(() => {
    const loadNpc = async () => {
      const npc = await window.electron.getNpc(npcId) as DmToolsData
      setRace(npc.profile.race)
      setName(npc.profile.name)
      setGender(npc.profile.appearance.gender)
      // setNotes(npc.notes)
      setStrength(npc.abilities[0].value)
      setDexterity(npc.abilities[1].value)
      setConstitution(npc.abilities[2].value)
      setIntelligence(npc.abilities[3].value)
      setWisdom(npc.abilities[4].value)
      setCharisma(npc.abilities[5].value)
      setId(npc.id)
    }

    if (npcId && npcId !== id) {
        loadNpc()
            .catch(console.error)
    }
})


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

  const handleAbilityChange = (hook: Function) => {
    return (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      hook(parseInt(event.target.value))
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
          <TextField label='STR' type='number' onChange={handleAbilityChange(setStrength)} value={strength} />
        </Grid>
        <Grid item xs={2} md={1}>
          <TextField label='DEX' type='number' onChange={handleAbilityChange(setDexterity)} value={dexterity} />
        </Grid>
        <Grid item xs={2} md={1}>
          <TextField label='CON' type='number' onChange={handleAbilityChange(setConstitution)} value={constitution} />
        </Grid>
        <Grid item xs={2} md={1}>
          <TextField label='INT' type='number' onChange={handleAbilityChange(setIntelligence)} value={intelligence} />
        </Grid>
        <Grid item xs={2} md={1}>
          <TextField label='WIS' type='number' onChange={handleAbilityChange(setWisdom)} value={wisdom} />
        </Grid>
        <Grid item xs={2} md={1}>
          <TextField label='CHA' type='number' onChange={handleAbilityChange(setCharisma)} value={charisma} />
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
