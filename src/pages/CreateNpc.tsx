import { Box, Button, Grid, TextField } from "@mui/material"
import React, { useEffect } from "react"
import { useParams } from "react-router-dom"
import { v4 as uuidv4 } from 'uuid'
import { Skill, Save, Ability, ProficiencyView } from "../dm-tools-data.types"
import Title from '../components/Title'
import ProficienciesSelector from "../components/ProficienciesSelector"
import AbilitySelector from '../components/AbilitySelector'
import RaceSelector from "../components/RaceSelector"
import NameSelector from "../components/NameSelector"
import GenderSelector from "../components/GenderSelector"
import ProficienciesViewSelector from "../components/ProficienciesViewSelector"
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import * as npcRepository from '../repositories/npcRepository'

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

    function newProficiencyView(name: string): ProficiencyView {
        return {
            name,
            value: []
        }
    }

    function getFinder<T extends { name: string }>(collection: T[]): (name: string) => T {
        return (name: string): T => {
            const entity = collection.find((e) => e.name.toLocaleLowerCase() === name.toLocaleLowerCase())
            if (!entity) {
                throw new Error(`Can't find entity with name ${name} in collection ${collection.map(e => JSON.stringify(e))}`)
            }
            return entity
        }
    }

    useEffect(() => {
        const loadNpc = async () => {
            const npc = await npcRepository.get(npcId)
            const findAbility = getFinder(npc.abilities)
            const findSkill = getFinder(npc.skills)
            const findSave = getFinder(npc.saves)
            const findProficiencyView = getFinder(npc.proficiencyView)

            setId(npc.id)
            setRace(npc.profile.race)
            setName(npc.profile.name)
            setGender(npc.profile.appearance.gender)

            setProficiencyBonus(npc.proficiency)
            setAc(npc.ac)
            setHp(npc.hp.base)
            // setNotes(npc.notes)
            setStrength(findAbility('Strength'))
            setDexterity(findAbility('Dexterity'))
            setConstitution(findAbility('Constitution'))
            setIntelligence(findAbility('Intelligence'))
            setWisdom(findAbility('Wisdom'))
            setCharisma(findAbility('Charisma'))

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

            setArmour(findProficiencyView('Armour'))
            setWeapons(findProficiencyView('Weapons'))
            setTools(findProficiencyView('Tools'))
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
            proficiencyView: [
                armour,
                weapons,
                tools,
                languages
            ],
            filename: ''
        }
        await npcRepository.save(npc)
    }

    const style = {
        centred: {
            display: 'flex',
            justifyContent: 'center',
        },
        column: {
            display: 'flex',
            flexDirection: 'column'
        },
        row: {
            display: 'flex',
            flexDirection: 'row',
        },
        content: {
            marginTop: 5,
        },
        notes: {
            width: 1,
            margin: 1,
        },
        saveButton: {
            width: 0.2,
            margin: 2,
        },
        abilities: {
            margin: 2,
        },
        text: {
            margin: 1
        },
    }

    return (
        <Box sx={[style.column, style.centred]}>
            <Title>Create NPC</Title>
            <Box sx={[style.content, style.centred]}>
                <Box>
                    <Box sx={style.centred}>
                        <NameSelector name={name} race={race} gender={gender} setName={setName} />
                    </Box>
                    <Grid container sx={style.centred}>
                        <RaceSelector race={race} setRace={setRace} />
                        <GenderSelector gender={gender} setGender={setGender} />
                    </Grid>
                    <Box >
                        <TextField sx={style.text} label='Proficiency Bonus' type='number' value={proficiencyBonus} onChange={handleIntegerChange(setProficiencyBonus)} />
                        <TextField sx={style.text} label='AC' type='number' onChange={handleIntegerChange(setAc)} value={ac} />
                        <TextField sx={style.text} label='HP' type='number' onChange={handleIntegerChange(setHp)} value={hp} />
                    </Box>
                    <Box >
                        <TextField sx={style.notes} onChange={(e) => { setNotes(e.target.value) }} label='notes' variant='outlined' multiline />
                    </Box>
                </Box>
            </Box>
            <Grid container sx={[style.abilities, style.row, style.centred]}>
                <AbilitySelector ability={strength} hook={setStrength} />
                <AbilitySelector ability={dexterity} hook={setDexterity} />
                <AbilitySelector ability={constitution} hook={setConstitution} />
                <AbilitySelector ability={intelligence} hook={setIntelligence} />
                <AbilitySelector ability={wisdom} hook={setWisdom} />
                <AbilitySelector ability={charisma} hook={setCharisma} />
            </Grid>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} >
                    Skills
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container sx={style.centred}>
                        <Grid item xs={12} md={6} sx={style.column}>
                            <ProficienciesSelector skill={acrobatics} hook={setAcrobatics} />
                            <ProficienciesSelector skill={animalHandling} hook={setAnimalHandling} />
                            <ProficienciesSelector skill={arcana} hook={setArcana} />
                            <ProficienciesSelector skill={athletics} hook={setAthletics} />
                            <ProficienciesSelector skill={deception} hook={setDeception} />
                            <ProficienciesSelector skill={history} hook={setHistory} />
                            <ProficienciesSelector skill={insight} hook={setInsight} />
                            <ProficienciesSelector skill={intimidation} hook={setIntimidation} />
                            <ProficienciesSelector skill={investigation} hook={setInvestigation} />
                        </Grid>
                        <Grid item xs={12} md={6} sx={style.column}>
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
                    </Grid>
                </AccordionDetails>
            </Accordion >
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} >
                    Saves
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container sx={style.centred}>
                        <Grid item xs={12} sm={6} sx={style.column}>
                            <ProficienciesSelector skill={strengthSave} hook={setStrengthSave} expertise={false} />
                            <ProficienciesSelector skill={dexteritySave} hook={setDexteritySave} expertise={false} />
                            <ProficienciesSelector skill={constitutionSave} hook={setConstitutionSave} expertise={false} />
                        </Grid>
                        <Grid item xs={12} sm={6} sx={style.column}>
                            <ProficienciesSelector skill={intelligenceSave} hook={setIntelligenceSave} expertise={false} />
                            <ProficienciesSelector skill={wisdomSave} hook={setWisdomSave} expertise={false} />
                            <ProficienciesSelector skill={charismaSave} hook={setCharismaSave} expertise={false} />
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} >
                    Proficiencies
                </AccordionSummary>
                <AccordionDetails>
                    <Box sx={style.row}>
                        <ProficienciesViewSelector proficiencyView={languages} setProficiency={setLanguages} />
                        <ProficienciesViewSelector proficiencyView={tools} setProficiency={setTools} />
                        <ProficienciesViewSelector proficiencyView={armour} setProficiency={setArmour} />
                        <ProficienciesViewSelector proficiencyView={weapons} setProficiency={setWeapons} />
                    </Box>
                </AccordionDetails>
            </Accordion>
            <Box sx={style.centred}>
                <Button variant="outlined" sx={style.saveButton} onClick={saveNpc} >Save</Button>
            </Box>
        </Box >
    )
}
