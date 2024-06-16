import { app } from "electron"
import getFile from "../lib/getFile"
import { Metric, Metrics } from "../lib/saveMetrics"
import path from 'path'

const userDataPath = app.getPath('userData');
const metricsPath = path.join(userDataPath, 'metrics.json');

export default async (_: Electron.IpcMainInvokeEvent, timeRange: number): Promise<Metrics> => {
    console.log('[handler][getMetrics] Getting metrics with time range', timeRange)

    const metrics = await getFile(metricsPath)
    const stringData = metrics.xAxis.data
    metrics.xAxis.data = stringData.map((d: string) => new Date(d))

    return removeCharactersWithoutData(setRange(timeRange, metrics))
} 

function findEarliestIndex(startTime: Date, metrics: Metrics): number {
    const index = metrics.xAxis.data.findIndex((d: string) => new Date(d) >= startTime)

    if (index < 0) {
        return 0
    }
    return index
}

function setRange(time: number, metrics: Metrics) {
    const index = findEarliestIndex(new Date(Date.now() - time), metrics)
    const m = metrics
    m.xAxis.data = metrics.xAxis.data.slice(index)
    m.xp.series = metrics.xp.series.map(sliceData(index))
    m.hp.series = metrics.hp.series.map(sliceData(index))
    m.gold.series = metrics.gold.series.map(sliceData(index))
    return m
}

function sliceData(index: number) {
    return (element: any) => {
        return {
            ...element,
            data: element.data.slice(index)
        }
    }
}

function removeCharactersWithoutData(metrics: Metrics) {
    return {
        ...metrics,
        xp: {
            series: metrics.xp.series.filter(filterAllNulls)
        },
        hp: {
            series: metrics.hp.series.filter(filterAllNulls)
        },
        gold: {
            series: metrics.gold.series.filter(filterAllNulls)
        }
    }
}

function filterAllNulls(character: Metric) {
    const uniqData = [...new Set(character.data)]

    if (uniqData.length > 1) {
        return true
    }

    if (uniqData[0] === null) {
        return false
    }

    return true
}
