const logTypes: LogTypes = {
    log: 'log',
    warn: 'warn',
    error: 'error',
}

/**
* Log message handler with default console.log.
* @param {string} message - The message to log.
* @param {LogTypes} type - The log type (e.g., 'INFO', 'WARN', 'ERROR'). Defaults to 'INFO'.
*/
export function logMessage(message: string | unknown, level: keyof LogTypes = 'log') {
    const logLevels = ['log', 'warn', 'error']

    if (!logLevels.includes(level)) level = 'log' // default to 'log' if invalid level is provided

    console[level](`${logTypes[level].toUpperCase()}: ${message}`)
}