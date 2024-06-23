import { Logger } from "./Logger"

/**
 * EventLogger
 * 
 * This class handles log events sent from RendererLogger
 * 
 * The function here are registered in index to handle log events
 * It then calls the Logger class with the log line to log it to the
 * terminal
 */
export class EventLogger {
    constructor(
        private logger = new Logger()
    ){}

    public debug(_: Electron.IpcMainInvokeEvent, log: string): void {
        this.logger.debug(log)
    }

    public info(_: Electron.IpcMainInvokeEvent, log: string): void {
        this.logger.info(log)
    }

    public warn(_: Electron.IpcMainInvokeEvent, log: string): void {
        this.logger.warn(log)
    }

    public error(_: Electron.IpcMainInvokeEvent, log: string): void {
        this.logger.error(log)
    }
}
