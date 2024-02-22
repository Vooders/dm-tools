import React, { useEffect, useState } from 'react'
import { LineChart } from '@mui/x-charts/LineChart'
import { Metrics } from '../../lib/saveMetrics'
import { Card, Typography } from '@mui/material'
import Graph from '../fragments/Graph'

export default function Metrics() {
    const [metrics, setMetrics] = useState<any>({
        xAxis: {
            data: []
        },
        xp: {
            series: []
        },
        hp: {
            series: []
        }
    })

    const getMetrics = async () => {
        console.log('getting Metrics')
        setMetrics(await window.electron.getMetrics())
    }

    useEffect(() => {
        getMetrics()
            .catch(console.error)

        window.electron.characterUpdated(async () => {
            await getMetrics()
        })
    }, [])

    const style = {
        graph: {
            width: '100%',
            height: '400px'
        }
    }

    return (
        <>
            <Graph
                title='HP'
                series={metrics.hp.series}
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
