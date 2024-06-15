import React, { useEffect, useState } from 'react'
import { Metrics } from '../lib/saveMetrics'
import Graph from '../components/Graph'
import { Box } from '@mui/system'
import { Button, ButtonGroup } from '@mui/material'

export default function Metrics() {

    useEffect(() => {
        (async () => {
            console.log('Initial load of metric data')
            await getMetrics(timeRange)
        })()

        const removeListener = window.electron.receive('character:updated', async () => {
            console.log('Characters updated: reloading metric data')
            await getMetrics(timeRange)
        })

        return () => {
            if(removeListener) removeListener()
        }
    }, [])

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
        await setTimeRange((r) => range)
        setMetrics(await window.electron.invoke('metrics:get', range))
    }

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
