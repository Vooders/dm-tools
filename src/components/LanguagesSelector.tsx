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
      type: 'Languages',
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
              <Checkbox onChange={handleChange} name="common" />
            }
            label="Common"
          />
          <FormControlLabel
            control={
              <Checkbox onChange={handleChange} name="draconic" />
            }
            label="Draconic"
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
