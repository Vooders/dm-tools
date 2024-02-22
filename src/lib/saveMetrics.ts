import { app } from 'electron'
import path from 'path'
import getFile from './getFile'
import getSummaryData from '../lib/getSummary'
import getCharacter from '../handlers/getCharacter'
import { DmToolsData } from './CharacterSheetProcessor'
import { writeFile } from 'fs/promises'

const userDataPath = app.getPath('userData');
const metricsPath = path.join(userDataPath, 'metrics.json');

export default async function saveMetrics(): Promise<void> {
    const summary = await getSummaryData()
    const characterIds = Object.keys(summary)
    const metrics = await getFile(metricsPath) as Metrics


    if (!metrics.xAxis) {
        metrics.xAxis = {
            data: []
        }

        metrics.xp = {
            series: []
        }

        metrics.hp = {
            series: []
        }

        metrics.gold = {
            series: []
        }
    }

    const now = thisMinute()

    if (!metrics.xAxis.data.includes(now.toISOString())) {
        metrics.xAxis.data.push(now.toISOString())

        await Promise.all(characterIds.map(async (characterId) => {
            const characterData = await getCharacter(null, characterId)
            const characterIndex = getCharacterIndex(characterData, metrics)

            metrics.xp.series[characterIndex].data.push(characterData.profile.xp)
            metrics.hp.series[characterIndex].data.push(hp(characterData))
            metrics.gold.series[characterIndex].data.push(characterData.currencies.total)
        }))
    }

    await writeFile(metricsPath, JSON.stringify(fillRemovedCharacters(metrics)))
}

function fillRemovedCharacters(metrics: Metrics): Metrics {
    const numberOfDataPoints = metrics.xAxis.data.length
    metrics.xp.series.forEach(fillDataPoint(numberOfDataPoints))
    metrics.hp.series.forEach(fillDataPoint(numberOfDataPoints))
    metrics.gold.series.forEach(fillDataPoint(numberOfDataPoints))
    return metrics
}

function fillDataPoint(numberOfDataPoints: number) {
    return (character: Metric) => {
        if (character.data.length != numberOfDataPoints) {
            character.data.push(null)
        }
    }
}

const hp = (characterData: DmToolsData) => {
    const hp = characterData.hp
    const max = (hp.override) ? hp.override : hp.constitutionBonus + hp.base + hp.bonus
    const trueHp = max - hp.removed
    const posIntHp = trueHp > 0 ? trueHp : 0
    return posIntHp
}

function getCharacterIndex(characterData: DmToolsData, metrics: Metrics) {
    const index = metrics.xp.series.findIndex((element: Metric) => element.id === characterData.id)

    if (index >= 0) {
        return index
    }

    metrics.xp.series.push(newMetric(characterData, metrics.xAxis))
    metrics.hp.series.push(newMetric(characterData, metrics.xAxis))
    metrics.gold.series.push(newMetric(characterData, metrics.xAxis))

    return metrics.xp.series.length - 1
}

function newMetric(characterData: DmToolsData, xAxis: XAxis) {
    return {
        id: characterData.id,
        label: characterData.profile.name,
        data: new Array(xAxis.data.length - 1).fill(null)
    }
}

function thisMinute(): Date {
    const coeff = 1000 * 60
    const date = new Date()
    return new Date(Math.round(date.getTime() / coeff) * coeff)
}

export type Metric = {
    id: number
    label: string
    data: number[]
}

type XAxis = {
    data: string[]
}

export type Metrics = {
    xAxis: XAxis
    xp: {
        series: Metric[]
    }
    hp: {
        series: Metric[]
    }
    gold: {
        series: Metric[]
    }
}

