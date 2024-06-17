import React, { useRef } from 'react'
import { Metrics } from '../lib/saveMetrics'
import Graph from '../components/Graph'

import useUpdateWithCharacters from '../hooks/useUpdateWithCharacters'

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
    const timeRange = useRef<number>(HOUR * 4)
    const metrics = useUpdateWithCharacters<any>('metrics', '[page][Metrics]', emptyMetrics, timeRange)

    return (
        <>
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
