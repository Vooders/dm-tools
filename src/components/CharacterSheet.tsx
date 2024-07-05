import React from 'react'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import Tabs from '@mui/material/Tabs'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Tab from '@mui/material/Tab'

import Abilities from './Abilities'
import Skills from './Skills'
import Spells from './Spells'
import PassiveSkills from './PassiveSkills'
import { ProficienciesLanguages } from './ProficienciesLanguages'
import Saves from './Saves'
import Ac from './Ac'
import { DmToolsData, CharacterProfileHp } from '../dm-tools-data.types'

const style = {
    topBox: {
        display: 'flex',
        justifyContent: 'space-between',
        verticalAlign: 'middle'
    },
    infoCard: {
        display: 'flex',
        paddingBottom: '10px'
    },
    infoBox: {
        display: 'flex',
        flexDirection: 'column',
        padding: '5px'
    },
    hpBox: {
        display: 'flex',
        flexDirection: 'column',
        padding: '5px'
    },
    tabBox: {
        borderBottom: 1,
        borderColor: 'divider'
    }
}

export default function CharacterSheet(props: CharacterSheetProps) {
    const [value, setValue] = React.useState(0)

    const character = props.character

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue)
    }

    function a11yProps(index: number) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        }
    }

    return (
        <React.Fragment>
            {character ?
                <React.Fragment>
                    <Grid container spacing={2} sx={{ paddingBottom: '27px' }}>
                        <Grid item sm={12}>
                            <Box sx={style.topBox}>
                                <Card sx={style.infoCard}>
                                    <CardMedia
                                        component="img"
                                        sx={{ width: 151 }}
                                        image={character.avatarPath}
                                        alt={character.profile.name}
                                    />
                                    <Box sx={style.infoBox}>
                                        <Typography variant="h5" component="div">
                                            {character.profile.name}
                                        </Typography>
                                        <Typography variant="subtitle1" color="text.primary" component="div">
                                            {`${character.profile.appearance.gender || ''} ${character.profile.race}`}
                                            {character.profile.classes ? ` ${character.profile.classes}` : ''}
                                        </Typography>
                                        {character.profile.level ?
                                            <Typography variant="subtitle2" color="text.secondary" component="div">
                                                {`Level ${character.profile.level}`}
                                            </Typography> : <></>}
                                    </Box>
                                </Card>
                                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                    <Box sx={{ mt: 5, mr: 2 }}>
                                        <Ac ac={character.ac} />
                                    </Box>
                                    <Box sx={style.hpBox}>
                                        <Hp hp={character.hp}></Hp>
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>
                        <Abilities abilities={character.abilities} />
                    </Grid>
                    <Grid container spacing={2} >
                        <Grid item sm={12}>
                            <Box sx={style.tabBox}>
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

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Grid item sm={12} sx={{ padding: '25px' }}>
                    <Grid container spacing={2} flexDirection={'column'} flexWrap={'wrap'} justifyContent={'space-evenly'} sx={{ maxHeight: '900px' }}>
                        {children}
                    </Grid>
                </Grid>
            )}
        </div>
    )
}

interface CharacterSheetProps {
    character: DmToolsData
}

interface HpProps {
    hp: CharacterProfileHp
}

interface TabPanelProps {
    children?: React.ReactNode
    index: number
    value: number
}
