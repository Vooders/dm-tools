import { Box } from "@mui/system"
import React from "react"
import BlockIcon from '@mui/icons-material/Block';
import MeditateIcon from '@mui/icons-material/SelfImprovement';

export default function kiPoints(props: KiPointsProps) {

  return (
    <Box sx={{ display: 'flex', m: 1 }}>
      {new Array(props.max - props.used).fill(0).map((_, index) => {
        return (
          <MeditateIcon key={`ki${index}`} />
        )
      })}
      {new Array(props.used).fill(0).map((_, index) => {
        return (
          <BlockIcon sx={{ color: '#ff6d75' }} key={`usedKi${index}`} />
        )
      })}
    </Box>
  )
}

interface KiPointsProps {
  max: number
  used: number
}