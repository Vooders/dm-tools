import { Grid, TextField } from "@mui/material";
import React from "react";
import { Ability } from "../dm-tools-data.types";

export default function AbilitySelector(props: AbilitySelectorProps) {

  function handleAbilityChange(ability: Ability, hook: Function) {
    return (event: any) => {
      hook({
        ...ability,
        value: parseInt(event.target.value)
      })
    }
  }

  return (
    <React.Fragment>
      <Grid item xs={2} md={1}>
        <TextField
          type='number'
          label={props.ability.shortName}
          onChange={handleAbilityChange(props.ability, props.hook)}
          value={props.ability.value}
        />
      </Grid>
    </React.Fragment>
  )
}


interface AbilitySelectorProps {
  ability: Ability
  hook: Function
}