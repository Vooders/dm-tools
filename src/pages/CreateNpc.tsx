import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import { nameByRace } from "fantasy-name-generator"
import React, { useEffect } from "react"
import { useParams } from "react-router-dom"
import { v4 as uuidv4 } from 'uuid'
import ProficienciesSelector from "../components/ProficienciesSelector"
import AbilitySelector from '../components/AbilitySelector'
import { Skill, Save, DmToolsData, Ability, ProficiencyView } from "../dm-tools-data.types"
import Title from '../components/Title';
import LanguagesSelector from "../components/LanguagesSelector"

export default function CreateNpc() {
  const [id, setId] = React.useState<string>(uuidv4())
  const [race, setRace] = React.useState<string>('Human')
  const [name, setName] = React.useState<string>('')
  const [gender, setGender] = React.useState<string>('Male')
  const [notes, setNotes] = React.useState<string>('')
  const [proficiencyBonus, setProficiencyBonus] = React.useState<number>(1)
  const [ac, setAc] = React.useState<number>(10)
  const [hp, setHp] = React.useState<number>(10)
  const { npcId } = useParams()

  const [strength, setStrength] = React.useState<Ability>(newAbility('Strength'))
  const [dexterity, setDexterity] = React.useState<Ability>(newAbility('Dexterity'))
  const [constitution, setConstitution] = React.useState<Ability>(newAbility('Constitution'))
  const [intelligence, setIntelligence] = React.useState<Ability>(newAbility('Intelligence'))
  const [wisdom, setWisdom] = React.useState<Ability>(newAbility('Wisdom'))
  const [charisma, setCharisma] = React.useState<Ability>(newAbility('Charisma'))

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

  const [armour, setArmour] = React.useState<ProficiencyView>(newProficiencyView('Armour'))
  const [weapons, setWeapons] = React.useState<ProficiencyView>(newProficiencyView('Weapons'))
  const [tools, setTools] = React.useState<ProficiencyView>(newProficiencyView('Tools'))
  const [languages, setLanguages] = React.useState<ProficiencyView>(newProficiencyView('Languages'))

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

  function newAbility(name: string): Ability {
    return {
      name,
      modifier: null,
      value: 10,
      shortName: name.slice(0, 3).toUpperCase()
    }
  }

  function newProficiencyView(type: string): ProficiencyView {
    return {
      name,
      value: []
    }
  }

  function makeFinder<T extends { name: string }>(collection: T[]): (name: string) => T {
    return (name: string): T => {
      return collection.find((e) => e.name === name)
    }
  }

  useEffect(() => {
    const loadNpc = async () => {
      const npc = await window.electron.getNpc(npcId) as DmToolsData
      const findAbility = makeFinder(npc.abilities)
      const findSkill = makeFinder(npc.skills)
      const findSave = makeFinder(npc.saves)
      const findProficiencyView = makeFinder(npc.proficiencyView)

      setId(npc.id)
      setRace(npc.profile.race)
      setName(npc.profile.name)
      setGender(npc.profile.appearance.gender)
      // setNotes(npc.notes)
      setStrength(findAbility('Strength'))
      setDexterity(findAbility('Dexterity'))
      setConstitution(findAbility('Constitution'))
      setIntelligence(findAbility('Intelligence'))
      setWisdom(findAbility('Wisdom'))
      setCharisma(findAbility('Charisma'))
      setProficiencyBonus(npc.proficiency)
      setAc(npc.ac)
      setHp(npc.hp.base)
      setAcrobatics(findSkill('Acrobatics'))
      setAnimalHandling(findSkill('Animal Handling'))
      setArcana(findSkill('Arcana'))
      setAthletics(findSkill('Athletics'))
      setDeception(findSkill('Deception'))
      setHistory(findSkill('History'))
      setInsight(findSkill('Insight'))
      setIntimidation(findSkill('Intimidation'))
      setInvestigation(findSkill('Investigation'))
      setMedicine(findSkill('Medicine'))
      setNature(findSkill('Nature'))
      setPerception(findSkill('Perception'))
      setPerformance(findSkill('Performance'))
      setPersuasion(findSkill('Persuasion'))
      setReligion(findSkill('Religion'))
      setSleightOfHand(findSkill('Sleight of Hand'))
      setStealth(findSkill('Stealth'))
      setSurvival(findSkill('Survival'))
      setStrengthSave(findSave('Strength'))
      setDexteritySave(findSave('Dexterity'))
      setConstitutionSave(findSave('Constitution'))
      setIntelligenceSave(findSave('Intelligence'))
      setWisdomSave(findSave('Wisdom'))
      setCharismaSave(findSave('Charisma'))
      setArmour(findProficiencyView('armour'))
      setWeapons(findProficiencyView('Weapons'))
      setTools(findProficiencyView('tools'))
      setLanguages(findProficiencyView('Languages'))
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
      abilities: [
        strength,
        dexterity,
        constitution,
        intelligence,
        wisdom,
        charisma,
      ],
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
      ],
      proficiencyView:[
        armour,
        weapons,
        tools,
        languages
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
                <InputLabel id="race-select-label" shrink={true} >Race</InputLabel>
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
                <TextField value={gender} onChange={handleGenderChange}></TextField>
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
        <AbilitySelector ability={strength} hook={setStrength} />
        <AbilitySelector ability={dexterity} hook={setDexterity} />
        <AbilitySelector ability={constitution} hook={setConstitution} />
        <AbilitySelector ability={intelligence} hook={setIntelligence} />
        <AbilitySelector ability={wisdom} hook={setWisdom} />
        <AbilitySelector ability={charisma} hook={setCharisma} />
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
      <LanguagesSelector languages={languages} hook={setLanguages}/>
      {/* <LanguagesSelector languages={} hook={}/>
      <LanguagesSelector languages={} hook={}/>
      <LanguagesSelector languages={} hook={}/> */}
      <Box sx={style.centred}>
        <Button variant="outlined" sx={style.saveButton} onClick={saveNpc} >Save</Button>
      </Box>
    </Box>
  )
}
