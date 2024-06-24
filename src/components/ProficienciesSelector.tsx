import { FormControl, FormLabel, FormControlLabel, FormGroup, Checkbox } from "@mui/material"
import { Box } from "@mui/system"
import React, { useEffect } from "react"
import { Skill, Save } from "../dm-tools-data.types"

const style = {
    checkBox: {
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
        if (e.target.name === 'proficiency') {
            if (e.target.checked) {
                skill.proficient = true
                skill.expertise = false
                setSelected('proficiency')
            } else {
                skill.proficient = false
                setSelected('none')
            }
        } else if (e.target.name === 'expertise') {
            if (e.target.checked) {
                skill.expertise = true
                skill.proficient = true
                setSelected('expertise')
            } else {
                skill.expertise = false
                skill.proficient = false
                setSelected('none')
            }
        }
        props.hook(skill)
    }

    return (
        <React.Fragment>
            <FormControl>
                <Box sx={style.checkBox}>
                    <FormLabel
                        sx={{mt: 1, mr: 2, color: 'whitesmoke', fontSize: 18}}
                        id="proficiency-checkbox-group-label">
                        {skill.name}
                    </FormLabel>
                    <FormGroup row>
                        <FormControlLabel
                            label="Proficiency"
                            control={
                                <Checkbox
                                    checked={selected === 'proficiency'}
                                    onChange={handleChange}
                                    name='proficiency'
                                />
                            }
                        />
                        {props.expertise !== false &&
                            <FormControlLabel
                                label="Expertise"
                                control={
                                    <Checkbox
                                        checked={selected === 'expertise'}
                                        onChange={handleChange}
                                        name='expertise'
                                    />
                                }
                            />
                        }
                    </FormGroup>
                </Box>
            </FormControl>
        </React.Fragment>
    )
}

interface ProficienciesSelectorProps {
    skill: Skill | Save
    hook: Function
    expertise?: boolean
}
