import { Box, Button, TextField } from "@mui/material"
import { nameByRace } from "fantasy-name-generator"
import React from "react"

const style = {
    name: {
        width: 0.4
    },
    nameButton: {
        width: 0.65,
        height: 0.5
    },
}

export default function NameSelector(props: NameSelectorProps) {
    function convertString(name: string): string {
        if (name === 'Cave Person') {
            return 'cavePerson'
        } else {
            return name.toLowerCase().split(' ').join('')
        }
    }

    const generateName = () => {
        const convertedRace = convertString(props.race)
        const convertedGender = convertString(props.gender)
        props.setName(nameByRace(convertedRace, { gender: convertedGender as 'male' || 'female', allowMultipleNames: true }).toString())
    }

    return (
        <Box sx={style.name}>
            <TextField value={props.name} label="Name" variant="outlined" onChange={(e) => props.setName(e.target.value)} />
            <Button sx={style.nameButton} variant="outlined" onClick={generateName}>Generate Name</Button>
        </Box>
    )
}

interface NameSelectorProps {
    name: string
    race: string
    gender: string
    setName: (name: string) => void
}
