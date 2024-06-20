import React from 'react'
import { ProficiencyView } from '../dm-tools-data.types'
import { FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox } from '@mui/material'

export default function ProficiencyViewSelector(props: ProficiencyViewSelectorProps) {
  const proficiencies = props.proficiencyView.value
  const name = props.proficiencyView.name

  function setProficiency(profs: string[]): void {
    props.setProficiency({
      name,
      value: profs
    })
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const checkbox = e.target
    if (proficiencies.includes(checkbox.name)) {
      setProficiency(proficiencies.filter(proficiency => proficiency !== checkbox.name))
    } else {
      setProficiency([...proficiencies, checkbox.name].sort())
    }
  }

  const languages = [
    "Abyssal",
    "Celestial",
    "Common",
    "Deep Speech",
    "Draconic",
    "Elvish",
    "Giant",
    "Gnomish",
    "Goblin",
    "Halfling",
    "Infernal",
    "Ogre",
    "Orc",
    "Primordial",
    "Undercommon"
  ]

  const armour = [
    "Light",
    "Medium",
    "Heavy"
  ]

  const tools = [
    "Alchemist's Supplies",
    "Brewer's Supplies",
    "Calligrapher's Supplies",
    "Carpenter's Tools",
    "Cartographer's Tools",
    "Cobbler's Tools",
    "Cook's Utensils",
    "Disguise Kit",
    "Forgery Kit",
    "Glassblower's Tools",
    "Jeweller's Tools",
    "Leatherworker's Tools",
    "Mason's Tools",
    "Painter's Supplies",
    "Poisoner's Kit",
    "Potter's Tools",
    "Smith's Tools",
    "Thieves' Tools",
    "Tinker's Tools",
    "Weaver's Tools",
    "Woodcarver's Tools"
  ]

  const weapons = [
    "Simple",
    "Martial"
  ]

  function getNames(): string[] {
    if (name === 'Languages') return languages
    if (name === 'Armour') return armour
    if (name === 'Tools') return tools
    if (name === 'Weapons') return weapons
  }
  const namesArray = getNames()

  return (
    <React.Fragment>
      <FormControl sx={{ mx: 3 }} component="fieldset" variant="standard">
        <FormLabel component="legend">{name}</FormLabel>
        <FormGroup>
          {namesArray.map(item => {
            return (
              <FormControlLabel
                key={`${item}-${name}`}
                label={item}
                control={
                  <Checkbox checked={proficiencies.includes(item)} onChange={handleChange} name={item} />
                }
              />
            )
          })}
        </FormGroup>
      </FormControl>
    </React.Fragment>
  )
}

interface ProficiencyViewSelectorProps {
  proficiencyView: ProficiencyView
  setProficiency: (a: ProficiencyView) => void
}
