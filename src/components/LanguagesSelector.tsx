import React, { useEffect } from 'react'
import { ProficiencyView } from '../dm-tools-data.types'
import { FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox } from '@mui/material'

export default function LanguagesSelector(props: LanguageSelectorProps) {
  const [languages, setLanguages] = React.useState<string[]>([])

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const checkbox = e.target
    if (languages.includes(checkbox.name)) {
      setLanguages(languages.filter(language => language !== checkbox.name))
      checkbox.checked = false
    } else {
      setLanguages([...languages, checkbox.name].sort())
      checkbox.checked = true
    }
  }

  useEffect(() => {
    console.log(languages)
    props.hook({
      name: 'Languages',
      value: languages
    })
  }, [languages])

  return (
    <React.Fragment>
      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormLabel component="legend">Languages</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox onChange={handleChange} name="Abyssal" />
            }
            label="Abyssal"
          />
              <FormControlLabel
                control={
                  <Checkbox onChange={handleChange} name="Celestial" />
                }
                label="Celestial"
              />
          <FormControlLabel
            control={
              <Checkbox onChange={handleChange} name="Common" />
            }
            label="Common"
          />
              <FormControlLabel
                control={
                  <Checkbox onChange={handleChange} name="Deep Speech" />
                }
                label="Deep Speech"
              />
          <FormControlLabel
            control={
              <Checkbox onChange={handleChange} name="Draconic" />
            }
            label="Draconic"
          />
          <FormControlLabel
            control={
              <Checkbox onChange={handleChange} name="Giant" />
            }
            label="Giant"
          />
          <FormControlLabel
            control={
              <Checkbox onChange={handleChange} name="Gnomish" />
            }
            label="Gnomish"
          />
          <FormControlLabel
            control={
              <Checkbox onChange={handleChange} name="Goblin" />
            }
            label="Goblin"
          />
          <FormControlLabel
            control={
              <Checkbox onChange={handleChange} name="Infernal" />
            }
            label="Infernal"
          />
        </FormGroup>
      </FormControl>
    </React.Fragment>
  )
}

interface LanguageSelectorProps {
  languages: ProficiencyView
  hook: (a: ProficiencyView) => void 
}
