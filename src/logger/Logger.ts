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
import chalk from 'chalk'

export class Logger {
    constructor (
        private prefix: string = ''
    ){}

    public debug(log: string): void {
        this.log(log, chalk.yellow('DEBUG'))
    }

    public info(log: string): void {
        this.log(log, chalk.green('INFO'))
    }

    public warn(log: string): void {
        this.log(log, chalk.yellow('WARN'))
    }

    public error(log: string): void {
        this.log(log, chalk.red('ERROR'))
    }

    private log(log: string, level: string) {
        const timestamp = new Date(Date.now()).toISOString()
        const regex = /(\[.*\])/g;
        const matches = log.match(regex)
        const file = matches ? matches[0] : this.prefix
        const line = matches ? log.replace(matches[0], '') : log
        console.log(`${timestamp} ${level} ${chalk.blueBright(file)} ${chalk.white(line)}`.replace('  ', ' '))
    }
}
