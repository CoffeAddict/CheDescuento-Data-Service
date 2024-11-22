/**
* Log message handler with default console.log.
* @param {string} message - The message to log.
* @param {string} type - The log type (e.g., 'INFO', 'WARN', 'ERROR'). Defaults to 'INFO'.
*/
function logMessage(message, level = 'log') {
    const logLevels = ['log', 'warn', 'error'];

    if (!logLevels.includes(level)) {
        console.log(`Invalid log level. Defaulting to 'log'`);
        level = 'log'; // default to 'log' if invalid level is provided
    }

    console[level](`${logTypes[level]}: ${message}`);
}

const logTypes = {
    log: 'INFO',
    info: 'INFO',
    warn: 'WARN'
}

module.exports = logMessage;