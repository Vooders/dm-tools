/**
 * Logger
 * 
 * The back end logger.
 * 
 * This class logs to the terminal window and it responsible
 * for formatting log lines.
 * 
 * This could be extended to log to a file in the future
 */
export class Logger {
    constructor (
        private prefix: string = ''
    ){}
    public info(log: string): void {
        console.log(`${new Date(Date.now()).toISOString()} INFO ${this.prefix} ${log}`.replace('  ', ' '))
    }

    public warn(log: string): void {
        console.log(`${new Date(Date.now()).toISOString()} WARN ${this.prefix} ${log}`.replace('  ', ' '))
    }

    public error(log: string): void {
        console.log(`${new Date(Date.now()).toISOString()} ERROR ${this.prefix} ${log}`.replace('  ', ' '))
    }
}
