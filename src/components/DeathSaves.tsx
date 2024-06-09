import Rating from '@mui/material/Rating'
import React from 'react'
import { styled } from '@mui/material/styles'
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied'
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied'
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral'
import { Box } from '@mui/material'

const style = {
    display: 'flex',
    justifyContent: "center"

}

export default function DeathSaves(props: DeathSavesProps) {
    const FailedSave = styled(Rating)({
        '& .MuiRating-iconFilled': {
            color: '#ff6d75',
        },
        '& .MuiRating-iconEmpty': {
            color: 'grey',
        }
    })
    const SuccessfulSave = styled(Rating)({
        '& .MuiRating-iconFilled': {
            color: 'green',
        },
        '& .MuiRating-iconEmpty': {
            color: 'grey',
        }
    })

    const iconStyle = {
        mx: 0.5,
        fontSize: 60
    }

    return (
        (props.display && !props.isStabilized) &&
        <Box sx={style}>
            <SuccessfulSave sx={{ mr: 10}}
                defaultValue={props.successCount}
                max={3}
                readOnly
                icon={<SentimentVerySatisfiedIcon sx={iconStyle} />}
                emptyIcon={<SentimentNeutralIcon sx={iconStyle} />}
            />
            <FailedSave
                defaultValue={props.failCount}
                max={3}
                readOnly
                icon={<SentimentVeryDissatisfiedIcon sx={iconStyle} />}
                emptyIcon={<SentimentNeutralIcon sx={iconStyle} />}
            />
        </Box>
    )
}

interface DeathSavesProps {
    failCount: number
    successCount: number
    isStabilized: boolean
    display: boolean
}
