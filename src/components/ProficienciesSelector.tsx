import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { Skill, Save } from "../dm-tools-data.types";

const style = {
    radioBox: {
        display: 'flex'
    }
}

export default function ProficienciesSelector(props: ProficienciesSelectorProps) {
    const [selected, setSelected] = React.useState<string>('none')

    const skill = props.skill

    useEffect(() => {
        if (skill.expertise) {
            setSelected('expertise')
        } else if (skill.proficient) {
            setSelected('proficiency')
        }
    })

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.value === 'none') {
            skill.proficient = false
            skill.expertise = false
        } else if (e.target.value === 'proficiency') {
            skill.proficient = true
            skill.expertise = false
        } else if (e.target.value === 'expertise') {
            skill.proficient = true
            skill.expertise = true  
        }
        setSelected(e.target.value)
        props.hook(skill)
    }

    return (
        <React.Fragment>
            <FormControl>
                <Box sx={style.radioBox}>
                    <FormLabel id="proficiency-radio-buttons-group-label">{skill.name}</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="proficiency-radio-buttons-group-label"
                        name="proficiency-radio-buttons-group"
                        value={selected}
                        onChange={handleChange}
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

interface ProficienciesSelectorProps {
    skill: Skill | Save
    hook: Function
}
