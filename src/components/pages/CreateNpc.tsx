import { Box, Button, FormControl, FormControlLabel, FormLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, SelectChangeEvent, TextField, Typography } from "@mui/material"
import { nameByRace } from "fantasy-name-generator"
import React, { useEffect } from "react"
import { useParams } from "react-router-dom"
import { DmToolsData, Skill } from "../../lib/CharacterSheetProcessor"
import { v4 as uuidv4 } from 'uuid'

export default function CreateNpc() {
  const [id, setId] = React.useState<string>(uuidv4())
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
  const [proficiencyBonus, setProficiencyBonus] = React.useState<number>(0)
  const [ac, setAc] = React.useState<number>(10)
  const { npcId } = useParams()

  const [acrobatics, setAcrobatics] = React.useState<string>('none')
  const [animalHandling, setAnimalHandling] = React.useState<string>('none')
  const [arcana, setArcana] = React.useState<string>('none')
  const [athletics, setAthletics] = React.useState<string>('none')
  const [deception, setDeception] = React.useState<string>('none')
  const [history, setHistory] = React.useState<string>('none')
  const [insight, setInsight] = React.useState<string>('none')
  const [intimidation, setIntimidation] = React.useState<string>('none')
  const [investigation, setInvestigation] = React.useState<string>('none')
  const [medicine, setMedicine] = React.useState<string>('none')
  const [nature, setNature] = React.useState<string>('none')
  const [perception, setPerception] = React.useState<string>('none')
  const [performance, setPerformance] = React.useState<string>('none')
  const [Persuasion, setPersuasion] = React.useState<string>('none')
  const [religion, setReligion] = React.useState<string>('none')
  const [sleightOfHand, setSleightOfHand] = React.useState<string>('none')
  const [stealth, setStealth] = React.useState<string>('none')
  const [survival, setSurvival] = React.useState<string>('none')

  function getSkills(): any {
    return [
      { name: 'Acrobatics', proficiency: acrobatics },
      { name: 'Animal Handling', proficiency: animalHandling },
      { name: 'Arcana', proficiency: arcana },
      { name: 'Athletics', proficiency: athletics },
      { name: 'Deception', proficiency: deception },
      { name: 'History', proficiency: history },
      { name: 'Insight', proficiency: insight },
      { name: 'Intimidation', proficiency: intimidation },
      { name: 'Investigation', proficiency: investigation },
      { name: 'Medicine', proficiency: medicine },
      { name: 'Nature', proficiency: nature },
      { name: 'Perception', proficiency: perception },
      { name: 'Performance', proficiency: performance },
      { name: 'Persuasion', proficiency: Persuasion },
      { name: 'Religion', proficiency: religion },
      { name: 'Sleight of Hand', proficiency: sleightOfHand },
      { name: 'Stealth', proficiency: stealth },
      { name: 'Survival', proficiency: survival },
    ]
  }

  function getProficiencies(type: string) {
    return getSkills().filter((skill: any) => skill.proficiency === type)
      .map((skill: any) => skill.name)
  }

  useEffect(() => {
    const loadNpc = async () => {
      const npc = await window.electron.getNpc(npcId) as DmToolsData
      setId(npc.id)
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
      setProficiencyBonus(npc.proficiency)
      setAc(npc.ac)
      setAcrobatics(getInitialProficiency(npc.skills, 'Acrobatics'))
      setAnimalHandling(getInitialProficiency(npc.skills, 'Animal Handling'))
      setArcana(getInitialProficiency(npc.skills, 'Arcana'))
      setAthletics(getInitialProficiency(npc.skills, 'Athletics'))
      setDeception(getInitialProficiency(npc.skills, 'Deception'))
      setHistory(getInitialProficiency(npc.skills, 'History'))
      setInsight(getInitialProficiency(npc.skills, 'Insight'))
      setIntimidation(getInitialProficiency(npc.skills, 'Intimidation'))
      setInvestigation(getInitialProficiency(npc.skills, 'Investigation'))
      setMedicine(getInitialProficiency(npc.skills, 'Medicine'))
      setNature(getInitialProficiency(npc.skills, 'Nature'))
      setPerception(getInitialProficiency(npc.skills, 'Perception'))
      setPerformance(getInitialProficiency(npc.skills, 'Performance'))
      setPersuasion(getInitialProficiency(npc.skills, 'Persuasion'))
      setReligion(getInitialProficiency(npc.skills, 'Religion'))
      setSleightOfHand(getInitialProficiency(npc.skills, 'Sleight of Hand'))
      setStealth(getInitialProficiency(npc.skills, 'Stealth'))
      setSurvival(getInitialProficiency(npc.skills, 'Survival'))
    }

    if (npcId && npcId !== id) {
      loadNpc()
        .catch(console.error)
    }
  })

  function getInitialProficiency(skills: Skill[], name: string) {
    const prof = skills.filter(skill => skill.name === name)[0]
    if (prof.proficient) return 'proficiency'
    else if (prof.expertise) return 'expertise'
    else return 'none'
  }

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

  function Skill(props: any) {
    return (
      <React.Fragment>
        <FormControl>
          <Box sx={style.radioBox}>
            <FormLabel id="proficiency-radio-buttons-group-label">{props.name}</FormLabel>
            <RadioGroup
              row
              aria-labelledby="proficiency-radio-buttons-group-label"
              name="proficiency-radio-buttons-group"
              value={props.value}
              onChange={props.onChange}
            >
              <FormControlLabel value="none" control={<Radio size="small" />} label="None" />
              <FormControlLabel value="proficiency" control={<Radio size="small" />} label="Proficiency" />
              <FormControlLabel value="expertise" control={<Radio size="small" />} label="Expertise" />
            </RadioGroup>
          </Box>
        </FormControl>
      </React.Fragment>
    )
  }

  const handleIntegerChange = (hook: Function) => {
    return (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      hook(parseInt(event.target.value))
    }
  }
  const handleStringChange = (hook: Function) => {
    return (event: SelectChangeEvent) => {
      hook(event.target.value)
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
      id,
      name,
      race,
      gender,
      notes,
      abilities: getAbilities(),
      proficiencyBonus,
      ac,
      proficiencies: getProficiencies('proficiency'),
      expertise: getProficiencies('expertise')
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
    },
    radioBox: {
      display: 'flex'
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
          <Box sx={{ mt: 1}}>
            <TextField sx={style.notes} onChange={(e) => { setNotes(e.target.value) }} label='notes' variant='outlined' multiline />
          </Box>
          <Box sx={{ mt: 1}}>
            <TextField label='Proficiency Bonus' type='number' value={proficiencyBonus} onChange={handleIntegerChange(setProficiencyBonus)} />
          <TextField label='AC' type='number' onChange={handleIntegerChange(setAc)} value={ac} />
          </Box>
          <Box>
          </Box>
        </Box>
        <Box sx={style.nameButton}>
          <Button variant="outlined" onClick={generateName}>Generate Name</Button>
        </Box>
      </Box>
      <Grid container sx={style.abilities}>
        <Grid item xs={2} md={1}>
          <TextField label='STR' type='number' onChange={handleIntegerChange(setStrength)} value={strength} />
        </Grid>
        <Grid item xs={2} md={1}>
          <TextField label='DEX' type='number' onChange={handleIntegerChange(setDexterity)} value={dexterity} />
        </Grid>
        <Grid item xs={2} md={1}>
          <TextField label='CON' type='number' onChange={handleIntegerChange(setConstitution)} value={constitution} />
        </Grid>
        <Grid item xs={2} md={1}>
          <TextField label='INT' type='number' onChange={handleIntegerChange(setIntelligence)} value={intelligence} />
        </Grid>
        <Grid item xs={2} md={1}>
          <TextField label='WIS' type='number' onChange={handleIntegerChange(setWisdom)} value={wisdom} />
        </Grid>
        <Grid item xs={2} md={1}>
          <TextField label='CHA' type='number' onChange={handleIntegerChange(setCharisma)} value={charisma} />
        </Grid>
      </Grid>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Skill name='Acrobatics' onChange={handleStringChange(setAcrobatics)} value={acrobatics} />
        <Skill name='Animal Handling' onChange={handleStringChange(setAnimalHandling)} value={animalHandling} />
        <Skill name='Arcana' onChange={handleStringChange(setArcana)} value={arcana} />
        <Skill name='Athletics' onChange={handleStringChange(setAthletics)} value={athletics} />
        <Skill name='Deception' onChange={handleStringChange(setDeception)} value={deception} />
        <Skill name='History' onChange={handleStringChange(setHistory)} value={history} />
        <Skill name='Insight' onChange={handleStringChange(setInsight)} value={insight} />
        <Skill name='Intimidation' onChange={handleStringChange(setIntimidation)} value={intimidation} />
        <Skill name='Investigation' onChange={handleStringChange(setInvestigation)} value={investigation} />
        <Skill name='Medicine' onChange={handleStringChange(setMedicine)} value={medicine} />
        <Skill name='Nature' onChange={handleStringChange(setNature)} value={nature} />
        <Skill name='Perception' onChange={handleStringChange(setPerception)} value={perception} />
        <Skill name='Performance' onChange={handleStringChange(setPerformance)} value={performance} />
        <Skill name='Persuasion' onChange={handleStringChange(setPersuasion)} value={Persuasion} />
        <Skill name='Religion' onChange={handleStringChange(setReligion)} value={religion} />
        <Skill name='Sleight of Hand' onChange={handleStringChange(setSleightOfHand)} value={sleightOfHand} />
        <Skill name='Stealth' onChange={handleStringChange(setStealth)} value={stealth} />
        <Skill name='Survival' onChange={handleStringChange(setSurvival)} value={survival} />
      </Box>
      <Box sx={style.centred}>
        <Button variant="outlined" sx={style.saveButton} onClick={saveNpc} >Save</Button>
      </Box>
    </Box>
  )
}
