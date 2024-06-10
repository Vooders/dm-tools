import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material"
import { nameByRace } from "fantasy-name-generator"
import React, { useEffect } from "react"
import { useParams } from "react-router-dom"
import { v4 as uuidv4 } from 'uuid'
import ProficienciesSelector from "../components/ProficienciesSelector"
import { Skill, Save, DmToolsData } from "../dm-tools-data.types"
import Title from '../components/Title';

export default function CreateNpc() {
  const [id, setId] = React.useState<string>(uuidv4())
  const [race, setRace] = React.useState<string>('Human')
  const [name, setName] = React.useState<string>('')
  const [gender, setGender] = React.useState<string>('Male')
  const [notes, setNotes] = React.useState<string>('')
  const [strength, setStrength] = React.useState<number>(10)
  const [dexterity, setDexterity] = React.useState<number>(10)
  const [constitution, setConstitution] = React.useState<number>(10)
  const [intelligence, setIntelligence] = React.useState<number>(10)
  const [wisdom, setWisdom] = React.useState<number>(10)
  const [charisma, setCharisma] = React.useState<number>(10)
  const [proficiencyBonus, setProficiencyBonus] = React.useState<number>(1)
  const [ac, setAc] = React.useState<number>(10)
  const [hp, setHp] = React.useState<number>(10)
  const { npcId } = useParams()

  const [acrobatics, setAcrobatics] = React.useState<Skill>(newSkill('Acrobatics', 'DEX'))
  const [animalHandling, setAnimalHandling] = React.useState<Skill>(newSkill('Animal Handling', 'WIS'))
  const [arcana, setArcana] = React.useState<Skill>(newSkill('Arcana', 'INT'))
  const [athletics, setAthletics] = React.useState<Skill>(newSkill('Athletics', 'STR'))
  const [deception, setDeception] = React.useState<Skill>(newSkill('Deception', 'CHA'))
  const [history, setHistory] = React.useState<Skill>(newSkill('History', 'INT'))
  const [insight, setInsight] = React.useState<Skill>(newSkill('Insight', 'WIS'))
  const [intimidation, setIntimidation] = React.useState<Skill>(newSkill('Intimidation', 'CHA'))
  const [investigation, setInvestigation] = React.useState<Skill>(newSkill('Investigation', 'INT'))
  const [medicine, setMedicine] = React.useState<Skill>(newSkill('Medicine', 'WIS'))
  const [nature, setNature] = React.useState<Skill>(newSkill('Nature', 'INT'))
  const [perception, setPerception] = React.useState<Skill>(newSkill('Perception', 'WIS'))
  const [performance, setPerformance] = React.useState<Skill>(newSkill('Performance', 'CHA'))
  const [Persuasion, setPersuasion] = React.useState<Skill>(newSkill('Persuasion', 'CHA'))
  const [religion, setReligion] = React.useState<Skill>(newSkill('Religion', 'INT'))
  const [sleightOfHand, setSleightOfHand] = React.useState<Skill>(newSkill('Sleight of Hand', 'DEX'))
  const [stealth, setStealth] = React.useState<Skill>(newSkill('Stealth', 'DEX'))
  const [survival, setSurvival] = React.useState<Skill>(newSkill('Survival', 'WIS'))

  const [strengthSave, setStrengthSave] = React.useState<Save>(newSave('Strength'))
  const [dexteritySave, setDexteritySave] = React.useState<Save>(newSave('Dexterity'))
  const [constitutionSave, setConstitutionSave] = React.useState<Save>(newSave('Constitution'))
  const [intelligenceSave, setIntelligenceSave] = React.useState<Save>(newSave('Intelligence'))
  const [wisdomSave, setWisdomSave] = React.useState<Save>(newSave('Wisdom'))
  const [charismaSave, setCharismaSave] = React.useState<Save>(newSave('Charisma'))

  function newSkill(name: string, mod: string): Skill {
    return {
      name,
      mod,
      bonus: null,
      proficient: false,
      expertise: false
    }
  }

  function newSave(name: string): Save {
    return {
      name,
      modifier: null,
      shortName: '',
      proficient: false,
      expertise: false
    }
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
      setHp(npc.hp.base)
      setAcrobatics(npc.skills[0])
      setAnimalHandling(npc.skills[1])
      setArcana(npc.skills[2])
      setAthletics(npc.skills[3])
      setDeception(npc.skills[4])
      setHistory(npc.skills[5])
      setInsight(npc.skills[6])
      setIntimidation(npc.skills[7])
      setInvestigation(npc.skills[8])
      setMedicine(npc.skills[9])
      setNature(npc.skills[10])
      setPerception(npc.skills[11])
      setPerformance(npc.skills[12])
      setPersuasion(npc.skills[13])
      setReligion(npc.skills[14])
      setSleightOfHand(npc.skills[15])
      setStealth(npc.skills[16])
      setSurvival(npc.skills[17])
      setStrengthSave(npc.saves[0])
      setDexteritySave(npc.saves[1])
      setConstitutionSave(npc.saves[2])
      setIntelligenceSave(npc.saves[3])
      setWisdomSave(npc.saves[4])
      setCharismaSave(npc.saves[5])
    }

    if (npcId && npcId !== id) {
      loadNpc()
        .catch(console.error)
    }
  })

  const handleIntegerChange = (hook: Function) => {
    return (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      hook(parseInt(event.target.value))
    }
  }

  const handleRaceChange = (event: any) => {
    setRace(event.target.value)
  }
  const handleGenderChange = (event: any) => {
    setGender(event.target.value)
  }
  const generateName = () => {
    const convertedRace = convertString(race)
    const convertedGender = convertString(gender)
    setName(nameByRace(convertedRace, { gender: convertedGender as 'male' || 'female', allowMultipleNames: true }).toString())
  }

  function convertString(name: string): string {
    if (name === 'Cave Person') {
      return 'cavePerson'
    } else {
      return name.toLowerCase().split(' ').join('')
    }
  }

  const saveNpc = async (): Promise<void> => {
    const npc = {
      id,
      name,
      race,
      gender,
      notes,
      abilities: {
        strength,
        dexterity,
        constitution,
        intelligence,
        wisdom,
        charisma,
      },
      proficiencyBonus,
      ac,
      hp,
      skills: [
        acrobatics,
        animalHandling,
        arcana,
        athletics,
        deception,
        history,
        insight,
        intimidation,
        investigation,
        medicine,
        nature,
        perception,
        performance,
        Persuasion,
        religion,
        sleightOfHand,
        stealth,
        survival,
      ],
      saves: [
        strengthSave,
        dexteritySave,
        constitutionSave,
        intelligenceSave,
        wisdomSave,
        charismaSave,
      ]
    }
    await window.electron.saveNpc(npc)
  }

  const style = {
    content: {
      display: 'flex',
      justifyContent: 'center',
      mt: 5,
    },
    centred: {
      display: 'flex',
      justifyContent: 'center',
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
      width: 0.65,
      height: 0.5
    },
    saveButton: {
      width: 0.2,
      m: 2,
    },
    abilities: {
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'row',
      margin: 2,
    },
    outer: {
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
    },
  }

  return (
    <Box sx={style.outer} >
      <Title>Create NPC</Title>
      <Box sx={style.content} >
        <Box>
          <Box sx={style.centred}>
            <Box sx={style.textInput}>
              <FormControl fullWidth>
                <InputLabel id="race-select-label"  shrink={true} >Race</InputLabel>
                <TextField value={race} onChange={handleRaceChange}></TextField>
                <Select
                  labelId="race-select-label"
                  id="race-select"
                  value=''
                  onChange={handleRaceChange}
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
            <Box sx={style.textInput}>
              <FormControl fullWidth>
                <InputLabel id="gender-select-label" shrink={true}>Gender</InputLabel>
                <TextField value={gender}  onChange={handleGenderChange}></TextField>
                <Select
                  labelId="gender-select-label"
                  id="gender-select"
                  value=''
                  onChange={handleGenderChange}
                >
                  <MenuItem value={'Male'}>Male</MenuItem>
                  <MenuItem value={'Female'}>Female</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={style.name}>
              <TextField value={name} label="Name" variant="outlined" onChange={(e) => setName(e.target.value)} />
          <Button sx={style.nameButton} variant="outlined" onClick={generateName}>Generate Name</Button>
            </Box>
          </Box>
          <Box sx={{ mt: 1 }}>
            <TextField label='Proficiency Bonus' type='number' value={proficiencyBonus} onChange={handleIntegerChange(setProficiencyBonus)} />
            <TextField label='AC' type='number' onChange={handleIntegerChange(setAc)} value={ac} />
            <TextField label='HP' type='number' onChange={handleIntegerChange(setHp)} value={hp} />
          </Box>
          <Box sx={{ mt: 1 }}>
            <TextField sx={style.notes} onChange={(e) => { setNotes(e.target.value) }} label='notes' variant='outlined' multiline />
          </Box>
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
      <Grid container>
        <Grid item xs={7} sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>Skills</Typography>
          <ProficienciesSelector skill={acrobatics} hook={setAcrobatics} />
          <ProficienciesSelector skill={animalHandling} hook={setAnimalHandling} />
          <ProficienciesSelector skill={arcana} hook={setArcana} />
          <ProficienciesSelector skill={athletics} hook={setAthletics} />
          <ProficienciesSelector skill={deception} hook={setDeception} />
          <ProficienciesSelector skill={history} hook={setHistory} />
          <ProficienciesSelector skill={insight} hook={setInsight} />
          <ProficienciesSelector skill={intimidation} hook={setIntimidation} />
          <ProficienciesSelector skill={investigation} hook={setInvestigation} />
          <ProficienciesSelector skill={medicine} hook={setMedicine} />
          <ProficienciesSelector skill={nature} hook={setNature} />
          <ProficienciesSelector skill={perception} hook={setPerception} />
          <ProficienciesSelector skill={performance} hook={setPerformance} />
          <ProficienciesSelector skill={Persuasion} hook={setPersuasion} />
          <ProficienciesSelector skill={religion} hook={setReligion} />
          <ProficienciesSelector skill={sleightOfHand} hook={setSleightOfHand} />
          <ProficienciesSelector skill={stealth} hook={setStealth} />
          <ProficienciesSelector skill={survival} hook={setSurvival} />
        </Grid>
        <Grid item xs={5} sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography component="h2" variant="h6" color="primary" gutterBottom>Saves</Typography>
          <ProficienciesSelector skill={strengthSave} hook={setStrengthSave} expertise={false} />
          <ProficienciesSelector skill={dexteritySave} hook={setDexteritySave} expertise={false} />
          <ProficienciesSelector skill={constitutionSave} hook={setConstitutionSave} expertise={false} />
          <ProficienciesSelector skill={intelligenceSave} hook={setIntelligenceSave} expertise={false} />
          <ProficienciesSelector skill={wisdomSave} hook={setWisdomSave} expertise={false} />
          <ProficienciesSelector skill={charismaSave} hook={setCharismaSave} expertise={false} />
        </Grid>
      </Grid>
      <Box sx={style.centred}>
        <Button variant="outlined" sx={style.saveButton} onClick={saveNpc} >Save</Button>
      </Box>
    </Box>
  )
}
