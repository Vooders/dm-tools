import { app } from "electron";
import getFile from "../lib/getFile";
import { Metrics } from "../lib/saveMetrics"
import path from 'path'

const userDataPath = app.getPath('userData');
const metricsPath = path.join(userDataPath, 'metrics.json');

export default async (): Promise<Metrics> => {
    return await getFile(metricsPath)
} 
