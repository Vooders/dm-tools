import React from 'react'
import { ProficiencyView } from '../dm-tools-data.types'
import { FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox } from '@mui/material'


export default function LanguagesSelector(props: LanguageSelectorProps) {
  const [common, setCommon] = React.useState<boolean>(false)
  const [draconic, setDraconic] = React.useState<boolean>(false)

  function handleChange(setter: Function) {
    return (e: any) => {
      setter(e.target.checked)
      props.hook({
        type: 'Languages',
        value: getLanguagesView()
      })
    }
  }

  const getLanguagesView = (): string => {
    const languages = [
      { name: 'common', proficient: common },
      { name: 'draconic', proficient: draconic}
    ]
    return languages.filter((lang) => lang.proficient).map((lang) => lang.name).join(', ')
  }

  return (
    <React.Fragment>
      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormLabel component="legend">Languages</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox checked={common} onChange={handleChange(setCommon)} name="common" />
            }
            label="Common"
          />
          <FormControlLabel
            control={
              <Checkbox checked={draconic} onChange={handleChange(setDraconic)} name="draconic" />
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
  hook: Function
}