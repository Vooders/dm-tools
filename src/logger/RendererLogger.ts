/**
 * RendererLogger
 * 
 * This logger is to be used in the renderer process (front end)
 * 
 * It will log lines to the dev-tools console and also send them via the
 * events system to the backend to be logged to the terminal.
 */
export class RendererLogger {
    private prefix: string
    private window: any

    constructor(prefix: string, window: any) {
        this.prefix = prefix
        this.window = window
    }

    debug(log: string): void {
        console.debug(`${this.prefix} ${log}`)
    }

    async info(log: string): Promise<void> {
        const logLine = `${this.prefix} ${log}`
        console.log(logLine)
        await this.window.electron.log('info', logLine)
    }

    async warn(log: string): Promise<void> {
        const logLine = `${this.prefix} ${log}`
        console.log(logLine)
        await this.window.electron.log('warn', logLine)
    }

    async error(log: string): Promise<void> {
        const logLine = `${this.prefix} ${log}`
        console.log(logLine)
        await this.window.electron.log('error', logLine)
    }
}
