import React from "react";
import NumberInput from "./NumberInput";
import { Box, Divider, Grid, Paper, Typography } from "@mui/material";

const AbilitySelector = (props: any) => {
  return (
    <Grid item xs={4} md={2} sx={{ textAlign: 'center' }}>
      <Paper variant="outlined" >
        <Typography variant='overline'>{props.ability}</Typography>
        <Divider />
        {props.input}
      </Paper>
    </Grid>
  )
}

export default function NpcAbilitiesSelector(props: any) {
  const [strength, setStrength] = React.useState<number | null>(10)
  const [dexterity, setDexterity] = React.useState<number | null>(10)
  const [constitution, setConstitution] = React.useState<number | null>(10)
  const [intelligence, setIntelligence] = React.useState<number | null>(10)
  const [wisdom, setWisdom] = React.useState<number | null>(10)
  const [charisma, setCharisma] = React.useState<number | null>(10)

  const abilities = () => {
    return {
      strength,
      dexterity,
      constitution,
      intelligence,
      wisdom,
      charisma
    }
  }
  function handleStrength(data: number) {
    setStrength(data)
    props.callBack(abilities())
  }
  function handleDexterity(data: number) {
    setDexterity(data)
    props.callBack(abilities())
  }
  function handleConstitution(data: number) {
    setConstitution(data)
    props.callBack(abilities())
  }
  function handleIntelligence(data: number) {
    setIntelligence(data)
    props.callBack(abilities())
  }
  function handleWisdom(data: number) {
    setWisdom(data)
    props.callBack(abilities())
  }
  function handleCharisma(data: number) {
    setCharisma(data)
    props.callBack(abilities())
  }

  return (
    <Grid item sm={12}>
      <Box sx={{ flexGrow: 1, 'paddingTop': '10px' }}>
        <Grid container sm={12}>
          <AbilitySelector ability='Strength' input={<NumberInput callBack={handleStrength} />} />
          <AbilitySelector ability='Dexterity' input={<NumberInput callBack={handleDexterity} />} />
          <AbilitySelector ability='Constitution' input={<NumberInput callBack={handleConstitution} />} />
          <AbilitySelector ability='Intelligence' input={<NumberInput callBack={handleIntelligence} />} />
          <AbilitySelector ability='Wisdom' input={<NumberInput callBack={handleWisdom} />} />
          <AbilitySelector ability='Charisma' input={<NumberInput callBack={handleCharisma} />} />
        </Grid>
      </Box>
    </Grid>
  )
}
