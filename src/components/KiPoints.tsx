import { Box } from "@mui/system"
import React from "react"
import MeditateIcon from '@mui/icons-material/SelfImprovement'

export default function kiPoints(props: KiPointsProps) {

  return (
    <Box sx={{ display: 'flex', m: 1 }}>
      {new Array(props.max - props.used).fill(0).map((_, index) => {
        return (
          <MeditateIcon fontSize="large" key={`ki${index}`} />
        )
      })}
      {new Array(props.used).fill(0).map((_, index) => {
        return (
          <MeditateIcon fontSize="large" sx={{ color: '#ff6d75' }} key={`usedKi${index}`} />
        )
      })}
    </Box>
  )
}

interface KiPointsProps {
  max: number
  used: number
}
