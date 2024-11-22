/**
* Log message handler with default console.log.
* @param {string} message - The message to log.
* @param {string} type - The log type (e.g., 'INFO', 'WARN', 'ERROR'). Defaults to 'INFO'.
*/
function logMessage(message, level = 'log') {
    const logLevels = ['log', 'warn', 'error'];

    if (!logLevels.includes(level)) level = 'log'; // default to 'log' if invalid level is provided

    console[level](`${logTypes[level]}: ${message}`);
}

const logTypes = {
    log: 'INFO',
    warn: 'WARN',
    error: 'ERROR',
}

export default logMessage;