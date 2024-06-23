import React, { useState } from 'react'
import { Metrics } from '../lib/saveMetrics'
import Graph from '../components/Graph'

import useUpdateWithCharacters from '../hooks/useUpdateWithCharacters'
import { Box } from '@mui/system'
import { FormControlLabel, Radio, RadioGroup } from '@mui/material'
import { RendererLogger } from '../logger/RendererLogger';

const logger = new RendererLogger('[page][Metrics]', window)

export default function Metrics() {
    const HOUR = 1000 * 60 * 60
    const emptyMetrics: any = {
        xAxis: {
            data: []
        },
        xp: {
            series: []
        },
        hp: {
            series: []
        },
        gold: {
            series: []
        }
    }
    const [numberOfHours, setNumberOfHours] = useState<number>(4 * HOUR)
    const metrics = useUpdateWithCharacters<any>('metrics', logger, emptyMetrics, numberOfHours)

    return (
        <React.Fragment>
            <Box>
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    onChange={(e: any) => setNumberOfHours(e.target.value * HOUR)}
                >
                    <FormControlLabel value={2} control={<Radio />} label="2" />
                    <FormControlLabel value={4} control={<Radio />} label="4" />
                    <FormControlLabel value={6} control={<Radio />} label="6" />
                </RadioGroup>
            </Box>
            <Box>
                <Graph
                    title='HP'
                    series={metrics.hp.series}
                    xAxis={metrics.xAxis.data}
                />
                <Graph
                    title='Gold'
                    series={metrics.gold.series}
                    xAxis={metrics.xAxis.data}
                />
                <Graph
                    title='XP'
                    series={metrics.xp.series}
                    xAxis={metrics.xAxis.data}
                />
            </Box>
        </React.Fragment>
    )
}
