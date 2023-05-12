import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Tab from '@mui/material/Tab';

import { CharacterProfileHp, DmToolsData } from '../../lib/CharacterSheetProcessor';
import Abilities from '../fragments/character-sheet/Abilities';
import Skills from '../fragments/character-sheet/Skills';
import Spells from '../fragments/character-sheet/Spells';
import PassiveSkills from '../fragments/character-sheet/PassiveSkills';
import { ProficienciesLanguages } from '../fragments/character-sheet/ProficienciesLanguages';
import Saves from '../fragments/character-sheet/Saves';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Grid item sm={12} sx={{ padding: '25px'}}>
                    <Grid container spacing={2} flexDirection={'column'} flexWrap={'wrap'} justifyContent={'space-evenly'} sx={{ maxHeight: '900px' }}>
                        {children}
                    </Grid>
                </Grid>
            )}
        </div>
    );
}

export default function CharacterSheet() {
    let { characterId } = useParams()
    const [character, setCharacter] = useState<DmToolsData>(null)
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    useEffect(() => {
        const getCharacter = async () => {
            console.log('getting Character')
            const char = await window.electron.getCharacter(characterId)
            setCharacter(char)
        }

        if (!character || characterId !== character.id.toString()) {
            getCharacter()
                .catch(console.error)
        }
    })

    function a11yProps(index: number) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    return (
        <React.Fragment>
            {character ?
                <React.Fragment>
                    <Grid container spacing={2} sx={{ paddingBottom: '27px' }}>
                        <Grid item sm={12}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Card sx={{ display: 'flex', paddingBottom: '10px' }}>
                                    <CardMedia
                                        component="img"
                                        sx={{ width: 151 }}
                                        image={character.avatarPath}
                                        alt={character.profile.name}
                                    />
                                    <Box sx={{ display: 'flex', flexDirection: 'column', padding: '5px' }}>
                                        <Typography component="div" variant="h5">
                                            {character.profile.name}
                                        </Typography>
                                        <Typography variant="subtitle1" color="text.primary" component="div">
                                            {`${character.profile.appearance.gender || ''} ${character.profile.race} ${character.profile.classes}`}
                                        </Typography>
                                        <Typography variant="subtitle2" color="text.secondary" component="div">
                                            {`Level ${character.profile.level}`}
                                        </Typography>
                                    </Box>
                                </Card>
                                <Box sx={{ display: 'flex', flexDirection: 'column', padding: '5px' }}>
                                    <Hp hp={character.hp}></Hp>
                                </Box>
                            </Box>
                        </Grid>
                        <Abilities abilities={character.abilities} />
                    </Grid>
                    <Grid container spacing={2} >
                        <Grid item sm={12} spacing={2}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs value={value} onChange={handleChange} aria-label="basic tabs">
                                    <Tab label="skills & saves" {...a11yProps(0)} />
                                    <Tab label="Spells" {...a11yProps(1)} />
                                    <Tab label="Actions" {...a11yProps(2)} />
                                </Tabs>
                            </Box>
                            <TabPanel value={value} index={0} >
                                <Skills skills={character.skills} />
                                <Saves saves={character.saves} />
                                <PassiveSkills passiveSkills={character.passiveSkills} />
                                <ProficienciesLanguages proficiencyView={character.proficiencyView} />
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                               <Spells theSpells={character.spells} />
                            </TabPanel>
                            <TabPanel value={value} index={2}>
                                Item Three
                            </TabPanel>
                        </Grid>
                    </Grid>
                </React.Fragment>
                :
                "loading"
            }
        </React.Fragment>
    )
}

interface HpProps {
    hp: CharacterProfileHp
}

function Hp({ hp }: HpProps) {
    const max = hp.base + hp.bonus + hp.constitutionBonus
    const currentHp = hp.override ? hp.override : hp.base + hp.bonus + hp.constitutionBonus - hp.removed
    return (
        <Paper variant="outlined" elevation={0} sx={{ padding: '10px', textAlign: 'center' }}>
            <Typography component="div" variant="subtitle1">
                HP
            </Typography>
            <Typography component="div" variant="h5">
                {`${currentHp} / ${max}`}
            </Typography>
            <Typography component="div" variant="overline">
                {`temp ${hp.temporary}`}
            </Typography>
        </Paper>
    )
}
