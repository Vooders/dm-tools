import React, { useEffect, useState } from 'react'
import { Metrics } from '../../lib/saveMetrics'
import Graph from '../fragments/Graph'
import { Box } from '@mui/system'
import { Button, ButtonGroup } from '@mui/material'

export default function Metrics() {
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
    const HOUR = 1000 * 60 * 60
    const [metrics, setMetrics] = useState<any>(emptyMetrics)
    const [timeRange, setTimeRange] = useState<number>(HOUR * 4)

    const getMetrics = async (range: number) => {
        console.log('getting Metrics')
        await setTimeRange((r) => range)
        console.log('getMetrics - range', timeRange)
        setMetrics(await window.electron.getMetrics(range))
    }

    useEffect(() => {
        getMetrics(timeRange)
            .catch(console.error)

        window.electron.characterUpdated(async () => {
            console.log('useEffect - range', timeRange)
            await getMetrics(timeRange)
        })
    }, [])

    return (
        <>
            {timeRange}
            <Box>
                <ButtonGroup variant="text" aria-label="Basic button group">
                    <Button onClick={() => getMetrics(HOUR)}>One</Button>
                    <Button onClick={() => getMetrics(HOUR * 2)}>Two</Button>
                    <Button onClick={() => getMetrics(HOUR * 3)}>Three</Button>
                    <Button onClick={() => getMetrics(HOUR * 4)}>Three</Button>
                </ButtonGroup>
            </Box>
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
        </>
    )
}
