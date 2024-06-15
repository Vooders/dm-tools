import React from 'react'
import { ProficiencyView } from '../dm-tools-data.types'
import { FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox } from '@mui/material'

export default function LanguagesSelector(props: LanguageSelectorProps) {
    const languages = props.languages.value

    function setLanguages(l: string[]): void {
        props.setLanguages({
            name: 'Languages',
            value: l
        })
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
        const checkbox = e.target
        if (languages.includes(checkbox.name)) {
            setLanguages(languages.filter(language => language !== checkbox.name))
        } else {
            setLanguages([...languages, checkbox.name].sort())
        }
    }

    const availableLanguages = [
        "Abyssal",
        "Celestial",
        "Common",
        "Deep Speech",
        "Draconic",
        "Giant",
        "Gnomish",
        "Goblin",
        "Infernal"
    ]

    return (
        <React.Fragment>
            <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                <FormLabel component="legend">Languages</FormLabel>
                <FormGroup>
                    {availableLanguages.map(language => {
                        return (
                            <FormControlLabel
                                key={`${language}-language`}
                                label={language}
                                control={
                                    <Checkbox checked={languages.includes(language)} onChange={handleChange} name={language} />
                                }
                            />
                        )
                    })}
                </FormGroup>
            </FormControl>
        </React.Fragment>
    )
}

interface LanguageSelectorProps {
    languages: ProficiencyView
    setLanguages: (a: ProficiencyView) => void
}
